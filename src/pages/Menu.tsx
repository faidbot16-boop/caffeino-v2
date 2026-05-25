import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, Sparkles, X, Grid3X3 } from "lucide-react";
import { menuCategories, type MenuItem } from "../lib/menuData";
import TiltCard from "../components/TiltCard";

function MenuItemCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex-shrink-0 w-[170px] md:w-[220px] lg:w-[260px] cursor-pointer group"
    >
      <TiltCard tiltAmount={10} className="rounded-2xl overflow-hidden bg-bg-card shadow-lg">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-espresso/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
          {item.price && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              className="absolute bottom-3 left-3 bg-gold text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg"
            >
              AED {item.price}
            </motion.div>
          )}
        </div>
        <h3 className="text-text-primary font-medium text-sm text-center px-3 py-3 leading-snug group-hover:text-gold transition-colors bg-bg-card">
          {item.name}
        </h3>
      </TiltCard>
    </motion.div>
  );
}

function QuickMenu({ categories, activeCat, onSelect, isOpen, onClose }: {
  categories: typeof menuCategories;
  activeCat: number;
  onSelect: (i: number) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-bg-cream border-t border-border rounded-t-2xl shadow-2xl px-4 pt-6 pb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-text-primary font-semibold text-lg">Quick Menu</h3>
            <button onClick={onClose} className="p-2 text-text-muted hover:text-text-primary">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((cat, i) => (
              <button
                key={cat.slug}
                onClick={() => { onSelect(i); onClose(); }}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                  activeCat === i ? "bg-gold text-white shadow-lg shadow-gold/20" : "bg-bg-card text-text-secondary hover:bg-border"
                }`}
              >
                <span className="text-xs font-medium text-center leading-tight">{cat.name}</span>
                <span className="text-[10px] opacity-60">{cat.items.length}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredItems = searchQuery
    ? menuCategories.flatMap((cat) => cat.items).filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : menuCategories[activeCategory]?.items || [];

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current && !searchQuery && window.innerWidth > 1024) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero Header */}
      <div className="relative pt-24 pb-16 bg-gradient-to-b from-bg-espresso to-bg-mocha overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="section-padding max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <span className="inline-flex items-center gap-2 text-gold text-sm font-medium tracking-wider uppercase mb-4">
              <Sparkles className="w-4 h-4" /> Our Menu <Sparkles className="w-4 h-4" />
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-light mb-4">Crafted With Passion</h1>
            <p className="text-text-light/50 max-w-xl mx-auto">From specialty coffee to artisanal pastries, made with the finest ingredients.</p>
          </motion.div>

          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light/30" />
              <input type="text" placeholder="Search menu items..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white/5 border border-white/10 text-text-light placeholder:text-text-light/25 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all backdrop-blur-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills - Sticky */}
      <div className="sticky top-16 lg:top-20 z-30 bg-bg-cream/90 backdrop-blur-md border-b border-border">
        <div className="section-padding max-w-7xl mx-auto py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {!searchQuery && menuCategories.map((category, index) => (
            <motion.button key={category.slug} onClick={() => setActiveCategory(index)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                activeCategory === index
                  ? "bg-bg-espresso text-gold shadow-md"
                  : "bg-bg-card text-text-secondary hover:text-text-primary border border-border"
              }`}>
              {category.name}
              <span className="ml-1.5 text-[10px] opacity-50">({category.items.length})</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Items Section */}
      <div className="bg-bg-cream min-h-[60vh]">
        <div className="section-padding max-w-7xl mx-auto pt-6 pb-24">
          {searchQuery && (
            <p className="text-center text-text-muted mb-6">Found {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}</p>
          )}

          {!searchQuery ? (
            <div ref={scrollRef} onWheel={handleWheel}
              className="flex lg:flex-row flex-col gap-4 lg:gap-5 lg:overflow-x-auto lg:pb-8 lg:snap-x lg:snap-mandatory lg:scrollbar-hide">
              {filteredItems.map((item, index) => (
                <div key={item.name} className="lg:snap-start flex justify-center">
                  <MenuItemCard item={item} index={index} />
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredItems.map((item, index) => (
                  <MenuItemCard key={item.name} item={item} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {filteredItems.length === 0 && (
            <div className="text-center py-20"><p className="text-text-muted">No items found. Try a different search.</p></div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-bg-cream">
        <div className="section-padding max-w-7xl mx-auto pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-bg-espresso to-bg-mocha p-10 md:p-16 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-light mb-4">Can't Decide?</h2>
              <p className="text-text-light/50 mb-8 max-w-md mx-auto">Our baristas are happy to recommend the perfect dish.</p>
              <a href="https://caffeino-uae.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold text-bg-espresso font-semibold hover:bg-gold/90 transition-all shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30">
                Order Online Now <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Quick Menu FAB */}
      <button onClick={() => setShowQuickMenu(true)}
        className="fixed bottom-20 right-6 z-40 lg:hidden w-14 h-14 bg-bg-espresso text-gold rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform">
        <Grid3X3 className="w-6 h-6" />
      </button>

      <QuickMenu categories={menuCategories} activeCat={activeCategory} onSelect={setActiveCategory}
        isOpen={showQuickMenu} onClose={() => setShowQuickMenu(false)} />
    </motion.div>
  );
}
