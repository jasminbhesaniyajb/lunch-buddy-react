import React, {Suspense, lazy} from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store'
import { Provider } from 'react-redux'
// loader
import Loader from './components/Loader' 
import './styles/index.scss';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import './assets/js/theme.js'

import './i18n'

import { Flip, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import reportWebVitals from './reportWebVitals';

//sentry

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";


Sentry.init({
  dsn: "https://3c63430cf2544a07a64f71ccca7c2197@o547121.ingest.sentry.io/5669364",
  integrations: [new Integrations.BrowserTracing()],

  tracesSampleRate: 1.0,
});
const App = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./App")), 1500);
  });
});
ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <ToastContainer
          className="toast-sec"
          autoClose={3000}
          position='top-center'
          transition={Flip} 
          hideProgressBar={false}
          newestOnTop={false}
          closeButton
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
          <App />
      </Suspense>
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();

//Added this event to prevent value decrease in the number picker on on mouse wheel event.
document.addEventListener("wheel", function(event){
  if(document.activeElement.type === "number"){
      document.activeElement.blur();
  }
});