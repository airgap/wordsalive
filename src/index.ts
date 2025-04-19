import { fetchWords } from "./fetchWords";
import { relocate } from "./relocate";

window.addEventListener("load", async () => {
  relocate();

  fetchWords();
});
