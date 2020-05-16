import React from 'react';
import './styles.css';
import ProjectList from './components/ProjectList'


function App() {
  return (
    <div className="App">
      <p className="title centered"> Projects</p>
      <ProjectList />
    </div>
  );
}

export default App;
