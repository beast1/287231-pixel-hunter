import {getElement} from "./utils";
import {getPoints} from "./data/game-data";
import updateWindow from "./updateWindow";
import greetingElem from "./greeting/greeting";

import getHeaderTemplate from "./header";
import getFooterTemplate from "./footer";

const stats = (state) => {
  const finalResult = getPoints(state.history, state.lives);
  const isWin = !(finalResult === -1);
  const html = `
      ${getHeaderTemplate()}
      <div class="result">
        <h1>${isWin ? `Победа!` : `Поражение`}</h1>
        <table class="result__table">
          <tr>
            <td class="result__number">1.</td>
            <td colspan="2">
              <ul class="stats">
                ${state.history.map((answer) => `<li class="stats__result stats__result--${answer}"></li>`).join(``)}
              </ul>
            </td>
            <td class="result__points">×&nbsp;100</td>
            <td class="result__total">${isWin ? state.points : `Fail`}</td><!--900-->
          </tr>
          ${isWin ?
            `
              <!--<tr>
              <td></td>
              <td class="result__extra">Бонус за скорость:</td>
              <td class="result__extra">1&nbsp;<span class="stats__result stats__result--fast"></span></td>
              <td class="result__points">×&nbsp;50</td>
              <td class="result__total">50</td>
              </tr>-->
              <tr>
              <td></td>
              <td class="result__extra">Бонус за жизни:</td>
              <td class="result__extra">${state.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
              <td class="result__points">×&nbsp;50</td>
              <td class="result__total">${50 * state.lives}</td>
              </tr>
              <!--<tr>
              <td></td>
              <td class="result__extra">Штраф за медлительность:</td>
              <td class="result__extra">2&nbsp;<span class="stats__result stats__result--slow"></span></td>
              <td class="result__points">×&nbsp;50</td>
              <td class="result__total">-100</td>
              </tr>-->
            `
            :
            ``
          }
          <tr>
            <td colspan="5" class="result__total  result__total--final">${isWin ? finalResult : state.points}</td>
          </tr>
        </table>
        <!--<table class="result__table">
          <tr>
            <td class="result__number">2.</td>
            <td>
              <ul class="stats">
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--correct"></li>
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--wrong"></li>
              </ul>
            </td>
            <td class="result__total"></td>
            <td class="result__total  result__total--final">fail</td>
          </tr>
        </table>
        <table class="result__table">
          <tr>
            <td class="result__number">3.</td>
            <td colspan="2">
              <ul class="stats">
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--correct"></li>
                <li class="stats__result stats__result--wrong"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--slow"></li>
                <li class="stats__result stats__result--unknown"></li>
                <li class="stats__result stats__result--fast"></li>
                <li class="stats__result stats__result--unknown"></li>
              </ul>
            </td>
            <td class="result__points">×&nbsp;100</td>
            <td class="result__total">900</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">2&nbsp;<span class="stats__result stats__result--alive"></span></td>
            <td class="result__points">×&nbsp;50</td>
            <td class="result__total">100</td>
          </tr>
          <tr>
            <td colspan="5" class="result__total  result__total--final">950</td>
          </tr>
        </table>-->
      </div>
      ${getFooterTemplate()}
    `;

  const statsElem = getElement(html);
  const btnBack = statsElem.querySelector(`.back`);

  btnBack.addEventListener(`click`, () => updateWindow(greetingElem));
  return statsElem;
}

export default stats;
