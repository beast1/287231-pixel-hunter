const createGetPoints = () => {
  const LIVES_PRICE = 50;
  const answerTypePrices = {
    wrong: 0,
    slow: 50,
    right: 100,
    fast: 150
  };
  const answerTypesArr = Object.keys(answerTypePrices);
  const getPoints = (answersArr, livesCount) => {
    if (livesCount === 0) {
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

export {getPoints, getTimer};
