(function () {
'use strict';

const getElementFromTemplate = (layout) => {
  const div = document.createElement(`div`);
  div.innerHTML = layout;

  return div;
};

const mainElement = document.querySelector(`.central`);

const showScreen = (view) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(view.element);
};

class AbstractView {
  get template() {
    throw new Error(`Template for the view is not defined`);
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {

  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}

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

class IntroView extends AbstractView {
  get template() {
    return `<div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>${footer}`.trim();
  }

  bind() {
    const asterisk = this.element.querySelector(`.intro__asterisk`);

    asterisk.addEventListener(`click`, this.onClick);
  }

  onClick() {}
}

class IntroScreen {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    this.view.onClick = () => {
      Application.showGreeting();
    };

    showScreen(this.view);
  }
}

var introScreen = new IntroScreen();

class GreetingView extends AbstractView {
  get template() {
    return `<div class="greeting central--blur">
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
  ${footer}`.trim();
  }

  bind() {
    const rightArrow = this.element.querySelector(`.greeting__continue`);

    rightArrow.addEventListener(`click`, this.onClick);
  }

  onClick() {
  }
}

class GreetingScreen {
  constructor() {
    this.view = new GreetingView();
  }

  init() {
    this.view.onClick = () => {
      Application.showRules();
    };

    showScreen(this.view);
  }
}

var greetingScreen = new GreetingScreen();

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
      ${new Array(3 - data.lives)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
      ${new Array(data.lives)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
      </div>`;

};

class RulesView extends AbstractView {
  get template() {
    return `${getHeader()}
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
  ${footer}`.trim();
  }

  bind() {
    const button = this.element.querySelector(`.rules__button`);
    button.disabled = true;
    const input = this.element.querySelector(`.rules__input`);
    const back = this.element.querySelector(`.back`);

    back.addEventListener(`click`, this.onBack);

    input.addEventListener(`change`, () => {
      button.disabled = !input.value;
    });

    button.addEventListener(`click`, this.onStart);
  }

  onBack() {}

  onStart() {}
}

class RulesScreen {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    this.view.onBack = () => {
      Application.showGreeting();
    };

    this.view.onStart = () => {
      Application.startGame();
    };

    showScreen(this.view);
  }
}

var rulesScreen = new RulesScreen();

const LIFE_WORTH = 50;
const MAX_LIFES = 3;
const MAX_ANSWERS_LENGTH = 10;
const FAST_TIME = 20;
const SLOW_TIME = 10;
const INITIAL_TIME = 30;

// const TIMER_STOP = `Time is out`;

const AnswerType = {
  FAST: `fast`,
  SLOW: `slow`,
  CORRECT: `correct`,
  WRONG: `wrong`
};

const LevelType = {
  SINGLE: `single`,
  DOUBLE: `double`,
  TRIPLE: `triple`
};

const Result = {
  VICTORY: `Победа!`,
  LOSE: `Поражение`
};

const LevelClass = {
  [LevelType.DOUBLE]: `game__content`,
  [LevelType.SINGLE]: `game__content game__content--wide`,
  [LevelType.TRIPLE]: `game__content game__content--triple`
};

const ImageType = {
  PAINT: `paint`,
  PHOTO: `photo`
};

const getInitialState = () => {
  return {
    level: 0,
    lives: 3,
    time: 30
  };
};

const getInitialHistory = () => {
  return [];
};

const levels = [
  {
    description: `Найдите рисунок среди изображений`,
    type: LevelType.TRIPLE,
    expect: ImageType.PAINT,
    options: [
      {
        type: ImageType.PHOTO,
        image: `http://i.imgur.com/1KegWPz.jpg`
      },
      {
        type: ImageType.PHOTO,
        image: `https://i.imgur.com/DiHM5Zb.jpg`
      },
      {
        type: ImageType.PAINT,
        image: `https://k42.kn3.net/D2F0370D6.jpg`
      },
    ]
  },
  {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    type: LevelType.DOUBLE,
    options: [
      {
        type: ImageType.PAINT,
        image: `http://www.fresher.ru/manager_content/images/fotorealistichnye-kartiny-italyanca-mikele-del-kampo/big/18.jpg`
      },
      {
        type: ImageType.PHOTO,
        image: `http://www.kartinki.me/images/201312/kartinki.me_16611.jpg`
      }
    ]
  },
  {
    description: `Угадай, фото или рисунок?`,
    type: LevelType.SINGLE,
    options: [
      {
        type: ImageType.PHOTO,
        image: `http://www.fresher.ru/manager_content/images/fotorealistichnye-kartiny-italyanca-mikele-del-kampo/big/18.jpg`
      }
    ]
  },
  {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    type: LevelType.DOUBLE,
    options: [
      {
        type: ImageType.PAINT,
        image: `https://k32.kn3.net/5C7060EC5.jpg`
      },
      {
        type: ImageType.PHOTO,
        image: `http://i.imgur.com/DKR1HtB.jpg`
      },
    ]
  },
  {
    description: `Угадай, фото или рисунок?`,
    type: LevelType.SINGLE,
    options: [
      {
        type: ImageType.PAINT,
        image: `https://k42.kn3.net/CF42609C8.jpg`
      }
    ]
  },
  {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    type: LevelType.DOUBLE,
    options: [
      {
        type: ImageType.PAINT,
        image: `https://k42.kn3.net/CF42609C8.jpg`
      },
      {
        type: ImageType.PHOTO,
        image: `http://i.imgur.com/1KegWPz.jpg`
      },
    ]
  },
  {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    type: LevelType.DOUBLE,
    options: [
      {
        type: ImageType.PAINT,
        image: `https://k42.kn3.net/CF42609C8.jpg`
      },
      {
        type: ImageType.PHOTO,
        image: `http://i.imgur.com/1KegWPz.jpg`
      },
    ]
  },
  {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    type: LevelType.DOUBLE,
    options: [
      {
        type: ImageType.PAINT,
        image: `https://k42.kn3.net/CF42609C8.jpg`
      },
      {
        type: ImageType.PHOTO,
        image: `http://i.imgur.com/1KegWPz.jpg`
      },
    ]
  },
  {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    type: LevelType.DOUBLE,
    options: [
      {
        type: ImageType.PAINT,
        image: `https://k42.kn3.net/CF42609C8.jpg`
      },
      {
        type: ImageType.PHOTO,
        image: `http://i.imgur.com/1KegWPz.jpg`
      },
    ]
  },
  {
    description: `Угадайте для каждого изображения фото или рисунок?`,
    type: LevelType.DOUBLE,
    expect: ``,
    options: [
      {
        type: ImageType.PAINT,
        image: `https://k42.kn3.net/CF42609C8.jpg`
      },
      {
        type: ImageType.PHOTO,
        image: `http://i.imgur.com/1KegWPz.jpg`
      },
    ]
  },
];

