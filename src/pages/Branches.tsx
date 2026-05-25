import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, MessageCircle, Navigation, ExternalLink } from "lucide-react";
import { branches } from "../lib/branchData";

export default function Branches() {
  const [activeBranch, setActiveBranch] = useState(0);

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
            Our Locations
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-primary mb-4">
            Find Your Caffeino
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Four unique locations across Abu Dhabi, each with its own character and charm.
          </p>
        </motion.div>

        {/* Branch Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {branches.map((branch, index) => (
            <button
              key={branch.id}
              onClick={() => setActiveBranch(index)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeBranch === index
                  ? "bg-accent text-white"
                  : "bg-bg-warm text-text-secondary hover:text-text-primary border border-border"
              }`}
            >
              {branch.name}
            </button>
          ))}
        </div>

        {/* Active Branch Detail */}
        <motion.div
          key={activeBranch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Info Card */}
          <div className="glass-card rounded-2xl p-8">
            <h2 className="text-3xl font-serif font-bold text-text-primary mb-6">
              {branches[activeBranch].name}
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-text-primary font-medium">Address</p>
                  <p className="text-text-secondary text-sm">{branches[activeBranch].address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-text-primary font-medium">Phone</p>
                  <a 
                    href={`tel:${branches[activeBranch].phone.replace(/\s/g, "")}`}
                    className="text-text-secondary text-sm hover:text-accent transition-colors"
                  >
                    {branches[activeBranch].phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-text-primary font-medium">Hours</p>
                  <p className="text-text-secondary text-sm">
                    Mon-Fri: {branches[activeBranch].hours.weekday}
                  </p>
                  <p className="text-text-secondary text-sm">
                    Sat-Sun: {branches[activeBranch].hours.weekend}
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-8">
              {branches[activeBranch].features.map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1.5 rounded-full bg-bg-card text-text-secondary text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href={branches[activeBranch].whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href={branches[activeBranch].mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full border border-border text-text-primary hover:border-accent hover:text-accent transition-all text-sm inline-flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Directions
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <iframe
              src={branches[activeBranch].mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${branches[activeBranch].name} Location`}
              className="w-full h-full min-h-[400px]"
            />
          </div>
        </motion.div>

        {/* All Branches Grid */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-text-primary mb-8 text-center">
            All Locations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {branches.map((branch, index) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveBranch(index)}
                className={`glass-card rounded-xl p-6 cursor-pointer transition-all ${
                  activeBranch === index ? "border-accent" : "hover:border-accent/50"
                }`}
              >
                <h3 className="text-text-primary font-medium mb-2">{branch.name}</h3>
                <p className="text-text-secondary text-sm mb-3">{branch.address}</p>
                <p className="text-text-muted text-xs">{branch.phone}</p>
                <a
                  href={branch.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-accent text-xs mt-2 hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  Open in Maps
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
