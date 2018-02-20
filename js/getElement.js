const getElement = (html) => {
  const parent = document.querySelector(`main.central`);
  const template = document.createElement(`template`);
  template.innerHTML = html;
  parent.innerHTML = ``;
  parent.appendChild(template.content.cloneNode(true));
};

export default getElement;
