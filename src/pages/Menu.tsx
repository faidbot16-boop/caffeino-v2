import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, X, Grid3X3 } from "lucide-react";
import { menuCategories, categoryIcons, type MenuItem } from "../lib/menuData";

function MenuItemRow({ item, delay }: { item: MenuItem; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex items-start gap-4 py-4 px-2 border-b border-border/50 hover:bg-bg-warm/50 rounded-lg transition-colors duration-200"
    >
      {item.image && (
        <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-bg-warm">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      {!item.image && (
        <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl bg-bg-warm flex items-center justify-center">
          <span className="text-2xl opacity-30">{categoryIcons[menuCategories.find(c => c.items.includes(item))?.slug || ""] || "🍽️"}</span>
        </div>
      )}
      <div className="flex-1 min-w-0 pt-1">
        <h3 className="font-sans text-sm md:text-base font-semibold text-text-primary group-hover:text-accent transition-colors duration-200">
          {item.name}
        </h3>
        {item.description && (
          <p className="mt-1 text-xs md:text-sm text-text-muted leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
      <span className="flex-shrink-0 font-serif text-lg md:text-xl font-bold text-accent pt-1">
        AED {item.price}
      </span>
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
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-bg-cream border-t border-border rounded-t-2xl shadow-2xl px-4 pt-6 pb-8 max-h-[60vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-text-primary font-semibold text-lg">Quick Menu</h3>
            <button onClick={onClose} className="p-2 text-text-muted hover:text-text-primary">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {categories.map((cat, i) => (
              <button
                key={cat.slug}
                onClick={() => { onSelect(i); onClose(); }}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all text-xs ${
                  activeCat === i ? "bg-accent text-white shadow-lg shadow-accent/20" : "bg-bg-card text-text-secondary hover:bg-border"
                }`}
              >
                <span className="text-lg">{categoryIcons[cat.slug] || "🍽️"}</span>
                <span className="font-medium text-center leading-tight">{cat.name}</span>
                <span className="opacity-60">{cat.items.length}</span>
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
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filteredCategories = searchQuery
    ? menuCategories
        .map((cat) => ({ ...cat, items: cat.items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))) }))
        .filter((cat) => cat.items.length > 0)
    : menuCategories;

  useEffect(() => {
    const handleScroll = () => {
      const els = Object.values(categoryRefs.current).filter(Boolean) as HTMLDivElement[];
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom > 200) {
          const idx = menuCategories.findIndex((c) => c.slug === el.id);
          if (idx !== -1) setActiveCategory(idx);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCategory = (index: number) => {
    const cat = menuCategories[index];
    const el = categoryRefs.current[cat.slug];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setActiveCategory(index);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-light mb-4">Explore Our Menu</h1>
            <p className="text-text-light/50 max-w-xl mx-auto">{menuCategories.length} categories &middot; {menuCategories.reduce((s, c) => s + c.items.length, 0)} items &middot; From artisan coffee to hearty meals</p>
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

      <div className="sticky top-16 lg:top-20 z-30 bg-bg-cream/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="section-padding max-w-7xl mx-auto py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {!searchQuery && menuCategories.map((category, index) => (
            <motion.button
              key={category.slug}
              onClick={() => scrollToCategory(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                activeCategory === index
                  ? "bg-bg-espresso text-gold shadow-md"
                  : "bg-bg-card text-text-secondary hover:text-text-primary border border-border"
              }`}
            >
              <span className="mr-1">{categoryIcons[category.slug] || "🍽️"}</span>
              {category.name}
              <span className="ml-1.5 text-[10px] opacity-50">({category.items.length})</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="bg-bg-cream min-h-[60vh]">
        <div className="section-padding max-w-4xl mx-auto pt-8 pb-24">
          {searchQuery && (
            <p className="text-center text-text-muted mb-6">
              Found {filteredCategories.reduce((s, c) => s + c.items.length, 0)} item{filteredCategories.reduce((s, c) => s + c.items.length, 0) !== 1 ? "s" : ""}
            </p>
          )}

          {filteredCategories.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-muted text-lg">No items found. Try a different search.</p>
            </div>
          )}

          {filteredCategories.map((category) => (
            <div
              key={category.slug}
              ref={(el) => { categoryRefs.current[category.slug] = el; }}
              id={category.slug}
              className="mb-12 scroll-mt-32"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="text-2xl">{categoryIcons[category.slug] || "🍽️"}</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-text-primary">{category.name}</h2>
                <span className="ml-auto text-text-muted text-sm">{category.items.length} item{category.items.length !== 1 ? "s" : ""}</span>
              </motion.div>
              <div className="space-y-1">
                {category.items.map((item, idx) => (
                  <MenuItemRow key={`${category.slug}-${item.name}`} item={item} delay={idx * 0.03} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-bg-cream">
        <div className="section-padding max-w-7xl mx-auto pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-bg-espresso to-bg-mocha p-10 md:p-16 text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-light mb-4">Prefer to order from home?</h2>
              <p className="text-text-light/50 mb-8 max-w-md mx-auto">Get your favorites delivered through Talabat, NoonFoods, or give us a call.</p>
              <a
                href="https://caffeino-uae.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold text-bg-espresso font-semibold hover:bg-gold/90 transition-all shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30"
              >
                Order Online Now
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <button
        onClick={() => setShowQuickMenu(true)}
        className="fixed bottom-20 right-6 z-40 lg:hidden w-14 h-14 bg-bg-espresso text-gold rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
      >
        <Grid3X3 className="w-6 h-6" />
      </button>

      <QuickMenu
        categories={menuCategories}
        activeCat={activeCategory}
        onSelect={scrollToCategory}
        isOpen={showQuickMenu}
        onClose={() => setShowQuickMenu(false)}
      />
    </motion.div>
  );
}