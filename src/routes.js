import React from 'react';
import { Route } from 'react-router';

import createApp from './app';

const App = createApp(React);

export default (
  <Route path="/" component={ App }>
  </Route>
);
