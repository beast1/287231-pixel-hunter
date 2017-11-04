import {countScore, LevelType} from "./game-data";

const Expect = {
  PHOTO: `Найдите фото среди изображений`,
  PAINTING: `Найдите рисунок среди изображений`
};

const ExpectType = {
  [Expect.PHOTO]: `photo`,
  [Expect.PAINTING]: `painting`,
};

export const adaptQuestions = (levels) =>
  levels.map((it) => {
    if (it.type === LevelType.ONE_OF_THREE) {
      it.expect = it.question === Expect.PHOTO ? ExpectType[Expect.PHOTO] : ExpectType[Expect.PAINTING];
    }

    return it;
  });

export const adaptStats = (stats) =>
  stats.map((it) => {
    it.score = countScore(it.history, it.state.lives);
    return it;
  });
