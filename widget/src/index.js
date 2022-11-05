import ReactDOM from 'react-dom'
import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

const WidgetDivs = document.querySelectorAll('.pricing-widget-container');

WidgetDivs.forEach((widgetDiv) => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
          <App domElement={widgetDiv} />
      </Provider>
    </React.StrictMode>,
    widgetDiv
  )
})  
