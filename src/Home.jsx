import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg from "./assets/bg.png";
import './Home.css';

function Home() {
  let navigate = useNavigate();
  return (
    <>
      <img src={bg} alt="Background Image" />
      <header>
        <nav>
          <ul>
            <li>Home</li>
            <li>How we calculate</li>
            <li>Why?</li>
            <li>Stats for nerds</li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="container">
          <h1>😒</h1>
          <br />
          <h1>You are CRINGE</h1>
          <p>Are you really? Take a test to find out</p>
          <br />
          <br />
          <button onClick={() => navigate('/test')}>
            Find out...👀
          </button>
        </div>
      </main>
    </>
  );
}

export default Home;
