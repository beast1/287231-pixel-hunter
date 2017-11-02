const LIFE_WORTH = 50;
const MAX_LIFES = 3;
export const MAX_ANSWERS_LENGTH = 10;
const FAST_TIME = 20;
const SLOW_TIME = 10;
const INITIAL_TIME = 30;

export const AnswerType = {
  FAST: `fast`,
  SLOW: `slow`,
  CORRECT: `correct`,
  WRONG: `wrong`
};

export const LevelType = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`
};

export const Result = {
  VICTORY: `Победа!`,
  LOSE: `Поражение`
};

export const LevelClass = {
  [LevelType.TWO_OF_TWO]: `game__content`,
  [LevelType.TINDER_LIKE]: `game__content game__content--wide`,
  [LevelType.ONE_OF_THREE]: `game__content game__content--triple`
};

// const ImageType = {
//   PAINTING: `painting`,
//   PHOTO: `photo`
// };

const levels = [];

const whenDataIsLoaded = fetch();

whenDataIsLoaded.
    then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 404) {
        return [];
      }

      throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
    }).
    then((data) => console.log(data)).catch((err) => err);

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
