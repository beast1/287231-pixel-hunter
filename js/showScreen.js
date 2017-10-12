const showScreen = (child) => {
  const mainElement = document.querySelector(`.central`);

  mainElement.innerHTML = ``;
  mainElement.appendChild(child);
};

export default showScreen;
