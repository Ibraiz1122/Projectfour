export interface LookbookLook {
  id: string;
  season: string;
  title: string;
  subtitle: string;
  image: string;
  location: string;
  photographer: string;
  items: {
    productId: string;
    label: string;
    x: number; // percentage coordinates for hotspot
    y: number;
  }[];
}

export interface JournalArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Craftsmanship' | 'Materiality' | 'Dialogue' | 'Atelier';
  date: string;
  readTime: string;
  excerpt: string;
  heroImage: string;
  content: string[];
  quote: string;
  quoteAuthor: string;
}

export const LOOKBOOK_LOOKS: LookbookLook[] = [
  {
    id: 'look-01',
    season: 'Autumn / Winter Edition 08',
    title: 'The Architecture of Solitude',
    subtitle: 'Photographed amidst the Brutalist monoliths of Biella, Northern Italy.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85',
    location: 'Biella, Piedmont, Italy',
    photographer: 'Julien Laurent',
    items: [
      { productId: 'prod-coat-01', label: 'Grand Cashmere Overcoat in Oatmeal', x: 45, y: 35 },
      { productId: 'prod-trousers-01', label: 'Wide Leg Worsted Trousers', x: 50, y: 70 }
    ]
  },
  {
    id: 'look-02',
    season: 'Permanent Wardrobe Vol. IV',
    title: 'Poetry in Pure Cashmere',
    subtitle: 'Tactile dialogues between heavy cable knits and fluid double-faced outerwear.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85',
    location: 'Como, Lombardy, Italy',
    photographer: 'Sienna Moreau',
    items: [
      { productId: 'prod-knit-01', label: 'Fisherman Cable Knit Sweater', x: 48, y: 40 },
      { productId: 'prod-shoe-01', label: 'Venetian Calf Loafer', x: 52, y: 85 }
    ]
  },
  {
    id: 'look-03',
    season: 'Resort & Evening Gala',
    title: 'Nocturne in Heavy Mulberry Silk',
    subtitle: 'Liquid lines falling at dusk against marble colonnades.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=85',
    location: 'Villa Necchi Campiglio, Milan',
    photographer: 'Matteo Rinaldi',
    items: [
      { productId: 'prod-dress-01', label: '30mm Silk Satin Bias Slip Dress', x: 46, y: 50 },
      { productId: 'prod-acc-02', label: 'Molten Vermeil Hoops', x: 44, y: 22 }
    ]
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-01',
    title: 'The Lost Art of Blind-Stitched Double-Faced Cashmere',
    slug: 'lost-art-of-double-faced-cashmere',
    category: 'Craftsmanship',
    date: 'October 2026',
    readTime: '6 min read',
    excerpt: 'An intimate journey inside our family-owned workshop in Tuscany, where artisans split raw cashmere fibers by 1.5mm to create seam-free elegance.',
    heroImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
    quote: 'True luxury whisperers do not stamp emblems; the cut speaks before the voice does.',
    quoteAuthor: 'Enzo Valenti, Master Tailor',
    content: [
      'In a world overwhelmed by hurried industrial production, double-faced fabric stands as a sanctuary of patience. Two independent layers of Grade-A cashmere are interwoven on specialized looms, held together by microscopic binder threads.',
      'To build a coat without lining, our tailors manually split these two layers along every hem by precisely 1.5 millimeters. The edges are then folded inward upon themselves and blind-stitched with ultra-fine silk thread at twelve stitches per inch.',
      'The result is a garment that appears unified on both faces—supple, completely weightless, and retaining warmth like an embrace.'
    ]
  },
  {
    id: 'art-02',
    title: 'Weight, Drapery, and the Architecture of Modern Trousers',
    slug: 'weight-drapery-modern-trousers',
    category: 'Materiality',
    date: 'September 2026',
    readTime: '4 min read',
    excerpt: 'Why fabric weight in grams per square meter dictates the posture, stride, and quiet authority of everyday tailored pants.',
    heroImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    quote: 'Proportion is not an aesthetic afterthought—it is the mathematics of physical poise.',
    quoteAuthor: 'Clara Delacroix, Head of Pattern Drafting',
    content: [
      'When designing our signature wide-leg trousers, we rejected lightweight fabrics that flutter uncontrollably. We selected a 310gsm four-season worsted wool woven from high-twist yarn.',
      'This specific weight allows the double forward pleats to retain razor precision when standing still, while swinging with natural pendulum physics when in motion.',
      'A true garment is sculpted not on a static mannequin, but in the kinetic cadence of a living stride.'
    ]
  },
  {
    id: 'art-03',
    title: 'Vegetable Tanning & The Patina of Time',
    slug: 'vegetable-tanning-and-patina',
    category: 'Atelier',
    date: 'August 2026',
    readTime: '5 min read',
    excerpt: 'Rejecting harsh chemical chrome baths in favor of Tuscan chestnut bark and mimosa flower extracts that age like vintage wine.',
    heroImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85',
    quote: 'Our leather bags are not finished when they leave our hands; they are finished twenty years into your life.',
    quoteAuthor: 'Marco Bellini, 3rd Generation Cordwainer',
    content: [
      'Industrial fast-fashion treats leather with synthetic polyurethane coatings to mask natural imperfections. We celebrate the raw history of the hide.',
      'Soaked in wooden vats of natural bark tannins for over forty days, the fibers breathe and absorb the oils of your hands, the warmth of the sun, and the rain of quiet afternoons.',
      'Over the years, the leather deepens in shade, creating an unrepeatable golden-amber glow unique to its owner.'
    ]
  }
];
