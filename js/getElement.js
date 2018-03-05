const getElement = (html) => {
  const template = document.createElement(`div`);
  template.innerHTML = html;
  return template;
};

export default getElement;
