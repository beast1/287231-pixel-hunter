import {showScreen} from "../utils";
import gameElement from "../game/game";
import {getGame, getInitialHistory, getInitialState} from "../data/game-data";
import greeting from "../greeting/greeting";
import RulesView from "./rules-view";

const rules = new RulesView();

rules.onBack = () => {
  showScreen(greeting());
};

rules.onStart = () => {
  const history = getInitialHistory();
  const state = getInitialState();
  showScreen(gameElement(getGame(state, history)));
};

export default () => rules;
