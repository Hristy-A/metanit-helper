import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';
import { CAWrapper } from './utils/chrome-actions-wrapper.js';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

(async () => {
  try {
    const tab = await CAWrapper.getActiveTab();
    const metanit = !!(tab && tab.isMetanit);
    const injected = metanit && (await tab.getInjected());

    const rootElement = document.getElementById('root') as HTMLElement;

    ReactDOM.createRoot(rootElement).render(
      <App injected={injected} metanit={metanit} />
    );
  } catch (error) {
    console.error(error);
  }
})();
