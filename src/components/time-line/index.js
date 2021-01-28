import TimeLine from './src/main';

TimeLine.install = function(Vue) {
  Vue.component(TimeLine.name, TimeLine);
};

export default TimeLine;

