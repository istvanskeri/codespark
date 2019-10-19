import React from 'react';
import logo from './logo.svg';
import { StickyContainer, Sticky } from 'react-sticky';
import ScoresComponent from '../src/components/scores'
import './App.css';

function App() {
  return (
    <div className="App">
      <StickyContainer>
        <Sticky>
          {({
            style
          }) => (
            <header style={style}>
              this is the header
            </header>
          )}
        </Sticky>
        <div class='pagebody'>
          <ScoresComponent value="hello"/>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </StickyContainer>
    </div>
  );
}

export default App;
