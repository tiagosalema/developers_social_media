import './App.scss';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/layout/Register';
import SignIn from './components/layout/SignIn';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { loadUser } from './actions/auth';

import { Provider } from 'react-redux';
import store from './store';

import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profiles/Profile';
import Posts from './components/posts/Posts';
import Comments from './components/comments/Comments';
import PrivateRoute from './components/auth/PrivateRoute';
import EditProfile from './components/dashboard/EditProfile';
import AddExperience from './components/dashboard/AddExperience';

store.dispatch(loadUser());
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className='alerts'>
          <Alert />
        </div>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/sign-in' component={SignIn} />
          <Route path='/register' component={Register} />
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/profiles/:id' component={Profile} />
          <Route path='/posts' component={Posts} />
          <Route path='/comments/:postId' component={Comments} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute path='/edit-profile' component={EditProfile} />
          <PrivateRoute path='/add-experience' component={AddExperience} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
