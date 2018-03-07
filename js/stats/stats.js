import {changeView} from "../utils";
import greetingElem from "../greeting/greeting";
import StatsView from './stats-view';

const stats = (state) => {
  const it = new StatsView(state);
  it.onBack = () => changeView(greetingElem);
  return it;
};

export default (state) => stats(state);
