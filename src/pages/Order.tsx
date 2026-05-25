import { motion } from "framer-motion";
import { ExternalLink, Bike, ShoppingBag, Phone } from "lucide-react";

const platforms = [
  {
    name: "Talabat",
    description: "Fast delivery across Abu Dhabi",
    icon: Bike,
    url: "https://www.talabat.com/uae/caffeino",
    color: "#FF5A00",
  },
  {
    name: "Noon Food",
    description: "Order via Noon Food",
    icon: ShoppingBag,
    url: "https://food.noon.com/outlet/CFFNZQ5PEE-Caffeino/",
    color: "#F7C30F",
  },
  {
    name: "Order by Phone",
    description: "Call us directly to order",
    icon: Phone,
    url: "tel:+97126668887",
    color: "#A23A2D",
  },
];

export default function Order() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-16"
    >
      <div className="section-padding max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Order Online
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-primary mb-4">
            Your Coffee, Delivered
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Order your favorite Caffeino dishes and drinks through your preferred delivery platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {platforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-8 hover:border-accent/50 transition-all group"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${platform.color}15` }}
              >
                <platform.icon
                  className="w-7 h-7"
                  style={{ color: platform.color }}
                />
              </div>
              <h3 className="text-text-primary text-xl font-medium mb-2 group-hover:text-accent transition-colors">
                {platform.name}
              </h3>
              <p className="text-text-secondary text-sm">{platform.description}</p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 glass-card rounded-xl p-8 text-center"
        >
          <h3 className="text-text-primary text-xl font-medium mb-3">
            Prefer to Dine In?
          </h3>
          <p className="text-text-secondary mb-6">
            Visit any of our four locations across Abu Dhabi for the full Caffeino experience.
          </p>
          <a href="/branches" className="btn-primary inline-flex items-center gap-2">
            Find a Branch
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
