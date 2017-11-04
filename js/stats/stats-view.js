import AbstractView from "../view";
import {AnswerType, MAX_ANSWERS_LENGTH} from "../data/game-data";
import footer from "../game/footer/footer";
import getHeader from "../game/header/header";
import getStats from "../game/stats/game-stats";

const EXTRA_POINTS = 50;
const BASE_POINTS = 100;

const countScores = (history) =>
  history.reduce((obj, answer) => {
    return Object.assign(obj, {[answer]: obj[answer] ? ++obj[answer] : 1});
  }, {});

const renderResults = (result, index) => {
  const statsBar = getStats(result.history);
  const answers = countScores(result.history);
  const correctAnswers = MAX_ANSWERS_LENGTH - (answers[AnswerType.WRONG] || 0);
  const fastAnswers = answers[AnswerType.FAST];
  const slowAnswers = answers[AnswerType.SLOW];
  const tableContent = [];

  if (result.score < 0) {
    tableContent.push(`<tr>
        <td class="result__number">${index + 1}</td>
        <td>${statsBar}</td>
        <td class="result__total"></td>
        <td class="result__total result__total--final">fail</td>
      </tr>`);
  } else {
    tableContent.push(`<tr>
        <td class="result__number">${index + 1}</td>
        <td colspan="2">
          ${statsBar}
        </td>
        <td class="result__points">×&nbsp;${BASE_POINTS}</td>
        <td class="result__total">${BASE_POINTS * correctAnswers}</td>
        </tr>`);

    if (fastAnswers > 0) {
      tableContent.push(`<tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${fastAnswers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${EXTRA_POINTS}</td>
        <td class="result__total">${fastAnswers * EXTRA_POINTS}</td>
      </tr>`);
    }

    if (result.state.lives > 0) {
      tableContent.push(`<tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${result.state.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${EXTRA_POINTS}</td>
        <td class="result__total">${result.state.lives * EXTRA_POINTS}</td>
      </tr>`);
    }

    if (slowAnswers > 0) {
      tableContent.push(`<tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${slowAnswers}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;${EXTRA_POINTS}</td>
        <td class="result__total">-${slowAnswers * EXTRA_POINTS}</td>
      </tr>`);
    }

    tableContent.push(`<tr>
        <td colspan="5" class="result__total  result__total--final">${result.score}</td>
      </tr>`);
  }

  return `<table class="result__table">${tableContent.join(``)}</table>`;
};


export default class StatsView extends AbstractView {
  get template() {
    return `${getHeader()}
    <div class="result">
      <h2>Загрузка результатов</h2>
    </div>
    ${footer}`;
  }

  updateResults(results, currentResult) {
    const resultsElement = this.element.querySelector(`.result`);

    resultsElement.innerHTML = `<h1>${currentResult}</h1>
        ${results.reverse().map((it, i) => renderResults(it, i)).join(``)}`;
  }

  bind() {
    const back = this.element.querySelector(`.back`);

    back.addEventListener(`click`, this.onBack);
  }

  onBack() {}
}
