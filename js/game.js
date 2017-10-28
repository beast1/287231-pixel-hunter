import {getElementFromTemplate, showScreen} from "./utils";
import greeting from "./greeting";
import getHeader from "./header";
import footer from "./footer";
import {AnswerTypes, game} from "./game-data";
import getStats from "./game-stats";
import getLevel from "./level";
import {getStatsElement} from "./stats";

const getLayout = (gameData) => {
  const level = gameData.levels[gameData.state.level];
  const options = Array.from(level.options);
  const answers = options.map((it) =>
    it.type);

  let element = getElementFromTemplate(`${getHeader(gameData.state)}
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
    showScreen(greeting);
  });

  if (level.type === `TRIPLE`) {
    form.addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`game__option`)) {
        if (level.expect === answers[Array.from(evt.target.parentNode.children).indexOf(evt.target)]) {
          gameData.history.push(AnswerTypes.CORRECT);
        } else {
          gameData.state.lives -= 1;
          gameData.history.push(AnswerTypes.WRONG);
        }

        if (gameData.state.level === 10 || gameData.state.lives < 0) {
          showScreen(getStatsElement(gameData));
        } else {
          game.state.level += 1;
          element = getLayout(game);
          showScreen(element);
        }
      }
    });
  } else {
    form.addEventListener(`change`, () => {
      const radios = form.querySelectorAll(`input[type="radio"]:checked`);

      if (radios.length === fields.length) {
        let answer = 0;

        radios.forEach((it, i) => {
          if (it.value === options[i].type) {
            answer++;
          }
        });

        if (answer === radios.length) {
          gameData.history.push(AnswerTypes.CORRECT);
        } else {
          gameData.state.lives -= 1;
          gameData.history.push(AnswerTypes.WRONG);
        }

        if (gameData.state.level === 9 || gameData.state.lives < 0) {
          showScreen(getStatsElement(gameData));
        } else {
          game.state.level += 1;
          element = getLayout(gameData);
          showScreen(element);
        }
      }
    });
  }

  return element;
};

let gameElement = getLayout(game);

showScreen(gameElement);

export default gameElement;
