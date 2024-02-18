import logo from "./logo.svg";
import "./App.css";
import promptOutput from "./promptOutput.mjs";
import { useState, useEffect } from "react";
import crackingEgg from "./crackingEgg.GIF";
import eggSpin from "./eggSpin.GIF";
import eggStill from "./eggstill.PNG";

function App() {
  const [output, setOutput] = useState({});
  const [showEgg, setShowEgg] = useState(0);

  const handleButtonClick = async () => {
    setShowEgg(1);
    const out = await promptOutput();
    setOutput(out);
    setShowEgg(2);
    setTimeout(() => {
      setShowEgg(3);
    }, 2000);
  };

  return (
    <div id="popup">
      {showEgg === 0 && (
        <>
          <div>
            <img
              src={eggStill}
              style={{ width: "100%", height: "auto" }}
              alt="Egg Still"
            />
            <button id="generate-button" onClick={handleButtonClick}>
              Crack the Web!
            </button>
          </div>
        </>
      )}
      {showEgg === 1 && (
        <>
          <h1
            className="purple"
            style={{ textAlign: "center", marginBottom: "18px" }}
          >
            Welcome to WebCrack!
          </h1>
          <div>
            <img
              src={eggSpin}
              style={{ width: "100%", height: "auto" }}
              alt="Egg Spinning"
            />
          </div>
        </>
      )}

      {showEgg === 2 && (
        <>
          <h1
            className="purple"
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            Loading...
          </h1>
          <div>
            <img
              src={crackingEgg}
              style={{ width: "100%", height: "auto" }}
              alt="Cracking Egg"
            />
          </div>
        </>
      )}
      {showEgg === 3 && (
        <>
          <h1 id="title">WebCrack!</h1>
          <main id="main-content">
            <section className="info-section"></section>
            <h2>About the Source</h2>
            <section id="source-section"></section>
            <div className="source-info">
              <p className="info-title">Title: </p>
              <p className="info-description">{output.final.title}</p>
            </div>
            <div className="source-info">
              <p className="info-title">Author </p>
              <p className="info-description">{output.final.author}</p>
            </div>
            <div className="source-info">
              <p className="info-title">Publisher: </p>
              <p className="info-description">
                {output.final.publisher_background}
              </p>
            </div>
            <div className="source-info">
              <p className="info-title">Reading Length: </p>
              <p className="info-description">
                {output.final.article_length_minutes} min
              </p>
            </div>
            <h2>Potential Biases</h2>
            <section id="bias-section">
              <p>
                <a className="bias-info">{output.final.bias}</a>
              </p>
            </section>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
