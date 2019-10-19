import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import ScoresComponent from '../src/components/scores'
import './fonts/bariol_regular-webfont.ttf'
import './App.css';
import logo from './images/codespark.png';

function App() {
  return (
    <div className="App">
      <StickyContainer>
        <Sticky>
          {({
            style
          }) => (
            <header className='header' style={style}>
              <img src={logo} alt="logo" />
            </header>
          )}
        </Sticky>
        <div class='pagebody'>
          <ScoresComponent/>
        </div>
      </StickyContainer>
    </div>
  );
}

export default App;
