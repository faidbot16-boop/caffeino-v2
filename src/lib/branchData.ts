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
  mapEmbed: string;
  mapLink: string;
  streetView?: string;
  features: string[];
}

export const branches: Branch[] = [
  {
    id: "al-bateen",
    name: "Al Bateen",
    address: "Al Bateen Marina, Abu Dhabi, UAE",
    phone: "+971 2 666 8887",
    whatsapp: "https://wa.me/97126668887",
    hours: {
      weekday: "7:00 AM – 11:00 PM",
      weekend: "7:00 AM – 12:00 AM",
    },
    mapEmbed: "https://maps.google.com/maps?q=24.4519114,54.3361453&z=17&output=embed",
    mapLink: "https://www.google.com/maps/place/Caffeino+-+Al+Bateen/@24.4519163,54.3335704,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5e69b79cdff745:0x543eb9cb90cb9638!8m2!3d24.4519114!4d54.3361453!16s%2Fg%2F11mw6rw019",
    streetView: "https://www.google.com/maps/embed?pb=!4v1748300000000!6m8!1m7!1sCIHM0ogKEICAgIDWqdSO6AE!2m2!1d24.4519778!2d54.336157!3f90!4f10!5f0.7820865974627469",
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
    mapEmbed: "https://maps.google.com/maps?q=24.3390647,54.579187&z=17&output=embed",
    mapLink: "https://www.google.com/maps/place/Caffeino+-+Mahawi/@24.3915024,54.3788809,12z/data=!4m6!3m5!1s0x3e5e6547bfc1f953:0x627252135f1369a5!8m2!3d24.3390647!4d54.579187!16s%2Fg%2F11g0mrfjxg",
    features: ["Indoor Seating", "Free WiFi", "Drive-Thru Available", "Quick Service"],
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
    mapEmbed: "https://maps.google.com/maps?q=24.405302,54.6021864&z=17&output=embed",
    mapLink: "https://www.google.com/maps/place/Caffeino+-+Khalifa+City/@24.4053069,54.5996115,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5e4719d6eb3b95:0xfec274c809c107c6!8m2!3d24.405302!4d54.6021864!16s%2Fg%2F11rr1ypwq1",
    features: ["Indoor Seating", "Free WiFi", "Meeting Room Available", "Work Friendly"],
  },
  {
    id: "al-falah",
    name: "Al Falah",
    address: "Al Falah, Abu Dhabi, UAE",
    phone: "+971 54 307 3777",
    whatsapp: "https://wa.me/971543073777",
    hours: {
      weekday: "7:00 AM – 11:00 PM",
      weekend: "7:00 AM – 12:00 AM",
    },
    mapEmbed: "https://maps.google.com/maps?q=24.4488951,54.7076759&z=17&output=embed",
    mapLink: "https://www.google.com/maps/place/Caffeino+-+Al+Falah/@24.4489,54.705101,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5e4b0e69d4a6a7:0xf9bb5fe5121701ed!8m2!3d24.4488951!4d54.7076759!16s%2Fg%2F11tss9gght",
    features: ["Indoor & Outdoor Seating", "Free WiFi", "Family Friendly", "Kids Area"],
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
    mapEmbed: "https://maps.google.com/maps?q=24.5213027,54.6690092&z=17&output=embed",
    mapLink: "https://www.google.com/maps/place/Caffeino+-+Al+Bahia/@24.5213076,54.6664343,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5e65ea2ca3fcd9:0xf7434136385bdbcf!8m2!3d24.5213027!4d54.6690092!16s%2Fg%2F11f4_7zhlz",
    features: ["Indoor & Outdoor Seating", "Free WiFi", "Kids Play Area", "Family Friendly"],
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
