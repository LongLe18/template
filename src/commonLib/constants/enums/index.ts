import { DATE_TIME_FORMAT } from "./dateFormat";

enum PAGE_SIZE_OPTIONS {
  DEFAULT_VALUE = 10,
  OPTION_5 = 5,
  OPTION_10 = 10,
  OPTION_15 = 15,
  OPTION_5_LABEL = "5 dòng",
  OPTION_10_LABEL = "10 dòng",
  OPTION_15_LABEL = "15 dòng",
}

enum LOCAL_STORAGE_KEY {
  USER = "user",
  PAGE_SIZE = "page_size",
  ACCESS_TOKEN = "access_token",
  USERNAME = "username",
  MENUS = "menus",
  USER_ID = "userId",
  PAGE_PARAMS = "PAGE_PARAMS",
  PRICE_SPECIFIC = "PRICE_SPECIFIC",
  PRICE_SPECIFIC_KEY = "PRICE_SPECIFIC_KEY",
}


export {
  DATE_TIME_FORMAT,
  PAGE_SIZE_OPTIONS,
  LOCAL_STORAGE_KEY,
};
