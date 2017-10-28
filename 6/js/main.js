(function () {
'use strict';

const getElementFromTemplate = (layout) => {
  const div = document.createElement(`div`);
  div.innerHTML = layout;

  return div;
};

const showScreen = (child) => {
  const mainElement = document.querySelector(`.central`);

  mainElement.innerHTML = ``;
  mainElement.appendChild(child);
};

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
  } else {
    return `${headerDefault}
    <h1 class="game__timer">${data.time}</h1>
    <div class="game__lives">
      ${new Array(3 - data.lives)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
      ${new Array(data.lives)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
      </div>`;
  }
};

const footer = `<footer class="footer">
    <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
    <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
    <div class="footer__social-links">
      <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
      <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
      <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
      <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
    </div>
  </footer>`;

const LIFE_WORTH = 50;
const MAX_LIFES = 3;
const MAX_ANSWERS_LENGTH = 10;
const AnswerTypes = {
  FAST: `fast`,
  SLOW: `slow`,
  CORRECT: `correct`,
  WRONG: `wrong`
};

const ImageTypes = {
  PAINT: `paint`,
  PHOTO: `photo`
};

const initialState = {
  level: 0,
  lives: 3,
  time: 30
};

const levels = [
  {
    description: `Найдите рисунок среди изображений`,
    type: `TRIPLE`,
    expect: ImageTypes.PAINT,
    options: new Set([
      {
        type: ImageTypes.PHOTO,
        image: `http://i.imgur.com/1KegWPz.jpg`
      },
      {
        type: ImageTypes.PHOTO,
        image: `https://i.imgur.com/DiHM5Zb.jpg`
      },
      {
        type: ImageTypes.PAINT,
        image: `https://k42.kn3.net/D2F0370D6.jpg`
      },
    ])
  },
  {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    type: `DOUBLE`,
    options: new Set([
      {
        type: ImageTypes.PAINT,
        image: `http://www.fresher.ru/manager_content/images/fotorealistichnye-kartiny-italyanca-mikele-del-kampo/big/18.jpg`
      },
      {
        type: ImageTypes.PHOTO,
        image: `http://www.kartinki.me/images/201312/kartinki.me_16611.jpg`
      }
    ])
  },
  {
    description: `Угадай, фото или рисунок?`,
    type: `SINGLE`,
    options: new Set([
      {
        type: ImageTypes.PHOTO,
        image: `http://www.fresher.ru/manager_content/images/fotorealistichnye-kartiny-italyanca-mikele-del-kampo/big/18.jpg`
      }
    ])
  },
  {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    type: `DOUBLE`,
    options: new Set([
      {
        type: ImageTypes.PAINT,
        image: `https://k32.kn3.net/5C7060EC5.jpg`
      },
      {
        type: ImageTypes.PHOTO,
        image: `http://i.imgur.com/DKR1HtB.jpg`
      },
    ])
  },
  {
    description: `Угадай, фото или рисунок?`,
    type: `SINGLE`,
    options: new Set([
      {
        type: ImageTypes.PAINT,
        image: `https://k42.kn3.net/CF42609C8.jpg`
      }
    ])
  },
  {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    type: `DOUBLE`,
    options: new Set([
      {
        type: ImageTypes.PAINT,
        image: `https://k42.kn3.net/CF42609C8.jpg`
      },
      {
        type: ImageTypes.PHOTO,
        image: `http://i.imgur.com/1KegWPz.jpg`
      },
    ])
  },
  {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    type: `DOUBLE`,
    options: new Set([
      {
        type: ImageTypes.PAINT,
        image: `https://k42.kn3.net/CF42609C8.jpg`
      },
      {
        type: ImageTypes.PHOTO,
        image: `http://i.imgur.com/1KegWPz.jpg`
      },
    ])
  },
  {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    type: `DOUBLE`,
    options: new Set([
      {
        type: ImageTypes.PAINT,
        image: `https://k42.kn3.net/CF42609C8.jpg`
      },
      {
        type: ImageTypes.PHOTO,
        image: `http://i.imgur.com/1KegWPz.jpg`
      },
    ])
  },
  {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    type: `DOUBLE`,
    options: new Set([
      {
        type: ImageTypes.PAINT,
        image: `https://k42.kn3.net/CF42609C8.jpg`
      },
      {
        type: ImageTypes.PHOTO,
        image: `http://i.imgur.com/1KegWPz.jpg`
      },
    ])
  },
  {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    type: `DOUBLE`,
    expect: ``,
    options: new Set([
      {
        type: ImageTypes.PAINT,
        image: `https://k42.kn3.net/CF42609C8.jpg`
      },
      {
        type: ImageTypes.PHOTO,
        image: `http://i.imgur.com/1KegWPz.jpg`
      },
    ])
  },
];

const game = {
  state: initialState,
  history: [],
  levels
};

