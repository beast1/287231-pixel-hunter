import {getElementFromTemplate, showScreen} from "./utils";
import greeting from "./greeting";
import getHeader from "./header";
import footer from "./footer";
import {countScore, AnswerType} from "./game-data";
import getStats from "./game-stats";

const Results = {
  VICTORY: `Победа!`,
  LOSE: `Поражение`
};

const EXTRA_POINTS = 50;
const BASE_POINTS = 100;

const getResult = (game) => {
  const RESULT = countScore(game.history, game.state.lives);
  const STATS_BAR = getStats(game.history);

  const countScores = (history) =>
    history.reduce((obj, answer) => {
      return Object.assign(obj, {[answer]: obj[answer] ? ++obj[answer] : 1});
    }, {});

  const answers = countScores(game.history);

  const CORRECT_ANSWERS = answers[AnswerType.CORRECT];
  const FAST_ANSWERS = answers[AnswerType.FAST];
  const SLOW_ANSWERS = answers[AnswerType.SLOW];

  const tableContent = [];

  if (RESULT < 0) {
    tableContent.push(`<tr>
        <td class="result__number"></td>
        <td>${STATS_BAR}</td>
        <td class="result__total"></td>
        <td class="result__total result__total--final">fail</td>
      </tr>`);
  } else {
    tableContent.push(`<tr>
        <td class="result__number"></td>
        <td colspan="2">
          ${STATS_BAR}
        </td>
        <td class="result__points">×&nbsp;${BASE_POINTS}</td>
        <td class="result__total">${BASE_POINTS * CORRECT_ANSWERS}</td>
        </tr>`);

    if (FAST_ANSWERS > 0) {
      tableContent.push(`<tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${FAST_ANSWERS}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${EXTRA_POINTS}</td>
        <td class="result__total">${FAST_ANSWERS * EXTRA_POINTS}</td>
      </tr>`);
    }

    if (game.state.lives > 0) {
      tableContent.push(`<tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${game.state.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${EXTRA_POINTS}</td>
        <td class="result__total">${game.state.lives * EXTRA_POINTS}</td>
      </tr>`);
    }

    if (SLOW_ANSWERS > 0) {
      tableContent.push(`<tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${SLOW_ANSWERS}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;${EXTRA_POINTS}</td>
        <td class="result__total">-${SLOW_ANSWERS * EXTRA_POINTS}</td>
      </tr>`);
    }

    tableContent.push(`<tr>
        <td colspan="5" class="result__total  result__total--final">${RESULT}</td>
      </tr>`);
  }

  return `<div class="result">
    <h1>${RESULT < 0 ? Results.LOSE : Results.VICTORY}</h1>
    <table class="result__table">${tableContent.join(``)}</table>
  </div>`;
};

export const getStatsElement = (gameData) => {
  const layout = `${getHeader()}
  ${getResult(gameData)}
  ${footer}`;

  const stats = getElementFromTemplate(layout);
  const back = stats.querySelector(`.back`);

  back.addEventListener(`click`, () => {
    showScreen(greeting);
  });

  return stats;
};
