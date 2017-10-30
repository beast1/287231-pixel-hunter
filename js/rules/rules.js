import {showScreen} from "../utils";
import gameElement from "../game/game";
import {game, initialHistory, initialState} from "../data/game-data";
import greeting from "../greeting/greeting";
import RulesView from "./rules.view";

const rules = new RulesView();

rules.onBack = () => {
  showScreen(greeting());
};

rules.onStart = () => {
  game.history = initialHistory();
  game.state = initialState();
  showScreen(gameElement(game));
};

export default () => rules;
