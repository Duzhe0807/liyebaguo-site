export const languages = ["zh", "tw", "en", "ja", "ko"] as const;
export type Lang = (typeof languages)[number];

export const langNames: Record<Lang, string> = {
  zh: "简",
  tw: "繁",
  en: "EN",
  ja: "JP",
  ko: "KR",
};

export const langCodes: Record<Lang, string> = {
  zh: "zh-CN",
  tw: "zh-TW",
  en: "en",
  ja: "ja",
  ko: "ko",
};