const PointsForAnswers = {
  [AnswerTypes.FAST]: 150,
  [AnswerTypes.SLOW]: 50,
  [AnswerTypes.CORRECT]: 100,
  [AnswerTypes.WRONG]: 0
};

const countScore = (answers, lifes) => {
  if (answers.length < MAX_ANSWERS_LENGTH || lifes < 0) {
    return -1;
  }

  if (answers.filter((it) => it === AnswerTypes.WRONG).length !== (MAX_LIFES - lifes)) {
    throw new Error(`impossible input combination`);
  }

  const initialValue = lifes * LIFE_WORTH;

  return answers.reduce((sum, answer) => {
    if (typeof PointsForAnswers[answer] !== `number`) {
      throw new Error(`wrong answer type`);
    }

    return sum + PointsForAnswers[answer];
  }, initialValue);
};

const MAX_LEVELS = 10;

const getStats = (gameHistory) => {
  return `
      <ul class="stats">
        ${gameHistory
      .map((it) =>
        `<li class="stats__result stats__result--${it}"></li>`)
      .concat(new Array(MAX_LEVELS - gameHistory.length)
          .fill(`<li class="stats__result stats__result--unknown"></li>`))
      .join(``)}
      </ul>`;
};

const LevelTypes = {
  DOUBLE: `game__content`,
  SINGLE: `game__content game__content--wide`,
  TRIPLE: `game__content game__content--triple`
};

const getOptions = (options, levelType) => {
  const optionsSet = Array.from(options);
  return (levelType === `TRIPLE`
    ? optionsSet.map((it) =>
      `<div class="game__option">
        <img src="${it.image}" alt="Option" width="304" height="455">
      </div>`).join(``)
    : optionsSet.map((it, i) =>
      `<div class="game__option">
        <img src="${it.image}" alt="Option">
        <label class="game__answer  game__answer--photo">
          <input name="question${i + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question${i + 1}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`).join(``));
};

const getLevel = (levelData) => {
  return `<p class="game__task">${levelData.description}</p>
    <form class="${LevelTypes[levelData.type]}">
      ${getOptions(levelData.options, levelData.type)}      
    </form>`;
};

const Results = {
  VICTORY: `Победа!`,
  LOSE: `Поражение`
};

const EXTRA_POINTS = 50;
const BASE_POINTS = 100;

const getResult = (game$$1) => {
  const RESULT = countScore(game$$1.history, game$$1.state.lives);
  const STATS_BAR = getStats(game$$1.history);
  const CORRECT_ANSWERS = game$$1.history.filter((it) =>
    it !== AnswerTypes.WRONG).length;
  const FAST_ANSWERS = game$$1.history.filter((it) =>
    it === AnswerTypes.FAST).length;
  const SLOW_ANSWERS = game$$1.history.filter((it) =>
    it === AnswerTypes.SLOW).length;
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

    if (game$$1.state.lives > 0) {
      tableContent.push(`<tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${game$$1.state.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${EXTRA_POINTS}</td>
        <td class="result__total">${game$$1.state.lives * EXTRA_POINTS}</td>
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

const getStatsElement = (gameData) => {
  const layout = `${getHeader()}
  ${getResult(gameData)}
  ${footer}`;

  const stats = getElementFromTemplate(layout);
  const back = stats.querySelector(`.back`);

  back.addEventListener(`click`, () => {
    showScreen(greetingElement);
  });

  return stats;
};

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
    showScreen(greetingElement);
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

const layout$2 = `${getHeader()}
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit">Go!</button>
    </form>
  </div>
  ${footer}`;

const rulesElement = getElementFromTemplate(layout$2);
const button = rulesElement.querySelector(`.rules__button`);
button.disabled = true;
const input = rulesElement.querySelector(`.rules__input`);
const back = rulesElement.querySelector(`.back`);

back.addEventListener(`click`, () => {
  showScreen(greetingElement);
});


input.addEventListener(`change`, () => {
  button.disabled = !input.value;
});

button.addEventListener(`click`, () => {
  showScreen(gameElement);
});

const layout$1 = `<div class="greeting central--blur">
    <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
    <h1 class="greeting__asterisk">*</h1>
    <div class="greeting__challenge">
      <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
      <p>Правила игры просты.<br>
        Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
        Задача кажется тривиальной, но не думай, что все так просто.<br>
        Фотореализм обманчив и коварен.<br>
        Помни, главное — смотреть очень внимательно.</p>
    </div>
    <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
  </div>
  ${footer}`;

const greetingElement = getElementFromTemplate(layout$1);
const rightArrow = greetingElement.querySelector(`.greeting__continue`);

rightArrow.addEventListener(`click`, () => {
  showScreen(rulesElement);
});

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
  showScreen(greetingElement);
});

window.addEventListener(`load`, () => {
  showScreen(introElement);
});

}());

//# sourceMappingURL=main.js.map
