import { useState, useEffect } from "react";
import "./scoreboard.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { firebaseConfig } from "./utils/firebase";

export const Scoreboard = () => {
  const [scores, setScores] = useState({
    team1: 0,
    team2: 0,
  });

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  useEffect(() => {
    // Listen for updates from Firebase and update the UI
    onValue(ref(db, "scores"), (snapshot) => {
      if (snapshot.exists()) {
        setScores(snapshot.val());
      } else {
        console.log("snapshot didnt exist, create new one...");
        set(ref(db, "scores"), scores);
      }
    });
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "a") {
      incrementScore("team1");
    } else if (event.key === "l") {
      incrementScore("team2");
    }
  }
  
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [scores]);
  


  const incrementScore = (team) => {
    const newscores =
      team === "team1"
        ? { team1: scores?.team1 + 1, team2: scores?.team2 }
        : { team1: scores?.team1, team2: scores?.team2 + 1 };

      set(ref(db, "scores"), newscores);
  };

  const resetScores = () => {
    set(ref(db, "scores"), { team1: 0, team2: 0 });
  };
const decrementScore = (team) => {
  const newscores = "team1" === team ? { "team1": scores?.team1 - 1, "team2": scores?.team2}
    : { "team1": scores?.team1, "team2": scores?.team2 - 1};
  set(ref(db, "scores"), newscores);
}


  return (
    <div className="scoreboard container-fluid h-100">
      <div className="max-score-input-container">
      <span className="left-align"><button onClick={() => decrementScore("team1")}>Remove 1 point from Team 1</button></span>
        <button onClick={resetScores}>Reset</button>
        <span className="left-align"><button onClick={() => decrementScore("team2")}>Remove 1 point from Team 2</button></span>
      </div>
      <div className="row h-100">
        <div id="score1" className="col-sm-12 col-lg-6" onClick={() => incrementScore("team1")}>{scores?.team1}</div>
        <div id="score2" className="col-sm-12 col-lg-6" onClick={() => incrementScore("team2")}>{scores?.team2}</div>
      </div>
    </div>
  );
};
