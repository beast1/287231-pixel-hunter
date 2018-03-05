import getElement from "./getElement";
import updateWindow from "./updateWindow";
import greetingElem from "./greeting";

import getFooterTemplate from "./footer";

const html = `
  <div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>
  ${getFooterTemplate()}
  `;

const introElem   = getElement(html);
const btnContinue = introElem.querySelector(`.intro__asterisk`);
btnContinue.addEventListener(`click`, () => {
  updateWindow(greetingElem);
});

export default introElem;
