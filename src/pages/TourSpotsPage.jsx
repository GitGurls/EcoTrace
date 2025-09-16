// // src/pages/TourSpotsPage.jsx
// import React, { useEffect, useState, useMemo } from "react";
// import { motion } from "framer-motion";
// import { MapPin, Tag, Play, Search } from "lucide-react";
// import api from "../api/axios"; // Axios instance



// // Tabs for filtering categories
// const CATEGORY_TABS = ["All", "Eco", "Cultural", "Heritage", "Religious"];

// function useDebounced(value, delay = 300) {
//   const [debounced, setDebounced] = useState(value);
//   useEffect(() => {
//     const handler = setTimeout(() => setDebounced(value), delay);
//     return () => clearTimeout(handler);
//   }, [value, delay]);
//   return debounced;
// }

// export default function TourSpotsPage() {
//   const [spots, setSpots] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [category, setCategory] = useState("All");
//   const [districtFilter, setDistrictFilter] = useState("");
//   const [query, setQuery] = useState("");

//   const debouncedQuery = useDebounced(query);

//   // ✅ Fetch Spots from backend
//   const fetchSpots = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/spots"); // will call http://localhost:5000/api/spots
//       console.log("Spots API response:", res.data);

//       // Safety: Ensure array
//       setSpots(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error("Error fetching spots:", err);
//       setSpots([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchSpots();
//   }, []);

//   // ✅ Filtering Logic
//   const filtered = useMemo(() => {
//     let s = [...spots];
//     if (category !== "All") {
//       s = s.filter((x) => x.category === category);
//     }
//     if (districtFilter) {
//       s = s.filter((x) =>
//         (x.nearestCity || x.location || "")
//           .toLowerCase()
//           .includes(districtFilter.toLowerCase())
//       );
//     }
//     if (debouncedQuery) {
//       s = s.filter((x) =>
//         x.name.toLowerCase().includes(debouncedQuery.toLowerCase())
//       );
//     }
//     return s;
//   }, [spots, category, districtFilter, debouncedQuery]);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">🌍 Explore Tour Spots</h1>

//       {/* Filters */}
//       <div className="flex flex-wrap items-center gap-3 mb-6">
//         {CATEGORY_TABS.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setCategory(tab)}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition ${
//               category === tab
//                 ? "bg-green-600 text-white"
//                 : "bg-gray-200 hover:bg-gray-300"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}

//         <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg ml-auto">
//           <Search size={18} className="text-gray-500" />
//           <input
//             type="text"
//             placeholder="Search spot..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="bg-transparent outline-none ml-2 text-sm"
//           />
//         </div>
//       </div>

//       {/* Loading */}
//       {loading && <p className="text-gray-600">Loading spots...</p>}

//       {/* No Results */}
//       {!loading && filtered.length === 0 && (
//         <p className="text-gray-600">No spots found 🚫</p>
//       )}

//       {/* Spots Grid */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filtered.map((spot) => (
//           <motion.div
//             key={spot._id}
//             className="relative bg-white rounded-2xl shadow-lg overflow-hidden group"
//             whileHover={{ scale: 1.03 }}
//           >
//             <img
//               src={spot.image}
//               alt={spot.name}
//               className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//             <div className="absolute bottom-3 left-3 text-white">
//               <h3 className="text-lg font-bold">{spot.name}</h3>
//               <p className="flex items-center text-sm opacity-90">
//                 <MapPin size={14} className="mr-1" /> {spot.location}
//               </p>
//               <p className="flex items-center text-xs opacity-80">
//                 <Tag size={12} className="mr-1" /> {spot.category}
//               </p>
//             </div>

//             {/* Buttons */}
//             <div className="p-4 flex justify-between">
//               <button className="bg-green-600 text-white px-3 py-1 rounded-full text-sm hover:bg-green-700 flex items-center gap-1">
//                 <MapPin size={14} /> View on Map
//               </button>
//               <button className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm hover:bg-gray-900 flex items-center gap-1">
//                 <Play size={14} /> Details
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { MapPin, Clock, Search, PlusCircle, X } from "lucide-react";

