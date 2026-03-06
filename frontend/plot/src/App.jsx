import { useState, useEffect } from 'react'

function App() {

  const [plots, setPlots] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPlots = async () => {
    try {
      const res = await fetch("https://excel-sheet-1.onrender.com/plots");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setPlots(data);
      } else {
        console.error("API did not return an array:", data);
        setPlots([]);
      }
    } catch (err) {
      console.error("Failed to fetch plots:", err);
      setPlots([]);
    }
  };

  useEffect(() => {
    fetchPlots();
  }, []);

  return (

    <div>

      <input
        type="text"
        placeholder="Search acc..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {plots
          .filter((item) =>
            item.id.toString().includes(search)
          )
          .map((item) => (
            <li key={item.id}>
              {item.id} - {item.acc}
            </li>
          ))}
      </ul>

    </div>

  )
}

export default App
