import { DOMParser, HTMLDocument } from "dom";

const parser: DOMParser = new DOMParser();

export const getTitle = async (url: string) => {
  const response: Response = await fetch(url);
  const document: HTMLDocument | null = parser.parseFromString(
    await response.text(),
    "text/html",
  );
  if (document !== null) {
    return document.querySelector("#gn")?.innerText;
  } else {
    return "";
  }
};
