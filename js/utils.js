export const getElementFromTemplate = (layout) => {
  const div = document.createElement(`div`);
  div.innerHTML = layout;

  return div;
};

const mainElement = document.querySelector(`.central`);

export const showScreen = (view) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(view.element);
};
