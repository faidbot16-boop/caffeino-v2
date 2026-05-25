import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight } from "lucide-react";
import { menuCategories, type MenuItem } from "../lib/menuData";

function MenuItemCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <div className="aspect-square rounded-xl overflow-hidden bg-bg-elevated mb-3">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <h3 className="text-text-primary font-medium text-sm group-hover:text-accent transition-colors">
        {item.name}
      </h3>
    </motion.div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = searchQuery
    ? menuCategories.flatMap((cat) => cat.items).filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : menuCategories[activeCategory]?.items || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-16"
    >
      {/* Header */}
      <div className="section-padding max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Our Menu
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-primary mb-4">
            Crafted With Passion
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            From specialty coffee to artisanal pastries, every item is made with the finest ingredients.
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-bg-surface border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Categories */}
        {!searchQuery && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {menuCategories.map((category, index) => (
              <button
                key={category.slug}
                onClick={() => setActiveCategory(index)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === index
                    ? "bg-accent text-bg-dark"
                    : "bg-bg-surface text-text-secondary hover:text-text-primary border border-border"
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-60">({category.items.length})</span>
              </button>
            ))}
          </div>
        )}

        {/* Results count */}
        {searchQuery && (
          <p className="text-center text-text-muted mb-8">
            Found {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={searchQuery ? "search" : activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {filteredItems.map((item, index) => (
              <MenuItemCard key={item.name} item={item} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-muted">No items found.</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="section-padding max-w-7xl mx-auto">
        <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-text-primary mb-4">
            Can't Decide?
          </h2>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Our baristas are happy to recommend the perfect dish based on your preferences.
          </p>
          <a
            href="https://caffeino-uae.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            Order Online Now
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
