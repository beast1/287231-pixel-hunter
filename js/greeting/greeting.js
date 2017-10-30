import {showScreen} from "../utils";
import rules from "../rules/rules";
import GreetingView from "./greeting.view";

const greeting = new GreetingView();

greeting.onClick = () => {
  showScreen(rules());
};

export default () => greeting;
