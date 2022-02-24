import { configure } from '@storybook/vue';
function loadStories() {
  const req = require.context('../stories', true, /\.stories\.ts$/);
  req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);