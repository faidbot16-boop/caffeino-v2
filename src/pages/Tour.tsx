import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, RotateCcw, ExternalLink } from "lucide-react";
import { branches } from "../lib/branchData";

export default function Tour() {
  const [activeBranch, setActiveBranch] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);

  const handleBranchChange = (index: number) => {
    setActiveBranch(index);
    setIframeKey((k) => k + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-16 min-h-screen"
    >
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Locations
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-primary mb-4">
            Find Us
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Explore all 5 Caffeino locations across Abu Dhabi.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {branches.map((branch, index) => (
            <motion.button
              key={branch.id}
              onClick={() => handleBranchChange(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeBranch === index
                  ? "bg-accent text-white shadow-lg shadow-accent/20"
                  : "bg-bg-warm text-text-secondary hover:text-text-primary border border-border hover:border-accent/30"
              }`}
            >
              <MapPin className="w-4 h-4" />
              {branch.name}
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeBranch}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-2xl overflow-hidden glass-card shadow-2xl"
        >
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <div className="glass-card px-4 py-2 rounded-lg flex items-center gap-2 shadow-md">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-text-primary text-sm font-medium">
                {branches[activeBranch].name}
              </span>
            </div>
          </div>

          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button
              onClick={() => setIframeKey((k) => k + 1)}
              className="glass-card p-2 rounded-lg text-text-secondary hover:text-accent transition-colors shadow-md"
              title="Reset view"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          <iframe
            key={iframeKey}
            src={branches[activeBranch].mapEmbed}
            width="100%"
            height="600"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${branches[activeBranch].name} Location`}
            className="w-full"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg-cream/95 via-bg-cream/80 to-transparent p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-text-primary font-semibold text-lg">
                  {branches[activeBranch].name}
                </h3>
                <p className="text-text-secondary text-sm">
                  {branches[activeBranch].address}
                </p>
              </div>
              <a
                href={branches[activeBranch].mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-all shadow-md shadow-accent/20 inline-flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open in Maps
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
