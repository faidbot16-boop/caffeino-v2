import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Check, X, Plus } from "lucide-react";
import { useCart } from "../lib/cartContext";
import { merchItems } from "../lib/menuData";

const productImages: Record<string, string> = {
  "mug-01": "/images/product_mug.jpg",
  "tumbler-01": "/images/product_keepcup.jpg",
  "beans-01": "/images/product_beans.jpg",
  "tote-01": "/images/product_tote.jpg",
  "giftcard-01": "/images/product_giftcard.jpg",
};

function ProductModal({ item, onClose }: { item: typeof merchItems[0]; onClose: () => void }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: productImages[item.id],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-bg-cream rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-video overflow-hidden">
          <img
            src={productImages[item.id]}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-2xl font-serif font-bold text-text-primary">{item.name}</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-bg-card flex items-center justify-center text-text-secondary hover:text-accent">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-text-secondary mb-4">{item.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-accent">AED {item.price}</span>
            {!item.inStock ? (
              <span className="text-text-muted">Coming soon</span>
            ) : (
              <button
                onClick={handleAdd}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-accent text-white hover:bg-accent-hover"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Merch() {
  const { addItem } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const handleAdd = (item: typeof merchItems[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: productImages[item.id],
    });
    setAddedIds((prev) => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 2000);
  };

  const selectedItem = merchItems.find((i) => i.id === selectedProduct);

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
              className="glass-card rounded-xl overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedProduct(item.id)}
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
                <div className="flex items-center justify-between">
                  <span className="text-accent text-xl font-bold">AED {item.price}</span>
                  {!item.inStock ? (
                    <span className="text-text-muted text-sm">Coming soon</span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAdd(item);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        addedIds.has(item.id)
                          ? "bg-green-500 text-white"
                          : "bg-accent text-white hover:bg-accent-hover"
                      }`}
                    >
                      {addedIds.has(item.id) ? (
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

      {/* Product Modal */}
      {selectedItem && (
        <ProductModal item={selectedItem} onClose={() => setSelectedProduct(null)} />
      )}
    </motion.div>
  );
}
