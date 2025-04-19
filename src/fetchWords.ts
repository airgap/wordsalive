import { relocate } from "./relocate";
import { words } from "./vars";

export const fetchWords = () =>
  fetch("words.csv")
    .then((res) => res.text())
    .then(async (r) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      words.splice(0, words.length, ...r.trim().split("\n"));
      relocate();
      setInterval(relocate, 10000);
    });
