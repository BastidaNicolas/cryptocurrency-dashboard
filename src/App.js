import {Navbar, Homepage, Cryptocurrencies, Exchanges, News, CurrencyDetails} from './Components/index';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';

const theme = createTheme({
  
})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Provider store={store}>
            <Navbar>
              <Switch>
                <Route exact path='/'>
                  <Homepage/>
                </Route>
                <Route path='/cryptocurrencies'>
                  <Cryptocurrencies/>
                </Route>
                <Route path='/exchanges'>
                  <Exchanges/>
                </Route>
                <Route path='/news'>
                  <News/>
                </Route>
                <Route path='/currencydetails'>
                  <CurrencyDetails/>
                </Route>
              </Switch>
            </Navbar>
          </Provider>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
