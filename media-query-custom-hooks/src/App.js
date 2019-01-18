import React from 'react';
import './App.css';
import MediaHooks from './Hooks.Media.container'
import MediaHookless from './Hookless.Media.container'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hooks in <code>src/Hooks.Media.container.js</code> check it out.
        </p>
        <MediaHooks />
        <MediaHookless />
      </header>
    </div>
  );
}

export default App