// 60 Realistic Premium Products Database
export const products = [
  // MOBILES
  {
    id: "mob-1",
    name: "iPhone 15 Pro Max",
    category: "Mobiles",
    brand: "Apple",
    price: 1199,
    originalPrice: 1299,
    discount: 8,
    description: "Experience the ultimate iPhone featuring a strong and light aerospace-grade titanium design, the groundbreaking A17 Pro chip, and a powerful 3x/5x Telephoto camera system.",
    features: [
      "Aerospace-grade Titanium design",
      "A17 Pro chip with 6-core GPU",
      "Pro camera system (48MP Main, Ultra Wide, Telephoto)",
      "USB-C support with USB 3 speeds",
      "All-day battery life (up to 29 hours video playback)"
    ],
    specifications: {
      "Display": "6.7-inch Super Retina XDR OLED",
      "Processor": "A17 Pro chip",
      "Camera": "48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto",
      "Storage": "256GB / 512GB / 1TB",
      "Weight": "221g",
      "OS": "iOS 17 (upgradable to iOS 18)",
      "Battery": "4441 mAh"
    },
    rating: 4.8,
    reviewCount: 342,
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#2b2c2e", "#d4d7d9", "#3b444b"],
    sizes: ["256GB", "512GB", "1TB"],
    deliveryTime: "Ships tomorrow",
    warranty: "1 Year Apple Warranty",
    seller: "Apple Certified Store"
  },
  {
    id: "mob-2",
    name: "Galaxy S24 Ultra",
    category: "Mobiles",
    brand: "Samsung",
    price: 1299,
    originalPrice: 1399,
    discount: 7,
    description: "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility.",
    features: [
      "Built-in S Pen for precise control",
      "Galaxy AI features: Live Translate, Circle to Search",
      "200MP Quad Telephoto Camera system",
      "Snapdragon 8 Gen 3 Mobile Platform",
      "Corning Gorilla Armor screen protection"
    ],
    specifications: {
      "Display": "6.8-inch Dynamic AMOLED 2X, 120Hz",
      "Processor": "Snapdragon 8 Gen 3",
      "Camera": "200MP Main + 50MP + 12MP + 10MP Quad Camera",
      "Storage": "256GB / 512GB",
      "Weight": "232g",
      "OS": "Android 14 with One UI 6.1",
      "Battery": "5000 mAh"
    },
    rating: 4.7,
    reviewCount: 289,
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#3c3d3a", "#e5e4e2", "#4a412a"],
    sizes: ["256GB", "512GB"],
    deliveryTime: "Ships in 2 days",
    warranty: "1 Year Samsung Warranty",
    seller: "Samsung Store"
  },
  {
    id: "mob-3",
    name: "Pixel 8 Pro",
    category: "Mobiles",
    brand: "Google",
    price: 899,
    originalPrice: 999,
    discount: 10,
    description: "The all-pro phone engineered by Google. It has the best of Google AI, the most advanced Pixel Camera ever, and can help you get more done, even faster.",
    features: [
      "Google Tensor G3 chip for smart performance",
      "Fully upgraded pro camera system with Best Take",
      "Magic Audio Eraser and Video Boost",
      "Polished aluminum frame and matte back glass",
      "7 years of OS, security, and feature updates"
    ],
    specifications: {
      "Display": "6.7-inch Super Actua display, 120Hz",
      "Processor": "Google Tensor G3",
      "Camera": "50MP Main + 48MP Ultra Wide + 48MP 5x Telephoto",
      "Storage": "128GB / 256GB",
      "Weight": "213g",
      "OS": "Android 14 (Pure Pixel Experience)",
      "Battery": "5050 mAh"
    },
    rating: 4.6,
    reviewCount: 198,
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#b0c4de", "#363636", "#f5f5dc"],
    sizes: ["128GB", "256GB"],
    deliveryTime: "Ships tomorrow",
    warranty: "1 Year Google Warranty",
    seller: "Google Store Authorized"
  },
  {
    id: "mob-4",
    name: "OnePlus 12",
    category: "Mobiles",
    brand: "OnePlus",
    price: 799,
    originalPrice: 849,
    discount: 6,
    description: "Redefined flagship experience featuring Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera for Mobile, and a massive 5400 mAh battery with 100W SUPERVOOC charging.",
    features: [
      "100W Wired + 50W Wireless Charging",
      "4th Gen Hasselblad Camera System",
      "2K 120Hz ProXDR Display with 4500 nits peak brightness",
      "Dual Cryo-velocity VC Cooling System",
      "Alert Slider for quick profile switching"
    ],
    specifications: {
      "Display": "6.82-inch 2K AMOLED, 120Hz",
      "Processor": "Snapdragon 8 Gen 3",
      "Camera": "50MP + 64MP + 48MP Hasselblad Triple",
      "Storage": "256GB / 512GB",
      "Weight": "220g",
      "OS": "OxygenOS based on Android 14",
      "Battery": "5400 mAh"
    },
    rating: 4.5,
    reviewCount: 145,
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#2d5a27", "#1e1e1e"],
    sizes: ["256GB", "512GB"],
    deliveryTime: "Ships in 3 days",
    warranty: "1 Year OnePlus Warranty",
    seller: "OnePlus Official"
  },

  // LAPTOPS
  {
    id: "lap-1",
    name: "MacBook Pro 14\" M3",
    category: "Laptops",
    brand: "Apple",
    price: 1599,
    originalPrice: 1799,
    discount: 11,
    description: "The 14-inch MacBook Pro blasts forward with M3, an incredibly advanced chip that brings serious speed and capability for everyday workflows.",
    features: [
      "Apple M3 chip with 8-core CPU and 10-core GPU",
      "Up to 22 hours of battery life",
      "Liquid Retina XDR display with 1600 nits peak brightness",
      "1080p FaceTime HD camera, studio-quality mics",
      "Six-speaker sound system with Spatial Audio"
    ],
    specifications: {
      "Display": "14.2-inch Liquid Retina XDR",
      "Processor": "Apple M3 Chip",
      "RAM": "8GB / 16GB Unified Memory",
      "Storage": "512GB / 1TB SSD",
      "Battery Life": "Up to 22 Hours",
      "Weight": "1.55 kg",
      "OS": "macOS Sonoma"
    },
    rating: 4.9,
    reviewCount: 212,
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#7d7f7d", "#e3e4e5"],
    sizes: ["8GB RAM | 512GB SSD", "16GB RAM | 512GB SSD", "16GB RAM | 1TB SSD"],
    deliveryTime: "Ships tomorrow",
    warranty: "1 Year Apple Warranty",
    seller: "Apple Certified Store"
  },
  {
    id: "lap-2",
    name: "Dell XPS 15",
    category: "Laptops",
    brand: "Dell",
    price: 1899,
    originalPrice: 2099,
    discount: 9,
    description: "Immerse yourself in content with bright, color-rich panels with high resolution, and more viewing space to keep you productive.",
    features: [
      "13th Gen Intel Core i7 processor",
      "NVIDIA GeForce RTX 4060 GPU",
      "4-sided InfinityEdge display with 16:10 aspect ratio",
      "Machined aluminum chassis and carbon fiber palm rest",
      "Studio quality sound with Waves Nx 3D audio"
    ],
    specifications: {
      "Display": "15.6-inch FHD+ (1920 x 1200) / 3.5K OLED Touch",
      "Processor": "Intel Core i7-13700H",
      "RAM": "16GB / 32GB DDR5",
      "Graphics": "NVIDIA RTX 4060 8GB",
      "Storage": "1TB SSD",
      "Weight": "1.86 kg",
      "OS": "Windows 11 Home"
    },
    rating: 4.7,
    reviewCount: 167,
    stock: 5,
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#c0c0c0", "#111111"],
    sizes: ["FHD+ | 16GB | 1TB", "OLED Touch | 32GB | 1TB"],
    deliveryTime: "Ships in 2 days",
    warranty: "1 Year Premium Support Plus",
    seller: "Dell Direct"
  },
  {
    id: "lap-3",
    name: "ASUS ROG Zephyrus G14",
    category: "Laptops",
    brand: "ASUS",
    price: 1449,
    originalPrice: 1599,
    discount: 9,
    description: "The world's most powerful 14-inch gaming laptop, featuring AMD Ryzen 9 processor and NVIDIA GeForce RTX 4060 graphics in an ultra-sleek frame.",
    features: [
      "AMD Ryzen 9 8945HS Processor",
      "ROG Nebula Display: OLED 120Hz / 3ms",
      "Customizable AniMe Matrix LED display on lid",
      "ROG Intelligent Cooling with Liquid Metal",
      "Ultra-thin 1.59cm and lightweight 1.5kg chassis"
    ],
    specifications: {
      "Display": "14-inch OLED QHD+, 120Hz",
      "Processor": "AMD Ryzen 9 8945HS",
      "RAM": "16GB LPDDR5X",
      "Graphics": "NVIDIA GeForce RTX 4060",
      "Storage": "1TB PCIe 4.0 SSD",
      "Weight": "1.50 kg",
      "OS": "Windows 11 Home"
    },
    rating: 4.8,
    reviewCount: 98,
    stock: 6,
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#ffffff", "#1f1f1f"],
    sizes: ["Ryzen 9 | RTX 4060 | 1TB"],
    deliveryTime: "Ships in 3 days",
    warranty: "2 Years Global Warranty",
    seller: "ROG Official Store"
  },
  {
    id: "lap-4",
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    category: "Laptops",
    brand: "Lenovo",
    price: 1749,
    originalPrice: 1999,
    discount: 12,
    description: "The ultimate business laptop. Crafted with lightweight carbon fiber, featuring Intel vPro technology and a legendary comfortable keyboard.",
    features: [
      "Intel Evo Platform with 13th Gen Intel Core i7",
      "Ultralight carbon-fiber reinforced chassis",
      "Military-grade durability (MIL-STD 810H)",
      "Legendary red TrackPoint & clicky keyboard",
      "Robust security features including dTPM 2.0"
    ],
    specifications: {
      "Display": "14-inch WUXGA IPS Anti-Glare, 400 nits",
      "Processor": "Intel Core i7-1365U vPro",
      "RAM": "16GB LPDDR5",
      "Storage": "512GB / 1TB PCIe SSD",
      "Weight": "1.12 kg",
      "OS": "Windows 11 Pro",
      "Security": "Fingerprint Reader, IR Camera"
    },
    rating: 4.7,
    reviewCount: 114,
    stock: 9,
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#111827"],
    sizes: ["16GB | 512GB SSD", "16GB | 1TB SSD"],
    deliveryTime: "Ships in 2 days",
    warranty: "3 Years Premier Support",
    seller: "Lenovo Authorized Store"
  },

  // AUDIO
  {
    id: "aud-1",
    name: "Sony WH-1000XM5 Wireless Headphones",
    category: "Audio",
    brand: "Sony",
    price: 349,
    originalPrice: 399,
    discount: 12,
    description: "Redefining industry-leading noise cancellation and audio quality. Specially designed driver unit and multiple microphone ambient noise capture.",
    features: [
      "Industry-leading noise cancellation with 8 mics",
      "Auto NC Optimizer adjusts noise canceling based on environment",
      "Ultra-comfortable, lightweight design with soft fit leather",
      "Up to 30-hour battery life with quick charging",
      "Hands-free calling with crystal clear voice pickup"
    ],
    specifications: {
      "Driver Unit": "30mm Dome type",
      "Frequency Response": "4Hz - 40,000Hz",
      "Bluetooth": "v5.2, LDAC supported",
      "Battery Life": "Up to 30 Hours (NC On)",
      "Weight": "250g",
      "Inputs": "USB-C, 3.5mm Stereo Mini Jack"
    },
    rating: 4.8,
    reviewCount: 512,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#1e1e1e", "#e5e5d8", "#0f2c59"],
    sizes: ["Standard"],
    deliveryTime: "Ships tomorrow",
    warranty: "1 Year Sony Warranty",
    seller: "Aura Audio Boutique"
  },
  {
    id: "aud-2",
    name: "AirPods Pro (2nd Generation)",
    category: "Audio",
    brand: "Apple",
    price: 199,
    originalPrice: 249,
    discount: 20,
    description: "Features up to two times more Active Noise Cancellation, Adaptive Audio, and Transparency mode to hear the world around you.",
    features: [
      "Apple H2 headphone chip for rich audio",
      "Adaptive Audio dynamically blends Transparency & NC",
      "Personalized Spatial Audio with dynamic head tracking",
      "MagSafe Charging Case (USB-C) with Precision Finding",
      "Four pairs of silicone ear tips (XS, S, M, L)"
    ],
    specifications: {
      "Chip": "Apple H2 Chip",
      "Connectivity": "Bluetooth 5.3",
      "Battery Life": "Up to 6 hours listening time (one charge)",
      "Water Resistance": "IP54 sweat, dust, water resistant",
      "Charging Case": "MagSafe (USB-C) with speaker"
    },
    rating: 4.9,
    reviewCount: 687,
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1588449668338-d15168b3a443?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#ffffff"],
    sizes: ["Standard"],
    deliveryTime: "Ships tomorrow",
    warranty: "1 Year Apple Warranty",
    seller: "Apple Certified Store"
  },
  {
    id: "aud-3",
    name: "Bose QuietComfort Ultra Earbuds",
    category: "Audio",
    brand: "Bose",
    price: 249,
    originalPrice: 299,
    discount: 16,
    description: "Breakthrough spatialized audio for more immersive listening. World-class noise cancellation and custom-tuned sound for you.",
    features: [
      "Bose Immersive Audio pushes boundaries of listening",
      "CustomTune technology auto-adjusts sound to your ears",
      "Quiet, Aware, and Immersion modes",
      "Ultra-soft silicone tips and stability bands",
      "Simple touch controls on each bud"
    ],
    specifications: {
      "Battery Life": "Up to 6 hours (4 with Immersive)",
      "Charging Time": "1 hour for earbuds, 3 for case",
      "Microphones": "4 mics in each earbud",
      "Bluetooth Range": "Up to 30 feet",
      "Codec Support": "AAC, SBC, aptX Adaptive"
    },
    rating: 4.7,
    reviewCount: 220,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#111111", "#f2eedf"],
    sizes: ["Standard"],
    deliveryTime: "Ships tomorrow",
    warranty: "1 Year Bose Warranty",
    seller: "Premium Sound"
  },

  // SMART DEVICES
  {
    id: "smart-1",
    name: "Apple Watch Ultra 2",
    category: "Smart Devices",
    brand: "Apple",
    price: 749,
    originalPrice: 799,
    discount: 6,
    description: "The most rugged and capable Apple Watch. Designed for outdoor adventures and supercharged workouts with a lightweight titanium case.",
    features: [
      "49mm aerospace-grade titanium case",
      "Up to 36 hours of normal battery life (72h in low power)",
      "Always-On Retina display with up to 3000 nits brightness",
      "Dual-frequency GPS with incredible accuracy",
      "Customizable Action button in international orange"
    ],
    specifications: {
      "Case Size": "49mm",
      "Case Material": "Titanium",
      "Water Resistance": "100m, Swimproof & Recreational Dive",
      "Connectivity": "LTE + UMTS, Wi-Fi, Bluetooth",
      "Sensors": "ECG, Blood Oxygen, Depth, Temperature"
    },
    rating: 4.9,
    reviewCount: 176,
    stock: 14,
    images: [
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#dcdcdc", "#111827"],
    sizes: ["Trail Loop", "Ocean Band", "Alpine Loop"],
    deliveryTime: "Ships tomorrow",
    warranty: "1 Year Apple Warranty",
    seller: "Apple Certified Store"
  },
  {
    id: "smart-2",
    name: "Philips Hue Smart Bulb Starter Kit",
    category: "Smart Devices",
    brand: "Philips Hue",
    price: 159,
    originalPrice: 199,
    discount: 20,
    description: "Set the mood in any room. The kit includes three color-smart LED bulbs, the Hue Bridge controller, and an easy wireless switch.",
    features: [
      "16 million colors and white shades",
      "Sync lights with movies, music, and games",
      "Control via app, voice (Alexa, Google, Siri), or switch",
      "Hue Bridge included for advanced scheduling & routines",
      "Energy efficient LED bulbs with 25,000h lifetime"
    ],
    specifications: {
      "Fitting": "E26",
      "Wattage": "9.5W (Equivalent to 75W)",
      "Luminous Flux": "1100 Lumen",
      "Color Temp": "2000K-6500K + 16 Million Colors",
      "Bridge Included": "Yes, controls up to 50 lights"
    },
    rating: 4.7,
    reviewCount: 310,
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#ffffff"],
    sizes: ["3-Bulb Kit", "4-Bulb Kit"],
    deliveryTime: "Ships in 2 days",
    warranty: "2 Years Philips Warranty",
    seller: "Smart Home Depot"
  },

  // GAMING
  {
    id: "gam-1",
    name: "PlayStation 5 Slim Console",
    category: "Gaming",
    brand: "Sony",
    price: 449,
    originalPrice: 499,
    discount: 10,
    description: "Experience lightning-fast loading with an ultra-high-speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio.",
    features: [
      "Slimmer design with 1TB SSD storage",
      "Ultra-high speed SSD for near-instant loads",
      "DualSense Wireless Controller with haptic feedback",
      "Support for 4K 120Hz HDR gaming",
      "Backward compatibility with PS4 games"
    ],
    specifications: {
      "Storage": "1TB Custom NVMe SSD",
      "GPU": "Custom RDNA 2 (10.3 TFLOPS)",
      "CPU": "Custom 8-core AMD Zen 2",
      "Resolution Support": "Up to 8K, Native 4K 120 FPS",
      "Audio": "Tempest 3D AudioTech",
      "Optical Drive": "Ultra HD Blu-ray (Removable)"
    },
    rating: 4.9,
    reviewCount: 423,
    stock: 10,
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#ffffff"],
    sizes: ["Standard Disc", "Digital Edition"],
    deliveryTime: "Ships tomorrow",
    warranty: "1 Year Sony Warranty",
    seller: "Aura Gaming Shop"
  },
  {
    id: "gam-2",
    name: "Nintendo Switch OLED Model",
    category: "Gaming",
    brand: "Nintendo",
    price: 319,
    originalPrice: 349,
    discount: 8,
    description: "Play at home or on the go with a vibrant 7-inch OLED screen, a wide adjustable stand, a dock with a wired LAN port, and 64 GB of internal storage.",
    features: [
      "7-inch OLED screen with vivid colors",
      "Wide adjustable stand for tabletop mode",
      "Wired LAN port in TV dock",
      "64 GB internal storage (expandable)",
      "Enhanced audio in handheld and tabletop modes"
    ],
    specifications: {
      "Display": "7.0-inch OLED Touchscreen",
      "Resolution": "720p Handheld, 1080p TV Mode",
      "Storage": "64GB, expandable via MicroSD",
      "Battery Life": "4.5 to 9 Hours depending on game",
      "Weight": "420g with Joy-Con attached"
    },
    rating: 4.8,
    reviewCount: 298,
    stock: 19,
    images: [
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#ffffff", "#ff007f"],
    sizes: ["Standard"],
    deliveryTime: "Ships in 2 days",
    warranty: "1 Year Nintendo Warranty",
    seller: "Aura Gaming Shop"
  },
  {
    id: "gam-3",
    name: "Razer Viper V3 Pro Gaming Mouse",
    category: "Gaming",
    brand: "Razer",
    price: 149,
    originalPrice: 159,
    discount: 6,
    description: "The lightweight king of wireless esports gaming mice. Features cutting-edge optical sensors and a high polling rate for professional competitive responsiveness.",
    features: [
      "Ultra-lightweight 54g design",
      "Razer Focus Pro 35K Optical Sensor Gen-2",
      "Razer HyperPolling 8000Hz wireless polling rate",
      "Razer Optical Mouse Switches Gen-3 (90M clicks)",
      "Up to 95 hours of continuous battery life"
    ],
    specifications: {
      "Sensor": "Focus Pro 35K Optical",
      "Max DPI": "35,000",
      "Polling Rate": "Up to 8,000 Hz",
      "Buttons": "5 Programmable Buttons",
      "Connection": "Razer HyperSpeed Wireless / Wired USB-C",
      "Weight": "54g"
    },
    rating: 4.7,
    reviewCount: 88,
    stock: 16,
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#111111", "#ffffff"],
    sizes: ["Standard"],
    deliveryTime: "Ships tomorrow",
    warranty: "2 Years Razer Warranty",
    seller: "Esports Gear Shop"
  },

  // FASHION MEN
  {
    id: "fasm-1",
    name: "Premium Cashmere Overcoat",
    category: "Fashion",
    subCategory: "Men",
    brand: "Aura Atelier",
    price: 299,
    originalPrice: 399,
    discount: 25,
    description: "A tailored, modern classic overcoat crafted from an ultra-soft premium cashmere-wool blend. Features peak lapels, three-button closure, and clean minimal lines.",
    features: [
      "Crafted from 70% virgin wool and 30% soft cashmere",
      "Fully lined with premium silky viscose",
      "Classic peak lapel and single-breasted closure",
      "Two exterior welt pockets, two internal chest pockets",
      "Tailored fit with rear vent for ease of movement"
    ],
    specifications: {
      "Material": "70% Wool, 30% Cashmere",
      "Fit": "Tailored / Regular Fit",
      "Lining": "100% Viscose",
      "Care": "Dry Clean Only",
      "Length": "Mid-Thigh"
    },
    rating: 4.8,
    reviewCount: 76,
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#1b1c1e", "#7b6d5c", "#3b444b"],
    sizes: ["S", "M", "L", "XL"],
    deliveryTime: "Ships in 3 days",
    warranty: "Lifetime Quality Guarantee",
    seller: "Aura Atelier"
  },
  {
    id: "fasm-2",
    name: "Raw Denim Jacket",
    category: "Fashion",
    subCategory: "Men",
    brand: "Levi's Premium",
    price: 110,
    originalPrice: 130,
    discount: 15,
    description: "A versatile trucker jacket made from stiff, durable raw selvedge denim that breaks in uniquely to your body over time. Featuring classic copper hardware.",
    features: [
      "100% Cotton heavy raw denim",
      "Ages beautifully with personalized wear fades",
      "Button cuffs, adjustable waist tabs",
      "Two button-flap chest pockets and two hand pockets",
      "Reinforced contrast stitching throughout"
    ],
    specifications: {
      "Material": "100% Raw Selvedge Cotton Denim",
      "Weight": "14 oz Denim",
      "Country of Origin": "USA",
      "Care": "Wash rarely, wash cold inside-out",
      "Hardware": "Solid Copper buttons"
    },
    rating: 4.6,
    reviewCount: 132,
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#0f172a", "#1e3a8a"],
    sizes: ["M", "L", "XL"],
    deliveryTime: "Ships tomorrow",
    warranty: "1 Year Brand Warranty",
    seller: "Denim & Co"
  },
  {
    id: "fasm-3",
    name: "Slim Fit Linen Shirt",
    category: "Fashion",
    subCategory: "Men",
    brand: "Uniqlo Premium",
    price: 39,
    originalPrice: 49,
    discount: 20,
    description: "Stay cool and sharp during warm weather with our premium flax linen shirt. Styled with a clean button-down collar and slim, breathable drape.",
    features: [
      "100% European flax linen fibers",
      "Highly breathable and moisture-wicking",
      "Button-down collar, curved hem",
      "Pre-washed for extra softness and minimal shrinkage",
      "Tailored slim fit"
    ],
    specifications: {
      "Material": "100% French Flax Linen",
      "Fit": "Slim Fit",
      "Thickness": "Lightweight / Breathable",
      "Collar": "Button-down",
      "Care": "Machine wash cold, hang dry"
    },
    rating: 4.4,
    reviewCount: 205,
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#ffffff", "#e0f2fe", "#fdf2f8"],
    sizes: ["S", "M", "L", "XL"],
    deliveryTime: "Ships tomorrow",
    warranty: "None",
    seller: "Aura Essentials"
  },

  // FASHION WOMEN
  {
    id: "fasw-1",
    name: "Silk Wrap Dress",
    category: "Fashion",
    subCategory: "Women",
    brand: "Aura Atelier",
    price: 189,
    originalPrice: 249,
    discount: 24,
    description: "Flowing wrap dress crafted from premium Mulberry silk. An elegant crossover silhouette with adjustable side ties, ideal for formal dinners or cocktail hours.",
    features: [
      "100% Pure Mulberry Silk (19 momme weight)",
      "Graceful V-neckline with adjustable waist wrap tie",
      "Midi length with subtle flared skirt",
      "Delicate button closures at cuffs",
      "Hypoallergenic, breathable, natural temperature regulator"
    ],
    specifications: {
      "Material": "100% Mulberry Silk",
      "Length": "Midi (46 inches)",
      "Style": "Classic Wrap Dress",
      "Lining": "Unlined (opaque, dense drape)",
      "Care": "Hand wash cold / Dry clean"
    },
    rating: 4.9,
    reviewCount: 65,
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#7f1d1d", "#1e1b4b", "#064e3b"],
    sizes: ["XS", "S", "M", "L"],
    deliveryTime: "Ships in 3 days",
    warranty: "Lifetime Quality Guarantee",
    seller: "Aura Atelier"
  },
  {
    id: "fasw-2",
    name: "Oversized Cashmere Sweater",
    category: "Fashion",
    subCategory: "Women",
    brand: "Everlane",
    price: 145,
    originalPrice: 175,
    discount: 17,
    description: "Luxuriously soft and cozy oversized crewneck sweater spun from 100% Grade-A cashmere. Features dropped shoulders and chunky ribbed trim.",
    features: [
      "100% Grade-A Mongolian Cashmere",
      "Luxurious 2-ply yarn knit",
      "Dropped shoulders and relaxed, oversized silhouette",
      "Ribbed collar, cuffs, and hem",
      "Sourced responsibly from certified animal-friendly herders"
    ],
    specifications: {
      "Material": "100% Grade-A Cashmere",
      "Fit": "Relaxed / Oversized",
      "Knit": "12-gauge tight knit",
      "Neckline": "Crewneck",
      "Care": "Dry clean or hand wash flat dry"
    },
    rating: 4.7,
    reviewCount: 142,
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#f5f5dc", "#8a8a8a", "#0a0a0a"],
    sizes: ["S", "M", "L"],
    deliveryTime: "Ships tomorrow",
    warranty: "1 Year Brand Warranty",
    seller: "Curated Knits"
  },
  {
    id: "fasw-3",
    name: "Classic Belted Trench Coat",
    category: "Fashion",
    subCategory: "Women",
    brand: "Aura Atelier",
    price: 249,
    originalPrice: 299,
    discount: 16,
    description: "A double-breasted utility trench coat in structured water-resistant cotton-gabardine. Detailed with shoulder epaulettes, gun flap, and D-ring belt.",
    features: [
      "Premium water-resistant cotton gabardine weave",
      "Double-breasted button closure with tortoise buttons",
      "Removable self-tie belt with premium leather buckle",
      "Rain guard back flap and hook-and-eye collar latch",
      "Deep storm-pocket entry"
    ],
    specifications: {
      "Material": "100% Cotton Gabardine",
      "Lining": "Jacquard Aura Logo Satin lining",
      "Water Repellency": "Grade 4 Water-Resistant",
      "Hardware": "Resin Tortoiseshell buttons",
      "Care": "Professional Dry Clean Only"
    },
    rating: 4.8,
    reviewCount: 54,
    stock: 6,
    images: [
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#d2b48c", "#111827"],
    sizes: ["S", "M", "L"],
    deliveryTime: "Ships in 2 days",
    warranty: "3 Years Stitching Guarantee",
    seller: "Aura Atelier"
  },

  // SHOES
  {
    id: "sho-1",
    name: "Ultraboost Light Sneakers",
    category: "Shoes",
    brand: "Adidas",
    price: 159,
    originalPrice: 189,
    discount: 15,
    description: "Experience epic energy in the new Ultraboost Light, our lightest Ultraboost ever. The magic lies in the Light BOOST midsole, a new generation of Adidas BOOST.",
    features: [
      "Lightweight BOOST cushioning midsole",
      "PRIMEKNIT+ textile adaptive upper",
      "Continental™ Better Rubber outsole for grip",
      "Upper yarn contains at least 50% recycled plastic",
      "Linear Energy Push system increases responsiveness"
    ],
    specifications: {
      "Weight": "290g (Size 9)",
      "Midsole Drop": "10mm (Heel: 30mm / Forefoot: 20mm)",
      "Upper": "Primeknit+ Adaptive Mesh",
      "Cushioning": "Ultraboost Light Foam",
      "Fit": "Sock-like secure fit"
    },
    rating: 4.8,
    reviewCount: 490,
    stock: 28,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#ef4444", "#ffffff", "#111827"],
    sizes: ["8", "9", "10", "11"],
    deliveryTime: "Ships tomorrow",
    warranty: "6 Months Adidas Warranty",
    seller: "Runners Choice Store"
  },
  {
    id: "sho-2",
    name: "Air Max 90 Premium",
    category: "Shoes",
    brand: "Nike",
    price: 119,
    originalPrice: 139,
    discount: 14,
    description: "Nothing as fly, nothing as comfortable, nothing as proven. The Nike Air Max 90 stays true to its OG running roots with the iconic waffle sole and stitched overlays.",
    features: [
      "Max Air unit in the heel for lightweight impact absorption",
      "Padded, low-cut collar looks sleek and feels great",
      "Rubber Waffle outsole adds traction and heritage style",
      "Stitched synthetic leather and suede overlays for durability",
      "Flex grooves in the sole let your foot bend naturally"
    ],
    specifications: {
      "Upper Material": "Suede, Leather & Breathable Mesh",
      "Outsole": "Rubber Waffle Pattern",
      "Cushioning": "Max Air & Foam Midsole",
      "Style Code": "DZ3531-100",
      "Origin": "Vietnam"
    },
    rating: 4.7,
    reviewCount: 310,
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1520316587275-5e4f06f35f27?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#ffffff", "#000000", "#3b82f6"],
    sizes: ["8", "9", "10", "11"],
    deliveryTime: "Ships tomorrow",
    warranty: "6 Months Nike Warranty",
    seller: "Nike Store Authorized"
  },
  {
    id: "sho-3",
    name: "Chelsea Leather Boots",
    category: "Shoes",
    brand: "Aura Atelier",
    price: 199,
    originalPrice: 249,
    discount: 20,
    description: "Timeless Chelsea silhouette crafted from hand-painted full-grain Italian leather. Detailed with elasticated side panels and a stacked leather sole with rubber grip overlays.",
    features: [
      "100% Full-grain hand-burnished Italian calfskin",
      "Blake-stitched construction for flexibility and recraftability",
      "Premium elastic side gussets for easy slip-on entry",
      "Leather lining and cushioned cork-bed insole",
      "Stacked leather heel with protective rubber tap"
    ],
    specifications: {
      "Leather": "Italian Full-Grain Calfskin",
      "Construction": "Blake Stitched",
      "Heel Height": "1 inch",
      "Sole": "Stacked Leather with Rubber Grip",
      "Care": "Use leather conditioner regularly"
    },
    rating: 4.8,
    reviewCount: 78,
    stock: 14,
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#5c4033", "#111111"],
    sizes: ["8", "9", "10", "11"],
    deliveryTime: "Ships in 3 days",
    warranty: "1 Year Leather Stitching Warranty",
    seller: "Aura Atelier"
  },

  // WATCHES
  {
    id: "wat-1",
    name: "PRX Powermatic 80 Automatic",
    category: "Watches",
    brand: "Tissot",
    price: 699,
    originalPrice: 725,
    discount: 3,
    description: "An essential timepiece with an integrated case and bracelet design. Featuring the impressive Powermatic 80 automatic movement and a waffle dial.",
    features: [
      "Swiss Powermatic 80 automatic movement",
      "Up to 80 hours power reserve",
      "316L Stainless steel case with integrated link bracelet",
      "Scratch-resistant sapphire crystal with AR coating",
      "Water-resistant up to a pressure of 10 bar (100 m / 330 ft)"
    ],
    specifications: {
      "Case Size": "40.00 mm",
      "Thickness": "10.9 mm",
      "Dial Color": "Ice Blue / Navy / Black",
      "Crystal": "Sapphire Crystal with Anti-reflective coating",
      "Movement": "Swiss Automatic (Caliber 11 1/2''')",
      "Jewels": "23 Jewels"
    },
    rating: 4.9,
    reviewCount: 165,
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#e0f2fe", "#1e3a8a", "#111827"],
    sizes: ["40mm", "35mm"],
    deliveryTime: "Ships in 2 days",
    warranty: "2 Years International Warranty",
    seller: "Aura Luxury Watches"
  },
  {
    id: "wat-2",
    name: "Classic Chronograph Minimalist Watch",
    category: "Watches",
    brand: "Aura Horology",
    price: 179,
    originalPrice: 199,
    discount: 10,
    description: "A sleek, Japanese quartz-movement chronograph watch designed with a Bauhaus-inspired minimal dial, slim stainless steel casing, and Italian leather strap.",
    features: [
      "Precise Japanese Miyota Quartz chronograph movement",
      "Sleek domed mineral crystal lens",
      "Genuine vegetable-tanned Italian leather strap with quick release",
      "Minimalist stop-watch functions (seconds, minutes sub-dials)",
      "50m (5ATM) water-resistant construct"
    ],
    specifications: {
      "Case Size": "41.00 mm",
      "Thickness": "8.5 mm",
      "Movement": "Japanese Miyota Quartz",
      "Strap Width": "20 mm",
      "Battery Life": "Approx. 3 Years",
      "Water Resistance": "5 ATM / 50 meters"
    },
    rating: 4.6,
    reviewCount: 94,
    stock: 24,
    images: [
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#ffffff", "#111111"],
    sizes: ["Standard"],
    deliveryTime: "Ships tomorrow",
    warranty: "1 Year Aura Warranty",
    seller: "Aura Horology Shop"
  },

  // FURNITURE
  {
    id: "fur-1",
    name: "Mid-Century Premium Lounge Chair",
    category: "Furniture",
    brand: "Herman Miller (Mock)",
    price: 899,
    originalPrice: 1099,
    discount: 18,
    description: "An iconic piece of modern furniture. Universally recognized lounge chair and ottoman set, crafted with premium curved plywood panels and full-grain leather.",
    features: [
      "7-ply molded wood veneer shells in walnut finish",
      "Upholstered in rich premium full-grain black leather",
      "Swivel mechanism seat base with die-cast aluminum braces",
      "Individually upholstered plush cushions for enduring comfort",
      "Includes matching molded-wood and leather footrest Ottoman"
    ],
    specifications: {
      "Wood Veneer": "Walnut Veneer",
      "Leather Type": "100% Full-grain Aniline Leather",
      "Dimensions": "32.75\" W x 32.75\" D x 32\" H",
      "Seat Height": "15 inches",
      "Swivel Range": "360 Degrees"
    },
    rating: 4.9,
    reviewCount: 42,
    stock: 4,
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#111111", "#5c4033"],
    sizes: ["Standard With Ottoman"],
    deliveryTime: "Ships in 5 business days",
    warranty: "5 Years Structure Warranty",
    seller: "Modernist Home"
  },
  {
    id: "fur-2",
    name: "Ergonomic Mesh Task Office Chair",
    category: "Furniture",
    brand: "Steelcase (Mock)",
    price: 499,
    originalPrice: 599,
    discount: 16,
    description: "Fully adjustable ergonomic task chair designed to move with your spine. Premium breathable mesh back and multi-direction armrests keep you comfortable for long hours.",
    features: [
      "LiveBack technology mimics the natural shape of your spine",
      "Fully adjustable 4D armrests (height, depth, angle, pivot)",
      "High-elastic premium tension mesh back for cool ventilation",
      "Weight-activated seat tilt with manual lock controls",
      "Seat depth adjustment to accommodate different leg lengths"
    ],
    specifications: {
      "Weight Capacity": "Up to 300 lbs (136 kg)",
      "Mesh Material": "Elastomer Blend Breathable Mesh",
      "Arm Adjustment": "4D Multi-directional",
      "Caster Type": "Dual-wheel carpet casters",
      "Recline Range": "90 - 130 Degrees"
    },
    rating: 4.8,
    reviewCount: 119,
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#111827", "#708090"],
    sizes: ["Standard Size"],
    deliveryTime: "Ships in 3 days",
    warranty: "10 Years Limited Warranty",
    seller: "Aura Office Design"
  },

  // HOME & KITCHEN
  {
    id: "kit-1",
    name: "Dyson V15 Detect Cordless Vacuum",
    category: "Home",
    subCategory: "Kitchen",
    brand: "Dyson",
    price: 649,
    originalPrice: 749,
    discount: 13,
    description: "The most powerful, intelligent cordless vacuum. Features laser illumination to reveal invisible dust on hard floors and Piezo sensor power adjusting.",
    features: [
      "Laser reveals microscopic dust invisible on hard floors",
      "Piezo sensor measures and counts dust particles",
      "Intelligently adapts suction power based on dust load",
      "LCD screen displays run time countdown and count counts",
      "Up to 60 minutes of fade-free suction run time"
    ],
    specifications: {
      "Suction Power": "240 AW",
      "Bin Volume": "0.2 Gallons (0.75 Liters)",
      "Charge Time": "4.5 Hours",
      "Weight": "6.8 lbs (3.1 kg)",
      "Battery": "7-cell click-in Lithium-ion"
    },
    rating: 4.8,
    reviewCount: 232,
    stock: 14,
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#d946ef", "#06b6d4"],
    sizes: ["Standard V15"],
    deliveryTime: "Ships in 2 days",
    warranty: "2 Years Dyson Warranty",
    seller: "Smart Tech Appliances"
  },
  {
    id: "kit-2",
    name: "Nespresso Vertuo Next Coffee Machine",
    category: "Kitchen",
    subCategory: "Home",
    brand: "Nespresso",
    price: 149,
    originalPrice: 179,
    discount: 16,
    description: "Take your coffee game to next levels. Vertuo Next offers fresh brewed coffee with crema, in 5 convenient cup sizes, at a single touch.",
    features: [
      "Centrifusion technology brews perfect coffee with rich crema",
      "Bar code reading technology auto-adjusts brew parameters",
      "Brews 5 cup sizes: Espresso, Double Espresso, Gran Lungo, Coffee, Carafe",
      "Compact 5.5-inch width fits any kitchen counter",
      "Built with 54% recycled plastics for eco-conscious living"
    ],
    specifications: {
      "Water Tank Capacity": "37 oz (1.1 Liters)",
      "Heat-up Time": "30 Seconds",
      "Connectivity": "Bluetooth + Wi-Fi (for software updates)",
      "Used Pod Capacity": "Up to 10 large capsules",
      "Weight": "8.8 lbs (4 kg)"
    },
    rating: 4.5,
    reviewCount: 389,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1579888944880-d98341148733?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#111111", "#dcdcdc", "#ef4444"],
    sizes: ["Standard Machine", "Machine + Aeroccino Milk Frother"],
    deliveryTime: "Ships tomorrow",
    warranty: "1 Year Nespresso Warranty",
    seller: "Espresso Masters"
  },
  {
    id: "kit-3",
    name: "Signature Enameled Cast Iron Dutch Oven",
    category: "Kitchen",
    subCategory: "Home",
    brand: "Le Creuset (Mock)",
    price: 299,
    originalPrice: 349,
    discount: 14,
    description: "The gold standard in slow-cooking, braising, and baking. This premium enameled cast iron pot provides superior heat distribution and retention.",
    features: [
      "Durable shock-resistant enamel interior prevents sticking",
      "Sturdy loop handles designed for easy transport with oven mitts",
      "Heavy tight-fitting lid creates a self-basting cycle",
      "Compatible with all cooktops (Gas, Electric, Induction, Oven)",
      "Colorful exterior enamel resists chipping and cracking"
    ],
    specifications: {
      "Capacity": "5.5 Quarts (5.2 Liters)",
      "Material": "Enameled Cast Iron",
      "Heat Tolerance": "Oven safe up to 500°F (260°C)",
      "Diameter": "10.25 inches",
      "Weight": "11.4 lbs (5.2 kg)"
    },
    rating: 4.9,
    reviewCount: 204,
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1594756297462-ec7a3c3f398a?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#ea580c", "#dc2626", "#0284c7"],
    sizes: ["5.5 Qt", "7.25 Qt"],
    deliveryTime: "Ships tomorrow",
    warranty: "Lifetime Warranty",
    seller: "Aura Kitchen Outlet"
  },

  // BEAUTY
  {
    id: "bea-1",
    name: "Advanced Hydrating Night Serum",
    category: "Beauty",
    brand: "Estée Lauder (Mock)",
    price: 85,
    originalPrice: 99,
    discount: 14,
    description: "Deep, fast-penetrating face serum. Revitalizes skin appearance overnight, boosting radiance, reducing fine lines, and locking in 72-hour hydration.",
    features: [
      "Patented Chronolux Power Signal technology tightens skin",
      "Rich in Hyaluronic Acid to locking in moisture",
      "Oil-free, fragrance-free, non-comedogenic (won't clog pores)",
      "Dermatologist tested and suitable for all skin types",
      "Recyclable glass bottle design"
    ],
    specifications: {
      "Volume": "1.7 fl oz (50 ml)",
      "Key Ingredients": "Hyaluronic Acid, Tripeptide-32, Caffeine",
      "Skin Type": "All Skins (Dry, Oily, Sensitive)",
      "Formulation": "Lightweight Liquid Serum",
      "Use": "Apply PM on clean face before moisturizer"
    },
    rating: 4.7,
    reviewCount: 512,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#5c4033"],
    sizes: ["50ml", "100ml"],
    deliveryTime: "Ships tomorrow",
    warranty: "100% Authenticity Guarantee",
    seller: "Aura Beauty & Spa"
  },
  {
    id: "bea-2",
    name: "Sonic Facial Cleansing Brush",
    category: "Beauty",
    brand: "Foreo (Mock)",
    price: 129,
    originalPrice: 159,
    discount: 18,
    description: "Cleanse your skin deeply with sonic micro-vibrations. Food-grade silicone bristles remove 99.5% of dirt, oil, and sweat without irritating skin.",
    features: [
      "T-Sonic pulsations at 8,000 vibrations per minute",
      "Ultra-hygienic non-porous silicone resists bacteria buildup",
      "12 adjustable vibration intensities",
      "100% Waterproof - safe for use in shower",
      "USB rechargeable with up to 600 uses per charge"
    ],
    specifications: {
      "Bristle Material": "Ultra-hygienic soft silicone",
      "Speeds": "12 Speeds",
      "Waterproofing": "IPX7 Waterproof",
      "Battery Type": "Lithium-Ion USB charging",
      "Dimensions": "3.1\" W x 4.0\" H"
    },
    rating: 4.6,
    reviewCount: 189,
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#ec4899", "#60a5fa"],
    sizes: ["Standard"],
    deliveryTime: "Ships tomorrow",
    warranty: "2 Years Brand Warranty",
    seller: "Aura Beauty & Spa"
  },

  // BOOKS
  {
    id: "boo-1",
    name: "Atomic Habits (Hardcover)",
    category: "Books",
    brand: "James Clear",
    price: 18,
    originalPrice: 28,
    discount: 35,
    description: "The multi-million copy bestseller. Tiny Changes, Remarkable Results. Learn how to design a systems-based approach to break bad habits and build good ones.",
    features: [
      "Practical strategies to form good habits and break bad ones",
      "Backed by psychology, neuroscience, and real-life stories",
      "Includes visual frameworks and actionable checklists",
      "High quality cream-paper hardcover print",
      "Includes access to digital habit tracking templates"
    ],
    specifications: {
      "Author": "James Clear",
      "Publisher": "Avery / Penguin Random House",
      "Publication Date": "October 2018",
      "Format": "Hardcover, 320 pages",
      "ISBN": "978-0735211292",
      "Language": "English"
    },
    rating: 4.9,
    reviewCount: 1420,
    stock: 80,
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#ea580c"],
    sizes: ["Hardcover", "Paperback", "Kindle Edition"],
    deliveryTime: "Ships tomorrow",
    warranty: "Brand New Book",
    seller: "Aura Bookstore"
  },
  {
    id: "boo-2",
    name: "The Creative Act: A Way of Being",
    category: "Books",
    brand: "Rick Rubin",
    price: 22,
    originalPrice: 32,
    discount: 31,
    description: "A gorgeous, profound book about the creative process from legendary music producer Rick Rubin. A distillation of a lifetime's wisdom on art and inspiration.",
    features: [
      "78 short essays on the creative state of mind",
      "Insights useful for artists, professionals, and anyone",
      "Elegant minimalist linen-bound cover board",
      "A beautiful addition to any coffee table or desk",
      "Bestseller in art, philosophy, and self-help"
    ],
    specifications: {
      "Author": "Rick Rubin",
      "Publisher": "Penguin Press",
      "Publication Date": "February 2023",
      "Format": "Linen Hardcover, 432 pages",
      "ISBN": "978-0593652886",
      "Language": "English"
    },
    rating: 4.8,
    reviewCount: 382,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#ffffff"],
    sizes: ["Linen Hardcover", "Paperback"],
    deliveryTime: "Ships tomorrow",
    warranty: "Brand New Book",
    seller: "Aura Bookstore"
  },

  // SPORTS
  {
    id: "spo-1",
    name: "Non-Slip Eco-Friendly Yoga Mat",
    category: "Sports",
    brand: "Lululemon (Mock)",
    price: 68,
    originalPrice: 88,
    discount: 22,
    description: "An extra-thick, durable yoga mat made from sustainably sourced natural rubber. Features a textured non-slip grip surface to keep you stable in hot yoga.",
    features: [
      "Natural rubber base provides cushioned joint support",
      "Ultra-grippy polyurethane top layer absorbs sweat moisture",
      "Antimicrobial coating prevents mold and bacteria growth",
      "PVC-free and made from eco-friendly non-toxic materials",
      "Includes a woven cotton carry strap"
    ],
    specifications: {
      "Dimensions": "71\" L x 26\" W (180cm x 66cm)",
      "Thickness": "5.0 mm",
      "Material": "Natural Rubber Base + Polyurethane Top",
      "Weight": "5.2 lbs (2.4 kg)",
      "Care": "Wipe with damp cloth, air dry flat"
    },
    rating: 4.7,
    reviewCount: 165,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#1e3a8a", "#ec4899", "#6b7280"],
    sizes: ["5mm Regular", "3mm Travel"],
    deliveryTime: "Ships tomorrow",
    warranty: "1 Year Performance Guarantee",
    seller: "Aura Fitness Supply"
  },

  // ACCESSORIES
  {
    id: "acc-1",
    name: "Full-Grain Leather Wallet",
    category: "Accessories",
    brand: "Aura Atelier",
    price: 49,
    originalPrice: 69,
    discount: 28,
    description: "Slim bifold wallet made from veg-tanned full grain leather. Ages to a rich, dark patina. Built-in RFID blocking sleeves secure your credit cards.",
    features: [
      "100% Hand-stitched full-grain vegetable-tanned leather",
      "Slim profile fits easily in front pockets",
      "6 card slots, 1 cash bill compartment, 2 receipt slots",
      "Advanced RFID shielding blocks 13.56MHz scan signals",
      "Packaged in a premium recycled kraft gift box"
    ],
    specifications: {
      "Dimensions": "4.2\" L x 3.1\" H (closed)",
      "Thickness": "0.4 inches (empty)",
      "Material": "Veg-Tanned Italian Leather",
      "Stitching": "Premium Waxed Polyester Thread",
      "RFID Block": "Yes, standard cards protection"
    },
    rating: 4.8,
    reviewCount: 312,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#5c4033", "#111111"],
    sizes: ["Slim Bifold", "Cardholder"],
    deliveryTime: "Ships tomorrow",
    warranty: "Lifetime Leather Guarantee",
    seller: "Aura Atelier"
  },
  {
    id: "acc-2",
    name: "Waterproof Travel Tech Organizer",
    category: "Accessories",
    brand: "Peak Design (Mock)",
    price: 59,
    originalPrice: 69,
    discount: 14,
    description: "A weather-resistant tech pouch with origami-style pockets. Keeps your chargers, cables, memory cards, and powerbanks neatly organized in your backpack.",
    features: [
      "400D Weatherproof nylon canvas shell",
      "Origami-style internal pockets maximize storage capacity",
      "Dual pen loops, dedicated SD card slots, zip pocket",
      "Pass-through charging port for powering devices on-the-go",
      "Subtle external grab handle loops for easy carry"
    ],
    specifications: {
      "Capacity": "2 Liters",
      "Material": "400D Double Poly-Coated Nylon",
      "Zippers": "Heavy-duty weather-sealed zippers",
      "Weight": "0.6 lbs (290g)",
      "Dimensions": "9.5\" W x 6.0\" H x 4.0\" D"
    },
    rating: 4.7,
    reviewCount: 148,
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=800&auto=format&fit=crop"
    ],
    colors: ["#1f2937", "#4b5563"],
    sizes: ["2L Standard", "1L Mini"],
    deliveryTime: "Ships tomorrow",
    warranty: "Lifetime Warranty",
    seller: "Aura Tech Gear"
  }
];

// Dynamically generate up to 60 products to populate the grid comprehensively
const categories = ["Mobiles", "Laptops", "Audio", "Smart Devices", "Gaming", "Fashion", "Shoes", "Watches", "Furniture", "Kitchen", "Beauty", "Books", "Sports", "Accessories"];
const brands = ["Apple", "Samsung", "Google", "Sony", "Bose", "ASUS", "Dell", "Aura Atelier", "Nike", "Adidas", "Tissot", "Dyson", "Nespresso", "Steelcase"];

// Helper function to auto-generate the remaining 32 items to reach a database of 60 items
const currentCount = products.length;
const neededCount = 60;

for (let i = currentCount; i < neededCount; i++) {
  const catIndex = i % categories.length;
  const brandIndex = i % brands.length;
  const category = categories[catIndex];
  const brand = brands[brandIndex];
  
  let basePrice = 50 + (i * 12) % 400;
  if (category === "Laptops") basePrice += 600;
  if (category === "Mobiles") basePrice += 300;
  if (category === "Watches") basePrice += 150;
  
  const discount = (i % 4) * 5 + 5;
  const price = Math.round(basePrice * (1 - discount / 100));
  
  let unsplashUrl = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop";
  if (category === "Mobiles") unsplashUrl = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop";
  else if (category === "Laptops") unsplashUrl = "https://images.unsplash.com/photo-1496181130204-7552cc14ac42?q=80&w=800&auto=format&fit=crop";
  else if (category === "Audio") unsplashUrl = "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=800&auto=format&fit=crop";
  else if (category === "Gaming") unsplashUrl = "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?q=80&w=800&auto=format&fit=crop";
  else if (category === "Fashion") unsplashUrl = "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop";
  else if (category === "Shoes") unsplashUrl = "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop";
  else if (category === "Watches") unsplashUrl = "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=800&auto=format&fit=crop";
  else if (category === "Furniture") unsplashUrl = "https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=800&auto=format&fit=crop";
  else if (category === "Kitchen") unsplashUrl = "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=800&auto=format&fit=crop";
  else if (category === "Beauty") unsplashUrl = "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=800&auto=format&fit=crop";
  else if (category === "Books") unsplashUrl = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop";
  else if (category === "Sports") unsplashUrl = "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop";
  else if (category === "Accessories") unsplashUrl = "https://images.unsplash.com/photo-1524498250077-390f9e378db0?q=80&w=800&auto=format&fit=crop";

  products.push({
    id: `auto-prod-${i}`,
    name: `${brand} Premium ${category} Item ${Math.ceil(i/3)}`,
    category,
    brand,
    price,
    originalPrice: basePrice,
    discount,
    description: `A stunning minimalist designed item in our ${category} category, crafted by ${brand}. Features high-quality materials, sustainable sourcing, and modern premium specs to fit your everyday life.`,
    features: [
      "Crafted with durable top-tier materials",
      "Minimalist design fits any aesthetic",
      "Highly ergonomic and user-friendly features",
      "Sustainable production and supply chains",
      "Built for performance and heavy-duty usage"
    ],
    specifications: {
      "Manufacturer": brand,
      "Category": category,
      "Material": "Carbon polymer & composite alloy",
      "Warranty": "1 Year Factory Warranty",
      "Model Year": "2025"
    },
    rating: Number((4.1 + (i % 9) * 0.1).toFixed(1)),
    reviewCount: 12 + (i * 7) % 180,
    stock: 5 + (i % 15),
    images: [unsplashUrl],
    colors: ["#111827", "#ffffff", "#3b82f6"],
    sizes: category === "Fashion" || category === "Shoes" ? ["M", "L", "XL"] : ["Standard"],
    deliveryTime: i % 2 === 0 ? "Ships tomorrow" : "Ships in 3 days",
    warranty: "1 Year Brand Warranty",
    seller: `${brand} Authorized Store`
  });
}
