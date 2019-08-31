import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import LogInForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm/SignUpForm';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LogInForm} />
        <Route path="/register" component={SignUpForm} />
      </div>
    </BrowserRouter>
  );
}

export default App;
