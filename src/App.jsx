import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";
function App() {
  const [inputName, setInputName] = useState("");
  const [bookList, setBookList] = useState([]);

  const getBook = async (query) => {
    try {
      const result = await axios.get(
        `https://openlibrary.org/search.json?q=${query}`
      );
      setBookList(result.data.docs);
      console.log(result) // Access 'docs' from API response
    } catch (error) {
      alert("Error fetching data:", error);
    }
  };

  // Use 'useEffect' to trigger search only when inputName changes
  useEffect(() => {
      getBook(inputName), [inputName]})

  const handleInputChange = (event) => {
    setInputName(event.target.value);
  };

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <label>
        <input
          type="text"
          placeholder="Enter book name"
          value={inputName}
          onChange={handleInputChange}
        />
      </label>
      <div className="board">
        <ul>
        {bookList.map((book) => (
          <li className="book-list" key={book.key}>
            <>{book.title}</>
          </li>
        ))}</ul>
      </div>
    </div>
  );
}

export default App;
