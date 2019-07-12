import { p as patchBrowser, g as globals, b as bootstrapLazy } from './chunk-8cd65796.js';

patchBrowser().then(resourcesUrl => {
  globals();
  return bootstrapLazy([["todo-view",[[0,"todo-view",{"todos":[32]}]]],["app-root",[[0,"app-root",{"todoViews":[32],"subscriberCount":[32]}]]]], { resourcesUrl });
});
