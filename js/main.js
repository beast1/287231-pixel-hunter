const appendWindow = function(template) {
  
};

const switchWindow = function(WINDOW_NUM) {
  const parent = document.querySelector(`main.central`);
  // Почистить содержимое
  parent.innerHTML = ``;
  // Вставить новый экран
  parent.appendWindow(WINDOW_NUM);
};
