import RulesView from './rules-view';
import {changeView} from "../utils";
import updateWindow from "../updateWindow";
import greeting from "../greeting/greeting";
import level from "../game/game";
import {initialState} from "../data/game-data";

const rules = new RulesView();
rules.onBack = () => changeView(greeting());
rules.onContinue = () => changeView(level(initialState()));

export default () => rules;
