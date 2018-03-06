import RulesView from './rules-view';
import {changeView} from "../utils";
import updateWindow from "../updateWindow";
import greeting from "../greeting/greeting";
import game from "../game";
import {initialState} from "../data/game-data";

const rules = new RulesView();
rules.onBack = () => changeView(greeting());
rules.onContinue = () => updateWindow(game(initialState()));

export default () => rules;
