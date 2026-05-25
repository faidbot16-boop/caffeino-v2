export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  hours: {
    weekday: string;
    weekend: string;
  };
  mapUrl: string;
  mapLink: string;
  features: string[];
}

export const branches: Branch[] = [
  {
    id: "marina-al-bateen",
    name: "Marina Al Bateen",
    address: "Al Bateen Marina, Abu Dhabi, UAE",
    phone: "+971 2 666 8887",
    whatsapp: "https://wa.me/97126668887",
    hours: {
      weekday: "7:00 AM – 11:00 PM",
      weekend: "7:00 AM – 12:00 AM",
    },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.123456789!2d54.3773!3d24.4539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e68697f20d6a5%3A0x1234567890abcdef!2sCaffeino%20Al%20Bateen%20Marina!5e0!3m2!1sen!2sae!4v1600000000000!5m2!1sen!2sae",
    mapLink: "https://maps.app.goo.gl/CaffeinoAlBateen",
    features: ["Indoor & Outdoor Seating", "Free WiFi", "Parking Available", "Pet Friendly Terrace", "Waterfront Views"],
  },
  {
    id: "mahawi",
    name: "Mahawi",
    address: "Mahawi, Abu Dhabi, UAE",
    phone: "+971 54 307 5777",
    whatsapp: "https://wa.me/971543075777",
    hours: {
      weekday: "7:00 AM – 11:00 PM",
      weekend: "7:00 AM – 12:00 AM",
    },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.123456789!2d54.3773!3d24.4539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e68697f20d6a5%3A0x1234567890abcdf0!2sCaffeino%20Mahawi!5e0!3m2!1sen!2sae!4v1600000000000!5m2!1sen!2sae",
    mapLink: "https://maps.app.goo.gl/CaffeinoMahawi",
    features: ["Indoor Seating", "Free WiFi", "Drive-Thru Available", "Quick Service"],
  },
  {
    id: "al-bahia",
    name: "Al Bahia",
    address: "Al Bahia, Abu Dhabi, UAE",
    phone: "+971 54 307 6777",
    whatsapp: "https://wa.me/971543076777",
    hours: {
      weekday: "7:00 AM – 11:00 PM",
      weekend: "7:00 AM – 12:00 AM",
    },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.123456789!2d54.3773!3d24.4539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e68697f20d6a5%3A0x1234567890abcdf1!2sCaffeino%20Al%20Bahia!5e0!3m2!1sen!2sae!4v1600000000000!5m2!1sen!2sae",
    mapLink: "https://maps.app.goo.gl/CaffeinoAlBahia",
    features: ["Indoor & Outdoor Seating", "Free WiFi", "Kids Play Area", "Family Friendly"],
  },
  {
    id: "khalifa-city",
    name: "Khalifa City",
    address: "Khalifa City, Abu Dhabi, UAE",
    phone: "+971 54 307 4777",
    whatsapp: "https://wa.me/971543074777",
    hours: {
      weekday: "7:00 AM – 11:00 PM",
      weekend: "7:00 AM – 12:00 AM",
    },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.123456789!2d54.3773!3d24.4539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e68697f20d6a5%3A0x1234567890abcdf2!2sCaffeino%20Khalifa%20City!5e0!3m2!1sen!2sae!4v1600000000000!5m2!1sen!2sae",
    mapLink: "https://maps.app.goo.gl/CaffeinoKhalifaCity",
    features: ["Indoor Seating", "Free WiFi", "Meeting Room Available", "Work Friendly"],
  },
];

export const mainPhone = "+971 2 666 8887";
export const mainEmail = "info@caffeino.ae";
export const orderUrl = "https://caffeino-uae.com";
export const socialLinks = {
  instagram: "https://instagram.com/caffeino.uae",
  facebook: "https://facebook.com/Caffeino.Cafe",
  whatsapp: "https://wa.me/971509999712",
};
