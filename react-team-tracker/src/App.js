import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import LogInForm from './components/LogInForm';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LogInForm} />
      </div>
    </BrowserRouter>
  );
}

export default App;
