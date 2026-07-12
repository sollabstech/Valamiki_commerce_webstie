export const siteConfig = {
  name: "Valmiki",
  legalName: "Valmiki Online Service",
  tagline: "Your everyday stationery & grocery store, delivered.",
  description:
    "Shop groceries and stationery online from Valmiki Online Service, Salem. Fast local delivery, easy returns, and everyday low prices.",
  url: "https://www.valmikionline.in",
  email: "valmikipgp@gmail.com",
  phone: "+919994724733",
  phoneDisplay: "99947 24733",
  whatsapp: "919994724733",
  address: {
    line1: "Valmiki Online Service",
    line2: "Puthiragoumdanpalayam",
    city: "Salem",
    state: "Tamil Nadu",
    pincode: "636119",
    country: "India",
  },
  social: {
    instagram: "",
    facebook: "",
  },
} as const;

export const whatsappLink = (message = "Hi Valmiki, I need some help.") =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
