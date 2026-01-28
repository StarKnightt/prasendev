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
    description: 'My processor in the PC build, it\'s a beast capable of handling 4070 Super, with 6 cores and 12 threads.',
    imageUrl: '/images/products/ryzen5.webp',
    amazonLink: 'https://amzn.to/4d5E9kW',
    category: 'PC Components',
    featured: true,
  },
  {
    id: '2',
    title: 'Cooler Master MasterLiquid 240L Core ARGB (Black)',
    description: 'The best AIO cooler for this build - perfect thermals and great RGB aesthetics.',
    imageUrl: '/images/products/coolermaster.webp',
    amazonLink: 'https://amzn.to/3EUItH1',
    category: 'PC Components',
    featured: false,
  },
  {
    id: '3',
    title: 'MSI B650M Gaming Plus WIFI (DDR5)',
    description: 'A well-regarded motherboard with excellent value-for-money, packed with features.',
    imageUrl: '/images/products/MotherBoard.webp',
    amazonLink: 'https://amzn.to/3ESUHzQ',
    category: 'PC Components',
    featured: true,
  },
  {
    id: '4',
    title: 'Adata XPG Lancer RGB 16GB (16GB x 2) DDR5 6000MHz (Black)',
    description: 'Perfect RAM choice for this build. You can opt for the non-RGB version too.',
    imageUrl: '/images/products/Ram.webp',
    amazonLink: 'https://amzn.to/44nlzlZ',
    category: 'PC Components',
    featured: false,
  },
  {
    id: '5',
    title: 'Gigabyte RTX 4060 Eagle OC 8GB',
    description: 'Solid GPU choice with room to upgrade to 4070 Super later if needed.',
    imageUrl: '/images/products/RTX4060.webp',
    amazonLink: 'https://amzn.to/3GQgvwx',
    category: 'PC Components',
    featured: true,
  },
  {
    id: '6',
    title: 'XPG GAMMIX S70 Blade M.2 NVMe 2TB PCIe Gen4 SSD',
    description: 'One of the best investments you can make - blazing fast storage that\'s worth every penny.',
    imageUrl: '/images/products/SSD.webp',
    amazonLink: 'https://amzn.to/4jEaodt',
    category: 'PC Components',
    featured: false,
  },
  {
    id: '7',
    title: 'Cooler Master MWE 750 V3 Bronze ATX 3.1 Power Supply',
    description: 'Reliable 80 Plus Bronze certified PSU. Perfect for RTX 4060, with headroom for upgrades.',
    imageUrl: '/images/products/powersupply.webp',
    amazonLink: 'https://amzn.to/4iMOmnB',
    category: 'PC Components',
    featured: false,
  },
  {
    id: '8',
    title: 'MSI MAG Forge 320R Airflow Mid-Tower PC Case',
    description: 'Excellent airflow design with great value for money. My top pick for this build.',
    imageUrl: '/images/products/Cabinet.webp',
    amazonLink: 'https://amzn.to/4d0NkCY',
    category: 'PC Components',
    featured: true,
  },
  {
    id: '9',
    title: 'Samsung Galaxy S23 (Cream)',
    description: 'My daily driver - amazing cameras and an all-rounder phone for productivity and media.',
    imageUrl: '/images/products/S23.webp',
    amazonLink: 'https://amzn.to/3GQiwsB',
    category: 'Mobile',
    featured: false,
  },
  {
    id: '10',
    title: 'JBL Quantum 100 Wired Over Ear Gaming Headphones',
    description: 'Value for money with amazing sound quality. Great for gaming footsteps detection.',
    imageUrl: '/images/products/headphones.webp',
    amazonLink: 'https://amzn.to/4l6uUmM',
    category: 'Peripherals',
    featured: false,
  },
  {
    id: '11',
    title: 'FIFINE A6T Streaming Gaming USB Microphone Kit',
    description: 'Excellent noise filtering out of the box. Tweak it in OBS Studio for professional audio.',
    imageUrl: '/images/products/microphone.webp',
    amazonLink: 'https://amzn.to/47rET2F',
    category: 'Peripherals',
    featured: false,
  },
  {
    id: '12',
    title: 'Razer BlackWidow V3 Tenkeyless',
    description: 'Premium mechanical keyboard from Razer. Great for both work and gaming - a must buy.',
    imageUrl: '/images/products/keyboard.webp',
    amazonLink: 'https://amzn.to/44Pq9ZN',
    category: 'Peripherals',
    featured: true,
  },
  {
    id: '13',
    title: 'compressed Air Duster',
    description: 'A must-have for keeping your devices clean and dust-free.',
    imageUrl: '/images/products/airduster.webp',
    amazonLink: 'https://amzn.to/45DVQFQ',
    category: 'Peripherals',
    featured: true,
  },
];