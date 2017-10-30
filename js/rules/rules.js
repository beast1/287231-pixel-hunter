import {showScreen} from "../utils";
import gameElement from "../game/game";
import greeting from "../greeting/greeting";
import RulesView from "./rules.view";

const rules = new RulesView();

rules.onBack = () => {
  showScreen(greeting());
};

rules.onStart = () => {
  showScreen(gameElement());
};


export default () => rules;
