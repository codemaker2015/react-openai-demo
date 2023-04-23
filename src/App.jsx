import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  let [obj, setObj] = useState({ choices: [] });
  let [prompt, setPrompt] = useState("");

  const getRes = () => {
    setLoading(true);

    axios({
      method: "POST",
      url: "https://api.openai.com/v1/completions",
      data: {
        temperature: 0.4,
        n: 1,
        max_tokens: 4000,
        model: "text-davinci-003",
        prompt: prompt,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer openai_key",
      },
    })
      .then((res) => {
        responseHandler(res);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message, e);
      });
  };

  const responseHandler = (res) => {
    if (res.status === 200) {
      setObj(res.data);
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <div className="container-column">
        <div className="container-column">
          <h2>React OpenAI Demo</h2>
          <input
            type="text"
            placeholder="Enter text"
            readOnly={loading}
            className="input-controls"
            onChange={(e) => {
              setPrompt(e.target.value)
            }}
            value={prompt}
          />
          <button disabled={loading} onClick={getRes} >
            {loading ? "Loading... " : "Search"}
          </button>
        </div>
        <div className="result-container">
          <p>
            {!loading &&
              obj?.choices?.map((v, i) => <div key={i}>{v.text}</div>)
            }
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
