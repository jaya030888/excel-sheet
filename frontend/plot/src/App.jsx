import { useState, useEffect } from 'react'

function App() {

  const [plots, setPlots] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPlots = async () => {
    const res = await fetch("https://excel-sheet-1.onrender.com/plots");
    const data = await res.json();
    setPlots(data);
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
          // .filter((item) =>
          //   item.acc.toString().includes(search)
          // )
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
