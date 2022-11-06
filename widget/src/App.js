import './App.css';
import StartPane from './components/panes/startPane';
import ContactPane from './components/panes/contactPane';
import CalculatorPane from './components/panes/calculatorPane';
import QuotePane from './components/panes/quotePane';
import SignupConfirmationPane from './components/panes/signupConfirmationPane';
import EmailedConfirmationPane from './components/panes/emailedConfirmationPane';
import { useSelector } from 'react-redux';
import { selectPane } from './redux/paneSlice';
import { useEffect } from 'react';
import { fetchConfig, selectIsActive } from './redux/configSlice';
import { useDispatch } from 'react-redux';
import InactivePane from './components/panes/inactivePane';

function App({ domElement }) {
  const pane = useSelector(selectPane);
  const widgetId = domElement.getAttribute("widget-id");
  const isActive = useSelector(selectIsActive)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConfig(widgetId));
  }, [widgetId]);

  return (
    <div className="App">
      <header className="App-header">
          {!isActive ? <InactivePane /> : null}
          {pane && isActive === 'start' ? <StartPane /> : null}
          {pane && isActive === 'contact' ? <ContactPane /> : null}
          {pane && isActive === 'calculator' ? <CalculatorPane /> : null}
          {pane && isActive === 'quote' ? <QuotePane /> : null}
          {pane && isActive === 'signup-confirmed' ? <SignupConfirmationPane /> : null}
          {pane && isActive === 'emailed-confirmation' ? <EmailedConfirmationPane /> : null}
      </header>
    </div>
  );
}

export default App;
