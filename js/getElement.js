const getElement = (html) => {
//  const template = document.createElement(`template`);
//  template.innerHTML = html;
//  return template.content.cloneNode(true);
  const template = document.createElement(`div`);
  template.innerHTML = html;
  return template;
};

export default getElement;
