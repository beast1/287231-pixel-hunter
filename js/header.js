const getHeaderTemplate = (state) => {
  const defaultHtml = `
      <header class="header">
        <div class="header__back">
          <button class="back">
            <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
            <img src="img/logo_small.svg" width="101" height="44">
          </button>
        </div>
      </header>
    `;
  if (typeof state === `undefined`) {
    return defaultHtml;
  }
  const stateHtml = `
    ${defaultHtml}
    <h1 class="game__timer">lvl:${state.level} pts:${state.points}</h1><!--NN-->
    <div class="game__lives">
      ${new Array(3 - state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
      ${state.lives >= 0 ? new Array(state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``) : ``}
    </div>
  `;
  return stateHtml;
};

export default getHeaderTemplate;
