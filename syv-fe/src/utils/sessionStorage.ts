const isInValidWindow = () => typeof window === "undefined";

const get = (key: string) => {
  if (isInValidWindow()) {
    return;
  }

  const data = sessionStorage.getItem(key);
  if (!data) {
    return;
  }

  try {
    const parsed = JSON.parse(data);
    return parsed;
  } catch (e) {
    //
  }
  return data;
};

const set = <T>(key: string, value: T) => {
  if (isInValidWindow()) {
    return;
  }

  if (!key) {
    return;
  }

  const data = JSON.stringify(value);

  sessionStorage.setItem(key, data);
};

const remove = (key: string) => {
  if (isInValidWindow()) {
    return;
  }

  sessionStorage.removeItem(key);
};

const removeAll = () => {
  if (isInValidWindow()) {
    return;
  }

  sessionStorage.clear();
};

const getAll = () => {
  if (isInValidWindow()) {
    return;
  }

  return Object.keys(sessionStorage).reduce(
    (obj: { [key: string]: string | null }, key) => {
      obj[key] = sessionStorage.getItem(key);
      return obj;
    },
    {}
  );
};

const SessionStorage = { get, set, remove, removeAll, getAll };

export { SessionStorage };
