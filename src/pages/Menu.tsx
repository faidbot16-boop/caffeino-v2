import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, Sparkles } from "lucide-react";
import { menuCategories, type MenuItem } from "../lib/menuData";
import TiltCard from "../components/TiltCard";

function MenuItemCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex-shrink-0 w-[180px] md:w-[220px] lg:w-[260px] cursor-pointer"
    >
      <TiltCard tiltAmount={8} className="rounded-2xl overflow-hidden bg-bg-espresso/40 shadow-lg">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-espresso/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
        <h3 className="text-text-light font-medium text-sm text-center px-3 py-3 leading-snug hover:text-accent transition-colors bg-bg-espresso/60">
          {item.name}
        </h3>
      </TiltCard>
    </motion.div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredItems = searchQuery
    ? menuCategories.flatMap((cat) => cat.items).filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : menuCategories[activeCategory]?.items || [];

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current && !searchQuery) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Header */}
      <div className="relative pt-24 pb-16 bg-gradient-to-b from-bg-espresso to-bg-mocha overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="section-padding max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-gold text-sm font-medium tracking-wider uppercase mb-4">
              <Sparkles className="w-4 h-4" />
              Our Menu
              <Sparkles className="w-4 h-4" />
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-light mb-4">
              Crafted With Passion
            </h1>
            <p className="text-text-light/60 max-w-xl mx-auto">
              From specialty coffee to artisanal pastries, every item is made with the finest ingredients.
            </p>
          </motion.div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light/40" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white/5 border border-white/10 text-text-light placeholder:text-text-light/30 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Category Tabs */}
          {!searchQuery && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {menuCategories.map((category, index) => (
                <motion.button
                  key={category.slug}
                  onClick={() => setActiveCategory(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === index
                      ? "bg-gold text-bg-espresso shadow-lg shadow-gold/20"
                      : "bg-white/5 text-text-light/60 hover:text-text-light hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-50">({category.items.length})</span>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Items Section */}
      <div className="bg-bg-cream">
        <div className="section-padding max-w-7xl mx-auto">
          {searchQuery && (
            <p className="text-center text-text-muted mb-8 pt-8">
              Found {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}
            </p>
          )}

          {/* Horizontal Scroll View */}
          {!searchQuery ? (
            <div
              ref={scrollRef}
              onWheel={handleWheel}
              className="flex gap-5 overflow-x-auto pb-8 pt-4 px-2 -mx-2 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {filteredItems.map((item, index) => (
                <div key={item.name} className="snap-start">
                  <MenuItemCard item={item} index={index} />
                </div>
              ))}
            </div>
          ) : (
            /* Grid for search results */
            <AnimatePresence mode="wait">
              <motion.div
                key="search"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pt-8"
              >
                {filteredItems.map((item, index) => (
                  <MenuItemCard key={item.name} item={item} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-muted">No items found. Try a different search.</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-bg-cream">
        <div className="section-padding max-w-7xl mx-auto pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-bg-espresso to-bg-mocha p-10 md:p-16 text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-light mb-4">
                Can't Decide?
              </h2>
              <p className="text-text-light/60 mb-8 max-w-md mx-auto">
                Our baristas are happy to recommend the perfect dish based on your preferences.
              </p>
              <a
                href="https://caffeino-uae.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold text-bg-espresso font-semibold hover:bg-gold/90 transition-all shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
              >
                Order Online Now
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
