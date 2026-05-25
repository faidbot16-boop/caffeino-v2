import { useRef, useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Star, Truck, MapPin, Clock } from "lucide-react";
import { featuredItems } from "../lib/menuData";
import { reviews } from "../lib/reviewData";
import { branches } from "../lib/branchData";
import TiltCard from "../components/TiltCard";

function CinematicReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [0.92, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 1], [0, 1, 1]);
  const filter = useTransform(scrollYProgress, [0, 0.3], ["blur(6px)", "blur(0px)"]);
  return (
    <motion.div ref={ref} style={{ scale, opacity, filter } as any} className={className}>
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.max(1, Math.floor(target / 30));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 40);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return <div ref={ref} className="text-2xl md:text-3xl font-bold text-accent">{count}{suffix}</div>;
}

function SteamParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 bg-accent/20 rounded-full blur-sm"
          style={{ left: `${45 + i * 3}%`, bottom: "20%", height: `${40 + i * 20}px` }}
          animate={{ y: [-20, -200], opacity: [0, 0.4, 0], scaleY: [1, 1.5] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.85]);
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const statsY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ scale: videoScale }} className="absolute inset-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover"
          poster="/images/menu/breakfast/5cc0d3a3f9faf6ed42723555f236366a.jpg">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <motion.div style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      </motion.div>

      <SteamParticles />

      <div className="relative z-10 section-padding max-w-5xl mx-auto pt-16">
        <motion.div style={{ y: logoY, opacity: textOpacity }}
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }} className="mb-8 md:mb-10">
          <img src="/logo.png" alt="Caffeino"
            className="h-14 md:h-16 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]" />
        </motion.div>

        <motion.div style={{ y: textY, opacity: textOpacity }} className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}>
            <span className="inline-block px-5 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6 backdrop-blur-md border border-white/10">
              Abu Dhabi's Finest Specialty Coffee
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-6">
            <span className="text-white">Where Every</span><br />
            <span className="text-accent">Sip Tells</span><br />
            <span className="text-white">a Story</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
            Single-origin coffee, artisanal pastries, and all-day brunch
            served across five iconic Abu Dhabi locations.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/menu" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-3.5 shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 transition-all">
              Explore Menu<ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/order" className="px-8 py-3.5 rounded-full border border-white/30 text-white hover:border-white/60 hover:bg-white/10 transition-all text-base backdrop-blur-sm">
              Order Online
            </Link>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: statsY }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center justify-center gap-8 mt-20">
          <div className="text-center"><AnimatedCounter target={5} /><div className="text-white/60 text-sm mt-1">Locations</div></div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-center"><AnimatedCounter target={62} /><div className="text-white/60 text-sm mt-1">Menu Items</div></div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-center"><div className="text-2xl md:text-3xl font-bold text-accent">5.4k+</div><div className="text-white/60 text-sm mt-1">Reviews</div></div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      <CinematicReveal>
        <div className="section-padding max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-6">Born from a Love of Coffee</h2>
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
                <div className="flex items-center gap-2 text-text-secondary"><Clock className="w-5 h-5 text-accent" /><span className="text-sm">Open Daily 7AM – 12AM</span></div>
                <div className="flex items-center gap-2 text-text-secondary"><MapPin className="w-5 h-5 text-accent" /><span className="text-sm">5 Abu Dhabi Locations</span></div>
              </div>
            </motion.div>
            <motion.div style={{ y }} className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-bg-warm">
                <img src="/images/menu/breakfast/5cc0d3a3f9faf6ed42723555f236366a.jpg" alt="Caffeino interior"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="absolute -bottom-6 -left-6 glass-card rounded-xl p-6 max-w-[200px]">
                <div className="text-3xl font-bold text-accent mb-1">6+</div>
                <div className="text-text-secondary text-sm">Years of Brewing Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </CinematicReveal>
    </section>
  );
}

