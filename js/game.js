import {getElementFromTemplate, showScreen} from "./utils";
import greeting from "./greeting";
import getHeader from "./header";
import footer from "./footer";
import {LevelType, levelChange} from "./game-data";
import getStats from "./game-stats";
import getLevel from "./level";
import getStatsElement from "./stats";

const getElement = (gameData) => {
  const level = gameData.levels[gameData.state.level];
  const options = level.options;
  const answers = options.map((it) =>
    it.type);

  const element = getElementFromTemplate(`${getHeader(gameData.state)}
  <div class="game">
    ${getLevel(level)}
    <div class="stats">
      ${getStats(gameData.history)}    
    </div>
  </div>
  ${footer}`);

  const form = element.querySelector(`.game__content`);
  const fields = form.querySelectorAll(`.game__option`);
  const back = element.querySelector(`.back`);

  back.addEventListener(`click`, () => {
    // if (confirm(`Вы уверены? Текущий прогресс будет потерян`)) {
    showScreen(greeting);
    // }
  });

  if (level.type === LevelType.TRIPLE) {
    form.addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`game__option`)) {
        const currentAnswer = answers[Array.from(evt.target.parentNode.children).indexOf(evt.target)];
        const condition = level.expect === currentAnswer;

        levelChange(gameData, condition, getElement, getStatsElement);
      }
    });
  } else {
    form.addEventListener(`change`, () => {
      const radios = Array.from(form.querySelectorAll(`input[type="radio"]:checked`));
      const condition = radios.every((it, i) =>
        it.value === options[i].type);

      if (radios.length === fields.length) {
        levelChange(gameData, condition, getElement, getStatsElement);
      }
    });
  }

  return element;
};

export default getElement;
