// import "./App.css";

// function App() {
//   return <div className="App">{/* start coding here */}</div>;
// }

// export default App;

import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [inputWords, setInputWords] = useState("");
  const [listBook, setListBook] = useState([]);

  const handleWordSearch = (event) => {
    setInputWords(event.target.value);
  };

  useEffect(() => {
    if (inputWords.trim() === "") {
      setListBook([]); // ล้าง listBook หาก input ว่าง
      return;
    }

    const fetchBook = async () => {
      try {
        const result = await axios.get(
          `https://openlibrary.org/search.json?q=${inputWords}`
        );
        setListBook(result.data.docs); // อัปเดตข้อมูล listBook
      } catch (error) {
        console.log(`Fail to fetch data: ${error}`);
      }
    };

    fetchBook();
  }, [inputWords]); // เพิ่ม inputWords ใน dependency array เพื่อเรียก fetchBook เมื่อ inputWords เปลี่ยนแปลง

  useEffect(() => {
    console.log(listBook); // แสดงผล listBook เมื่อ listBook เปลี่ยนแปลง
  }, [listBook]);

  return (
    <>
      <div className="App">
        <h1>Find a Book</h1>
      </div>
      <label>
        <input
          type="text"
          placeholder="Input the book name"
          value={inputWords}
          onChange={handleWordSearch}
        />
      </label>
      <div>
        <div className="board">
          <ul>
            {listBook.map((book) => (
              <li className="book-list" key={book.key}>
                {book.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
