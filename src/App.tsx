import { BrowserRouter, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { Profile } from './pages/Profile';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/' exact component={() => <Home />} />
        <Route path='/about' exact component={() => <About />} />
        <Route path='/pricing' exact component={() => <Pricing />} />
        <Route
          path='/sign-in'
          exact
          component={(props: RouteComponentProps) => <SignIn {...props} />}
        />
        <Route
          path='/sign-up'
          exact
          component={(props: RouteComponentProps) => <SignUp {...props} />}
        />
        <Route
          path='/profile'
          exact
          component={(props: RouteComponentProps) => <Profile {...props} />}
        />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
