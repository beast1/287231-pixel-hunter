import IntroView from "./intro-view";
import updateWindow from "../updateWindow";
import greetingElem from "../greeting";


const intro = new IntroView();
intro.onContinue = () => {
  updateWindow(greetingElem);
};

export default () => intro;

