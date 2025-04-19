export const despawn = (
  letters: HTMLElement[],
  git: HTMLElement,
  textox: HTMLElement,
) => {
  git.style.top = "100vh";
  git.style.transform = "translateY(0)"; //'translateY(0)'
  setTimeout(() => {
    textox.removeChild(git);
    letters.splice(letters.indexOf(git), 1);
  }, 500);
};
