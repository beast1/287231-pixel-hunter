import IntroView from "./intro-view";
import {changeView} from "../utils";
import greeting from "../greeting/greeting";


const intro = new IntroView();
intro.onContinue = () => {
  changeView(greeting());
};

export default () => intro;

