import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Globe, MessageSquare } from "lucide-react";
import { socialLinks, mainPhone, mainEmail } from "../../lib/branchData";

const footerLinks = {
  explore: [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Order Online", path: "/order" },
    { name: "Merch", path: "/merch" },
  ],
  company: [
    { name: "About Us", path: "/" },
    { name: "Branches", path: "/branches" },
    { name: "Events", path: "/events" },
    { name: "Careers", path: "/careers" },
  ],
  support: [
    { name: "Contact Us", path: "/contact" },
    { name: "360° Tour", path: "/tour" },
    { name: "FAQ", path: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-bg-warm border-t border-border">
      <div className="section-padding py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-white rounded-lg px-3 py-1.5 shadow-sm border border-border/50">
                <img src="/logo.png" alt="Caffeino" className="h-8 w-auto" />
              </div>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Abu Dhabi's premier specialty coffee destination. Serving carefully curated coffee, 
              artisanal pastries, and all-day brunch since 2018.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-bg-card flex items-center justify-center text-text-secondary hover:text-accent hover:bg-border transition-all"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-bg-card flex items-center justify-center text-text-secondary hover:text-accent hover:bg-border transition-all"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-bg-card flex items-center justify-center text-text-secondary hover:text-accent hover:bg-border transition-all"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-text-primary font-medium mb-4">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-text-secondary text-sm hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-text-primary font-medium mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-text-secondary text-sm hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-primary font-medium mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-text-secondary text-sm">
                  Al Bateen Marina, Abu Dhabi, UAE
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href={`tel:${mainPhone.replace(/\s/g, "")}`}
                  className="text-text-secondary text-sm hover:text-accent transition-colors"
                >
                  {mainPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href={`mailto:${mainEmail}`}
                  className="text-text-secondary text-sm hover:text-accent transition-colors"
                >
                  {mainEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} Caffeino. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">
            Crafted with passion in Abu Dhabi
          </p>
        </div>
      </div>
    </footer>
  );
}