const getGame = (state, history) => {
  return {
    state,
    history,
  };
};

const PointsForAnswers = {
  [AnswerType.FAST]: 150,
  [AnswerType.SLOW]: 50,
  [AnswerType.CORRECT]: 100,
  [AnswerType.WRONG]: 0
};

const setLives = (game, lives) => {
  const newGame = getGame(game.state, game.history);
  newGame.state.lives = lives;
  return newGame;
};

const countScore = (answers, lives) => {
  if (answers.length < MAX_ANSWERS_LENGTH || lives < 0) {
    return -1;
  }

  if (answers.filter((it) => it === AnswerType.WRONG).length !== (MAX_LIFES - lives)) {
    throw new Error(`impossible input combination`);
  }

  const initialValue = lives * LIFE_WORTH;

  return answers.reduce((sum, answer) => {
    if (typeof PointsForAnswers[answer] !== `number`) {
      throw new Error(`wrong answer type`);
    }

    return sum + PointsForAnswers[answer];
  }, initialValue);
};

// export const getTimer = (value) => {
//   if (value < 0) {
//     throw new Error(`time remaining cannot be negative`);
//   }
//
//   if (typeof value !== `number`) {
//     throw new Error(`time is not numeric`);
//   }
//
//   return {
//     value,
//     tick() {
//       return value === 0 ? TIMER_STOP : getTimer(value - 1);
//     }
//   };
// };

const tick = (game) => {
  const newGame = getGame(game.state, game.history);

  if (newGame.state.time === 0) {
    return false;
  }

  newGame.state.time -= 1;

  return newGame;
};

const changeGameState = (game, condition) => {
  let newGame = getGame(game.state, game.history);

  if (condition) {
    if (newGame.state.time < SLOW_TIME) {
      newGame.history.push(AnswerType.SLOW);
    } else if (newGame.state.time > FAST_TIME) {
      newGame.history.push(AnswerType.FAST);
    } else {
      newGame.history.push(AnswerType.CORRECT);
    }
  } else {
    newGame.history.push(AnswerType.WRONG);
    newGame = setLives(newGame, newGame.state.lives - 1);
  }

  newGame.state.level += 1;
  newGame.state.time = INITIAL_TIME;

  return newGame;
};

const getLevel = (level) => {
  return levels[level];
};

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

