// Components
import Navbar from './Components/Navbar';
import Homepage from './Components/Homepage';
import Cryptocurrencies from './Components/Cryptocurrencies';
import Exchanges from './Components/Exchanges';
import News from './Components/News';
import CurrencyDetails from './Components/CurrencyDetails';
import Footer from './Components/Footer';
// MatUI Library
import { createTheme, ThemeProvider } from '@mui/material';
// Routing
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
                <Route path='/currencydetails/:coinId'>
                  <CurrencyDetails/>
                </Route>
              </Switch>
              <Footer/>
            </Navbar>
          </Provider>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
