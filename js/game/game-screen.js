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
    this.view = new LevelView(game, this.level);

    this.view.onAnswer = (answer) => {
      this.stopTimer();

      const isCorrect = answer.every((it, i) => it === this.levels[game.state.level].answers[i].type);
      const newGame = changeGameState(game, isCorrect);

      this.toggleScreens(newGame);
    };

    this.view.onBack = () => {
      this.stopTimer();
      Application.showGreeting();
    };

    showScreen(this.view);

    this.timer = setTimeout(() => this.tick(), 1000);
  }

  tick() {
    const state = tick(this.game);

    if (!state) {
      const newGame = changeGameState(this.game, false);

      this.stopTimer();
      this.toggleScreens(newGame);
    } else {
      this.view.updateTime(state.state.time);
      this.timer = setTimeout(() => this.tick(), 1000);
    }
  }

  toggleScreens(game) {
    if (game.state.level === MAX_ANSWERS_LENGTH || game.state.lives < 0) {
      Application.showStats(game);
    } else {
      Application.startGame(game);
    }
  }

  stopTimer() {
    clearTimeout(this.timer);
  }
}

export default GameScreen;
