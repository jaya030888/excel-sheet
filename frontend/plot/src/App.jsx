import { useState, useEffect } from 'react'

function App() {

  const [plots, setPlots] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPlots = async () => {
    const res = await fetch('http://localhost:3000/plots');
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
          .filter((item) =>
            item.acc.toString().includes(search)
          )
          .map((item) => (
            <li key={item.plot}>
              {item.plot} - {item.acc}
            </li>
          ))}
      </ul>

    </div>

  )
}

export default App