const LIFE_WORTH = 50;
const MAX_LIFES = 3;
export const MAX_ANSWERS_LENGTH = 10;
const FAST_TIME = 20;
const SLOW_TIME = 10;
const INITIAL_TIME = 30;

// const TIMER_STOP = `Time is out`;

export const AnswerType = {
  FAST: `fast`,
  SLOW: `slow`,
  CORRECT: `correct`,
  WRONG: `wrong`
};

export const LevelType = {
  SINGLE: `single`,
  DOUBLE: `double`,
  TRIPLE: `triple`
};

export const Result = {
  VICTORY: `Победа!`,
  LOSE: `Поражение`
};

export const LevelClass = {
  [LevelType.DOUBLE]: `game__content`,
  [LevelType.SINGLE]: `game__content game__content--wide`,
  [LevelType.TRIPLE]: `game__content game__content--triple`
};

const ImageType = {
  PAINT: `paint`,
  PHOTO: `photo`
};

export const getInitialState = () => {
  return {
    level: 0,
    lives: 3,
    time: 30
  };
};

export const getInitialHistory = () => {
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

export const getGame = (state, history) => {
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

export const countScore = (answers, lives) => {
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

export const tick = (game) => {
  const newGame = getGame(game.state, game.history);

  if (newGame.state.time === 0) {
    return false;
  }

  newGame.state.time -= 1;

  return newGame;
};

export const changeGameState = (game, condition) => {
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

export const getLevel = (level) => {
  return levels[level];
};
