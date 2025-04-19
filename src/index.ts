import { fetchWords } from "./fetchWords";
import { relocate } from "./relocate";

window.addEventListener("DOMContentLoaded", async () => {
  relocate();

  fetchWords();
});
