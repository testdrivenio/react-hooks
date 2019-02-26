import React from 'react';
import './App.css';
import MediaHooks from './Hooks.Media.container';
import MediaHookless from './Hookless.Media.container';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <span>Hooks in&nbsp;</span>
          <code>src/Hooks.Media.container.js</code>
          <span>&nbsp;check it out.</span>
        </p>
        <MediaHooks />
        <MediaHookless />
      </header>
    </div>
  );
}

export default App;
