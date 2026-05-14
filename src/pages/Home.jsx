import { useState } from "react";
import playersData from "../data/players";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const Home = () => {
  const [search, setSearch] = useState("");
  const [team, setTeam] = useState("");
  const [page, setPage] = useState(1);

  const players = Object.keys(playersData).flatMap((club) =>
    playersData[club].map((p) => ({
      ...p,
      team: club
    }))
  );

  const filtered = players.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (team ? p.team === team : true)
  );

  const perPage = 8;
  const current = filtered.slice((page - 1) * perPage, page * perPage);

  const chartData = Object.keys(playersData).map((club) => ({
    club,
    players: playersData[club].length
  }));

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1600&q=80')"
      }}
    >
      <div className="bg-black/80 min-h-screen p-6 text-white">

        {/* TITLE */}
        <h1 className="text-4xl text-center mb-8 font-bold text-white drop-shadow-lg">
          ⚽ Football Dashboard
        </h1>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <input
            placeholder="Search player..."
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 rounded bg-white text-black w-72 outline-none"
          />

          <select
            onChange={(e) => {
              setTeam(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 rounded bg-white text-black outline-none"
          >
            <option value="">All Clubs</option>
            {Object.keys(playersData).map((club, i) => (
              <option key={i}>{club}</option>
            ))}
          </select>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {current.map((p, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
            >
              <img
                src={p.image || "https://via.placeholder.com/300"}
                alt={p.name}
                className="w-full h-44 object-contain"
              />

              <div className="p-3">
                <h2 className="font-semibold text-white text-sm">
                  {p.name}
                </h2>

                <p className="text-xs text-gray-300">
                  {p.team}
                </p>

                <div className="mt-2 text-xs space-y-1">
                  <p className="text-blue-400">⚽ Goals: {p.goals}</p>
                  <p className="text-pink-400">🎯 Assists: {p.assists}</p>
                  <p className="text-yellow-400">⭐ Rating: {p.rating}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 text-black rounded"
          >
            Prev
          </button>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page * perPage >= filtered.length}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        </div>

        {/* CHART */}
        <div className="mt-12 flex justify-center">
          <BarChart width={500} height={300} data={chartData}>
            <XAxis dataKey="club" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="players" fill="#3b82f6" />
          </BarChart>
        </div>

      </div>
    </div>
  );
};

export default Home;