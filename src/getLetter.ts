import { letters, usedLetters } from "./vars";

export function getletter(lit: string) {
  for (const l of letters) {
    if (!usedLetters.includes(l) && l.getAttribute("letter") == lit) {
      return l;
    }
  }
}
