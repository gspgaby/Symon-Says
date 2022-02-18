import "./App.scss";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "./components/Card";
import timeout from "./utils/util";

function App() {
  const [isOn, setIsOn] = useState(false);

  const colorList = ["green", "red", "yellow", "blue"];

  const initGame = {
    isDisplay: false,
    colors: [],
    score: 0,
    userPlay: false,
    userColors: [],
  };

  const [play, setPlay] = useState(initGame);
  const [lightColor, setLightColor] = useState("");

  function startHandleClick() {
    setIsOn(true);
  }

  useEffect(() => {
    if (isOn) {
      setPlay({ ...initGame, isDisplay: true });
    } else {
      setPlay(initGame);
    }
  }, [isOn]);

  useEffect(() => {
    if (isOn && play.isDisplay) {
      let newColor = colorList[Math.floor(Math.random() * 4)];

      const copyColors = [...play.colors];
      copyColors.push(newColor);
      setPlay({ ...play, colors: copyColors });
    }
  }, [isOn, play.isDisplay]);

  useEffect(() => {
    if (isOn && play.isDisplay && play.colors.length) {
      displayColors();
    }
  }, [isOn, play.isDisplay, play.colors.length]);

  async function displayColors() {
    await timeout(500);
    for (let i = 0; i < play.colors.length; i++) {
      setLightColor(play.colors[i]);
      await timeout(500);
      setLightColor("");
      await timeout(500);

      if (i === play.colors.length - 1) {
        const copyColors = [...play.colors];

        setPlay({
          ...play,
          isDisplay: false,
          userPlay: true,
          userColors: copyColors.reverse(),
        });
      }
    }
  }

  async function cardClickHandle(color) {
    if (!play.isDisplay && play.userPlay) {
      const copyUserColors = [...play.userColors];
      const lastColor = copyUserColors.pop();
      setLightColor(color);

      if (color === lastColor) {
        if (copyUserColors.length) {
          setPlay({ ...play, userColors: copyUserColors });
        } else {
          await timeout(500);
          setPlay({
            ...play,
            isDisplay: true,
            userPlay: false,
            score: play.colors.length,
            userColors: [],
          });
        }
      } else {
        await timeout(500);
        setPlay({ ...initGame, score: play.colors.length });
      }
      await timeout(500);
      setLightColor("");
    }
  }

  function closeHandleClick() {
    setIsOn(false);
  }

  return (
    <Box className="App">
      <h1 className="title">Simon Says</h1>
      <Box className="body">
        <Box className="box">
          {colorList &&
            colorList.map((v, i) => (
              <Card
                onClick={() => {
                  cardClickHandle(v);
                }}
                light={lightColor === v}
                color={v}
              />
            ))}
        </Box>

        {isOn && !play.isDisplay && !play.userPlay && play.score && (
          <div className="lose">
            <div>Score: {play.score}</div>
              <button onClick={closeHandleClick}>
                Close
              </button>
          </div>
        )}
        {!isOn && !play.score && (
          <button onClick={startHandleClick} className="start">
            Start
          </button>
        )}
        {isOn && (play.isDisplay || play.userPlay) && (
          <div className="score">{play.score}</div>
        )}
      </Box>
    </Box>
  );
}

export default App;
