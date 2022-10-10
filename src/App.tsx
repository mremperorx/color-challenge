import { useEffect, useState } from "react";
import "./App.css";

enum Result {
  Correct,
  Worng,
}

function App() {
  const [color, setColor] = useState("");
  const [answer, setAnswer] = useState<string[]>([]);
  const [result, setResult] = useState<Result | undefined>(undefined);

  const getRandomColor = () => {
    const digits = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];

    const color = new Array(6)
      .fill("")
      .map(() => digits[Math.floor(Math.random() * digits.length)])
      .join("");

    return `#${color}`;
  };

  useEffect(() => {
    const actualColor = getRandomColor();
    setColor(actualColor);
    setAnswer(
      [actualColor, getRandomColor(), getRandomColor()].sort(
        () => 0.5 - Math.random()
      )
    );
  }, []);

  const handleAnwserClicked = (answer: string) => {
    if (answer === color) {
      setResult(Result.Correct);
      generateColor();
    } else {
      setResult(Result.Worng);
    }
  };

  const generateColor = () => {
    const actualColor = getRandomColor();
    getRandomColor();
    setColor(actualColor);
    setAnswer(
      [actualColor, getRandomColor(), getRandomColor()].sort(
        () => 0.5 - Math.random()
      )
    );
  };

  useEffect(() => {
    generateColor();
  }, []);

  return (
    <div className="App">
      <div>
        <div className="guess" style={{ background: color }}></div>

        {answer.map((answer) => (
          <button onClick={() => handleAnwserClicked(answer)} key={answer}>
            {answer}
          </button>
        ))}

        {result === Result.Worng && <div className="worng">Worng! </div>}
        {result === Result.Correct && <div className="correct"> Correct! </div>}
      </div>
    </div>
  );
}

export default App;
