const windows = Array.from(document.querySelectorAll(`template`));
let currentWindow = 0;

const switchWindow = (WINDOW_NUM) => {
  const parent = document.querySelector(`main.central`);
  // Почистить содержимое
  parent.innerHTML = ``;
  // Выбрать новый экран
  const window = windows[WINDOW_NUM].content.cloneNode(true);
  // Вставить новый экран
  parent.appendChild(window);
};

document.addEventListener(`keyup`, (e) => {
  if (e.keyCode === 39 && e.altKey === true) {
    if (currentWindow < windows.length - 1) {
      currentWindow = currentWindow + 1;
    }
  } else if (e.keyCode === 37 && e.altKey === true) {
    if (currentWindow !== 0) {
      currentWindow = currentWindow - 1;
    }
  }

  switchWindow(currentWindow);
});
