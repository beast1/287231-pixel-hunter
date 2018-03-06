import {changeView} from "../utils";
import rules from "../rules/rules";
import GreetingView from './greeting-view';

const greeting = new GreetingView();
greeting.onContinue = () => {
  changeView(rules());
};

export default () => greeting;
