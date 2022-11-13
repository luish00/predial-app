import { useCallback, useState } from 'react';
import { devMode, URL_BASE } from '../../env';

interface BodyFetch {
  body?: object;
  headers?: object;
  method: string;
  params?: object;
  url: string;
}

interface WrapperData<T> {
  isValid: boolean;
  message?: string;
  data?: T | null;
  status: number;
  error?: string;
}

type MethodType = 'POST' | 'DELETE' | 'PUT';

interface FetchProps {
  body?: object;
  path: string;
  params?: object;
}

interface ApiFetchProps extends FetchProps {
  method: MethodType;
}

interface ApiServiceType<T> {
  apiCall: (params: FetchProps) => Promise<WrapperData<T>>;
  isLoading: boolean;
  result: WrapperData<T> | null;
}

const tryLog = async ({ url, request }) => {
  if (!devMode) {
    return;
  }

  try {
    const data = await request.json();
    console.log('api log', { url, data });
  } catch (error) {
    console.log('api log catch', error.message);
  }
};

// serializeForUri({ param0: 'value 0', param1: 'value:1' }) ===
// 'param0=value%200&param1=value%3A1'
function serializeForUri(obj = {}) {
  return Object.keys(obj)
    .map((key: string) => `${encodeURI(key)}=${encodeURI(obj[key])}`)
    .join('&');
}

async function apiFetch({
  body,
  headers,
  method,
  params = {},
  url,
}: BodyFetch): Promise<Response> {
  const token = 'getSessiontoken';
  let rest = {};

  if (method === 'POST') {
    rest = { body: JSON.stringify(body) };
  }

  return fetch(`${URL_BASE}/${url}?${serializeForUri(params)} `, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
      ...headers,
    },
    ...rest,
  });
}

/**
 *
 * @param method @default('POST')
 * @returns [result, apiCall, isLoading]
 *
 */
export const useApiService = <T>(
  method: MethodType = 'POST',
): ApiServiceType<T> => {
  const [result, setResult] = useState<WrapperData<T> | null>(null);
  const [isLoading, setLoading] = useState(false);
  let wrapperData: WrapperData<T>;

  const apiCall = async ({
    body = {},
    path = '',
    params = {},
  }: FetchProps): Promise<WrapperData<T>> => {
    setLoading(true);
    const bodyFetch: BodyFetch = {
      body,
      method,
      params,
      url: path,
    };

    try {
      const request = await apiFetch(bodyFetch);
      let data = request.status === 200 ? await request.json() : null;

      if (request.status >= 300) {
        tryLog({ url: path, request });
      }

      wrapperData = {
        isValid: request.ok,
        status: request.status,
        data,
      };
    } catch (error) {
      wrapperData = {
        data: null,
        message: error.message,
        isValid: false,
        status: 500,
      };
    }

    setLoading(false);
    setResult(wrapperData);

    return wrapperData;
  };

  return { result, apiCall, isLoading };
};

export const useApiGet = <T>({ headers = {}, url = '' }) => {
  const [result, setResult] = useState<WrapperData<T> | null>(null);
  const [isLoading, setLoading] = useState(false);
  let wrapperData: WrapperData<T>;

  const get = async ({ params = {} } = {}): Promise<WrapperData<T>> => {
    setLoading(true);

    try {
      const request = await apiFetch({
        params,
        headers,
        url,
        method: 'GET',
      });
      const data = request.status === 200 ? await request.json() : null;

      wrapperData = {
        data,
        isValid: request.ok,
        message: '',
        status: request.status,
      };
    } catch (error) {
      wrapperData = {
        data: null,
        isValid: false,
        message: error.message,
        status: 500,
      };
    }

    setLoading(false);
    setResult(wrapperData);

    return wrapperData;
  };

  return [result, get, isLoading];
};

const fetchWrapper = async <T>({
  body = {},
  method = 'POST',
  params = {},
  path = '',
}: ApiFetchProps): Promise<WrapperData<T>> => {
  let wrapperData: WrapperData<T>;
  const bodyFetch: BodyFetch = {
    body,
    method,
    params,
    url: path,
  };

  try {
    const request = await apiFetch(bodyFetch);
    let data = request.status === 200 ? await request.json() : null;

    if (request.status >= 300) {
      tryLog({ url: path, request });
    }

    wrapperData = {
      isValid: request.ok,
      status: request.status,
      data,
    };
  } catch (error) {
    wrapperData = {
      data: null,
      message: error.message,
      isValid: false,
      status: 500,
    };
  }

  return wrapperData;
};

export const useFetch = <T>() => {
  const post = useCallback(async (params: FetchProps) => {
    return fetchWrapper<T>({ ...params, method: 'POST' });
  }, []);

  const del = useCallback(async (params: FetchProps) => {
    return fetchWrapper<T>({ ...params, method: 'DELETE' });
  }, []);

  const put = useCallback(async (params: FetchProps) => {
    return fetchWrapper<T>({ ...params, method: 'PUT' });
  }, []);

  return { post, del, put };
};
