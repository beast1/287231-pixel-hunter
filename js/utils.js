export const getElement = (html) => {
  const template = document.createElement(`div`);
  template.innerHTML = html;
  return template;
};

export const changeView = (view) => {
  const parent = document.querySelector(`main.central`);
  parent.innerHTML = ``;
  parent.appendChild(view.element);
}
