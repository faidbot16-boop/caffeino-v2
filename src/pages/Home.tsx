import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, Truck, MapPin, Clock } from "lucide-react";
import { featuredItems } from "../lib/menuData";
import { reviews } from "../lib/reviewData";
import { branches } from "../lib/branchData";

// Animated steam particles
function SteamParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 bg-accent/20 rounded-full blur-sm"
          style={{
            left: `${45 + i * 3}%`,
            bottom: "20%",
            height: `${40 + i * 20}px`,
          }}
          animate={{
            y: [-20, -200],
            opacity: [0, 0.4, 0],
            scaleY: [1, 1.5],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-bg-dark to-bg-surface" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
      
      <SteamParticles />
      
      <div className="relative z-10 text-center section-padding max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            Abu Dhabi's Finest Specialty Coffee
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-6"
        >
          <span className="text-text-primary">Where Every</span>
          <br />
          <span className="gradient-text">Sip Tells</span>
          <br />
          <span className="text-text-primary">a Story</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Single-origin coffee, artisanal pastries, and all-day brunch 
          served across four iconic Abu Dhabi locations.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/menu" className="btn-primary inline-flex items-center gap-2">
            Explore Menu
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/order"
            className="px-6 py-3 rounded-full border border-border text-text-primary hover:border-accent hover:text-accent transition-all"
          >
            Order Online
          </Link>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-8 mt-16"
        >
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent">4</div>
            <div className="text-text-muted text-sm">Locations</div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent">60+</div>
            <div className="text-text-muted text-sm">Menu Items</div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent">5.4k+</div>
            <div className="text-text-muted text-sm">Reviews</div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// About Section
function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-6">
              Born from a Love of Coffee
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              An Abu Dhabi based entrepreneur and coffee lover embarked on her journey 
              to share her passion for coffee with the people of the UAE. Caffeino 
              represents the journey of a thousand miles, told through its menu.
            </p>
            <p className="text-text-secondary leading-relaxed mb-8">
              Located at Al Bateen Marina, our cozy atmosphere is the best spot to be 
              with family or friends. We open our doors early with a range of all-day 
              breakfast and selective choices of bread from our own bakery.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-text-secondary">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-sm">Open Daily 7AM – 12AM</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="text-sm">4 Abu Dhabi Locations</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            style={{ y }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-bg-surface">
              <img
                src="/images/menu/breakfast/5cc0d3a3f9faf6ed42723555f236366a.jpg"
                alt="Caffeino interior"
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 glass-card rounded-xl p-6 max-w-[200px]">
              <div className="text-3xl font-bold text-accent mb-1">6+</div>
              <div className="text-text-secondary text-sm">Years of Brewing Excellence</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Featured Menu Section
function FeaturedMenuSection() {
  return (
    <section className="py-24 lg:py-32 bg-bg-surface">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Menu Highlights
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
            Fan Favorites
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Our most loved dishes, crafted with passion and the finest ingredients.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item?.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-bg-elevated mb-4">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-text-primary font-medium mb-1">{item?.name}</h3>
              <p className="text-text-muted text-sm">Caffeino Specialty</p>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/menu" className="btn-primary inline-flex items-center gap-2">
            View Full Menu
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Reviews Section
function ReviewsSection() {
  return (
    <section className="py-24 lg:py-32 overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
            What Our Guests Say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-accent text-accent" />
            ))}
            <span className="text-text-primary font-medium ml-2">4.8</span>
            <span className="text-text-muted">(5,400+ reviews)</span>
          </div>
        </motion.div>
        
        {/* Scrolling marquee */}
        <div className="relative">
          <div className="flex gap-6 animate-marquee">
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="flex-shrink-0 w-[350px] glass-card rounded-xl p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-4">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-medium">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-text-primary text-sm font-medium">{review.name}</div>
                    <div className="text-text-muted text-xs">{review.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Food Trucks Section
function FoodTrucksSection() {
  return (
    <section className="py-24 lg:py-32 bg-bg-surface">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-bg-elevated">
              <img
                src="/images/menu/toasties/24cd85ce2ad485a7917c1d9113897f73.jpg"
                alt="Caffeino Food Truck"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
              On The Move
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-6">
              Caffeino Food Trucks
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              Our food trucks are ideal for business districts, parks, festivals, and even 
              personal events like weddings and birthday celebrations. Equipped with a full-scale 
              café kitchen, each truck delivers the quality that our customers expect.
            </p>
            <p className="text-text-secondary leading-relaxed mb-8">
              We make it easier for consumers to gain access to the coffee they love, 
              wherever they are in Abu Dhabi.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Truck, label: "Event Catering" },
                { icon: MapPin, label: "Multiple Locations" },
                { icon: Clock, label: "Flexible Hours" },
                { icon: Star, label: "Same Quality" },
              ].map((feature) => (
                <div key={feature.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-text-secondary text-sm">{feature.label}</span>
                </div>
              ))}
            </div>
            
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Book For Your Event
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Branches Preview
function BranchesPreview() {
  return (
    <section className="py-24 lg:py-32">
      <div className="section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">
            Visit Us
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">
            Four Locations, One Experience
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Find your nearest Caffeino and enjoy our signature coffee and dishes.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {branches.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-6 hover:border-accent/50 transition-colors group"
            >
              <h3 className="text-text-primary font-medium text-lg mb-2">{branch.name}</h3>
              <p className="text-text-secondary text-sm mb-4">{branch.address}</p>
              <div className="flex items-center gap-2 text-text-muted text-sm mb-4">
                <Clock className="w-4 h-4" />
                <span>{branch.hours.weekday}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {branch.features.slice(0, 2).map((feature) => (
                  <span
                    key={feature}
                    className="text-xs px-2 py-1 rounded-full bg-bg-elevated text-text-secondary"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/branches" className="btn-primary inline-flex items-center gap-2">
            View All Branches
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Main Home Page
export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <AboutSection />
      <FeaturedMenuSection />
      <ReviewsSection />
      <FoodTrucksSection />
      <BranchesPreview />
    </motion.div>
  );
}
