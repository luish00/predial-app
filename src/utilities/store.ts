import AsyncStorage from '@react-native-community/async-storage';

interface SetItem<T> {
  key: string;
  orDefault: T;
  json?: boolean;
}

const STORAGE_KEY_NAME = '@MyPetCloud:';
const doNothing = () => {};

function storageKey(key: string) {
  return STORAGE_KEY_NAME + key.split('/').join('_');
}

const setItem = async ({ data = {}, json = true, key = '' }) => {
  try {
    if (!key) {
      throw new Error('Store required key');
    }

    const dataSoSave = json ? JSON.stringify(data) : String(data);

    AsyncStorage.setItem(storageKey(key), dataSoSave);
  } catch (_) {
    doNothing();
  }
};

const getItem = async <T>({ key = '', json = true, orDefault }: SetItem<T>) => {
  const value = await AsyncStorage.getItem(storageKey(key));
  let dataFromSave = orDefault;

  if (value) {
    dataFromSave = json ? JSON.parse(value) : value;
  }

  return dataFromSave;
};

export const getStorageValue = async <T>({
  key = '',
  orDefault,
}: SetItem<T>) => {
  return getItem({ json: false, key, orDefault });
};

export const setStorageValue = async ({ key = '', data = '' }) => {
  setItem({ data, json: false, key });
};

export const getStorageBool = async ({
  key = '',
  orDefault = false,
}): Promise<boolean> => {
  const value = await getStorageValue<boolean>({ key, orDefault });

  return value;
}

export const getStorageData = async <T>({
  key = '',
  orDefault,
}: SetItem<T>) => {
  return getItem({ key, orDefault });
};

export async function setStorageData({ key = '', data = {} }) {
  setItem({ data, key });
}
