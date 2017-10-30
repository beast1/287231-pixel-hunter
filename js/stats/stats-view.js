import AbstractView from "../view";
import {Result, AnswerType, MAX_ANSWERS_LENGTH} from "../data/game-data";
import footer from "../game/footer/footer";
import getHeader from "../game/header/header";
import getStats from "../game/stats/game-stats";

const EXTRA_POINTS = 50;
const BASE_POINTS = 100;

const drawStats = (game, score) => {
  const STATS_BAR = getStats(game.history);

  const countScores = (history) =>
    history.reduce((obj, answer) => {
      return Object.assign(obj, {[answer]: obj[answer] ? ++obj[answer] : 1});
    }, {});

  const answers = countScores(game.history);

  const CORRECT_ANSWERS = MAX_ANSWERS_LENGTH - answers[AnswerType.WRONG];
  const FAST_ANSWERS = answers[AnswerType.FAST];
  const SLOW_ANSWERS = answers[AnswerType.SLOW];

  const tableContent = [];

  if (score < 0) {
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
        <td colspan="5" class="result__total  result__total--final">${score}</td>
      </tr>`);
  }

  return `<div class="result">
    <h1>${score < 0 ? Result.LOSE : Result.VICTORY}</h1>
    <table class="result__table">${tableContent.join(``)}</table>
  </div>`;
};

export default class StatsView extends AbstractView {
  constructor(game, score) {
    super();
    this.game = game;
    this.score = score;
  }

  get template() {
    return `${getHeader()}
    ${drawStats(this.game, this.score)}
    ${footer}`;
  }

  bind() {
    const back = this.element.querySelector(`.back`);

    back.addEventListener(`click`, this.onBack);
  }

  onBack() {}
}
