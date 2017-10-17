import assert from 'assert';
import {countScore, getTimer, AnswerTypes} from "./game-data";

const {equal, throws} = assert;

describe(`Check the score count function`, () => {
  it(`should return 1150 in case of 10 normal answers and 3 spare lifes`, () => {
    equal(countScore(Array(10).fill(AnswerTypes.CORRECT), 3), 1150);
  });

  it(`should return -1 in case of game is lost`, () => {
    equal(countScore(Array(4).fill(AnswerTypes.WRONG), -1), -1);
    equal(countScore([...Array(6).fill(AnswerTypes.CORRECT), ...Array(4).fill(AnswerTypes.WRONG)], -1), -1);
  });

  it(`should return 1650 in case of 10 fast answers and 3 spare lifes`, () => {
    equal(countScore(Array(10).fill(AnswerTypes.FAST), 3), 1650);
  });

  it(`should return 350 in case of 7 slow answers and 1 spare life`, () => {
    equal(countScore([...Array(3).fill(AnswerTypes.WRONG), ...Array(7).fill(AnswerTypes.SLOW)], 0), 350);
  });

  it(`should throw an error in case of wrong answer type`, () => {
    throws(() => {
      countScore([`scheisse`, ...Array(9).fill(AnswerTypes.CORRECT)], 2);
    }, `wrong answer type`);
  });

  it(`should throw an error in case of impossible combination of inputs`, () => {
    throws(() => {
      countScore([...Array(9).fill(AnswerTypes.CORRECT), AnswerTypes.WRONG], 3);
    }, `impossible input combination`);

    throws(() => {
      countScore(Array(10).fill(AnswerTypes.FAST), 2);
    }, `impossible input combination`);
  });
});

describe(`Check that timer ticks correctly`, () => {
  it(`should decrease by one per tick`, () => {
    equal(getTimer(3).tick().value, 2);
  });

  it(`should return false once finished`, () => {
    equal(getTimer(0).tick(), `Time is out`);
  });

  it(`should throw an error in case of negative value`, () => {
    throws(() => {
      getTimer(-1);
    }, `time remaining cannot be negative`);
  });

  it(`should throw an error in case of non-numeric value`, () => {
    throws(() => {
      getTimer(`sheep`);
    }, `time is not numeric`);
  });
});
