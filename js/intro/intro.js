import {showScreen} from "../utils";
import greeting from "../greeting/greeting";
import IntroView from "./intro-view";

const intro = new IntroView();

intro.onClick = () => {
  showScreen(greeting());
};

export default () => intro;
