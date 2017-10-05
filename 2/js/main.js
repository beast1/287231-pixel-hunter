const altKeyCode = 18;
const leftArrowKeyCode = 37;
const rightArrowKeyCode = 39;

let activeTemplate = -1;
let codes = [];

const mainElement = document.querySelector(`.central`);
const templates = Array.from(document.querySelectorAll(`template`));

const showScreen = (id) => {
  const template = templates[id].content.cloneNode(true);

  for (let i = mainElement.children.length - 1; i >= 0; i -= 1) {
    mainElement.removeChild(mainElement.children[i]);
  }

  mainElement.appendChild(template);
};

const isInArray = (element, array) =>
  array.indexOf(element) !== -1;

document.addEventListener(`keydown`, (evt) => {
  if (!isInArray(evt.keyCode, codes)) {
    codes.push(evt.keyCode);
  }

  if (codes[0] === altKeyCode && codes[1] === rightArrowKeyCode) {
    switch (activeTemplate) {
      case -1:
        activeTemplate = 0;
        showScreen(activeTemplate);
        break;
      case templates.length - 1:
        return;
      default:
        activeTemplate += 1;
        showScreen(activeTemplate);
    }
  } else if (codes[0] === altKeyCode && codes[1] === leftArrowKeyCode) {
    switch (activeTemplate) {
      case -1:
        activeTemplate = 0;
        showScreen(activeTemplate);
        break;
      case 0:
        return;
      default:
        activeTemplate -= 1;
        showScreen(activeTemplate);
    }
  }
});

document.addEventListener(`keyup`, () => {
  codes = [];
});
