import ContentElementLookupMap from './src/main';

ContentElementLookupMap.install = function(Vue) {
  Vue.component(ContentElementLookupMap.name, ContentElementLookupMap);
};

export default ContentElementLookupMap;

