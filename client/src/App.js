import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage.js";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import Policy from "./pages/Policy.js";
import PAgeNotFound from "./pages/Pagenotfound.js";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<PAgeNotFound />} />
      </Routes>
    </>
  );
}

export default App;
