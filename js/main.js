import {showScreen} from "./utils";
import intro from "./intro/intro";

window.addEventListener(`load`, () => {
  showScreen(intro());
});
