export const getElementFromTemplate = (layout) => {
  const div = document.createElement(`div`);
  div.innerHTML = layout;

  return div;
};

export const showScreen = (child) => {
  const mainElement = document.querySelector(`.central`);

  mainElement.innerHTML = ``;
  mainElement.appendChild(child);
};
