import { useEffect, useState } from "react";
import axios from 'axios';
import "./App.css";

function App() {
  const [bookData, setBookData] = useState([]);
  const [inputBook, setInputBook] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const result = await axios.get(`https://openlibrary.org/search.json?q=${inputBook}`);
        setBookData(result.data.docs);
      } catch (error) {
        console.log(`Fail to fetching Data: ${error}`);
      }
    };

    fetchBook();
  }, [inputBook]);

// ดูค่าของ bookData เมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    console.log(bookData); 
  }, [bookData]);

  return (
    <div className="App">
      <h1 className="font-bold text-4xl py-10">Find a Book</h1>
      <input 
        type="text" 
        onChange={(e) => setInputBook(e.target.value)} 
        placeholder="พิมพ์ชื่อหนังสือ..."
        className="border border-[#000]"
      />

      <div className="px-10 py-10">
        {bookData.length > 0 ? (
          <ul className="list-disc">  
            {bookData.map((book) => (
              <li key={book.id}>
                {book.title}
              </li>
            ))}
          </ul>    
        ) : (
          <>
            {inputBook === '' ? (
              <p>พิมพ์ข้อความเพื่อหาหนังสือ</p>
            ) : (
              <p>ไม่พบหนังสือ</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
