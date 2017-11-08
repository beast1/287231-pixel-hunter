import Application from "./application";
import Loader from "./loader";
import {adaptQuestions} from "./data/game-adapter";
import introScreen from "./intro/intro-screen";

introScreen.init();
Loader.load().
    then(adaptQuestions).
    then((data) => Application.init(data)).
    then(Application.showGreeting()).
    catch((err) => err);
