import {MAX_ANSWERS_LENGTH} from "./game-data";

const getStats = (gameHistory) => {
  return `
      <ul class="stats">
        ${gameHistory
      .map((it) =>
        `<li class="stats__result stats__result--${it}"></li>`)
      .concat(new Array(MAX_ANSWERS_LENGTH - gameHistory.length)
          .fill(`<li class="stats__result stats__result--unknown"></li>`))
      .join(``)}
      </ul>`;
};

export default getStats;
