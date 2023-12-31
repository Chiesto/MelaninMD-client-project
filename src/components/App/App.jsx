import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import QuizPage from '../QuizPage/QuizPage';
import UserPage from '../UserPage/UserPage';
import HistoryPage from '../HistoryPage/HistoryPage';
import LandingPage from '../LandingPage/LandingPage';
import Prediction from '../Prediction/Prediction'


import './App.css';


function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        {user.id &&
          <Nav />
        }
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />
          

          {/* Visiting localhost:3000/about will show the about page. */}
          <ProtectedRoute
            // shows AboutPage at all times (logged in or not)
            exact
            path="/quiz"
          >
            <QuizPage />
          </ProtectedRoute>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/about"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/history"
          >
            <HistoryPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/about" />
              :
              // Otherwise, show the login page
              <LandingPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/about" />
              :
              // Otherwise, show the registration page
              <LandingPage />
            }
          </Route>

          <ProtectedRoute
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/about" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <ProtectedRoute
          exact path="/prediction">
            <Prediction/>
          </ProtectedRoute>
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
