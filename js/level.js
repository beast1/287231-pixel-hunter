import {LevelType} from "./game-data";

const LevelClass = {
  [LevelType.DOUBLE]: `game__content`,
  [LevelType.SINGLE]: `game__content game__content--wide`,
  [LevelType.TRIPLE]: `game__content game__content--triple`
};

const getOptions = (options, levelType) =>
  options.map((it, i) => {
    if (levelType === LevelType.TRIPLE) {
      return `<div class="game__option">
        <img src="${it.image}" alt="Option" width="304" height="455">
      </div>`;
    }

    return `<div class="game__option">
        <img src="${it.image}" alt="Option">
        <label class="game__answer  game__answer--photo">
          <input name="question${i + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question${i + 1}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`;
  }).join(``);

const getLevel = (levelData) =>
  `<p class="game__task">${levelData.description}</p>
    <form class="${LevelClass[levelData.type]}">
      ${getOptions(levelData.options, levelData.type)}      
    </form>`;

export default getLevel;
