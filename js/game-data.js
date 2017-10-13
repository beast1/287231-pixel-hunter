const convertToPoints = (answer) => {
  const key = answer.toUpperCase();
  const AnswerTypes = {
    FAST: 150,
    SLOW: 50,
    CORRECT: 100,
    WRONG: 0
  };

  return !AnswerTypes.hasOwnProperty(key) ? -1 : AnswerTypes[key];
};

export const countScore = (answers, lifes) => {
  const lifeWorth = 50;
  if (answers.length < 10 || lifes === 0) {
    return -1;
  }

  let totalScore = lifes * lifeWorth;

  answers.forEach((answer) => {
    const points = convertToPoints(answer);

    if (points === -1) {
      throw new Error(`wrong answer type`);
    }

    totalScore += points;
  });

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
      return value === 0 ? false : getTimer(value - 1);
    }
  };
};
