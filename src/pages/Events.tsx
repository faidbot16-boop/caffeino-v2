import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Coffee Cupping Workshop",
    date: "Every Saturday",
    time: "10:00 AM - 12:00 PM",
    location: "Marina Al Bateen",
    description: "Learn to taste and evaluate specialty coffee like a pro. Limited to 12 participants.",
    price: "AED 120",
  },
  {
    id: 2,
    title: "Latte Art Masterclass",
    date: "First Sunday of Month",
    time: "2:00 PM - 4:00 PM",
    location: "Khalifa City",
    description: "Master the art of pouring beautiful latte art. Perfect for home baristas.",
    price: "AED 150",
  },
  {
    id: 3,
    title: "Live Acoustic Nights",
    date: "Every Friday",
    time: "7:00 PM - 10:00 PM",
    location: "All Branches",
    description: "Enjoy live acoustic performances while sipping your favorite coffee.",
    price: "Free Entry",
  },
  {
    id: 4,
    title: "Kids Baking Workshop",
    date: "Last Sunday of Month",
    time: "11:00 AM - 1:00 PM",
    location: "Al Bahia",
    description: "Fun baking session for kids aged 6-12. Parents enjoy complimentary coffee.",
    price: "AED 80",
  },
];

export default function Events() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-16"
    >
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            What's Happening
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-primary mb-4">
            Events at Caffeino
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Join us for workshops, live music, and special gatherings.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-8 hover:border-accent/50 transition-all"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <span className="px-3 py-1 rounded-full bg-bg-elevated text-accent text-sm font-medium">
                  {event.price}
                </span>
              </div>
              
              <h3 className="text-text-primary text-xl font-medium mb-2">{event.title}</h3>
              <p className="text-text-secondary text-sm mb-4">{event.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-text-muted">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 glass-card rounded-xl p-8 text-center"
        >
          <h3 className="text-text-primary text-xl font-medium mb-3">
            Want to Host an Event?
          </h3>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Our spaces are available for private events, corporate gatherings, and celebrations.
          </p>
          <a href="/contact" className="btn-primary inline-flex items-center gap-2">
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