// NOTE: If you already have `frontend/src/api.js` with an axios instance,
// replace `API` below with `import API from '../api'`.
import API from "../api/axios"; // Axios instance


export default function TourSuggestionsPage() {
  const [city, setCity] = useState("Ranchi");
  const [availableHours, setAvailableHours] = useState(6);
  const [interest, setInterest] = useState(""); // Eco | Cultural | Heritage | Religious
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [result, setResult] = useState({ suggestions: [], remainingMinutes: 0, note: "" });

  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    // Optional: initial load using defaults
    // fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
    setResult({ suggestions: [], remainingMinutes: 0, note: "" });

    try {
      const params = { city, availableHours };
      if (interest) params.interest = interest;
      const res = await API.get("/suggestions", { params });
      // backend returns: { suggestions: [...], remainingMinutes: X, note? }
      setResult(res.data);
      // reset itinerary for fresh suggestions
      setItinerary([]);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  const addToItinerary = (spot) => {
    if (itinerary.find((s) => s._id === spot._id)) return;
    setItinerary((p) => [...p, spot]);
  };

  const removeFromItinerary = (id) => setItinerary((p) => p.filter((x) => x._id !== id));

  const totalItineraryMinutes = () => {
    return itinerary.reduce((sum, s) => sum + (s.travelMins || 0) + (s.visitMins || Math.round((s.recommendedDuration || 1) * 60)), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black p-6 text-white">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-400">
              ✨ Smart Trip Suggestions — Jharkhand
            </h1>
            <p className="text-sm text-gray-300 mt-1">Tell us where you are and how much time you have — we'll plan a smart mini-itinerary.</p>
          </div>

          <div className="w-full md:w-auto bg-slate-800 rounded-2xl p-3 flex gap-3 items-center">
            <input
              className="bg-transparent outline-none px-3 py-2 rounded-lg placeholder:text-slate-400"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City / District (e.g., Ranchi)"
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={72}
                value={availableHours}
                onChange={(e) => setAvailableHours(Number(e.target.value))}
                className="w-20 bg-transparent outline-none px-3 py-2 rounded-lg text-center"
              />
              <span className="text-slate-400">hrs</span>
            </div>

            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="bg-slate-700 px-3 py-2 rounded-lg outline-none text-sm"
            >
              <option value="">All</option>
              <option value="Eco">Eco</option>
              <option value="Cultural">Cultural</option>
              <option value="Heritage">Heritage</option>
              <option value="Religious">Religious</option>
            </select>

            <button
              onClick={fetchSuggestions}
              disabled={loading}
              className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-500 font-medium text-black hover:opacity-95"
            >
              {loading ? "Searching..." : "🔍 Get Suggestions"}
            </button>
          </div>
        </header>

        {/* main layout: results (left) + itinerary (right) */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: Suggestions */}
          <div className="md:col-span-2 space-y-6">
            {/* Summary card */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 p-5 rounded-2xl shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Quick Summary</h3>
                  <p className="text-sm text-slate-300 mt-1">
                    {result.suggestions?.length > 0
                      ? `Found ${result.suggestions.length} spot(s). Estimated leftover time: ${Math.max(0, result.remainingMinutes || 0)} minutes.`
                      : "No suggestions yet — enter city & hours and click Get Suggestions."}
                  </p>
                </div>
                {result.note && <div className="text-sm text-yellow-300">{result.note}</div>}
              </div>
            </motion.div>

            {/* Suggested Spots grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {result.suggestions && result.suggestions.length > 0 ? (
                result.suggestions.map((s) => (
                  <motion.div
                    key={s._id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl overflow-hidden shadow-lg"
                  >
                    <div className="relative h-44">
                      <img
                        src={s.images?.[0] || s.image || "/images/default-spot.jpg"}
                        alt={s.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute left-3 bottom-3 text-white">
                        <h4 className="text-lg font-bold">{s.name}</h4>
                        <p className="text-sm text-slate-200">{s.district || s.location}</p>
                      </div>
                    </div>

                    <div className="p-4 grid grid-cols-2 gap-2 items-center">
                      <div className="text-sm text-slate-300">
                        <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-300"/> {s.nearestCity || s.district || "—"}</div>
                        <div className="flex items-center gap-2 mt-1"><Clock className="w-4 h-4 text-yellow-300"/> Visit: {(s.recommendedDuration||1)} hr</div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="text-sm text-slate-200">Travel: {s.travelMins ?? s.travelTimeFromCity ?? 0} mins</div>
                        <div className="text-xs text-slate-300">Total: {(s.totalMinutes ?? ((s.travelMins ?? s.travelTimeFromCity ?? 0) + Math.round((s.recommendedDuration||1)*60)))} mins</div>

                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => addToItinerary(s)}
                            className="px-3 py-1 rounded-lg bg-emerald-400 text-black font-medium flex items-center gap-2"
                          >
                            <PlusCircle className="w-4 h-4"/> Add
                          </button>
                          <button
                            onClick={() => console.log("Map ->", s.name)}
                            className="px-3 py-1 rounded-lg bg-slate-700 text-sm"
                          >
                            📍 Map
                          </button>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="md:col-span-2 p-6 bg-slate-800 rounded-2xl text-slate-300">No suggestions yet. Try searching above.</div>
              )}
            </div>

            {/* Smart Recommendation card */}
            {result.suggestions && result.suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-2xl"
              >
                <h3 className="text-2xl font-bold mb-2">Recommended Quick Plan</h3>
                <p className="text-lg"> 
                  You can cover <strong>{result.suggestions.map(s=>s.name).slice(0,3).join(' + ')}</strong> in your available time.
                </p>
                {result.remainingMinutes > 0 && (
                  <p className="mt-2 text-sm text-slate-900">You still have <strong>{result.remainingMinutes}</strong> minutes left — consider visiting a nearby cultural event or relaxing at a local cafe.</p>
                )}
              </motion.div>
            )}
          </div>

          {/* Right: Itinerary Builder */}
          <aside className="space-y-4">
            <div className="bg-slate-800 p-4 rounded-2xl shadow-lg sticky top-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">My Itinerary</h3>
                <button onClick={() => setItinerary([])} className="text-sm text-slate-300">Clear</button>
              </div>

              <div className="mt-3 space-y-2">
                {itinerary.length === 0 && <div className="text-sm text-slate-400">No stops yet. Add spots from suggestions.</div>}
                {itinerary.map((it) => (
                  <div key={it._id} className="flex items-center justify-between bg-slate-700 px-3 py-2 rounded-lg">
                    <div>
                      <div className="font-medium">{it.name}</div>
                      <div className="text-xs text-slate-300">{it.district || it.nearestCity}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-slate-300">{Math.round(((it.recommendedDuration||1)*60)+(it.travelMins||it.travelTimeFromCity||0))}m</div>
                      <button onClick={() => removeFromItinerary(it._id)} className="p-1 rounded bg-slate-600"><X className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-slate-700 pt-4">
                <div className="text-sm text-slate-300">Estimated total time:</div>
                <div className="text-lg font-semibold">{Math.floor(totalItineraryMinutes()/60)} hr {totalItineraryMinutes()%60} min</div>

                <button
                  onClick={() => console.log("Export itinerary", itinerary)}
                  className="mt-4 w-full px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                >
                  Export / Save
                </button>
              </div>
            </div>

            {/* Small tips card */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 rounded-2xl shadow-lg text-slate-200">
              <h4 className="font-semibold">Tips</h4>
              <ul className="mt-2 text-sm space-y-1">
                <li>- If you have leftover time, try linking a nearby festival from the Festivals tab.</li>
                <li>- Use the Map button to preview locations (future Google Maps integration).</li>
                <li>- For multi-stop optimization, integrate Distance Matrix (future scope).</li>
              </ul>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
}
