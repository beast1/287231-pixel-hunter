import {MAX_LIVES} from "../../data/game-data";

const getHeader = (data) => {
  const headerDefault = `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
  </header>`;

  if (typeof data === `undefined`) {
    return headerDefault;
  }
  return `${headerDefault}
    <h1 class="game__timer">${data.time}</h1>
    <div class="game__lives">
      ${new Array(MAX_LIVES - data.lives)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
      ${new Array(data.lives)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
      </div>`;

};

export default getHeader;
