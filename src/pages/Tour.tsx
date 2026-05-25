import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Play, RotateCcw } from "lucide-react";
import { branches } from "../lib/branchData";

export default function Tour() {
  const [activeBranch, setActiveBranch] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  const tourUrl = "https://www.google.com/maps/embed?pb=!4v1704067200000!6m8!1m7!1sCAoSLEFGMVFpcE1VZUdXZjBiU3dLRzVhb1VLZGpWcmJkZXpOTm1tRkVZbDVEZ2dM!2m2!1d24.4539!2d54.3773!3f80!4f0!5f0.7820865974627469";

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
            Virtual Experience
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-primary mb-4">
            360° Tour
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Explore our flagship location from anywhere in the world.
          </p>
        </motion.div>

        {/* Branch Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {branches.map((branch, index) => (
            <button
              key={branch.id}
              onClick={() => {
                setActiveBranch(index);
                setIsLoading(true);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeBranch === index
                  ? "bg-accent text-bg-dark"
                  : "bg-bg-warm text-text-secondary hover:text-text-primary border border-border"
              }`}
            >
              <MapPin className="w-4 h-4" />
              {branch.name}
            </button>
          ))}
        </div>

        {/* Tour Container */}
        <div className="relative rounded-2xl overflow-hidden glass-card">
          {/* Intro Overlay */}
          {showIntro && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 bg-bg-cream/95 flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary mb-4">
                  Welcome to {branches[activeBranch].name}
                </h2>
                <p className="text-text-secondary mb-8 max-w-md">
                  Take a virtual walk through our space. Use your mouse or touch to look around.
                </p>
                <button
                  onClick={() => setShowIntro(false)}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Start Experience
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading && !showIntro && (
            <div className="absolute inset-0 z-10 bg-bg-cream flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-text-secondary">Loading virtual tour...</p>
              </div>
            </div>
          )}

          {/* Custom Controls Overlay */}
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <div className="glass-card px-4 py-2 rounded-lg flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-text-primary text-sm font-medium">
                {branches[activeBranch].name}
              </span>
            </div>
          </div>

          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button
              onClick={() => setIsLoading(true)}
              className="glass-card p-2 rounded-lg text-text-secondary hover:text-accent transition-colors"
              title="Reset view"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Street View Iframe */}
          <iframe
            src={tourUrl}
            width="100%"
            height="600"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${branches[activeBranch].name} 360 Tour`}
            onLoad={() => setIsLoading(false)}
            className="w-full"
          />

          {/* Bottom Info Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg-cream/90 to-transparent p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-text-primary font-medium">{branches[activeBranch].name}</h3>
                <p className="text-text-secondary text-sm">{branches[activeBranch].address}</p>
              </div>
              <a
                href={`https://www.google.com/maps/place/Caffeino/@24.4539,54.3773,17z`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-accent text-bg-dark text-sm font-medium hover:bg-accent-hover transition-colors"
              >
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
