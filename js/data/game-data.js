const createGetResult = () => {
  const LIVES_PRICE = 50;
  const answerTypePrices = {
    wrong: 0,
    slow: 50,
    right: 100,
    fast: 150
  };
  const answerTypesArr = Object.keys(answerTypePrices);
  const getResult = (answersArr, livesCount) => {
    let points = livesPrice * livesCount;
    for (let i = 0; i < answersArr.length; i++) {
      for (let j = 0; j < answerTypesArr.length; j++) {
        if (answerTypesArr[j] === answersArr[i]) {
          points += answerTypePrices[answerTypesArr[j]];
        }
      }
    }
    return points;
  };
  return getResult;
};

const getResult = createGetResult();

export {getResult};
