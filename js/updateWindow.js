const updateWindow = (element, clearParent = `clear`) => {
  const parent = document.querySelector(`main.central`);
  if (clearParent === `clear`) {
    parent.innerHTML = ``;
  }
  parent.appendChild(element);
};

export default updateWindow;
