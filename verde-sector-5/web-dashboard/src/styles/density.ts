// Adaptive density: macOS scale on desktop-class devices, iOS scale otherwise.
const mq = window.matchMedia('(min-width: 900px) and (pointer: fine)');
const apply = (m: MediaQueryList | MediaQueryListEvent) => {
  document.documentElement.classList.toggle('hig-desktop', m.matches);
};
apply(mq);
mq.addEventListener('change', apply);
export {};
