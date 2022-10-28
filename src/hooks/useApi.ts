import { useState } from 'react';
import { URL_BASE } from '../utilities/constants';

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

const useApiPost = <T>({ headers = {}, method = 'POST' } = {}) => {
  const [result, setResult] = useState<WrapperData<T> | null>(null);
  const [isLoading, setLoading] = useState(false);
  let wrapperData: WrapperData<T>;

  const post = async ({
    body = {},
    path = '',
    params = {},
  }): Promise<WrapperData<T>> => {
    setLoading(true);
    const bodyFetch: BodyFetch = {
      body,
      headers,
      method,
      params,
      url: path,
    };

    try {
      const request = await apiFetch(bodyFetch);
      const data = request.status === 200 ? await request.json() : null;

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

  return [result, post, isLoading];
};

const useApiGet = <T>({ headers = {}, url = '' }) => {
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

export { useApiPost, useApiGet };
