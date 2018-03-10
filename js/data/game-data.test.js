import assert from 'assert';
import {getPoints, resize} from "./game-data";

const {equal, throws} = assert;

const AnswerTypes = {
  WRONG: `wrong`,
  SLOW: `slow`,
  CORRECT: `correct`,
  FAST: `fast`
};

describe(`Check the score count function`, () => {
  it(`should return 1150 in case of 10 normal answers and 3 spare lifes`, () => {
    equal(getPoints(Array(10).fill(AnswerTypes.CORRECT), 3), 1150);
  });

  it(`should return -1 in case of game is lost`, () => {
    equal(getPoints(Array(4).fill(AnswerTypes.WRONG), 0), -1);
  });

  it(`should return 1650 in case of 10 fast answers and 3 spare lifes`, () => {
    equal(getPoints(Array(10).fill(AnswerTypes.FAST), 3), 1650);
  });

  it(`should return 400 in case of 7 slow answers and 1 spare life`, () => {
    equal(getPoints([...Array(3).fill(AnswerTypes.WRONG), ...Array(7).fill(AnswerTypes.SLOW)], 1), 400);
  });
});
