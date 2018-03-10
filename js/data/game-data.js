export const LevelTypes = {
  DOUBLE: `double`,
  TRIPLE: `triple`,
  WIDE: `wide`
};

export const InitialState = {
  LEVEL: 0,
  LIVES: 3,
  POINTS: 0,
  TIME: 30
};

export const initialState = () => {
  return {
    level: InitialState.LEVEL,
    lives: InitialState.LIVES,
    points: InitialState.POINTS,
    time: InitialState.TIME,
    history: new Array(10).fill(`unknown`)
  };
};

const getLevels = () => {
  const levelTemplates = [{
    levelType: LevelTypes.DOUBLE,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: [{
      image: {
        src: `http://www.kartinki.me/images/201312/kartinki.me_16611.jpg`,
        width: 468,
        height: 458
      },
      type: `photo`
    }, {
      image: {
        src: `http://www.fresher.ru/manager_content/images/fotorealistichnye-kartiny-italyanca-mikele-del-kampo/big/18.jpg`,
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
        src: `http://i.imgur.com/1KegWPz.jpg`,
        width: 304,
        height: 455
      },
      type: `photo`
    }, {
      image: {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        width: 304,
        height: 455
      },
      type: `paint`
    }, {
      image: {
        src: `https://i.imgur.com/DiHM5Zb.jpg`,
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
        src: `http://www.fresher.ru/manager_content/images/fotorealistichnye-kartiny-italyanca-mikele-del-kampo/big/18.jpg`,
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
export const levels = getLevels();

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
export const getPoints = createGetPoints();

export const resize = () => {

};
