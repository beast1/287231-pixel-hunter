import LevelView from "./level-view";
import Application from "../application";
import {tick, changeGameState, MAX_ANSWERS_LENGTH} from "../data/game-data";
import {showScreen} from "../utils";

class GameScreen {
  constructor(levels) {
    this.levels = levels;
  }

  init(game) {
    this.game = game;
    this.level = this.levels[this.game.state.level];
    this.view = new LevelView(this.game, this.level);

    this.view.onAnswer = (answer) => {
      this._stopTimer();

      const isCorrect = answer.every((it, i) => it === this.levels[this.game.state.level].answers[i].type);
      const newGame = changeGameState(this.game, isCorrect);

      GameScreen._toggleScreens(newGame);
    };

    this.view.onBack = () => {
      this._stopTimer();
      // eslint-disable-next-line
      if (confirm(`Вы уверены? Весь прогресс в игре будет потерян`)) {
        Application.showGreeting();
      }
    };

    showScreen(this.view);

    this._timer = setTimeout(() => this._tick(), 1000);
  }

  _tick() {
    const state = tick(this.game);

    if (!state) {
      const newGame = changeGameState(this.game, false);

      this._stopTimer();
      GameScreen._toggleScreens(newGame);
    } else {
      this.view.updateTime(state.state.time);
      this._timer = setTimeout(() => this._tick(), 1000);
    }
  }

  _stopTimer() {
    clearTimeout(this._timer);
  }

  static _toggleScreens(game) {
    if (game.state.level === MAX_ANSWERS_LENGTH || game.state.lives < 0) {
      Application.showStats(game);
    } else {
      Application.startGame(game);
    }
  }
}

export default GameScreen;
