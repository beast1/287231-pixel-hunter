const LIFE_WORTH = 50;
const MAX_LIFES = 3;

const PointsForAnswers = {
  FAST: 150,
  SLOW: 50,
  CORRECT: 100,
  WRONG: 0
};

export const AnswerTypes = {
  FAST: `fast`,
  SLOW: `slow`,
  CORRECT: `correct`,
  WRONG: `wrong`
};

export const countScore = (answers, lifes) => {
  if (answers.length < 10 || lifes < 0) {
    return -1;
  }

  if (answers.filter((it) => it === `wrong`).length !== (MAX_LIFES - lifes)) {
    throw new Error(`impossible input combination`);
  }

  let totalScore = lifes * LIFE_WORTH;

  totalScore += answers.map((answer) => {
    const points = PointsForAnswers[answer.toUpperCase()];

    if (typeof points !== `number`) {
      throw new Error(`wrong answer type`);
    }

    return points;
  }).reduce((a, b) => a + b);

  return totalScore;
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
      return value === 0 ? `Time is out` : getTimer(value - 1);
    }
  };
};


