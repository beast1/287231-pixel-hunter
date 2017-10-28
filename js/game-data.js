const LIFE_WORTH = 50;
const MAX_LIFES = 3;
const MAX_ANSWERS_LENGTH = 10;
const TIMER_STOP = `Time is out`;

export const initialState = {
  level: 0,
  lives: 3,
  time: 30
};

const option = {
  image: ``,
  type: `correct`
};

const level = {
  description: ``,
  type: ``,
  answers: new Set(option)
};

export const gameLevels = [
  level
];

export const game = {
  state: initialState,
  levels: gameLevels
};

export const AnswerTypes = {
  FAST: `fast`,
  SLOW: `slow`,
  CORRECT: `correct`,
  WRONG: `wrong`
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


