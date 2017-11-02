import Application from "./application";
import Loader from "./loader";
import adapt from "./data/game-adapter";

Application.showIntro();
Loader.load().
    then(adapt).
    then((data) => Application.init(data)).
    then(Application.showGreeting()).
    catch((err) => err);
