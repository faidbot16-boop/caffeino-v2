import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import { merchItems } from "../lib/menuData";

const productImages: Record<string, string> = {
  "mug-01": "/images/product_mug.jpg",
  "tumbler-01": "/images/product_keepcup.jpg",
  "beans-01": "/images/product_beans.jpg",
  "tote-01": "/images/product_tote.jpg",
  "giftcard-01": "/images/product_giftcard.jpg",
};

export default function Merch() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

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
            Merchandise
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-primary mb-4">
            Take Caffeino Home
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Premium merchandise for the true coffee enthusiast. Crafted with the same attention to detail as our coffee.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {merchItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl overflow-hidden group hover:shadow-lg transition-shadow"
            >
              {/* Product Image */}
              <div className="aspect-square overflow-hidden bg-bg-card">
                {productImages[item.id] ? (
                  <img
                    src={productImages[item.id]}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-16 h-16 text-text-muted" />
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-text-primary font-medium text-lg mb-2">{item.name}</h3>
                <p className="text-text-secondary text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-accent text-xl font-bold">AED {item.price}</span>
                  {!item.inStock ? (
                    <span className="text-text-muted text-sm">Coming soon</span>
                  ) : (
                    <button
                      onClick={() => setSelectedProduct(selectedProduct === item.id ? null : item.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedProduct === item.id
                          ? "bg-green-500 text-white"
                          : "bg-accent text-white hover:bg-accent-hover"
                      }`}
                    >
                      {selectedProduct === item.id ? (
                        <span className="flex items-center gap-1">
                          <Check className="w-4 h-4" /> Added
                        </span>
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Shop coming soon notice */}
        <div className="mt-16 glass-card rounded-xl p-8 text-center">
          <ShoppingBag className="w-12 h-12 text-accent mx-auto mb-4" />
          <h3 className="text-text-primary text-xl font-medium mb-2">
            Full Shop Coming Soon
          </h3>
          <p className="text-text-secondary max-w-md mx-auto">
            We're working on integrating our full merchandise store. For now, visit any of our branches to purchase these items in person.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
