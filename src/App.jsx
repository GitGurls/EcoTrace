// import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//     </Routes>
//   );
// }

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import FestivalCalendar from "./pages/FestivalCalendar";
import TourSpotsPage from "./pages/TourSpotsPage";
// import LoginPage from "./pages/LoginPage";
// import FeedbackPage from "./pages/FeedbackPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/festivals" element={<FestivalCalendar />} />
          <Route path="/spots" element={<TourSpotsPage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/feedback" element={<FeedbackPage />} /> */}
      </Routes>
    </div>
  );
}

