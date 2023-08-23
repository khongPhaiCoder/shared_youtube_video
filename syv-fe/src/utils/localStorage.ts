import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const ACCEPTED_COOKIES_POLICY = "cookieBannerRead";
const ACCEPTED_COOKIES_POLICY_DATETIME = "cookieBannerReadDate";

const get = (key: string): any => {
  if (typeof window === "undefined") {
    return;
  }

  let data = localStorage.getItem(key);
  if (!data) {
    return;
  }

  try {
    data = JSON.parse(data);
  } catch (e) {
    return data;
  }
  return data;
};

const set = (key: string, value: object | string): void => {
  if (!key) {
    return;
  }

  const data =
    typeof value === "object" ? JSON.stringify(value) : value.toString();

  localStorage.setItem(key, data);
};

const remove = (key: string): void => localStorage.removeItem(key);

const checkAcceptedCookiePolicy = (expiredDays = 10): boolean => {
  const acceptedDateTime = get(ACCEPTED_COOKIES_POLICY_DATETIME);
  const acceptedCookie = get(ACCEPTED_COOKIES_POLICY);

  if (!acceptedCookie || !acceptedDateTime) {
    return false;
  }

  const acceptedDateTimeInUnix = dayjs(acceptedDateTime).unix();
  const now = dayjs().unix();
  const d = dayjs.duration(
    (now - acceptedDateTimeInUnix) * 1000,
    "milliseconds"
  );

  const daysUntilNow = parseInt(String(d.asDays()));

  if (daysUntilNow < expiredDays && acceptedCookie) {
    return true;
  } else {
    remove(ACCEPTED_COOKIES_POLICY_DATETIME);
    remove(ACCEPTED_COOKIES_POLICY);
    return false;
  }
};

const setAcceptedCookiePolicy = (acceptedDateTime: string): void => {
  set(ACCEPTED_COOKIES_POLICY, "true");
  set(ACCEPTED_COOKIES_POLICY_DATETIME, acceptedDateTime);
};

const LocalStorage = {
  get,
  set,
  remove,
  ACCEPTED_COOKIES_POLICY,
  ACCEPTED_COOKIES_POLICY_DATETIME,
  checkAcceptedCookiePolicy,
  setAcceptedCookiePolicy,
};

export { LocalStorage };
