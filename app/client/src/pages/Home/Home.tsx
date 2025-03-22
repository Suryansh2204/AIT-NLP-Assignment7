import { useEffect, useState } from "react";
import "./Home.css";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  // state to store the user input for the prompt
  const [inputText, setInputText] = useState<string>("");
  // state to store the error message
  const [error, setError] = useState("");
  // state to store the loading state
  const [loading, setLoading] = useState(false);
  // state to store the result
  const [result, setResult] = useState<{
    label: string;
    confidence: number;
  } | null>(null);

  // Function validates input and fetch the data from the server and update the state
  const handleSubmit = async () => {
    setError("");
    setResult(null);
    setLoading(true);

    if (inputText === "" || inputText === null) {
      setError("Please enter a query");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/is-toxic?text=${inputText.trim()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const res = await response.json();
        console.log("Response:", res);

        if (res.error) {
          setError(res.error);
        } else {
          setResult({
            label: res.label,
            confidence: res.confidence,
          });
        }
      }
    } catch (error) {
      if (error) console.error("Error:", error);
      setError("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      {loading && (
        <div
          className="home-loader"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <Loader />
        </div>
      )}
      <div className="home">
        <h1 className="home-heading">ToxiMeter</h1>
        <p style={{ fontSize: "1.5rem", marginTop: "0.25rem" }}>
          Because words can be radioactive ☢️
        </p>

        <div className="home-search-container">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Insert phrase to check for toxicity"
            className="home-search-input"
            required
          />
          <button className="button" onClick={handleSubmit}>
            Check
          </button>
        </div>
        {error && <div className="home-search-error">* {error}</div>}
        {result && (
          <div
            style={{
              width: "300px",
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem",
              gap: "10px",
            }}
          >
            <h1
              style={{
                textAlign: "left",
                textTransform: "capitalize",
                color: `${result.label === "toxic" ? "red" : ""}`,
              }}
            >
              {result.label}
            </h1>
            <h3>
              Confidence :
              <strong> {(result.confidence * 100).toFixed(4)}%</strong>
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
