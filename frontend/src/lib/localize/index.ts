import { Languages, type iLanguage } from "./data";

let cachedLanguage: iLanguage | undefined = undefined;

export const getLanguage = () => {
  if (cachedLanguage) {
    return cachedLanguage;
  }

  const userLang = navigator.language ?? "en";
  const langCode = userLang.split("-")[0] ?? "en";
  cachedLanguage = Languages[langCode] ?? Languages.en;
  return cachedLanguage;
};
