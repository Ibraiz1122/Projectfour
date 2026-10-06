import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  // OUTERWEAR
  {
    id: 'prod-coat-01',
    name: 'The Grand Double-Faced Cashmere Overcoat',
    slug: 'grand-cashmere-overcoat',
    subtitle: '100% Mongolian Cashmere • Unlined Hand-Stitched Edges',
    price: 1850,
    categoryId: 'outerwear',
    subcategoryId: 'cashmere-coats',
    description: 'Crafted from pure double-faced cashmere sourced from the Mongolian steppes. Cut for a generous, slouchy drape that glides effortlessly over tailored suits or chunky knitwear. Each hem and seam is meticulously split and blind-stitched by hand.',
    details: [
      'Unlined double-faced construction for featherweight warmth',
      'Broad notch lapels with clean pick-stitching',
      'Deep welt front pockets with interior ticket pocket',
      'Horn button front closure and buttoned storm flap',
      'Center back walking vent'
    ],
    materials: '100% Grade-A Mongolian Cashmere (520gsm)',
    fit: 'Relaxed tailored silhouette. Designed for layering over blazers. Take your normal size for an oversized look, or size down for closer fit.',
    careInstructions: 'Specialist dry clean only. Store on shaped wooden hanger with cedar blocks.',
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Oatmeal Heather', hex: '#D8D0C5' },
      { name: 'Midnight Charcoal', hex: '#1C1C1E' },
      { name: 'Camel Tan', hex: '#B59474' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNewArrival: true,
    isFeatured: true,
    isBestSeller: true,
    stockCount: 8,
    rating: 4.9,
    reviewCount: 38,
    season: 'Autumn / Winter 2026',
    sku: 'AV-OW-801'
  },
  {
    id: 'prod-blazer-02',
    name: 'The Structured Wool Serge Blazer',
    slug: 'structured-wool-serge-blazer',
    subtitle: 'British Worsted Wool • Horn Buttoning',
    price: 980,
    originalPrice: 1150,
    isSale: true,
    categoryId: 'outerwear',
    subcategoryId: 'tailored-blazers',
    description: 'An architectural double-breasted jacket with pronounced roped shoulders and a nipped, confident waistline. Woven from durable high-twist worsted wool serge that resists creasing throughout long travel days.',
    details: [
      'Six-button double-breasted closure',
      'Half-canvas interior structure for personalized drape',
      'Flap flap hip pockets and slanted welt chest pocket',
      'Working four-button surgeon cuffs',
      'Pure cupro jacquard interior lining'
    ],
    materials: '100% Virgin Worsted Wool (380gsm); Lining: 100% Bemberg Cupro',
    fit: 'Sharp, tailored silhouette. True to size.',
    careInstructions: 'Dry clean only. Steam lightly between wears.',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Deep Espresso', hex: '#2A1F1B' },
      { name: 'Anthracite', hex: '#232528' }
    ],
    sizes: ['36', '38', '40', '42', '44'],
    isFeatured: true,
    stockCount: 12,
    rating: 4.8,
    reviewCount: 24,
    season: 'Permanent Collection',
    sku: 'AV-OW-802'
  },
  {
    id: 'prod-trench-03',
    name: 'The Bonded Gabardine Storm Trench',
    slug: 'bonded-gabardine-storm-trench',
    subtitle: 'Water-Resistant Cotton Gabardine • Calfskin Buckles',
    price: 1320,
    categoryId: 'outerwear',
    subcategoryId: 'trench-coats',
    description: 'A contemporary reimagining of military wet-weather attire. Featuring double storm flaps, deep raglan sleeves for unrestrained mobility, and a removable waist belt secured with hand-stitched saddle leather hardware.',
    details: [
      'Water-repellent bonded long-staple cotton twill',
      'Dramatic cape back storm flap with button tab',
      'Detachable throat latch for gale protection',
      'Belt with solid brass eyelets and wrapped leather buckle',
      'Deep interior document pocket'
    ],
    materials: '100% Water-Resistant Cotton Gabardine; Buckles: 100% Calf Leather',
    fit: 'Fluid oversized trench drape. Fits true to size for comfortable layering.',
    careInstructions: 'Specialist wipe clean or dry clean.',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Warm Putty', hex: '#C7BFB5' },
      { name: 'Ink Navy', hex: '#0F172A' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isNewArrival: true,
    stockCount: 15,
    rating: 5.0,
    reviewCount: 19,
    season: 'Spring / Autumn 2026',
    sku: 'AV-OW-803'
  },
  {
    id: 'prod-cape-04',
    name: 'The Felted Wool Blanket Cape',
    slug: 'felted-wool-blanket-cape',
    subtitle: 'Heavyweight Felted Wool • Raw Blanket Stitching',
    price: 890,
    categoryId: 'outerwear',
    subcategoryId: 'wool-capes',
    description: 'An enveloping silhouette rendered in dense felted virgin wool. Features an asymmetrical front wrap that fastens with an antiqued brass pin, creating effortless architectural folds.',
    details: [
      'Generous sweeping circle hemline',
      'Hand-stitched perimeter blanket embroidery',
      'Slit armholes allow effortless hand movement',
      'Removable forged brass fastening pin'
    ],
    materials: '100% Virgin Felted Wool (600gsm)',
    fit: 'One size fits most. Drapes naturally over any shoulder width.',
    careInstructions: 'Dry clean only.',
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Raw Ecru', hex: '#EBE6DD' },
      { name: 'Soot Black', hex: '#111111' }
    ],
    sizes: ['One Size'],
    stockCount: 9,
    rating: 4.7,
    reviewCount: 15,
    season: 'Autumn / Winter 2026',
    sku: 'AV-OW-804'
  },

  // KNITWEAR
  {
    id: 'prod-knit-01',
    name: 'The Fisherman Cable Knit Sweater',
    slug: 'fisherman-cable-knit-sweater',
    subtitle: '5-Gauge Untreated Wool • Hand-Spun Texture',
    price: 640,
    categoryId: 'knitwear',
    subcategoryId: 'cable-knits',
    description: 'Hand-knitted in small batches using unspun organic wool retaining natural lanolin for subtle water resistance and authentic heritage resilience. A sculpted crew collar and substantial tubular ribbing finish the silhouette.',
    details: [
      'Substantial 5-gauge honeycomb and rope cable motifs',
      'Seamless circular knitting minimizes bulk',
      'Heavy ribbed cuffs and hem hold their shape over decades',
      'Naturally temperature-regulating'
    ],
    materials: '100% Untreated Organic Wool',
    fit: 'Generous boxy cut with dropped shoulders.',
    careInstructions: 'Hand wash cold with wool detergent. Dry flat on clean towels.',
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Chalk White', hex: '#EDECE6' },
      { name: 'Bark Brown', hex: '#42332B' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isBestSeller: true,
    isFeatured: true,
    stockCount: 14,
    rating: 4.9,
    reviewCount: 42,
    season: 'Permanent Collection',
    sku: 'AV-KN-201'
  },
  {
    id: 'prod-knit-02',
    name: 'The Second-Skin 18-Gauge Merino Turtleneck',
    slug: 'second-skin-merino-turtleneck',
    subtitle: 'Ultra-Fine 15.5 Micron Merino • Seamless Knit',
    price: 420,
    categoryId: 'knitwear',
    subcategoryId: 'ribbed-turtlenecks',
    description: 'Light as air yet surprisingly insulating, this featherweight knit sits smoothly against the skin without an ounce of prickle. Engineered with subtle micro-ribbing to elongate the neckline.',
    details: [
      '18-gauge ultra-fine spinning technology',
      'Self-folding funnel neckline',
      'Elongated sleeves designed to gently bunch at the wrist',
      'Ribbed micro-cuffs'
    ],
    materials: '100% Extra-Fine Australian Merino Wool (15.5 Micron)',
    fit: 'Close, sculpted fit. Stretches comfortably to body shape.',
    careInstructions: 'Hand wash cold or gentle dry clean. Do not tumble dry.',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Obsidian', hex: '#141416' },
      { name: 'Muted Olive', hex: '#4B4D3F' },
      { name: 'Porcelain Sand', hex: '#ECE8DF' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    isNewArrival: true,
    stockCount: 22,
    rating: 4.8,
    reviewCount: 29,
    season: 'Autumn / Winter 2026',
    sku: 'AV-KN-202'
  },
  {
    id: 'prod-knit-03',
    name: 'The Cloud Brushed Alpaca Cardigan',
    slug: 'cloud-brushed-alpaca-cardigan',
    subtitle: 'Peruvian Baby Alpaca Blend • Corozo Nut Fastenings',
    price: 580,
    categoryId: 'knitwear',
    subcategoryId: 'alpaca-cardigans',
    description: 'Brimming with an intoxicating halo of brushed fibers. This relaxed V-neck cardigan has an airy, weightless feel while trapping deep warmth, making it the supreme cold-weather companion.',
    details: [
      'Deep V-neckline ideal for collared shirts or bare skin',
      'Natural polished corozo nut buttons',
      'Slanted patch pockets at hips',
      'Slightly elongated cuffs'
    ],
    materials: '70% Baby Alpaca, 23% Polyamide, 7% Fine Wool',
    fit: 'Relaxed, cocoon fit. True to size.',
    careInstructions: 'Hand wash in cold water using delicate wool wash. Dry flat.',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Warm Taupe', hex: '#A89F91' },
      { name: 'Smoky Grey', hex: '#585655' }
    ],
    sizes: ['S', 'M', 'L'],
    stockCount: 11,
    rating: 4.9,
    reviewCount: 31,
    season: 'Autumn / Winter 2026',
    sku: 'AV-KN-203'
  },

  // DRESSES
  {
    id: 'prod-dress-01',
    name: 'The 30mm Silk Satin Bias Slip Dress',
    slug: 'silk-satin-bias-slip-dress',
    subtitle: 'Heavyweight Mulberry Silk • Bias Cut Silhouette',
    price: 760,
    categoryId: 'dresses',
    subcategoryId: 'slip-dresses',
    description: 'Cut diagonally across the fabric grain to cling gently to body contours before cascading into a liquid puddle hem. Made from ultra-dense 30-momme silk satin with a rich, luminous sheen.',
    details: [
      'Substantial 30mm silk satin prevents cling and static',
      'French seams and baby-rolled interior hems',
      'Subtle scoop neckline and delicate spaghetti straps',
      'Raw floor-skimming length with soft gentle train'
    ],
    materials: '100% Grade 6A Mulberry Silk Satin (30 Momme)',
    fit: 'Fluid bias cut. Fits true to size and naturally adjusts to hip curve.',
    careInstructions: 'Dry clean only. Steam on low reverse side.',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Champagne Pearl', hex: '#E6DDD0' },
      { name: 'Liquid Noir', hex: '#0B0B0C' },
      { name: 'Bordeaux Bronze', hex: '#4A282D' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    isFeatured: true,
    isBestSeller: true,
    stockCount: 7,
    rating: 5.0,
    reviewCount: 46,
    season: 'Spring / Summer 2026',
    sku: 'AV-DR-301'
  },
  {
    id: 'prod-dress-02',
    name: 'The Sculptural Column Crepe Evening Gown',
    slug: 'sculptural-column-crepe-gown',
    subtitle: 'Structured Japanese Bonded Crepe • Architectural Neckline',
    price: 1480,
    categoryId: 'dresses',
    subcategoryId: 'evening-gowns',
    description: 'Monolithic minimalism in its purest form. Features an asymmetric folded neckline inspired by Brutalist architecture, falling straight into a commanding floor-length column with a high back slit for dramatic strides.',
    details: [
      'Bonded double-faced crepe retains crisp geometric geometry',
      'Concealed invisible zip closure at side back',
      'Internal boned corset support ensures absolute stay',
      'High central back slit for dignified movement'
    ],
    materials: '68% Acetate, 32% Japanese Technical Silk Crepe',
    fit: 'Structured column fit. Fits true to size.',
    careInstructions: 'Specialist dry clean only.',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Ivory Alabaster', hex: '#F5F2EB' }
    ],
    sizes: ['36', '38', '40', '42'],
    isNewArrival: true,
    stockCount: 5,
    rating: 4.9,
    reviewCount: 18,
    season: 'Evening Couture 2026',
    sku: 'AV-DR-302'
  },

  // SHIRTS & BLOUSES
  {
    id: 'prod-shirt-01',
    name: 'The Architectural Poplin Oversized Shirt',
    slug: 'architectural-poplin-oversized-shirt',
    subtitle: '120/2 Giza Cotton Poplin • Mother-of-Pearl Buttons',
    price: 360,
    categoryId: 'shirts',
    subcategoryId: 'poplin-shirts',
    description: 'The foundation of a discerning wardrobe. Woven from Egyptian Giza cotton for a cool, crisp hand and crisp paper-like snap. Finished with exaggerated cuffs, a dropped curved hem, and genuine Australian mother-of-pearl buttons.',
    details: [
      'Crisp 120-two-ply yarn gives paper-fine hand and opacity',
      'Pointed forward spread collar stays razor sharp',
      'Dual-button elongated barrel cuffs',
      'Extended curved shirttail hemline designed to tuck or float'
    ],
    materials: '100% Giza Egyptian Long-Staple Cotton',
    fit: 'Oversized, masculine cut. Designed for an effortless borrowed-from-the-boys volume.',
    careInstructions: 'Machine wash delicate 30°C. Press with high steam.',
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Optic Crisp White', hex: '#FFFFFF' },
      { name: 'Sky Azure Stripe', hex: '#CBDDE9' },
      { name: 'Washed French Blue', hex: '#7799B5' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isFeatured: true,
    isBestSeller: true,
    stockCount: 26,
    rating: 4.9,
    reviewCount: 54,
    season: 'Permanent Collection',
    sku: 'AV-SH-101'
  },
  {
    id: 'prod-shirt-02',
    name: 'The Washed Silk Georgette Fluid Blouse',
    slug: 'washed-silk-georgette-blouse',
    subtitle: 'Sandwashed Mulberry Silk • Concealed Placket',
    price: 490,
    categoryId: 'shirts',
    subcategoryId: 'silk-blouses',
    description: 'Finished with an artisan sand-wash technique that imparts a peach-skin matte texture to the silk. Concealed front placket and pleated bishop sleeves create poetic drape that moves in breeze.',
    details: [
      'Sandwashed matte finish eliminates excessive shine',
      'Covered front placket for clean minimalist front',
      'Delicate gathers at shoulder seam and cuffs',
      'Mother-of-pearl collar stud button'
    ],
    materials: '100% Sandwashed Silk Georgette (19 Momme)',
    fit: 'Fluid relaxed fit.',
    careInstructions: 'Dry clean or gentle hand wash with silk shampoo.',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Bone Ivory', hex: '#F3EFE6' },
      { name: 'Smoked Sage', hex: '#879185' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    stockCount: 14,
    rating: 4.8,
    reviewCount: 21,
    season: 'Permanent Collection',
    sku: 'AV-SH-102'
  },

  // TROUSERS
  {
    id: 'prod-trousers-01',
    name: 'The Pleated High-Rise Wide Leg Trousers',
    slug: 'pleated-high-rise-wide-leg-trousers',
    subtitle: 'Four-Season Worsted Wool • Deep Forward Pleats',
    price: 590,
    categoryId: 'trousers',
    subcategoryId: 'wide-leg',
    description: 'Engineered to create endless leg length. Crafted in Biella, Italy with deep double front pleats that fall straight from a clean high-rise waistband into a puddle-length hem that crowns over shoes.',
    details: [
      'Double forward pleats create structured architectural volume',
      'Interior tailor’s curtain waistband prevents untucking',
      'Slanted front pockets and clean rear jetted welt pockets',
      'Blind hem allows easy custom tailoring adjustment'
    ],
    materials: '100% Super 120s Italian Virgin Wool (310gsm)',
    fit: 'High rise, wide full-length leg. Designed to touch the top of shoe sole.',
    careInstructions: 'Dry clean only. Hang by hems using felt clamp hanger.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Charcoal Melange', hex: '#343538' },
      { name: 'Camel Khaki', hex: '#A38B71' },
      { name: 'Caviar Noir', hex: '#111213' }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    isFeatured: true,
    isBestSeller: true,
    stockCount: 16,
    rating: 4.9,
    reviewCount: 39,
    season: 'Permanent Collection',
    sku: 'AV-TR-401'
  },

  // LEATHER & SHEARLING
  {
    id: 'prod-leather-01',
    name: 'The Minimalist Lambskin Field Jacket',
    slug: 'lambskin-field-jacket',
    subtitle: 'Full-Grain French Lambskin • Matte Palladium Hardware',
    price: 1980,
    categoryId: 'leather',
    subcategoryId: 'suede-jackets',
    description: 'Impossibly supple lambskin treated with organic vegetable tannins to preserve the leather’s innate grain and silky touch. Cut with clean utility flap pockets and a minimalist stand collar.',
    details: [
      'Full-grain glove-grade French lambskin',
      'Concealed double-ended riri zipper with snap storm placket',
      'Four dimensional accordion chest and hip pockets',
      'Internal drawstring waist for adjustable silhouette sculpting',
      'Silk-blend lining'
    ],
    materials: '100% French Lambskin Nappa; Lining: 55% Silk, 45% Cotton',
    fit: 'Straight boxy fit. Fits true to size.',
    careInstructions: 'Specialist leather clean only. Protect from heavy rain.',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Bitter Chocolate', hex: '#261C18' },
      { name: 'Pitch Black', hex: '#0D0D0E' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isNewArrival: true,
    isFeatured: true,
    stockCount: 6,
    rating: 5.0,
    reviewCount: 14,
    season: 'Autumn / Winter 2026',
    sku: 'AV-LT-501'
  },

  // FOOTWEAR
  {
    id: 'prod-shoe-01',
    name: 'The Venetian Hand-Polished Calf Loafer',
    slug: 'venetian-calf-loafer',
    subtitle: 'Blake-Stitched • Italian Box Calfskin',
    price: 720,
    categoryId: 'footwear',
    subcategoryId: 'leather-loafers',
    description: 'Handcrafted in an artisanal Tuscan workshop. Built with flexible Blake-stitch construction that molds to your stride from day one. Features an unadorned penny apron with sculpted bevelled edges.',
    details: [
      'Full-grain Italian box calf leather with mirror-buffed finish',
      'Glove-soft calf lining provides all-day comfort without socks',
      'Hand-stacked leather heel with embedded rubber strike plate',
      'Channelled leather outsole stained in dark mocha'
    ],
    materials: '100% Italian Calfskin; Sole: 100% Vegetable-Tanned Sole Leather',
    fit: 'True to Italian sizing. If between sizes, choose the smaller size.',
    careInstructions: 'Condition with natural beeswax polish. Use cedar shoe trees.',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Burnished Tan', hex: '#875135' },
      { name: 'Noir Glacé', hex: '#111112' }
    ],
    sizes: ['37', '38', '39', '40', '41', '42', '43'],
    isFeatured: true,
    isBestSeller: true,
    stockCount: 18,
    rating: 4.9,
    reviewCount: 33,
    season: 'Permanent Collection',
    sku: 'AV-FW-601'
  },
  {
    id: 'prod-shoe-02',
    name: 'The Sculpted Kitten Heel Mule',
    slug: 'sculpted-kitten-heel-mule',
    subtitle: '45mm Architectural Heel • Glove Goat Leather',
    price: 680,
    categoryId: 'footwear',
    subcategoryId: 'kitten-heels',
    description: 'An elongated, chiselled almond toe paired with a sculpted 45mm heel designed for poised day-to-night transitions. Padded leather footbed provides pillowy arch support.',
    details: [
      'Pointed almond toe silhouette',
      'Ergonomic 45mm architect-designed stable heel',
      'Memory foam cushioned leather insock',
      'Smooth leather outsole'
    ],
    materials: '100% Italian Glove Goat Suede & Calfskin',
    fit: 'True to size. Narrow fit at the toe.',
    careInstructions: 'Store in protective flannel dust bags.',
    images: [
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Velvet Noir', hex: '#161616' },
      { name: 'Cognac Suede', hex: '#8E5A3C' }
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    stockCount: 12,
    rating: 4.8,
    reviewCount: 22,
    season: 'Permanent Collection',
    sku: 'AV-FW-602'
  },

  // BAGS
  {
    id: 'prod-bag-01',
    name: 'The Structured Atelier Weekender Tote',
    slug: 'structured-atelier-weekender-tote',
    subtitle: 'Smooth Calfskin • Hand-Lacquered Edges',
    price: 1650,
    categoryId: 'bags',
    subcategoryId: 'day-totes',
    description: 'An expansive carryall designed without superfluous adornments. Cut from seamless panels of thick full-grain calfskin that stands upright on brass feet. Accommodates a 16-inch laptop with room for an overnight wardrobe.',
    details: [
      'Spacious micro-suede lined central compartment',
      'Removable zip-top calfskin document pouch',
      'Hand-stitched rolled top handles with 24cm drop',
      'Concealed magnetic top closure and bottom metal protective studs'
    ],
    materials: '100% Full-Grain Tuscan Calfskin; Lining: Faux Micro-Suede',
    fit: 'Dimensions: 46cm wide × 34cm high × 18cm deep. Handle drop 24cm.',
    careInstructions: 'Buff with dry microfiber cloth. Avoid prolonged sun exposure.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Caramel Saddle', hex: '#9E643C' },
      { name: 'Black Jasper', hex: '#141414' }
    ],
    sizes: ['Large'],
    isFeatured: true,
    isBestSeller: true,
    stockCount: 7,
    rating: 5.0,
    reviewCount: 28,
    season: 'Permanent Collection',
    sku: 'AV-BG-701'
  },
  {
    id: 'prod-bag-02',
    name: 'The Crescent Crossbody Flap Bag',
    slug: 'crescent-crossbody-flap-bag',
    subtitle: 'Nappa Leather • Antiqued Gold Turnlock',
    price: 890,
    categoryId: 'bags',
    subcategoryId: 'crossbody-bags',
    description: 'An elegant curved silhouette that nests naturally against the ribcage. Featuring an antiqued brass turnlock inspired by mid-century modernist sculpture.',
    details: [
      'Adjustable leather shoulder strap with sliding keeper',
      'Dual interior card slots and slip pocket',
      'Magnetic flap closure under turnlock',
      'Embossed gold foil serial number'
    ],
    materials: '100% Nappa Leather; Hardware: Solid Forged Brass',
    fit: 'Dimensions: 24cm wide × 18cm high × 7cm deep.',
    careInstructions: 'Store stuffed with tissue paper in dust bag.',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Ivory Sand', hex: '#EAE5D9' },
      { name: 'Forest Noir', hex: '#1E2822' }
    ],
    sizes: ['Regular'],
    isNewArrival: true,
    stockCount: 15,
    rating: 4.8,
    reviewCount: 19,
    season: 'Spring / Summer 2026',
    sku: 'AV-BG-702'
  },

  // ACCESSORIES & FINE JEWELRY
  {
    id: 'prod-acc-01',
    name: 'The Oversized Scottish Border Cashmere Scarf',
    slug: 'oversized-scottish-cashmere-scarf',
    subtitle: '200cm × 70cm • Ripple Finish with Teasel Heads',
    price: 440,
    categoryId: 'accessories',
    subcategoryId: 'cashmere-scarves',
    description: 'Woven on historic looms in the Scottish Borders using water from the local river to rinse fibers to incomparable softness. Finished with traditional natural teasel dried heads for a distinctive rippled lustre.',
    details: [
      'Generous 200cm length for multi-wrap styling',
      'Hand-twisted fringe borders',
      'Subtle tonal embroidered monogram at corner',
      'Featherweight yet exceptionally warm'
    ],
    materials: '100% Pure Scottish Cashmere',
    fit: '200cm length × 70cm width.',
    careInstructions: 'Dry clean only.',
    images: [
      'https://images.unsplash.com/photo-1611042553365-9b101441c135?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Oatmeal Taupe', hex: '#C2B8A3' },
      { name: 'Heather Grey', hex: '#878787' },
      { name: 'Midnight Charcoal', hex: '#212124' }
    ],
    sizes: ['One Size'],
    isBestSeller: true,
    stockCount: 20,
    rating: 4.9,
    reviewCount: 47,
    season: 'Permanent Collection',
    sku: 'AV-AC-901'
  },
  {
    id: 'prod-acc-02',
    name: 'The Molten Sculpted Vermeil Hoop Earrings',
    slug: 'molten-sculpted-vermeil-hoops',
    subtitle: '18K Gold over Sterling Silver • Organic Hand-Cast Form',
    price: 320,
    categoryId: 'accessories',
    subcategoryId: 'sculpted-jewelry',
    description: 'Molten, fluid contours reminiscent of melting wax. Hand-cast from recycled 925 sterling silver and plated in a thick 3-micron layer of 18-karat warm yellow gold.',
    details: [
      'Substantial 3-micron 18k yellow gold vermeil plating',
      'Hypoallergenic titanium post with secure friction back',
      'Weight: 7.2g per earring (engineered for comfortable day wear)',
      'Delivered in custom suede presentation case'
    ],
    materials: '18k Yellow Gold Vermeil on Recycled 925 Sterling Silver',
    fit: 'Diameter: 28mm × 6mm variable thickness.',
    careInstructions: 'Wipe with soft polishing cloth. Avoid perfume or chlorine.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1611042553365-9b101441c135?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: '18K Yellow Gold', hex: '#D4AF37' },
      { name: '925 Sterling Silver', hex: '#D1D5DB' }
    ],
    sizes: ['One Size'],
    isFeatured: true,
    stockCount: 16,
    rating: 4.9,
    reviewCount: 35,
    season: 'Permanent Collection',
    sku: 'AV-AC-902'
  }
];
