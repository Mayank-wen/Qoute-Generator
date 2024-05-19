import React, { useEffect, useState } from "react";

const Generator = () => {
  const [quote, setQuote] = useState(null);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("https://type.fit/api/quotes");
        const data = await response.json();
        setQuotes(data);
        setQuote(data[Math.floor(Math.random() * data.length)]);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, []);

  const handleNewQuote = () => {
    if (quotes.length > 0) {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
    }
  };

  return (
    <div>
      <h1>Random Quote</h1>
      {quote ? (
        <blockquote>
          <p>{quote.text}</p>
          <footer>- {quote.author || "Unknown"}</footer>
        </blockquote>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleNewQuote}>Get New Quote</button>
    </div>
  );
};
export default Generator;
