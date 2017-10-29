import {getElementFromTemplate, showScreen} from "./utils";
import greeting from "./greeting";
import footer from "./footer";

const layout = `<div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>
  ${footer}`;

const introElement = getElementFromTemplate(layout);
const asterisk = introElement.querySelector(`.intro__asterisk`);

asterisk.addEventListener(`click`, () => {
  showScreen(greeting);
});

export default introElement;
