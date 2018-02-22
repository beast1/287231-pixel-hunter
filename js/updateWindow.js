const updateWindow = (element) => {
  const parent = document.querySelector(`main.central`);
  parent.innerHTML = ``;
  parent.appendChild(element);
};

export default updateWindow;
