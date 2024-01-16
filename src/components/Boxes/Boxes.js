import { useState, useEffect, useRef } from "react";
import "./styles.css";

import { larWord, freeWord, theme } from "../../misc/misc.js";
import { keyboardKeysTop } from "../../misc/misc.js";
import { keyboardKeysMiddle } from "../../misc/misc.js";
import { keyboardKeysBottom } from "../../misc/misc.js";

const Boxes = () => {
  const [modal, setModal] = useState(false);
  const [complete, setComplete] = useState("");
  const [famWord, setFamWord] = useState("");
  const [shake, setShake] = useState(false);
  const wordUp = famWord.toUpperCase();
  const wordArr = wordUp.split("");

  const textInitState = [
    {
      name: "row0",
      complete: false,
      boxes: new Array(famWord.toUpperCase().split("").length).fill(""),
      colors: [],
    },
    {
      name: "row1",
      complete: false,
      boxes: new Array(famWord.toUpperCase().split("").length).fill(""),
      colors: [],
    },
    {
      name: "row2",
      complete: false,
      boxes: new Array(famWord.toUpperCase().split("").length).fill(""),
      colors: [],
    },
    {
      name: "row3",
      complete: false,
      boxes: new Array(famWord.toUpperCase().split("").length).fill(""),
      colors: [],
    },
    {
      name: "row4",
      complete: false,
      boxes: new Array(famWord.toUpperCase().split("").length).fill(""),
      colors: [],
    },
    {
      name: "row5",
      complete: false,
      boxes: new Array(famWord.toUpperCase().split("").length).fill(""),
      colors: [],
    },
  ];

  const [text, setText] = useState(textInitState);
  // console.log(text);
  useEffect(() => {
    setModal(true);
  }, []);

  useEffect(() => {
    setText(textInitState);
  }, [famWord]);

  const handleClick = (e) => {
    const incompleteRow = text.findIndex((row, idx) => row.complete === false);
    const arr = [...text[incompleteRow].boxes];
    const firstBlank = arr.indexOf("");
    if (e.target.value === "⌫") {
      firstBlank === -1
        ? (arr[arr.length - 1] = "")
        : (arr[firstBlank - 1] = "");

      setText(
        text.map((item) => {
          if (item.name === `row${incompleteRow}`) {
            return { ...item, boxes: arr };
          } else return item;
        })
      );
    } else if (e.target.value === "⏎") {
      if (firstBlank !== -1) return;
      handleCheck(incompleteRow);
    } else {
      if (firstBlank === -1) return;
      arr[firstBlank] = e.target.value;
      setText(
        text.map((item) => {
          if (item.name === `row${incompleteRow}`) {
            return { ...item, boxes: arr };
          } else return item;
        })
      );
    }
  };

  const handleCheck = (idx) => {
    const boxesArr = text[idx].boxes;
    if (text[5].complete === true) {
      setComplete("loss");
      setModal(true);
    } else {
      let finalColors = [];
      wordArr.forEach((element, idx) => {
        let found;
        for (let i = 0; i < boxesArr.length; i++) {
          if (boxesArr[i] === element && i === idx) {
            console.log("match on index and letter!", element);
            found = true;
            finalColors.push([i, element, "box-green", idx]);
          } else if (boxesArr[i] === element && i !== idx && !found) {
            console.log("match on letter but not index!", element, i, idx);
            finalColors.push([i, element, "box-yellow", idx]); //this ends us up with more yellows than needed, maybe change
          }
        }
      });

      //filter the yellows here
      let usedLetters = [];
      finalColors.forEach((element, idx) => {
        let answerLettersNum = wordArr.filter(
          (word) => word === element[1]
        ).length;
        let guessLettersNum = boxesArr.filter(
          (word) => word === element[1]
        ).length;

        const findAllYellows = finalColors.filter(
          (arr) => arr[1] === element[1] && arr[2] === "box-yellow"
        );
        console.log(findAllYellows, "find all yellows");

        const allGreens = finalColors.filter(
          (arr) => arr[1] === element[1] && arr[2] === "box-green"
        );

        //filter all others without that letter
        const finalColorsReduced = finalColors.filter(
          (arr) => arr[1] !== element[1]
        );
        console.log(finalColorsReduced, "final colors reduced", element[1]);

        // if (allGreens.length === answerLettersNum) {
        //   usedLetters.push(element[1]);
        //   return
        // }

        if (
          guessLettersNum === answerLettersNum &&
          usedLetters.indexOf(element[1]) === -1
        ) {
          usedLetters.push(element[1]);
          if (allGreens.length > 0) {
            const filteredYellows = findAllYellows.filter(
              (arr) => arr[0] !== allGreens[0][0] //crap
            );
            finalColors = [
              ...finalColorsReduced,
              ...allGreens,
              ...filteredYellows,
            ];
          } else {
            return;
          }
        }

        if (
          guessLettersNum < answerLettersNum &&
          usedLetters.indexOf(element[1]) === -1
        ) {
          if (findAllYellows.length === allGreens.length) {
            finalColors = [...finalColorsReduced, ...allGreens];
            usedLetters.push(element[1]);
          }
        }

        if (
          guessLettersNum > answerLettersNum &&
          usedLetters.indexOf(element[1]) === -1
        ) {
          console.log(element[1], "unique letter overguessed");
          usedLetters.push(element[1]);

          //keep only the amount of letters in the answer
          let remainingYellows = findAllYellows.slice(
            0,
            answerLettersNum - allGreens.length
          );
          console.log(remainingYellows, "remaining yellows");

          if (allGreens.length === answerLettersNum) {
            remainingYellows = [];
          }

          //merge them together
          finalColors = [
            ...finalColorsReduced,
            ...remainingYellows,
            ...allGreens,
          ];
        }
      });

      console.log(finalColors, "final colors FINAL");

      setText(
        text.map((item) => {
          if (item.name === `row${idx}`) {
            return { ...item, colors: finalColors, complete: true };
          } else return item;
        })
      );
      if (finalColors.length === 0) {
        setShake(idx);
      }
      if (wordUp === boxesArr.join("")) {
        setModal(true);
        setComplete("win");
        return;
      }
    }
  };

  return (
    <>
      {complete && <div className="overlay-block"></div>}
      {/* modal */}
      <div className={modal ? "modal" : "hide"}>
        <div className="modal-content">
          {!famWord && (
            <>
              <p>Which Family?</p>
              <button
                onClick={() => {
                  setModal(false);
                  setFamWord(larWord);
                }}
              >
                Larose
              </button>
              <button
                onClick={() => {
                  setModal(false);
                  setFamWord(freeWord);
                  setText(textInitState);
                }}
              >
                Freeman
              </button>
            </>
          )}
          {complete === "loss" && (
            <>
              <p>BUMSKIES! YOU LOST</p>
              <button
                onClick={() => {
                  setModal(false);
                  setFamWord("");
                  setComplete("");
                  setModal(true);
                }}
              >
                Try Again?
              </button>
            </>
          )}{" "}
          {complete === "win" && (
            <>
              <p>YOU GOT IT!</p>
              <button
                onClick={() => {
                  setModal(false);
                  setText(textInitState);
                }}
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
      {/* Word Boxes */}
      {text.map((item, pindex) => {
        return (
          <div
            className={`${shake === pindex && "shake-box"} boxes-box-wrapper`}
          >
            {wordArr.map((char, idx) => {
              const colorInfo = text[pindex].colors.find(
                (colorArr) => colorArr[0] === idx
              );
              return (
                <div
                  className={
                    colorInfo ? `boxes-box ${colorInfo[2]}` : "boxes-box"
                  }
                >
                  {text[pindex].boxes[idx]}
                </div>
              );
            })}
          </div>
        );
      })}
      {/* Keyboard */}
      <div className="keyboard-wrapper">
        <div className="keyboard">
          {keyboardKeysTop.map((key) => {
            return (
              <button
                className="keyboard-key"
                onClick={(e) => handleClick(e)}
                value={key}
              >
                {key}
              </button>
            );
          })}
        </div>
        <div className="keyboard">
          {keyboardKeysMiddle.map((key) => {
            return (
              <button
                className="keyboard-key"
                onClick={(e) => handleClick(e)}
                value={key}
              >
                {key}
              </button>
            );
          })}
        </div>
        <div className="keyboard">
          {keyboardKeysBottom.map((key) => {
            return (
              <button
                className="keyboard-key"
                onClick={(e) => handleClick(e)}
                value={key}
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Boxes;
