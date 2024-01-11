import { useState, useEffect } from "react";
import "./styles.css";

import { larWord, freeWord, theme } from "../../misc/misc.js";
import { keyboardKeysTop } from "../../misc/misc.js";
import { keyboardKeysMiddle } from "../../misc/misc.js";
import { keyboardKeysBottom } from "../../misc/misc.js";

const Boxes = () => {
  const [modal, setModal] = useState(false);
  const [complete, setComplete] = useState("");
  const [famWord, setFamWord] = useState("");
  const wordUp = famWord.toUpperCase();
  const wordArr = wordUp.split("");
  console.log(famWord.toUpperCase().split("").length);
  console.log(complete);

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
  console.log(text);
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
    console.log(firstBlank);
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
    if (text[4].complete === true) {
      setComplete("loss");
      setModal(true);
    } else {
      const finalColors = [];
      wordArr.forEach((element, idx) => {
        let found;
        for (let i = 0; i < boxesArr.length; i++) {
          if (boxesArr[i] === element && i === idx) {
            console.log("match on index and letter!", element);
            found = true;
            finalColors.push([i, element, "box-green", idx]);
          } else if (boxesArr[i] === element && i !== idx && !found) {
            console.log("match on letter but not index!", element, i, idx);
            finalColors.push([i, element, "box-yellow", idx]);
          }
        }
      });

      setText(
        text.map((item) => {
          if (item.name === `row${idx}`) {
            return { ...item, colors: finalColors, complete: true };
          } else return item;
        })
      );
      if (wordUp === boxesArr.join("")) {
        setModal(true);
        setComplete("win");
        return;
      }
    }
  };
  // console.log(text[0].colors[0][0]);
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
      <div className="boxes-box-wrapper">
        {wordArr.map((char, idx) => {
          const colorInfo = text[0].colors.find(
            (colorArr) => colorArr[0] === idx
          );
          return (
            <div
              className={colorInfo ? `boxes-box ${colorInfo[2]}` : "boxes-box"}
            >
              {text[0].boxes[idx]}
            </div>
          );
        })}
      </div>
      <div>
        {wordArr.map((char, idx) => {
          const colorInfo = text[1].colors.find(
            (colorArr) => colorArr[0] === idx
          );
          return (
            <p
              className={colorInfo ? `boxes-box ${colorInfo[2]}` : "boxes-box"}
            >
              {text[1].boxes[idx]}
            </p>
          );
        })}
      </div>
      <div className="boxes-box-wrapper">
        {wordArr.map((char, idx) => {
          const colorInfo = text[2].colors.find(
            (colorArr) => colorArr[0] === idx
          );
          return (
            <p
              className={colorInfo ? `boxes-box ${colorInfo[2]}` : "boxes-box"}
            >
              {text[2].boxes[idx]}
            </p>
          );
        })}
      </div>
      <div>
        {wordArr.map((char, idx) => {
          const colorInfo = text[3].colors.find(
            (colorArr) => colorArr[0] === idx
          );
          return (
            <p
              className={colorInfo ? `boxes-box ${colorInfo[2]}` : "boxes-box"}
            >
              {text[3].boxes[idx]}
            </p>
          );
        })}
      </div>
      <div className="boxes-box-wrapper">
        {wordArr.map((char, idx) => {
          const colorInfo = text[4].colors.find(
            (colorArr) => colorArr[0] === idx
          );
          return (
            <p
              className={colorInfo ? `boxes-box ${colorInfo[2]}` : "boxes-box"}
            >
              {text[4].boxes[idx]}
            </p>
          );
        })}
      </div>
      <div>
        {wordArr.map((char, idx) => {
          const colorInfo = text[5].colors.find(
            (colorArr) => colorArr[0] === idx
          );
          return (
            <p
              className={colorInfo ? `boxes-box ${colorInfo[2]}` : "boxes-box"}
            >
              {text[5].boxes[idx]}
            </p>
          );
        })}
      </div>
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
      <p>{theme}</p>
    </>
  );
};

export default Boxes;