const drawLevel = (levelData, history) => {
  return `<p class="game__task">${levelData.description}</p>
    <form class="${LevelClass[levelData.type]}">
    ${levelData.options.map((it, i) => {
    if (levelData.type === LevelType.TRIPLE) {
      return `<div class="game__option">
        <img src="${it.image}" alt="Option" width="304" height="455">
      </div>`;
    }

    return `<div class="game__option">
        <img src="${it.image}" alt="Option">
        <label class="game__answer  game__answer--photo">
          <input name="question${i + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question${i + 1}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`;
  }).join(``)}
    </form>${getStats(history)}`;
};

class LevelView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
    this.level = getLevel(this.game.state.level);
  }

  get template() {
    return `${getHeader(this.game.state)}
    ${drawLevel(this.level, this.game.history)}
    ${footer}`;
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);
    const fields = form.querySelectorAll(`.game__option`);
    const back = this.element.querySelector(`.back`);

    back.addEventListener(`click`, this.onBack);

    form.addEventListener(`click`, (evt) => {
      const radios = Array.from(form.querySelectorAll(`input[type="radio"]:checked`));
      const answers = this.level.options.map((it) =>
        it.type);

      if (this.level.type === LevelType.TRIPLE) {
        if (evt.target.classList.contains(`game__option`)) {
          const index = Array.from(evt.target.parentNode.children).indexOf(evt.target);
          answers[index] = this.level.expect;

          this.onAnswer(answers);
        }
      } else if (radios.length === fields.length) {
        const answer = radios.map((it) =>
          it.value);
        this.onAnswer(answer);
      }
    });
  }

  onBack() {}

  onAnswer(answer) {
    return answer;
  }

  updateTime(time) {
    this.timeElement = this.element.querySelector(`.game__timer`);
    this.timeElement.textContent = time;
  }
}

class GameScreen {
  init(game) {
    this.game = game;
    this.view = new LevelView(game);

    this.view.onAnswer = (answer) => {
      this.stopTimer();

      const isCorrect = answer.every((it, i) => it === getLevel(game.state.level).options[i].type);
      const newGame = changeGameState(game, isCorrect);

      this.toggleScreens(newGame);
    };

    this.view.onBack = () => {
      this.stopTimer();
      Application.showGreeting();
    };

    showScreen(this.view);

    this.timer = setTimeout(() => this.tick(), 1000);
  }

  tick() {
    const state = tick(this.game);

    if (!state) {
      const newGame = changeGameState(this.game, false);

      this.stopTimer();
      this.toggleScreens(newGame);
    } else {
      this.view.updateTime(state.state.time);
      this.timer = setTimeout(() => this.tick(), 1000);
    }
  }

  toggleScreens(game) {
    if (game.state.level === MAX_ANSWERS_LENGTH || game.state.lives < 0) {
      Application.showStats(game);
    } else {
      Application.startGame(game);
    }
  }

  stopTimer() {
    clearTimeout(this.timer);
  }
}

var gameScreen = new GameScreen();

const EXTRA_POINTS = 50;
const BASE_POINTS = 100;

const drawStats = (game, score) => {
  const STATS_BAR = getStats(game.history);

  const countScores = (history) =>
    history.reduce((obj, answer) => {
      return Object.assign(obj, {[answer]: obj[answer] ? ++obj[answer] : 1});
    }, {});

  const answers = countScores(game.history);

  const CORRECT_ANSWERS = MAX_ANSWERS_LENGTH - (answers[AnswerType.WRONG] || 0);
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

class StatsView extends AbstractView {
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

class StatsScreen {
  init(game) {
    const score = countScore(game.history, game.state.lives);

    this.view = new StatsView(game, score);

    this.view.onBack = () => {
      Application.showGreeting();
    };

    showScreen(this.view);
  }
}

var statsScreen = new StatsScreen();

const ControllerId = {
  INTRO: ``,
  GREETING: `greeting`,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`
};

const Route = {
  [ControllerId.INTRO]: introScreen,
  [ControllerId.GREETING]: greetingScreen,
  [ControllerId.RULES]: rulesScreen,
  [ControllerId.GAME]: gameScreen,
  [ControllerId.STATS]: statsScreen
};

const saveState = (state) => {
  return JSON.stringify(state);
};

const loadState = (dataString) => {
  try {
    return JSON.parse(dataString);
  } catch (e) {
    return getGame(getInitialState(), getInitialHistory());
  }
};

class Application {
  static init() {
    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);

      this.changeHash(id, data);
    };

    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = Route[id];

    if (controller) {
      if (!data) {
        controller.init();
      } else {
        controller.init(loadState(data));
      }
    }
  }

  static showIntro() {
    location.hash = ControllerId.INTRO;
  }

  static showGreeting() {
    location.hash = ControllerId.GREETING;
  }

  static showRules() {
    location.hash = ControllerId.RULES;
  }

  static startGame(game = getGame(getInitialState(), getInitialHistory())) {
    location.hash = `${ControllerId.GAME}?${saveState(game)}`;
  }

  static showStats(game) {
    location.hash = `${ControllerId.STATS}?${saveState(game)}`;
  }
}

Application.init();

Application.showIntro();

}());

//# sourceMappingURL=main.js.map
