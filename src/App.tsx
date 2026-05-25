import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CartProvider } from "./lib/cartContext";
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
import CustomCursor from "./components/CustomCursor";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const pageTransition = {
  duration: 0.35,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <Routes location={location}>
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
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-bg-cream text-text-primary">
          <Navbar />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
          <ChatBot />
          <CustomCursor />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
