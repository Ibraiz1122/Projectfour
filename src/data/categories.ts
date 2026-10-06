import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'outerwear',
    name: 'Tailored Outerwear',
    slug: 'outerwear',
    tagline: 'Architectural silhouettes cut from double-faced cashmere and virgin wool.',
    description: 'Constructed in northern Italy, our outerwear balances clean masculine lines with fluid feminine draping.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
    subcategories: [
      { id: 'cashmere-coats', name: 'Cashmere Overcoats', slug: 'cashmere-overcoats', description: 'Hand-finished double-faced Mongolian cashmere.' },
      { id: 'tailored-blazers', name: 'Double-Breasted Blazers', slug: 'tailored-blazers', description: 'Sharp shoulders with horn button closures.' },
      { id: 'trench-coats', name: 'Water-Repellent Trenches', slug: 'trench-coats', description: 'Bonded cotton gabardine with leather-wrapped buckles.' },
      { id: 'wool-capes', name: 'Wool Capes & Ponchos', slug: 'wool-capes', description: 'Fluid outerwear drape woven from heavy felted wool.' }
    ]
  },
  {
    id: 'knitwear',
    name: 'Knitwear & Cashmere',
    slug: 'knitwear',
    tagline: 'Pure tactile warmth spun from gauge-graded Mongolian cashmere.',
    description: 'From whisper-light superfine merino to tactile fisherman ribs, each piece is spun for timeless longevity.',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85',
    subcategories: [
      { id: 'cable-knits', name: 'Chunky Cable Knits', slug: 'cable-knits', description: 'Heritage stitch work in unbleached organic wool.' },
      { id: 'merino-crewnecks', name: 'Fine Merino Crewnecks', slug: 'merino-crewnecks', description: 'Seamless 18-gauge merino for year-round layering.' },
      { id: 'alpaca-cardigans', name: 'Brushed Alpaca Cardigans', slug: 'alpaca-cardigans', description: 'Cloud-soft texture with mother-of-pearl buttons.' },
      { id: 'ribbed-turtlenecks', name: 'Ribbed Turtlenecks', slug: 'ribbed-turtlenecks', description: 'Sculpting high necklines in stretch cashmere blend.' }
    ]
  },
  {
    id: 'dresses',
    name: 'Dresses & Gowns',
    slug: 'dresses',
    tagline: 'Effortless bias cuts and structural drapery designed for movement.',
    description: 'Cut on the bias from heavyweight mulberry silk satin and structured Japanese technical crepe.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
    subcategories: [
      { id: 'slip-dresses', name: 'Silk Bias Slip Dresses', slug: 'slip-dresses', description: 'Heavyweight 30mm silk that flows effortlessly along the body.' },
      { id: 'evening-gowns', name: 'Structured Evening Gowns', slug: 'evening-gowns', description: 'Architectural column silhouettes with clean architectural lines.' },
      { id: 'pleated-midi', name: 'Pleated Midi Dresses', slug: 'pleated-midi', description: 'Accordion knife pleats crafted by master artisans.' },
      { id: 'column-dresses', name: 'Column Day Dresses', slug: 'column-dresses', description: 'Minimalist daily elegance in dense stretch-jersey.' }
    ]
  },
  {
    id: 'shirts',
    name: 'Shirts & Blouses',
    slug: 'shirts',
    tagline: 'Sartorial shirting in crisp poplin and fluid washed silks.',
    description: 'Impeccable collar geometry and French seams designed for modern ease and quiet sophistication.',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=85',
    subcategories: [
      { id: 'poplin-shirts', name: 'Crisp Poplin Shirts', slug: 'poplin-shirts', description: '120-two-ply organic Egyptian cotton poplin.' },
      { id: 'silk-blouses', name: 'Fluid Silk Georgette Tops', slug: 'silk-blouses', description: 'Semi-sheer drapery with concealed plackets.' },
      { id: 'band-collar', name: 'Band-Collar Tunics', slug: 'band-collar', description: 'Elongated hems with clean mandarin neckline detailing.' },
      { id: 'linen-shirts', name: 'Relaxed Linen Button-Downs', slug: 'linen-shirts', description: 'Pre-washed Normandy flax linen for summer ease.' }
    ]
  },
  {
    id: 'trousers',
    name: 'Trousers & Tailoring',
    slug: 'trousers',
    tagline: 'Flawlessly weighted trousers that drape with authoritative grace.',
    description: 'Deep pleats, extended tab waistbands, and full-break hems engineered for an elongated proportion.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    subcategories: [
      { id: 'wide-leg', name: 'Wide-Leg Pleated Trousers', slug: 'wide-leg-trousers', description: 'Double reverse pleats cut with generous volume.' },
      { id: 'wool-slacks', name: 'High-Waist Wool Slacks', slug: 'wool-slacks', description: 'Worsted wool gabardine with interior curtain waistband.' },
      { id: 'cigarette-pants', name: 'Tapered Cigarette Pants', slug: 'cigarette-pants', description: 'Sharp ankle-skimming cut with pressed front crease.' },
      { id: 'fluid-pants', name: 'Fluid Silk Pants', slug: 'fluid-pants', description: 'Pull-on luxury with satin drawstring and deep pockets.' }
    ]
  },
  {
    id: 'leather',
    name: 'Leather & Shearling',
    slug: 'leather',
    tagline: 'Supple full-grain nappa and plush Spanish shearling.',
    description: 'Vegetable-tanned leathers that develop an irreplaceable rich patina with every wear.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85',
    subcategories: [
      { id: 'suede-jackets', name: 'Suede Field Jackets', slug: 'suede-jackets', description: 'Velvety goat suede with horn buttons and utility flap pockets.' },
      { id: 'leather-biker', name: 'Butter-Soft Leather Biker', slug: 'leather-biker', description: 'Supple lambskin with custom brushed palladium hardware.' },
      { id: 'shearling-coats', name: 'Merinillo Shearling Coats', slug: 'shearling-coats', description: 'Double-sided warmth with soft suede exterior and plush fleece.' },
      { id: 'leather-skirts', name: 'Leather Midi Skirts', slug: 'leather-skirts', description: 'A-line silhouette with raw edge hems and subtle panel seams.' }
    ]
  },
  {
    id: 'evening',
    name: 'Evening & Occasion',
    slug: 'evening',
    tagline: 'Nocturnal glamour rendered with quiet restraint and opulent textures.',
    description: 'Deep midnight velvet, liquid silks, and sculpted smoking jackets crafted for memorable galas.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
    subcategories: [
      { id: 'smoking-jackets', name: 'Velvet Smoking Jackets', slug: 'smoking-jackets', description: 'Italian silk-velvet with grosgrain shawl collars.' },
      { id: 'satin-tuxedos', name: 'Satin Lapel Tuxedos', slug: 'satin-tuxedos', description: 'Timeless evening tailoring in barathea wool.' },
      { id: 'halter-jumpsuits', name: 'Crepe Halter Jumpsuits', slug: 'halter-jumpsuits', description: 'Open-back fluid crepe with structured waist cinching.' },
      { id: 'cocktail-separates', name: 'Embroidered Cocktail Pieces', slug: 'cocktail-separates', description: 'Subtle tonal beadwork on heavyweight silk georgette.' }
    ]
  },
  {
    id: 'footwear',
    name: 'Footwear',
    slug: 'footwear',
    tagline: 'Artisanal Italian cordwaining crafted for sublime comfort.',
    description: 'Blake-stitched soles, glove leather linings, and sculpted proportions designed in Florence.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85',
    subcategories: [
      { id: 'leather-loafers', name: 'Italian Leather Loafers', slug: 'leather-loafers', description: 'Hand-buffed calfskin with penny strap and stacked leather heel.' },
      { id: 'kitten-heels', name: 'Sculptural Kitten Heels', slug: 'kitten-heels', description: 'Sharp pointed toe with ergonomic 45mm architectural heel.' },
      { id: 'chelsea-boots', name: 'Suede Chelsea Boots', slug: 'chelsea-boots', description: 'Waterproof treated split calf suede with storm welt.' },
      { id: 'leather-mules', name: 'Minimalist Leather Mules', slug: 'leather-mules', description: 'Square-toe backless slippers with padded footbed.' }
    ]
  },
  {
    id: 'bags',
    name: 'Leather Goods & Bags',
    slug: 'bags',
    tagline: 'Saddle-stitched leather goods free of obtrusive logos.',
    description: 'Clean architectural lines, micro-suede linings, and solid brass turn-locks that celebrate pure form.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
    subcategories: [
      { id: 'day-totes', name: 'Structured Day Totes', slug: 'day-totes', description: 'Spacious interior fits laptop with removable zip pouch.' },
      { id: 'crossbody-bags', name: 'Minimalist Crossbody Bags', slug: 'crossbody-bags', description: 'Flap closure with magnetic gold-finish clasp.' },
      { id: 'shoulder-bags', name: 'Soft Nappa Shoulder Bags', slug: 'shoulder-bags', description: 'Slouchy baguette profile with adjustable knotted leather strap.' },
      { id: 'leather-clutches', name: 'Leather Cardholders & Clutches', slug: 'leather-clutches', description: 'Compact artisanal pouches for evening essentials.' }
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories & Fine Jewelry',
    slug: 'accessories',
    tagline: 'Tactile accents and sculptural vermeil to complete the wardrobe.',
    description: 'Hand-rolled silk twill scarves, weighty cashmere wraps, and organic-shaped recycled brass jewelry.',
    image: 'https://images.unsplash.com/photo-1611042553365-9b101441c135?auto=format&fit=crop&w=1200&q=85',
    subcategories: [
      { id: 'cashmere-scarves', name: 'Cashmere Scarves & Shawls', slug: 'cashmere-scarves', description: 'Fringed oversized wrap woven in Scottish borders.' },
      { id: 'silk-carre', name: 'Hand-Rolled Silk Carré', slug: 'silk-carre', description: '90x90cm archival geometric prints on twill.' },
      { id: 'sculpted-jewelry', name: 'Sculpted Brass & Vermeil', slug: 'sculpted-jewelry', description: '18k gold-dipped molten hoops and collar necklaces.' },
      { id: 'leather-belts', name: 'Handcrafted Leather Belts', slug: 'leather-belts', description: 'Full grain bridle leather with brushed buckle.' }
    ]
  }
];
