const LIFE_WORTH = 50;
const MAX_LIFES = 3;
const MAX_ANSWERS_LENGTH = 10;
const TIMER_STOP = `Time is out`;

export const AnswerTypes = {
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

export const game = {
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

export const countScore = (answers, lifes) => {
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

export const getTimer = (value) => {
  if (value < 0) {
    throw new Error(`time remaining cannot be negative`);
  }

  if (typeof value !== `number`) {
    throw new Error(`time is not numeric`);
  }

  return {
    value,
    tick() {
      return value === 0 ? TIMER_STOP : getTimer(value - 1);
    }
  };
};


