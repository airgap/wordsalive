window.addEventListener("load", async () => {
  const textox = document.getElementById("text");

  let word = "";

  let words = ["words alive"];

  let cowrd = 0;

  let letters: string[] = [];

  let usedLetters: string[] = [];

  let unusedLetters = [];

  relocate();

  function relocate() {
    word = words[Math.floor(Date.now() / 5000) % words.length];
    usedLetters = [];
    unusedLetters = [];
    textox?.style.setProperty("--scale", (1 / word.length).toLocaleString());
    for (var i = 0; i < letters.length; i++) unusedLetters.push(letters[i]);
    for (var i = 0; i < word.length; i++) {
      var lit = word[i];
      var elem;
      if ((elem = getletter(lit))) {
        //delete unusedLetters[unusedLetters.indexOf(elem)];
        unusedLetters.splice(unusedLetters.indexOf(elem), 1);
        usedLetters.push(elem);
        elem.style.top = "50vh";
      } else {
        elem = document.createElement("span");
        elem.classList.add("letter");
        elem.innerHTML = lit;
        elem.setAttribute("letter", lit);
        spawn(elem);
        letters.push(elem);
        textox.appendChild(elem);
        usedLetters.push(elem);
      }
      elem.style.left =
        "calc(50vw + calc(100vw * calc(var(--scale) * " +
        (-word.length / 2 + i) +
        "))";
    }
    //alert(usedLetters);
    for (var i = 0; i < letters.length; i++) {
      //alert(usedLetters.includes(letters[i]));
      if (!usedLetters.includes(letters[i])) despawn(letters[i]);
      //alert(unusedLetters)
      //despawn(letters[i]);
    }
  }

  fetch("words.csv")
    .then((res) => res.text())
    .then(async (r) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      words = r.trim().split("\n");
      relocate();
      let timer = setInterval(relocate, 5000);
    });

  function spawn(elelm) {
    elelm.style.top = "-100vh";
    setTimeout(() => {
      elelm.style.top = "50vh";
    }, 0);
  }

  function despawn(git) {
    git.style.top = "100vh";
    git.style.transform = "translateY(0)"; //'translateY(0)'
    setTimeout(() => {
      textox.removeChild(git);
      letters.splice(letters.indexOf(git), 1);
    }, 500);
  }

  function getletter(lit) {
    for (var i = 0; i < letters.length; i++) {
      if (
        !usedLetters.includes(letters[i]) &&
        letters[i].getAttribute("letter") == lit
      ) {
        return letters[i];
      }
    }
  }
});