function FeaturedMenuSection() {
  return (
    <section className="py-24 lg:py-32 bg-bg-warm overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto">
        <CinematicReveal>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-16">
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">Menu Highlights</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">Fan Favorites</h2>
            <p className="text-text-secondary max-w-xl mx-auto">Our most loved dishes, crafted with passion and the finest ingredients.</p>
          </motion.div>
        </CinematicReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredItems.map((item, index) => (
            <motion.div key={item?.name}
              initial={{ opacity: 0, y: 50, rotateX: -5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}>
              <TiltCard className="rounded-xl overflow-hidden bg-bg-card shadow-md cursor-pointer" tiltAmount={6}>
                <div className="aspect-square overflow-hidden">
                  <img src={item?.image} alt={item?.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-out" />
                </div>
                <div className="p-4">
                  <h3 className="text-text-primary font-semibold mb-1.5 hover:text-accent transition-colors">{item?.name}</h3>
                  <p className="text-text-muted text-sm">Caffeino Specialty</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/menu" className="btn-primary inline-flex items-center gap-2">View Full Menu<ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const marqueeY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="py-24 lg:py-32 overflow-hidden">
      <div className="section-padding max-w-7xl mx-auto">
        <CinematicReveal>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-16">
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">What Our Guests Say</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-accent text-accent" />))}
              <span className="text-text-primary font-medium ml-2">4.8</span>
              <span className="text-text-muted">(5,400+ reviews)</span>
            </div>
          </motion.div>
        </CinematicReveal>

        <motion.div style={{ y: marqueeY }} className="relative overflow-hidden">
          <div className="flex gap-6 animate-marquee-fast">
            {[...reviews, ...reviews].map((review, index) => (
              <motion.div key={`${review.id}-${index}`} whileHover={{ scale: 1.02 }}
                className="flex-shrink-0 w-[340px] glass-card rounded-xl p-6 hover:shadow-lg hover:border-accent/20 transition-all">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-accent text-accent" />))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-4">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold">{review.name.charAt(0)}</div>
                  <div><div className="text-text-primary text-sm font-medium">{review.name}</div><div className="text-text-muted text-xs">{review.date}</div></div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-cream to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-cream to-transparent z-10 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}

function FoodTrucksSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-bg-warm overflow-hidden">
      <CinematicReveal>
        <div className="section-padding max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div style={{ y: imageY }} className="order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-bg-card shadow-lg">
                <img src="/images/menu/toasties/24cd85ce2ad485a7917c1d9113897f73.jpg" alt="Caffeino Food Truck"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }} className="order-1 lg:order-2">
              <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">On The Move</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-6">Caffeino Food Trucks</h2>
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
                {[{ icon: Truck, label: "Event Catering" }, { icon: MapPin, label: "Multiple Locations" },
                  { icon: Clock, label: "Flexible Hours" }, { icon: Star, label: "Same Quality" }]
                  .map((feature, i) => (
                    <motion.div key={feature.label} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center"><feature.icon className="w-5 h-5 text-accent" /></div>
                      <span className="text-text-secondary text-sm">{feature.label}</span>
                    </motion.div>
                  ))}
              </div>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">Book For Your Event<ArrowRight className="w-4 h-4" /></Link>
            </motion.div>
          </div>
        </div>
      </CinematicReveal>
    </section>
  );
}

function BranchesPreview() {
  return (
    <section className="py-24 lg:py-32">
      <div className="section-padding max-w-7xl mx-auto">
        <CinematicReveal>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-16">
            <span className="text-accent text-sm font-medium tracking-wider uppercase mb-4 block">Visit Us</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4">Five Locations, One Experience</h2>
            <p className="text-text-secondary max-w-xl mx-auto">Find your nearest Caffeino and enjoy our signature coffee and dishes.</p>
          </motion.div>
        </CinematicReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {branches.map((branch, index) => (
            <motion.div key={branch.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card rounded-xl p-6 hover:border-accent/50 transition-colors group">
              <h3 className="text-text-primary font-medium text-lg mb-2">{branch.name}</h3>
              <p className="text-text-secondary text-sm mb-4">{branch.address}</p>
              <div className="flex items-center gap-2 text-text-muted text-sm mb-4"><Clock className="w-4 h-4" /><span>{branch.hours.weekday}</span></div>
              <div className="flex flex-wrap gap-2">
                {branch.features.slice(0, 2).map((f) => (
                  <span key={f} className="text-xs px-2 py-1 rounded-full bg-bg-card text-text-secondary">{f}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/branches" className="btn-primary inline-flex items-center gap-2">View All Branches<ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedMenuSection />
      <ReviewsSection />
      <FoodTrucksSection />
      <BranchesPreview />
    </>
  );
}
