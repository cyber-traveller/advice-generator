import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    advice: "",
    isTyping: false,
  };

  componentDidMount() {
    this.fetchAdvice();
  }

  fetchAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;
        this.startTypingEffect(advice);
      })
      .catch((error) => {
        console.error(error);
        this.setState({ advice: "Oops! Something went wrong.", isTyping: false });
      });
  };

  startTypingEffect = (quote) => {
    this.setState({ isTyping: true });
    let i = 0;
    let text = "";
    const interval = setInterval(() => {
      text += quote[i];
      this.setState({ advice: text });
      i++;
      if (i === quote.length) clearInterval(interval);
    }, 50);
  };

  render() {
    const { advice, isTyping } = this.state;

    return (
      <div className="app">
        <div className="card">
          <h1 className={`heading ${isTyping ? "typing" : ""}`}>{advice}</h1>

          {/* Button to fetch new advice */}
          <button className="button" onClick={this.fetchAdvice}>
            <span>Give Me Advice</span>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
