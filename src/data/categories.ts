export interface Category {
  id: number;
  name: string;
  nameHi: string;
  slug: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: 1,
    name: 'Pottery & Ceramics',
    nameHi: 'मिट्टी के बर्तन और सिरेमिक',
    slug: 'pottery',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop',
    productCount: 156,
  },
  {
    id: 2,
    name: 'Textiles & Fabrics',
    nameHi: 'कपड़े और वस्त्र',
    slug: 'textiles',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop',
    productCount: 234,
  },
  {
    id: 3,
    name: 'Jewelry',
    nameHi: 'आभूषण',
    slug: 'jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
    productCount: 189,
  },
  {
    id: 4,
    name: 'Wood Crafts',
    nameHi: 'लकड़ी की कारीगरी',
    slug: 'wood',
    image: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=400&h=400&fit=crop',
    productCount: 98,
  },
  {
    id: 5,
    name: 'Paintings & Art',
    nameHi: 'पेंटिंग और कला',
    slug: 'paintings',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop',
    productCount: 145,
  },
  {
    id: 6,
    name: 'Home Decor',
    nameHi: 'घर की सजावट',
    slug: 'home-decor',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&h=400&fit=crop',
    productCount: 267,
  },
  {
    id: 7,
    name: 'Brass & Metal',
    nameHi: 'पीतल और धातु',
    slug: 'brass',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    productCount: 78,
  },
  {
    id: 8,
    name: 'Leather Goods',
    nameHi: 'चमड़े की वस्तुएं',
    slug: 'leather',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    productCount: 56,
  },
];
