const translationUtils = (
  t: <X extends any[] | Record<string, any>>(key: string | (string | number)[], params?: X | undefined, lang?: string | undefined) => string,
  key: string
) => {
  return t(key) || key
}

export default translationUtils;