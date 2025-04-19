export function spawn(elelm: HTMLElement) {
  elelm.style.top = "-100vh";
  setTimeout(() => {
    elelm.style.top = "50vh";
  }, 0);
}
