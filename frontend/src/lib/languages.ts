interface Language {
  text: string;
  author: string;
}

export const getLanguage = () => {
  const userLang = navigator.language ?? "en";
  const langCode = userLang.split("-")[0] ?? "en";
  return languages[langCode] ?? languages.en;
};

const languages: Record<string, Language> = {
  en: { text: "Download a Medal clip", author: "Made with 💜 by " },
  ja: { text: "Medalクリップをダウンロード", author: "作成者 " },
  de: { text: "Medal-Clip herunterladen", author: "Erstellt von " },
  zh: { text: "下载Medal视频片段", author: "由以下人员制作 " },
  ru: { text: "Скачать клип Medal", author: "Создано с любовью " },
  ar: { text: "تحميل مقطع Medal", author: "صنع بحب بواسطة " },
  fr: { text: "Télécharger un clip Medal", author: "Créé avec 💜 par " },
  fi: { text: "Lataa Medal-klippi", author: "Tehty rakkaudella " },
  es: { text: "Descargar clip de Medal", author: "Hecho con 💜 por " },
  pt: { text: "Baixar clip do Medal", author: "Feito com 💜 por " },
  ca: { text: "Descarregar clip de Medal", author: "Fet amb 💜 per " },
  no: { text: "Last ned Medal-klipp", author: "Laget med 💜 av " },
  sv: { text: "Ladda ner Medal-klipp", author: "Skapad med 💜 av " },
  da: { text: "Download Medal-klip", author: "Lavet med 💜 af " },
  cs: { text: "Stáhnout Medal klip", author: "Vytvořeno s láskou " },
  tr: { text: "Medal klibi indir", author: "💜 ile yapıldı " },
  vi: { text: "Tải clip Medal", author: "Được làm bởi 💜 " },
  zh_HK: { text: "下載Medal影片", author: "由以下人製作 " },
  pl: { text: "Pobierz klip Medal", author: "Stworzone z 💜 przez " },
  is: { text: "Sækja Medal klipp", author: "Búið til með 💜 af " },
  hu: { text: "Medal klip letöltése", author: "Készítette: " },
  sk: { text: "Stiahnuť Medal klip", author: "Vytvorené s láskou " },
  zh_TW: { text: "下載Medal影片", author: "由以下人製作 " },
  az: { text: "Medal klipini yüklə", author: "💜 ilə hazırlanmışdır " },
  he: { text: "הורד קליפ Medal", author: "נוצר באהבה על ידי " },
  mt: { text: "Niżżel klipp Medal", author: "Magħmul b'💜 minn " },
  sl: { text: "Prenesi Medal posnetek", author: "Narejeno z 💜 od " },
  ku: { text: "Klîpa Medal daxe bike", author: "💜 ile yapıldı " },
  sr: { text: "Preuzmi Medal klip", author: "Napravljen sa 💜 od " },
  ig: { text: "Budata Medal clip", author: "Kere nke 💜 site na " },
  yo: { text: "Gba Medal clip sílẹ̀", author: "Ṣe pẹlu 💜 nipasẹ " },
  ha: { text: "Sauke Medal clip", author: "An yi da 💜 ta " },
  ht: { text: "Telechaje klip Medal", author: "Fè ak 💜 pa " },
  zu: { text: "Landa i-Medal clip", author: "Kwenziwe ngothando 💜 ngu " },
  xh: { text: "Khuphela i-Medal clip", author: "Kwenziwe ngothando 💜 ngu " },
  sw: { text: "Pakua kipande cha Medal", author: "Imeundwa kwa 💜 na " },
  sw_KE: { text: "Pakua kifungu cha Medal", author: "Imeundwa kwa 💜 na " },
};
