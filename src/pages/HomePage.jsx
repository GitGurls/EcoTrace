// // src/pages/HomePage.jsx
// import React from "react";

// export default function HomePage() {
//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center px-8 py-4 bg-green-700 text-white shadow-md">
//         <h1 className="text-2xl font-bold">Jharkhand Tourism</h1>
//         <div className="space-x-6">
//           <a href="/" className="hover:text-yellow-300">Home</a>
//           <a href="/spots" className="hover:text-yellow-300">Explore</a>
//           <a href="/login" className="hover:text-yellow-300">Login</a>
//           <a href="/feedback" className="hover:text-yellow-300">Feedback</a>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <header className="flex flex-col items-center justify-center flex-1 text-center px-6 py-20 bg-cover bg-center"
//         style={{ backgroundImage: "url('https://rawaangi.in/wp-content/uploads/2024/09/places-to-visit-in-jharkhand.jpg')" }}>  
//         <div className="bg-black bg-opacity-50 p-8 rounded-2xl">
//           <h2 className="text-4xl md:text-6xl font-bold text-yellow-300 mb-4">
//             Discover Eco & Cultural Jharkhand
//           </h2>
//           <p className="text-white text-lg mb-6">
//             Experience nature, heritage, and tribal culture like never before.
//           </p>
//           <a href="/spots" className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition">
//             Explore Now
//           </a>
//         </div>
//       </header>

//       {/* Highlights Section */}
//       <section className="grid md:grid-cols-2 gap-8 p-10">
//         <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition">
//           <img src="https://i.pinimg.com/originals/90/dd/bc/90ddbc0f307bb82ab1bd05b8ddfc9304.jpg"
//                alt="Eco Tourism"
//                className="rounded-xl mb-4 w-full h-60 object-cover" />
//           <h3 className="text-2xl font-bold text-green-700 mb-2">Eco Tourism</h3>
//           <p className="text-gray-600">
//             Explore waterfalls, wildlife sanctuaries, and lush green forests of Jharkhand.
//           </p>
//         </div>

//         <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition">
//           <img src="https://egov.eletsonline.com/wp-content/uploads/2022/04/Vocal-for-Local.jpg"
//                alt="Cultural Tourism"
//                className="rounded-xl mb-4 w-full h-60 object-cover" />
//           <h3 className="text-2xl font-bold text-green-700 mb-2">Cultural Tourism</h3>
//           <p className="text-gray-600">
//             Celebrate rich tribal culture, vibrant festivals, and local handicrafts.
//           </p>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-green-700 text-white py-4 text-center">
//         <p>© 2025 Jharkhand Tourism | Smart Digital Platform</p>
//       </footer>
//     </div>
//   );
// }


// src/pages/HomePage.jsx
import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      {/* ✅ Navbar */}
      <nav className="bg-green-800 text-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-8 py-4">
          {/* Logo / Title */}
          <h1 className="text-2xl font-bold tracking-wide">
            Jharkhand <span className="text-yellow-400">Tourism</span>
          </h1>

          {/* Links */}
          <div className="space-x-8 font-medium">
            <a href="/" className="hover:text-yellow-400 transition">
              Home
            </a>
            <a href="/spots" className="hover:text-yellow-400 transition">
              Explore
            </a>
            <a href="/login" className="hover:text-yellow-400 transition">
              Login
            </a>
            <a href="/feedback" className="hover:text-yellow-400 transition">
              Feedback
            </a>
          </div>
        </div>
      </nav>

      {/* ✅ Hero Section */}
      <header
        className="flex flex-col items-center justify-center flex-1 text-center px-6 py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://rawaangi.in/wp-content/uploads/2024/09/places-to-visit-in-jharkhand.jpg')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-2xl">
          <h2 className="text-4xl md:text-6xl font-bold text-yellow-300 mb-4">
            Discover Eco & Cultural Jharkhand
          </h2>
          <p className="text-white text-lg mb-6">
            Experience nature, heritage, and tribal culture like never before.
          </p>
          <a
            href="/spots"
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition"
          >
            Explore Now
          </a>
        </div>
      </header>

      {/* ✅ Highlights Section */}
      <section className="grid md:grid-cols-2 gap-8 p-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition">
          <img
            src="https://i.pinimg.com/originals/90/dd/bc/90ddbc0f307bb82ab1bd05b8ddfc9304.jpg"
            alt="Eco Tourism"
            className="rounded-xl mb-4 w-full h-60 object-cover"
          />
          <h3 className="text-2xl font-bold text-green-700 mb-2">Eco Tourism</h3>
          <p className="text-gray-600">
            Explore waterfalls, wildlife sanctuaries, and lush green forests of
            Jharkhand.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition">
          <img
            src="https://egov.eletsonline.com/wp-content/uploads/2022/04/Vocal-for-Local.jpg"
            alt="Cultural Tourism"
            className="rounded-xl mb-4 w-full h-60 object-cover"
          />
          <h3 className="text-2xl font-bold text-green-700 mb-2">
            Cultural Tourism
          </h3>
          <p className="text-gray-600">
            Celebrate rich tribal culture, vibrant festivals, and local
            handicrafts.
          </p>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-green-900 text-gray-300 mt-10">
        <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              Jharkhand Tourism
            </h2>
            <p>
              Discover eco-tourism, cultural heritage, and the natural beauty of
              Jharkhand. Experience forests, waterfalls, and tribal traditions
              like never before.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-yellow-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/spots" className="hover:text-yellow-400">
                  Explore
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-yellow-400">
                  Login
                </a>
              </li>
              <li>
                <a href="/feedback" className="hover:text-yellow-400">
                  Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
            <p>Email: info@jharkhandtourism.in</p>
            <p>Phone: +91 12345 67890</p>
            <p>Ranchi, Jharkhand</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="bg-green-950 text-center py-4 text-sm text-gray-400">
          © {new Date().getFullYear()} Jharkhand Tourism | Smart Digital
          Platform
        </div>
      </footer>
    </div>
  );
}
