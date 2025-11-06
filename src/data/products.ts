export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  amazonLink: string;
  category: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Ryzen 5 7600X Desktop Processor',
    description: 'My processor in the PC build, it\'s a beast capable of handling 4070 Super, with 6 cores and 12 threads',
    imageUrl: '/images/products/ryzen5.webp',
    amazonLink: 'https://amzn.to/4d5E9kW',
    category: 'Computer and accessories',
    featured: true,
  },
  {
    id: '2',
    title: 'Cooler master MasterLiquid 240L Core ARGB(Black)',
    description: 'It is the best for this build, I mean perfect we can say.',
    imageUrl: '/images/products/coolermaster.webp',
    amazonLink: 'https://amzn.to/3EUItH1',
    category: 'Computer and accessories',
    featured: false,
  },
  {
    id: '3',
    title: 'MSI B650M Gaming plus WIFI (DDR5)',
    description: 'This is a well-regarded motherboard, particularly for its value-for-money and features',
    imageUrl: '/images/products/MotherBoard.webp',
    amazonLink: 'https://amzn.to/3ESUHzQ',
    category: 'Computer and accessories',
    featured: true,
  },
  {
    id: '4',
    title: 'Adata XPG Lancer RGB 16GB (16GB X 2 ) DDR5 6000MHz (Black)',
    description: 'It\'s a perfect choice for the RAM for this build, you can go for the non-RGB too',
    imageUrl: '/images/products/Ram.webp',
    amazonLink: 'https://amzn.to/44nlzlZ',
    category: 'Computer and accessories',
    featured: false,
  },
  {
    id: '5',
    title: 'GigaByte RTX 4060 Eagle OC 8GB',
    description: 'I know, you all\'re going to question this why, but the reason is need, like I can upgarde the graphics card to 4070 if I need so, if there will be need, I might upgrade for sure in near future.',
    imageUrl: '/images/products/RTX4060.webp',
    amazonLink: 'https://amzn.to/3GQgvwx',
    category: 'Computer and accessories',
    featured: true,
  },
  {
    id: '6',
    title: 'XPG GAMMIX S70 Blade M.2 NVME 2TB PCIe Gen4 2280 Internal Gaming SSD',
    description: 'If you\'re going to get this one\, it\'s the best investment for sure\, you can go for the lower version if you want\, but still I recommend you to buy this one.',
    imageUrl: '/images/products/SSD.webp',
    amazonLink: 'https://amzn.to/4jEaodt',
    category: 'Computer and accessories',
    featured: false,
  },
  {
    id: '7',
    title: 'Cooler Master MWE 750 V3 Bronze ATX 3.1 Power Supply - Non Modular | 80 Plus Bronze Certified',
    description: 'For 4060 this is enough, if you want to go more then that\'s also good, go for it.',
    imageUrl: '/images/products/powersupply.webp',
    amazonLink: 'https://amzn.to/4iMOmnB',
    category: 'Computer and accessories',
    featured: false,
  },
  {
    id: '8',
    title: 'MSI MAG Forge 320R Airflow Mid-Tower PC Case',
    description: 'To be honest, now it depends on you, which cabinet are you going to take, for me I found this value for money, so I recommened this one for it.',
    imageUrl: '/images/products/Cabinet.webp',
    amazonLink: 'https://amzn.to/4d0NkCY',
    category: 'Computer and accessories',
    featured: true,
  },
  {
    id: '9',
    title: 'Samsung Galaxy S23 (Cream)',
    description: 'I use it for my daily works as well as the cameras are really great, an all-rounder phone for sure.',
    imageUrl: '/images/products/S23.webp',
    amazonLink: 'https://amzn.to/3GQiwsB',
    category: 'Computer and accessories',
    featured: true,
  },
  {
    id: '10',
    title: 'JBL Quantum 100 Wired Over Ear Gaming Headphones with Mic',
    description: 'No doubt, its a value for money product, the sound quality is overall amazing and mic too but not suitable in noisy environement, good for foot-steps in gaming',
    imageUrl: '/images/products/headphones.webp',
    amazonLink: 'https://amzn.to/4l6uUmM',
    category: 'Computer and accessories',
    featured: true,
  },
  {
    id: '11',
    title: 'FIFINE A6T Streaming Gaming USB Microphone Kit,',
    description: 'if you are investing in this budget, then no doubt it\'s a good investment, that filter of the mic is really awesome, filters out almost all noise and you can tweak it a little bit on obs-studio to get the best out of it',
    imageUrl: '/images/products/microphone.webp',
    amazonLink: 'https://amzn.to/47rET2F',
    category: 'Computer and accessories',
    featured: false,
  },
];