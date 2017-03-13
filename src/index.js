import './index.css';
import 'jspdf/dist/jspdf.debug.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import InvoiceStepper from './InvoiceStepper';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import { reducer as formReducer } from 'redux-form'

const reducers = {
    // ... your other reducers here ...
    form: formReducer     // <---- Mounted at 'form'
};
const reducer = combineReducers(reducers)
const store = createStore(
    reducer, /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

injectTapEventPlugin();

const App = () => (
<div>
    <Provider store={store}>
        <MuiThemeProvider>
            <InvoiceStepper />
        </MuiThemeProvider>
    </Provider>
</div>

);

ReactDOM.render(

  <App />,
  document.getElementById('root')
);



// Check for browser support of service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js?v9')
        .then(function(registration) {
            // Successful registration
            console.log('Hooray. Registration successful, scope is:', registration.scope);
        }).catch(function(error) {
        // Failed registration, service worker won’t be installed
        console.log('Whoops. Service worker registration failed, error:', error);
    });
}
