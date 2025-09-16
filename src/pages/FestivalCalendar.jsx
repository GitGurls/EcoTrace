
// // src/pages/FestivalCalendar.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Calendar, Grid } from "lucide-react";

// export default function FestivalCalendar() {
//   const [festivals, setFestivals] = useState([]);
//   const [activeTab, setActiveTab] = useState("timeline"); // ✅ Default tab
//   const [formData, setFormData] = useState({
//     name: "",
//     date: "",
//     description: "",
//     image: "",
//     location: "",
//     type: "",
//   });

//   // ✅ Fetch festivals from backend
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/festivals")
//       .then((res) => setFestivals(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // ✅ Handle form input
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Submit new festival
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/festivals", formData);
//       setFestivals([...festivals, res.data]); // UI update
//       setFormData({
//         name: "",
//         date: "",
//         description: "",
//         image: "",
//         location: "",
//         type: "",
//       });
//       alert("🎉 Festival Added!");
//     } catch (err) {
//       console.error(err);
//       alert("Error adding festival");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center">📅 Festival Calendar</h1>

//       {/* ✅ Tabs */}
//       <div className="flex justify-center mb-8">
//         <button
//           onClick={() => setActiveTab("timeline")}
//           className={`flex items-center gap-2 px-4 py-2 rounded-l-lg transition ${
//             activeTab === "timeline"
//               ? "bg-indigo-600 text-white"
//               : "bg-white border text-gray-700 hover:bg-gray-100"
//           }`}
//         >
//           <Calendar className="w-5 h-5" /> Timeline View
//         </button>
//         <button
//           onClick={() => setActiveTab("cards")}
//           className={`flex items-center gap-2 px-4 py-2 rounded-r-lg transition ${
//             activeTab === "cards"
//               ? "bg-indigo-600 text-white"
//               : "bg-white border text-gray-700 hover:bg-gray-100"
//           }`}
//         >
//           <Grid className="w-5 h-5" /> Card View
//         </button>
//       </div>

//       {/* ✅ Timeline View */}
//       {activeTab === "timeline" && (
//         <div className="mb-12 bg-gradient-to-br from-gray-900 to-black text-white p-6 rounded-2xl shadow-lg">
//           <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
//             <Calendar className="w-6 h-6 text-green-400" />
//             Upcoming Festivals Timeline
//           </h2>

//           <div className="relative border-l-4 border-green-500 pl-6 space-y-8">
//             {festivals
//               .sort((a, b) => new Date(a.date) - new Date(b.date))
//               .map((festival, idx) => (
//                 <motion.div
//                   key={festival._id}
//                   className="relative bg-gray-800 rounded-2xl shadow-lg p-5 hover:scale-105 transition-transform"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.5, delay: idx * 0.2 }}
//                 >
//                   {/* Timeline Dot */}
//                   <span className="absolute -left-9 top-5 w-6 h-6 rounded-full bg-green-500 border-4 border-black"></span>

//                   <h3 className="text-xl font-semibold">{festival.name}</h3>
//                   <p className="text-sm text-gray-400">
//                     📅 {new Date(festival.date).toDateString()}
//                   </p>
//                   <p className="mt-2 text-gray-300">{festival.description}</p>
//                   <p className="mt-2 text-sm">
//                     📍 <span className="text-green-400">{festival.location}</span>
//                   </p>
//                   <span className="inline-block mt-3 text-xs bg-green-600/30 text-green-400 px-3 py-1 rounded-full">
//                     {festival.type}
//                   </span>
//                 </motion.div>
//               ))}
//           </div>
//         </div>
//       )}

//       {/* ✅ Card View */}
//       {activeTab === "cards" && (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//           {festivals.map((fest) => (
//             <div
//               key={fest._id}
//               className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
//             >
//               <img
//                 src={fest.image}
//                 alt={fest.name}
//                 className="w-full h-40 object-cover rounded-md"
//               />
//               <h2 className="text-xl font-semibold mt-3">{fest.name}</h2>
//               <p className="text-gray-500 text-sm">
//                 {new Date(fest.date).toDateString()}
//               </p>
//               <p className="mt-2 text-gray-700">{fest.description}</p>
//               <p className="mt-2 text-sm text-indigo-600 font-medium">
//                 📍 {fest.location} | 🏷️ {fest.type}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ✅ Add Festival Form */}
//       <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
//         <h2 className="text-2xl font-bold mb-4">➕ Add New Festival</h2>
//         <form onSubmit={handleSubmit} className="grid gap-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Festival Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="border p-2 rounded-md"
//             required
//           />
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             className="border p-2 rounded-md"
//             required
//           />
//           <textarea
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleChange}
//             className="border p-2 rounded-md"
//             required
//           />
//           <input
//             type="text"
//             name="image"
//             placeholder="Image URL"
//             value={formData.image}
//             onChange={handleChange}
//             className="border p-2 rounded-md"
//           />
//           <input
//             type="text"
//             name="location"
//             placeholder="Location"
//             value={formData.location}
//             onChange={handleChange}
//             className="border p-2 rounded-md"
//           />
//           <input
//             type="text"
//             name="type"
//             placeholder="Festival Type (Tribal, Harvest, etc.)"
//             value={formData.type}
//             onChange={handleChange}
//             className="border p-2 rounded-md"
//           />

//           <button
//             type="submit"
//             className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
//           >
//             Add Festival
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }






// src/pages/FestivalCalendar.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function FestivalCalendar() {
  const [festivals, setFestivals] = useState([]);
  const [search, setSearch] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
    image: "",
    location: "",
    type: "",
  });

  // ✅ Fetch festivals from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/festivals")
      .then((res) => setFestivals(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit new festival
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/festivals", formData);
      setFestivals([...festivals, res.data]); // UI update
      setFormData({
        name: "",
        date: "",
        description: "",
        image: "",
        location: "",
        type: "",
      });
      alert("🎉 Festival Added!");
    } catch (err) {
      console.error(err);
      alert("Error adding festival");
    }
  };

  // ✅ Apply Search + Filter
  const filteredFestivals = festivals.filter((fest) => {
    const matchesSearch = fest.name.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = filterLocation
      ? fest.location.toLowerCase().includes(filterLocation.toLowerCase())
      : true;
    const matchesType = filterType ? fest.type.toLowerCase() === filterType.toLowerCase() : true;
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">📅 Festival Calendar</h1>

      {/* 🔍 Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by festival name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-md flex-1"
        />
        <input
          type="text"
          placeholder="📍 Filter by location"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="border p-2 rounded-md flex-1"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border p-2 rounded-md flex-1"
        >
          <option value="">🏷️ All Types</option>
          <option value="Tribal">Tribal</option>
          <option value="Harvest">Harvest</option>
          <option value="Cultural">Cultural</option>
        </select>
      </div>

      {/* Festival List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFestivals.map((fest) => (
          <div
            key={fest._id}
            className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
          >
            <img
              src={fest.image}
              alt={fest.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-3">{fest.name}</h2>
            <p className="text-gray-500 text-sm">
              {new Date(fest.date).toDateString()}
            </p>
            <p className="mt-2 text-gray-700">{fest.description}</p>
            <p className="mt-2 text-sm text-indigo-600 font-medium">
              📍 {fest.location} | 🏷️ {fest.type}
            </p>
          </div>
        ))}
      </div>

      {/* Add Festival Form */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">➕ Add New Festival</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            name="name"
            placeholder="Festival Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="type"
            placeholder="Festival Type (Tribal, Harvest, etc.)"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
          >
            Add Festival
          </button>
        </form>
      </div>
    </div>
  );
}
