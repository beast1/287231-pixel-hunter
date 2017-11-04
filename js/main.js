import Application from "./application";
import Loader from "./loader";
import {adaptQuestions} from "./data/game-adapter";

Application.init();
Application.showIntro();
Loader.load().
    then(adaptQuestions).
    then((data) => Application.init(data)).
    then(Application.showGreeting()).
    catch((err) => err);
