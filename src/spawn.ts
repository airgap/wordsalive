export const spawn = (elem: HTMLElement) => {
  elem.style.top = "-100vh";
  setTimeout(() => (elem.style.top = "50vh"), 0);
};
