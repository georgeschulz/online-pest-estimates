import './App.css';
import StartPane from './components/panes/startPane';
import ContactPane from './components/panes/contactPane';
import CalculatorPane from './components/panes/calculatorPane';
import QuotePane from './components/panes/quotePane';
import SignupConfirmationPane from './components/panes/signupConfirmationPane';
import EmailedConfirmationPane from './components/panes/emailedConfirmationPane';
import { useSelector } from 'react-redux';
import { selectPane } from './redux/paneSlice';

function App() {
  const pane = useSelector(selectPane);

  return (
    <div className="App">
      <header className="App-header">
          {pane === 'start' ? <StartPane /> : null}
          {pane === 'contact' ? <ContactPane /> : null}
          {pane === 'calculator' ? <CalculatorPane /> : null}
          {pane === 'quote' ? <QuotePane /> : null}
          {pane === 'signup-confirmed' ? <SignupConfirmationPane /> : null}
          {pane === 'emailed-confirmation' ? <EmailedConfirmationPane /> : null}
      </header>
    </div>
  );
}

export default App;
