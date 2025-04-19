import { despawn } from "./despawn";
import { getletter } from "./getLetter";
import { hashcol } from "./hashcol";
import { spawn } from "./spawn";
import { letters, textox, unusedLetters, usedLetters, words } from "./vars";

export function relocate() {
  const word = words[Math.floor(Date.now() / 5000) % words.length];
  if (!word) throw Error("Word list empty");
  usedLetters.splice(0, 99);
  unusedLetters.splice(0, 99);
  textox?.style.setProperty("--scale", (1 / word.length).toLocaleString());
  for (const letter of letters) unusedLetters.push(letter);
  for (let l = 0; l < word.length; l++) {
    const letter = word[l] as string;
    var elem;
    if ((elem = getletter(letter))) {
      //delete unusedLetters[unusedLetters.indexOf(elem)];
      unusedLetters.splice(unusedLetters.indexOf(elem), 1);
      usedLetters.push(elem);
      elem.style.top = "50vh";
    } else {
      elem = document.createElement("span");
      elem.classList.add("letter");
      elem.innerHTML = letter;
      elem.setAttribute("letter", letter);
      spawn(elem);
      letters.push(elem);
      textox?.appendChild(elem);
      usedLetters.push(elem);
    }
    const [bg, fg] = hashcol(word);
    document.body.parentElement!.style = `--dark: ${bg}; --light: ${fg}`;
    elem.style.left =
      "calc(50vw + calc(100vw * calc(var(--scale) * " +
      (-word.length / 2 + l) +
      "))";
  }
  for (let l of letters) {
    if (!usedLetters.includes(l)) despawn(letters, l, textox);
  }
}
