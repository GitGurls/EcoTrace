import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function ExplorePage() {
  const [spots, setSpots] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/spots")
      .then((res) => setSpots(res.data))
      .catch((err) => console.error(err));
  }, []);

  // filter + search logic
  const filteredSpots = spots.filter((spot) => {
    const matchesSearch = spot.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || spot.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8 md:p-12">
      <h1 className="text-4xl font-extrabold text-green-700 mb-8 text-center">
        🌿 Explore Jharkhand
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <input
          type="text"
          placeholder="🔍 Search spots..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="flex gap-3">
          {["All", "Cultural", "Eco", "Heritage"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === cat
                  ? "bg-gradient-to-r from-green-500 to-yellow-400 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSpots.map((spot, idx) => (
          <motion.div
            key={spot._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-3xl hover:scale-105 transform transition duration-300"
          >
            <div className="relative">
              <img
                src={spot.image}
                alt={spot.name}
                className="h-56 w-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-green-700 text-white text-xs px-3 py-1 rounded-full">
                {spot.category || "Tourism"}
              </span>
            </div>
            <div className="p-5">
              <h2 className="text-xl font-bold text-green-800">{spot.name}</h2>
              <p className="text-gray-600 text-sm mt-2">
                {spot.description.substring(0, 120)}...
              </p>
              <p className="text-sm text-green-600 mt-2">📍 {spot.location}</p>
              <button
                onClick={() => console.log("View Details of:", spot._id)}
                className="mt-4 bg-gradient-to-r from-green-500 to-yellow-400 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-yellow-500 transition"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredSpots.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          ❌ No spots found. Try another search or filter.
        </p>
      )}
    </div>
  );
}
