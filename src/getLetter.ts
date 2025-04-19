import { letters, usedLetters } from "./vars";

export const getLetter = (lit: string) => {
  for (const l of letters) {
    if (!usedLetters.includes(l) && l.getAttribute("letter") == lit) {
      return l;
    }
  }
};
