import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import './index.css';

import appContainer from './models/appContainer/index'

// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(appContainer);

// 4. Router
app.router(require('./routes/router.js').default);

// 5. Start
app.start('#root');
