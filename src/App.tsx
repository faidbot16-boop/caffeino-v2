import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Merch from "./pages/Merch";
import Branches from "./pages/Branches";
import Tour from "./pages/Tour";
import Events from "./pages/Events";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import ChatBot from "./components/chatbot/ChatBot";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-bg-cream text-text-primary">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/order" element={<Order />} />
              <Route path="/merch" element={<Merch />} />
              <Route path="/branches" element={<Branches />} />
              <Route path="/tour" element={<Tour />} />
              <Route path="/events" element={<Events />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;
