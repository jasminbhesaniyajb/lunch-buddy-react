import React from 'react'
import Router from "./router.js"
import { Provider } from 'react-redux'
import Moment from 'react-moment';

import store from "./redux/store";
Moment.globalFormat = 'DD-MM-YYYY';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
          <Router />
      </div>
    </Provider>
  );
}

export default App;
