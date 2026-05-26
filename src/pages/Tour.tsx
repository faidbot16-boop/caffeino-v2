import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, RotateCcw, ExternalLink, Maximize } from "lucide-react";
import { branches } from "../lib/branchData";

export default function Tour() {
  const [activeBranch, setActiveBranch] = useState(0);

  const currentBranch = branches[activeBranch];
  const isStreetView = !!currentBranch.streetView;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-16 min-h-screen bg-bg-cream">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">Locations</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-primary mb-4">Virtual Tour</h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Step inside Caffeino from anywhere. {isStreetView ? "Explore our flagship Al Bateen Marina location in stunning 360° detail." : "Browse all 5 Caffeino locations."}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {branches.map((branch, index) => (
            <motion.button
              key={branch.id}
              onClick={() => setActiveBranch(index)}
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
              {branch.streetView && (
                <span className="ml-1 text-[10px] bg-accent/20 px-1.5 py-0.5 rounded-full">360°</span>
              )}
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeBranch}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-2xl overflow-hidden border-2 border-accent/20 bg-bg-espresso shadow-2xl"
        >
          <div className="bg-accent/10 px-5 py-3 flex items-center justify-between border-b border-accent/20">
            <div>
              <h3 className="font-serif text-lg md:text-xl font-bold text-text-primary">{currentBranch.name}</h3>
              <p className="text-text-muted text-xs mt-0.5">
                {isStreetView ? "Interactive 360° Street View — Click and drag to look around" : "Google Maps view"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const iframe = document.querySelector<HTMLIFrameElement>("#tour-iframe");
                  if (iframe) {
                    if (document.fullscreenElement) {
                      document.exitFullscreen();
                    } else {
                      iframe.requestFullscreen().catch(() => {});
                    }
                  }
                }}
                className="p-2 bg-bg-white rounded-lg border border-border hover:bg-accent/10 transition-colors"
                title="Toggle fullscreen"
              >
                <Maximize className="w-4 h-4 text-text-secondary" />
              </button>
              <button
                onClick={() => { setActiveBranch(activeBranch); }}
                className="p-2 bg-bg-white rounded-lg border border-border hover:bg-accent/10 transition-colors"
                title="Reset view"
              >
                <RotateCcw className="w-5 h-5 text-text-secondary" />
              </button>
              <a
                href={currentBranch.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-bg-white rounded-lg border border-border hover:bg-accent/10 transition-colors"
                title="Open in Google Maps"
              >
                <ExternalLink className="w-4 h-4 text-text-secondary" />
              </a>
            </div>
          </div>

          <div className="relative" style={{ paddingBottom: "56.25%" }}>
            <iframe
              id="tour-iframe"
              src={isStreetView ? currentBranch.streetView : currentBranch.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Caffeino ${currentBranch.name}`}
              className="absolute inset-0"
            />
          </div>
        </motion.div>

        {isStreetView && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="p-6 rounded-xl glass-card">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <RotateCcw className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif text-lg font-bold text-text-primary">360° Panoramic View</h3>
              <p className="mt-2 text-text-secondary text-sm">Click and drag to rotate the camera. Scroll to zoom in and out for a closer look.</p>
            </div>
            <div className="p-6 rounded-xl glass-card">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif text-lg font-bold text-text-primary">Al Bateen Marina</h3>
              <p className="mt-2 text-text-secondary text-sm">Our flagship location on the waterfront. Indoor and outdoor seating with stunning marina views.</p>
            </div>
            <div className="p-6 rounded-xl glass-card">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <ExternalLink className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif text-lg font-bold text-text-primary">Visit in Person</h3>
              <p className="mt-2 text-text-secondary text-sm">Nothing beats the real experience. Come visit us for the perfect blend of coffee and atmosphere.</p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-8 rounded-xl overflow-hidden glass-card p-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-text-primary">{currentBranch.name}</h3>
              <p className="text-text-secondary text-sm mt-1">{currentBranch.address}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {currentBranch.features.map((f) => (
                  <span key={f} className="px-2.5 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">{f}</span>
                ))}
              </div>
            </div>
            <a
              href={currentBranch.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-6 py-3 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-all shadow-md shadow-accent/20 inline-flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Open in Google Maps
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}