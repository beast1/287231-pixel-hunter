export const LevelTypes = {
  DOUBLE: `double`,
  TRIPLE: `triple`,
  WIDE: `wide`
};

const initialState = () => {
  return {
    level: 0,
    lives: 3,
    points: 0,
    history: new Array(10).fill(`unknown`)
  };
};

const getLevels = () => {
  const levelTemplates = [{
    levelType: LevelTypes.DOUBLE,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: [{
      image: {
        src: `http://placehold.it/468x458`,
        width: 468,
        height: 458
      },
      type: `photo`
    }, {
      image: {
        src: `http://placehold.it/468x458`,
        width: 468,
        height: 458
      },
      type: `paint`
    }]
  }, {
    levelType: LevelTypes.TRIPLE,
    task: `Найдите рисунок среди изображений`,
    options: [{
      image: {
        src: `http://placehold.it/304x455`,
        width: 304,
        height: 455
      },
      type: `photo`
    }, {
      image: {
        src: `http://placehold.it/304x455`,
        width: 304,
        height: 455
      },
      type: `paint`
    }, {
      image: {
        src: `http://placehold.it/304x455`,
        width: 304,
        height: 455
      },
      type: `photo`
    }]
  }, {
    levelType: LevelTypes.WIDE,
    task: `Угадай, фото или рисунок?`,
    options: [{
      image: {
        src: `http://placehold.it/705x455`,
        width: 705,
        height: 455
      },
      type: `photo`
    }]
  }];
  let levels = [];
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  for (let i = 0; i < 10; i++) {
    levels.push(levelTemplates[getRandomInt(0, 3)]);
  }
  console.log(levels);
  return levels;
};

// в проде будет запрос к БД
const levels = getLevels();

const createGetPoints = () => {
  const LIVES_PRICE = 50;
  const answerTypePrices = {
    unknown: 0,
    wrong: 0,
    slow: 50,
    correct: 100,
    fast: 150
  };
  const answerTypesArr = Object.keys(answerTypePrices);
  const getPoints = (answersArr, livesCount) => {
    if (livesCount === -1) {
      return -1;
    }
    let points = LIVES_PRICE * livesCount;
    for (let i = 0; i < answersArr.length; i++) {
      for (let j = 0; j < answerTypesArr.length; j++) {
        if (answerTypesArr[j] === answersArr[i]) {
          points += answerTypePrices[answerTypesArr[j]];
        }
      }
    }
    return points;
  };
  return getPoints;
};
const getPoints = createGetPoints();

const getTimer = (value) => {
  if (value < 0) {
    throw new Error(`time remaining cannot be negative`);
  }

  if (typeof value !== `number`) {
    throw new Error(`time is not numeric`);
  }

  return {
    value,
    tick() {
      return value === 0 ? `time is out` : getTimer(value - 1);
    }
  };
};

export {getPoints, getTimer, initialState, levels};
