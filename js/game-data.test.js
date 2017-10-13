import assert from 'assert';
import {countScore} from "./game-data";
import {getTimer} from "./game-data";

const {equal, throws} = assert;

describe(`Check the score count function`, () => {
  it(`should return 1150 in case of 10 normal answers and 3 spare lifes`, () => {
    equal(countScore(Array(10).fill(`correct`), 3), 1150);
  });

  it(`should return -1 in case of game is lost`, () => {
    equal(countScore(Array(9).fill(`correct`), 3), -1);
    equal(countScore(Array(3).fill(`wrong`), 0), -1);
    equal(countScore([...Array(7).fill(`correct`), ...Array(3).fill(`wrong`)], 0), -1);
  });

  it(`should return 1650 in case of 10 fast answers and 3 spare lifes`, () => {
    equal(countScore(Array(10).fill(`fast`), 3), 1650);
  });

  it(`should return 450 in case of 8 fast answers and 1 spare life`, () => {
    equal(countScore([`wrong`, `wrong`, ...Array(8).fill(`slow`)], 1), 450);
  });

  it(`should throw an error in case of wrong answer type`, () => {
    throws(() => {
      countScore([`scheisse`, ...Array(9).fill(`correct`)]);
    }, `wrong answer type`);
  });
});

describe(`Check that timer ticks correctly`, () => {
  it(`should decrease by one per tick`, () => {
    equal(getTimer(3).tick().value, 2);
  });

  it(`should return false once finished`, () => {
    equal(getTimer(0).tick(), false);
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
