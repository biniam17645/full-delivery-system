import { Merchant, Product, Category, Order, Delivery, DriverLocation } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-all',
    slug: 'all',
    icon: 'Sparkles',
    sortOrder: 1,
    name: {
      en: 'All Categories',
      am: 'ሁሉም ምድቦች',
      om: 'Kutaa Hunda'
    }
  },
  {
    id: 'cat-cafes',
    slug: 'cafes',
    icon: 'Coffee',
    sortOrder: 2,
    name: {
      en: 'Cafes & Bunna',
      am: 'ካፌ እና ቡና',
      om: 'Kaaffee fi Buna'
    }
  },
  {
    id: 'cat-restaurants',
    slug: 'restaurants',
    icon: 'Utensils',
    sortOrder: 3,
    name: {
      en: 'Restaurants & Grills',
      am: 'ምግብ ቤቶች እና ጥብስ',
      om: 'Mana Nyaataa fi Xibsii'
    }
  },
  {
    id: 'cat-hotels',
    slug: 'hotels',
    icon: 'Hotel',
    sortOrder: 4,
    name: {
      en: 'Hotels & Dining',
      am: 'ሆቴሎች',
      om: 'Hoteelota'
    }
  },
  {
    id: 'cat-supermarket',
    slug: 'supermarket',
    icon: 'ShoppingBag',
    sortOrder: 5,
    name: {
      en: 'Groceries & Retail',
      am: 'ሱፐርማርኬት እና ሸቀጥ',
      om: 'Suupparmaarkatii'
    }
  }
];

export const INITIAL_MERCHANTS: Merchant[] = [
  {
    id: 'merch-gonde-cafe',
    ownerId: 'usr-owner-1',
    slug: 'gonde-cafe-asela',
    category: 'cafe',
    phone: '+251911456789',
    commissionRate: 0.18,
    rating: 4.9,
    reviewCount: 342,
    preparationTimeMinutes: 12,
    isOpen: true,
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    logo: '☕',
    name: {
      en: 'Gonde Cafe & Roastery',
      am: 'ጎንዴ ካፌ እና ቡና',
      om: 'Kaaffee fi Roostarii Goondee'
    },
    location: {
      latitude: 7.9572,
      longitude: 39.1295,
      addressText: 'Near Asela Main Post Office, Kebele 02',
      kebele: 'Kebele 02'
    },
    featuredDishes: ['Macchiato', 'Habesha Traditional Bunna', 'Fresh Croissant']
  },
  {
    id: 'merch-ras-hotel',
    ownerId: 'usr-owner-2',
    slug: 'ras-hotel-asela',
    category: 'hotel',
    phone: '+251912889900',
    commissionRate: 0.20,
    rating: 4.8,
    reviewCount: 512,
    preparationTimeMinutes: 25,
    isOpen: true,
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    logo: '🏨',
    name: {
      en: 'Ras Hotel Asela',
      am: 'ራስ ሆቴል አሰላ',
      om: 'Hoteela Raas Asallaa'
    },
    location: {
      latitude: 7.9540,
      longitude: 39.1250,
      addressText: 'Central Avenue, Near Stadium, Kebele 01',
      kebele: 'Kebele 01'
    },
    featuredDishes: ['Special Asela Beef Tibs', 'Doro Wat Special', 'Vegetarian Beyaynetu']
  },
  {
    id: 'merch-chilalo-burger',
    ownerId: 'usr-owner-3',
    slug: 'chilalo-special-burger',
    category: 'restaurant',
    phone: '+251922334455',
    commissionRate: 0.18,
    rating: 4.7,
    reviewCount: 290,
    preparationTimeMinutes: 18,
    isOpen: true,
    coverImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    logo: '🍔',
    name: {
      en: 'Chilalo Special Burger & Grill',
      am: 'ጭላሎ ስፔሻል በርገር',
      om: 'Baargarii Addaa Cillaaloo'
    },
    location: {
      latitude: 7.9620,
      longitude: 39.1320,
      addressText: 'Arsi University Road, Kebele 03',
      kebele: 'Kebele 03'
    },
    featuredDishes: ['Chilalo Double Cheese Burger', 'Spicy Chicken Wings', 'Mango Smoothie']
  },
  {
    id: 'merch-arsi-supermarket',
    ownerId: 'usr-owner-4',
    slug: 'arsi-farmers-supermarket',
    category: 'supermarket',
    phone: '+251933556677',
    commissionRate: 0.15,
    rating: 4.6,
    reviewCount: 184,
    preparationTimeMinutes: 15,
    isOpen: true,
    coverImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    logo: '🛒',
    name: {
      en: 'Arsi Green Market & Groceries',
      am: 'አርሲ አረንጓዴ ሱፐርማርኬት',
      om: 'Suupparmaarkatii Arsi Magariisa'
    },
    location: {
      latitude: 7.9510,
      longitude: 39.1210,
      addressText: 'Old Market Square, Kebele 04',
      kebele: 'Kebele 04'
    },
    featuredDishes: ['Pure Asela White Honey', 'Organic Arsi Butter', 'Fresh Milk']
  },
  {
    id: 'merch-aba-jifar',
    ownerId: 'usr-owner-5',
    slug: 'aba-jifar-bunna-asela',
    category: 'cafe',
    phone: '+251944112233',
    commissionRate: 0.18,
    rating: 4.95,
    reviewCount: 420,
    preparationTimeMinutes: 10,
    isOpen: true,
    coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    logo: '☕',
    name: {
      en: 'Aba Jifar Bunna & Pastry',
      am: 'አባ ጅፋር ቡና እና ጣፋጭ',
      om: 'Buna fi Nyaata Lallaafoo Abbaa Jifaar'
    },
    location: {
      latitude: 7.9560,
      longitude: 39.1275,
      addressText: 'Posta Bet Square, Kebele 02',
      kebele: 'Kebele 02'
    },
    featuredDishes: ['Traditional Claypot Jebena Bunna', 'Fresh Honey Baklava', 'Special Macchiato']
  },
  {
    id: 'merch-habesha-kitchen',
    ownerId: 'usr-owner-6',
    slug: 'habesha-kitchen-asela',
    category: 'restaurant',
    phone: '+251955667788',
    commissionRate: 0.20,
    rating: 4.85,
    reviewCount: 388,
    preparationTimeMinutes: 22,
    isOpen: true,
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    logo: '🍲',
    name: {
      en: 'Habesha Kitchen Asela',
      am: 'ሀበሻ ኪችን አሰላ',
      om: 'Mana Nyaataa Aadaa Habashaa'
    },
    location: {
      latitude: 7.9605,
      longitude: 39.1310,
      addressText: 'Near Arsi University Campus Entrance, Kebele 03',
      kebele: 'Kebele 03'
    },
    featuredDishes: ['Spicy Doro Wat Combo', 'Sizzling Special Shiro', 'Fasting Beyaynetu Deluxe']
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Gonde Cafe Items
  {
    id: 'prod-macchiato',
    merchantId: 'merch-gonde-cafe',
    categoryId: 'cat-cafes',
    productType: 'food',
    name: {
      en: 'Special Habesha Macchiato',
      am: 'ስፔሻል ሀበሻ ማኪያቶ',
      om: 'Maakiyaatoo Addaa'
    },
    description: {
      en: 'Rich roasted Arsi highland coffee layered with fresh steamed milk foam.',
      am: 'በአርሲ ከፍታ ቦታዎች የበቀለ ምርጥ ቡና ከተፈላ ወተት ጋር የተዘጋጀ ማኪያቶ።',
      om: 'Buna gaara Arsiirraa qophaa\'e aannan ho\'aa lallaafaa waliin.'
    },
    basePriceBirr: 55,
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    prepTimeMinutes: 5,
    tags: ['coffee', 'breakfast', 'popular', 'morning'],
    timeSlots: ['morning', 'lunch', 'afternoon'],
    frequentlyBoughtTogetherIds: ['prod-croissant', 'prod-sambusa'],
    optionGroups: [
      {
        id: 'opt-sugar',
        title: { en: 'Sugar Level', am: 'የስኳር መጠን', om: 'Hanga Sukkaaraa' },
        minSelections: 1,
        maxSelections: 1,
        choices: [
          { id: 's-normal', name: { en: 'Normal Sugar', am: 'መደበኛ ስኳር', om: 'Sukkaara Giddugaleessa' }, priceAdjustmentBirr: 0 },
          { id: 's-little', name: { en: 'Less Sugar', am: 'አነስተኛ ስኳር', om: 'Sukkaara Xiqqoo' }, priceAdjustmentBirr: 0 },
          { id: 's-none', name: { en: 'No Sugar', am: 'ያለ ስኳር', om: 'Sukkaara Malee' }, priceAdjustmentBirr: 0 }
        ]
      },
      {
        id: 'opt-milk',
        title: { en: 'Milk Style', am: 'የወተት አይነት', om: 'Gosa Aannanii' },
        minSelections: 0,
        maxSelections: 1,
        choices: [
          { id: 'm-extra-foam', name: { en: 'Extra Creamy Foam', am: 'ተጨማሪ አረፋ', om: 'Hoomacha Dabalataa' }, priceAdjustmentBirr: 10 },
          { id: 'm-almond', name: { en: 'Powdered Milk Blend', am: 'ልዩ ወተት', om: 'Aannan Addaa' }, priceAdjustmentBirr: 15 }
        ]
      }
    ]
  },
  {
    id: 'prod-croissant',
    merchantId: 'merch-gonde-cafe',
    categoryId: 'cat-cafes',
    productType: 'food',
    name: {
      en: 'Butter Croissant & Pastry',
      am: 'የቅቤ ክሮሳን ኬክ',
      om: 'Kiroosaantii Qibee'
    },
    description: {
      en: 'Flaky golden baked pastry with pure Ethiopian honey glaze.',
      am: 'በንፁህ ቅቤ እና በአሰላ ማር የተለወሰ ጣፋጭ ኬክ።',
      om: 'Nyaata lallaafoo qibeefi damma Asallaatiin tolfame.'
    },
    basePriceBirr: 60,
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    prepTimeMinutes: 3,
    tags: ['breakfast', 'pastry', 'morning'],
    timeSlots: ['morning', 'afternoon'],
    frequentlyBoughtTogetherIds: ['prod-macchiato']
  },

  // 2. Ras Hotel Asela Items
  {
    id: 'prod-tibs',
    merchantId: 'merch-ras-hotel',
    categoryId: 'cat-restaurants',
    productType: 'food',
    name: {
      en: 'Asela Highland Special Beef Tibs',
      am: 'የአሰላ ጭላሎ ስፔሻል የበሬ ጥብስ',
      om: 'Xibsii Sangaa Addaa Asallaa'
    },
    description: {
      en: 'Sautéed tender highland beef cubes with rosemary, onions, jalapenos, and 2 fresh injera.',
      am: 'ከአርሲ ምርጥ የበሬ ስጋ በቅቤ፣ ሮዝመሪ፣ ቀይ ሽንኩርት እና ሚጥሚጣ የተጠበሰ ከ2 እንጀራ ጋር።',
      om: 'Foon sangaa gabbataa qibee, shunkurtii fi qaraafaa waliin xibsame buddeena 2 waliin.'
    },
    basePriceBirr: 280,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    prepTimeMinutes: 20,
    tags: ['traditional', 'lunch', 'dinner', 'tibs', 'meat'],
    timeSlots: ['lunch', 'evening'],
    frequentlyBoughtTogetherIds: ['prod-macchiato'],
    optionGroups: [
      {
        id: 'opt-spice',
        title: { en: 'Spice Level', am: 'የማቃጠል መጠን', om: "Hanga Mi'eessituu" },
        minSelections: 1,
        maxSelections: 1,
        choices: [
          { id: 'sp-mild', name: { en: 'Mild (Alicha style)', am: 'መካከለኛ (አልጫ)', om: 'Giddu-galeessa' }, priceAdjustmentBirr: 0 },
          { id: 'sp-spicy', name: { en: 'Spicy & Awaze', am: 'በደንብ የሚያቃጥል (በአዋዜ)', om: 'Qaraa fi Awaazee' }, priceAdjustmentBirr: 10 }
        ]
      },
      {
        id: 'opt-extra-injera',
        title: { en: 'Extra Injera', am: 'ተጨማሪ እንጀራ', om: 'Buddeena Dabalataa' },
        minSelections: 0,
        maxSelections: 1,
        choices: [
          { id: 'inj-1', name: { en: '+1 Pure Teff Injera', am: '+1 የሰነፍ ጤፍ እንጀራ', om: '+1 Buddeena Xaafii' }, priceAdjustmentBirr: 25 },
          { id: 'inj-2', name: { en: '+2 Pure Teff Injera', am: '+2 የሰነፍ ጤፍ እንጀራ', om: '+2 Buddeena Xaafii' }, priceAdjustmentBirr: 45 }
        ]
      }
    ]
  },

  // 3. Chilalo Burger Items
  {
    id: 'prod-burger',
    merchantId: 'merch-chilalo-burger',
    categoryId: 'cat-restaurants',
    productType: 'food',
    name: {
      en: 'Chilalo Double Cheese Burger',
      am: 'ጭላሎ ደብል ቺዝ በርገር',
      om: 'Baargarii Chiizii Dachaa Cillaaloo'
    },
    description: {
      en: 'Two 100% pure beef patties with melted cheddar, crisp lettuce, tomato and secret Kech sauce. Served with spiced fries.',
      am: 'ሁለት ድርብ የበሬ ስጋዎች፣ የቀለጠ አይብ፣ ሰላጣ፣ ቲማቲም እና ድንች ጥብስ ጋር።',
      om: 'Foon sangaa baqqaana lama, chiizii baqe, fi chipsii laaffisaa waliin.'
    },
    basePriceBirr: 210,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    prepTimeMinutes: 15,
    tags: ['burger', 'lunch', 'dinner', 'popular', 'fast-food'],
    timeSlots: ['lunch', 'afternoon', 'evening']
  },

  // 4. Retail / Grocery Item with SKUs & Inventory (Phase 2 abstraction)
  {
    id: 'prod-honey',
    merchantId: 'merch-arsi-supermarket',
    categoryId: 'cat-supermarket',
    productType: 'retail',
    name: {
      en: 'Organic Asela White Mountain Honey',
      am: 'የአሰላ የተፈጥሮ ነጭ ማር',
      om: 'Damma Adii Gaara Asallaa'
    },
    description: {
      en: '100% raw unpasteurized organic honey harvested from Mount Chilalo flora.',
      am: 'ከጭላሎ ተራራ እፅዋት የተገኘ የተፈጥሮ ንጹህ ነጭ ማር።',
      om: 'Damma dhangala\'aa qulqulluu gaara Cillaaloorraa argame.'
    },
    basePriceBirr: 450,
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    sku: 'ASL-HONEY-001',
    stockQuantity: 42,
    tags: ['organic', 'retail', 'honey', 'healthy'],
    timeSlots: ['morning', 'lunch', 'evening'],
    variants: [
      {
        id: 'var-500g',
        sku: 'ASL-HONEY-500G',
        name: { en: '500g Glass Jar', am: '500 ግራም የጠርሙስ', om: 'Girama 500' },
        attributes: { weight: '500g', packaging: 'glass_jar' },
        priceBirr: 450,
        stockQuantity: 25,
        isAvailable: true
      },
      {
        id: 'var-1kg',
        sku: 'ASL-HONEY-1KG',
        name: { en: '1000g (1 KG) Family Size', am: '1 ኪሎ የቤተሰብ መጠን', om: 'Kiiloo 1 Maatiif' },
        attributes: { weight: '1kg', packaging: 'glass_jar' },
        priceBirr: 850,
        stockQuantity: 17,
        isAvailable: true
      }
    ]
  },

  // 5. Aba Jifar Bunna & Pastry Items
  {
    id: 'prod-jebena-bunna',
    merchantId: 'merch-aba-jifar',
    categoryId: 'cat-cafes',
    productType: 'food',
    name: {
      en: 'Aba Jifar Claypot Jebena Bunna',
      am: 'የአባ ጅፋር የሸክላ ጀበና ቡና',
      om: 'Buna Jabanaa Abbaa Jifaar'
    },
    description: {
      en: 'Freshly roasted Arsi organic coffee brewed in a traditional claypot. Served with rue (tena adam) and popcorn.',
      am: 'በሸክላ ጀበና የፈላ ጣፋጭ የአርሲ የተፈጥሮ ቡና ከጤና አዳም እና ከፈንድሻ ጋር።',
      om: 'Buna aadaa jabanaatiin dafqahe xenaa\'adaamii fi fandiishaa waliin.'
    },
    basePriceBirr: 45,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    prepTimeMinutes: 8,
    tags: ['coffee', 'bunna', 'traditional', 'breakfast', 'morning'],
    timeSlots: ['morning', 'lunch', 'afternoon', 'evening'],
    frequentlyBoughtTogetherIds: ['prod-baklava', 'prod-sambusa'],
    optionGroups: [
      {
        id: 'opt-herb',
        title: { en: 'Herbal Touch', am: 'የእፅዋት ምርጫ', om: "Qoricha Aadaa" },
        minSelections: 0,
        maxSelections: 1,
        choices: [
          { id: 'h-tena-adam', name: { en: 'With Fresh Tena Adam (Rue)', am: 'ከጤና አዳም ጋር', om: 'Xenaa\'adaam Waliin' }, priceAdjustmentBirr: 0 },
          { id: 'h-none', name: { en: 'Plain Bunna (Black)', am: 'ያለ ቅጠል (ጥቁር ቡና)', om: 'Buna Qullaa' }, priceAdjustmentBirr: 0 }
        ]
      }
    ]
  },
  {
    id: 'prod-baklava',
    merchantId: 'merch-aba-jifar',
    categoryId: 'cat-cafes',
    productType: 'food',
    name: {
      en: 'Asela Wild Honey Baklava',
      am: 'የአሰላ የተፈጥሮ ማር ባክላቫ',
      om: 'Baaklaavaa Damma Asallaa'
    },
    description: {
      en: 'Multi-layered crispy phyllo pastry soaked in Mount Chilalo raw honey and roasted crushed walnuts.',
      am: 'በንፁህ የተፈጥሮ ማር እና በለውዝ የተዘጋጀ የሚቆረጥም የባክላቫ ኬክ።',
      om: 'Nyaata lallaafoo baqqaana hedduu damma qulqulluu fi lawuzii waliin.'
    },
    basePriceBirr: 75,
    imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    prepTimeMinutes: 5,
    tags: ['pastry', 'sweets', 'dessert', 'morning', 'afternoon'],
    timeSlots: ['morning', 'afternoon', 'evening'],
    frequentlyBoughtTogetherIds: ['prod-jebena-bunna']
  },

  // 6. Habesha Kitchen Asela Items
  {
    id: 'prod-doro-wat',
    merchantId: 'merch-habesha-kitchen',
    categoryId: 'cat-restaurants',
    productType: 'food',
    name: {
      en: 'Habesha Royal Doro Wat Feast',
      am: 'ልዩ የሀበሻ የዶሮ ወጥ በቅቤ',
      om: 'Ittoo Lukkuu Aadaa Addaa'
    },
    description: {
      en: 'Slow-simmered tender chicken leg in rich spicy berbere stew, boiled egg, ayib cottage cheese, and 2 pure teff injera.',
      am: 'በቅቤና በርበሬ የበሰለ የዶሮ ብልት ከአይብ፣ እንቁላል እና 2 የጤፍ እንጀራ ጋር።',
      om: 'Foon lukkuu bilchaate ittoo mi\'aawaa, hanqaaquu, fi aayibii buddeena 2 waliin.'
    },
    basePriceBirr: 320,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    prepTimeMinutes: 25,
    tags: ['habesha', 'traditional', 'doro-wat', 'lunch', 'dinner'],
    timeSlots: ['lunch', 'evening'],
    optionGroups: [
      {
        id: 'opt-ayib',
        title: { en: 'Ayib (Cottage Cheese)', am: 'የአይብ ምርጫ', om: "Aayibii" },
        minSelections: 1,
        maxSelections: 1,
        choices: [
          { id: 'ayib-spicy', name: { en: 'Gomen Ayib (with greens)', am: 'ጎመን አይብ', om: 'Aayibii Raafuu' }, priceAdjustmentBirr: 15 },
          { id: 'ayib-normal', name: { en: 'Pure Ayib with Butter', am: 'ንጹህ አይብ በቅቤ', om: 'Aayibii Qulqulluu' }, priceAdjustmentBirr: 0 }
        ]
      }
    ]
  },
  {
    id: 'prod-shiro',
    merchantId: 'merch-habesha-kitchen',
    categoryId: 'cat-restaurants',
    productType: 'food',
    name: {
      en: 'Sizzling Shiro Tegamino Special',
      am: 'የሸክላ ሽሮ ተጋሚኖ በቅቤ',
      om: 'Shiroo Dabaqaa Aadaa'
    },
    description: {
      en: 'Aromatic chickpea stew bubbling hot in a claypot with spiced clarified kibe butter, green chilies, and teff injera.',
      am: 'በሸክላ ድስት እየተንተከተከ የሚቀርብ ልዩ የሽሮ ወጥ በቅቤ እና ቃሪያ ከእንጀራ ጋር።',
      om: 'Shiroo mi\'aawaa qibeefi qaraafaan qophaa\'e buddeena xaafii waliin.'
    },
    basePriceBirr: 160,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    prepTimeMinutes: 15,
    tags: ['shiro', 'habesha', 'fasting', 'traditional', 'lunch', 'dinner'],
    timeSlots: ['lunch', 'evening']
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-kech-101',
    orderNumber: 'KCH-20261018-001',
    customerId: 'usr-cust-1',
    customerName: 'Biniam Amdework',
    customerPhone: '+251911223344',
    merchantId: 'merch-ras-hotel',
    merchantName: 'Ras Hotel Asela',
    status: 'assigned_to_driver',
    subtotalBirr: 280,
    deliveryFeeBirr: 40,
    serviceFeeBirr: 10,
    totalAmountBirr: 330,
    merchantCommissionBirr: 56, // 20%
    driverEarningsBirr: 40,
    paymentMethod: 'telebirr',
    paymentStatus: 'paid',
    deliveryAddress: {
      latitude: 7.9650,
      longitude: 39.1350,
      addressText: 'Arsi University Main Campus, Gate 2',
      kebele: 'Kebele 03'
    },
    estimatedDeliveryMinutes: 20,
    createdAt: '2026-10-18T08:30:00Z',
    courierId: 'usr-drv-1',
    items: [
      {
        id: 'itm-1',
        orderId: 'ord-kech-101',
        productId: 'prod-tibs',
        productName: 'Asela Highland Special Beef Tibs',
        quantity: 1,
        unitPriceBirr: 280,
        totalPriceBirr: 280,
        selectedOptionsSnapshot: [{ group: 'Spice', choice: 'Spicy & Awaze' }]
      }
    ]
  },
  {
    id: 'ord-kech-102',
    orderNumber: 'KCH-20261018-002',
    customerId: 'usr-cust-2',
    customerName: 'Chaltu Gemechu',
    customerPhone: '+251922887766',
    merchantId: 'merch-gonde-cafe',
    merchantName: 'Gonde Cafe & Roastery',
    status: 'preparing',
    subtotalBirr: 170,
    deliveryFeeBirr: 35,
    serviceFeeBirr: 10,
    totalAmountBirr: 215,
    merchantCommissionBirr: 30.6, // 18%
    driverEarningsBirr: 35,
    paymentMethod: 'cbe_birr',
    paymentStatus: 'paid',
    deliveryAddress: {
      latitude: 7.9580,
      longitude: 39.1270,
      addressText: 'Commercial Bank of Ethiopia Asela Branch',
      kebele: 'Kebele 02'
    },
    estimatedDeliveryMinutes: 15,
    createdAt: '2026-10-18T08:45:00Z',
    items: [
      {
        id: 'itm-2',
        orderId: 'ord-kech-102',
        productId: 'prod-macchiato',
        productName: 'Special Habesha Macchiato',
        quantity: 2,
        unitPriceBirr: 55,
        totalPriceBirr: 110
      },
      {
        id: 'itm-3',
        orderId: 'ord-kech-102',
        productId: 'prod-croissant',
        productName: 'Butter Croissant & Pastry',
        quantity: 1,
        unitPriceBirr: 60,
        totalPriceBirr: 60
      }
    ]
  }
];

export const INITIAL_DELIVERIES: Delivery[] = [
  {
    id: 'del-001',
    orderId: 'ord-kech-101',
    driverId: 'usr-drv-1',
    status: 'in_transit',
    pickupLocation: {
      latitude: 7.9540,
      longitude: 39.1250,
      addressText: 'Ras Hotel Asela, Central Avenue'
    },
    dropoffLocation: {
      latitude: 7.9650,
      longitude: 39.1350,
      addressText: 'Arsi University Main Campus, Gate 2'
    },
    distanceKm: 2.3,
    driverEarningsBirr: 40,
    estimatedDurationMinutes: 14,
    startedAt: '2026-10-18T08:40:00Z'
  }
];

export const INITIAL_DRIVERS: DriverLocation[] = [
  {
    driverId: 'usr-drv-1',
    driverName: 'Dawit Bekele',
    vehicleType: 'bicycle',
    latitude: 7.9590,
    longitude: 39.1305,
    isOnline: true,
    isAvailable: false, // Busy with ord-kech-101
    batteryPercentage: 88,
    lastUpdated: 'Just now'
  },
  {
    driverId: 'usr-drv-2',
    driverName: 'Abdi Tolosa',
    vehicleType: 'motorbike',
    latitude: 7.9535,
    longitude: 39.1260,
    isOnline: true,
    isAvailable: true, // Available for new dispatch!
    batteryPercentage: 94,
    lastUpdated: '1 min ago'
  },
  {
    driverId: 'usr-drv-3',
    driverName: 'Yonas Tadesse',
    vehicleType: 'bicycle',
    latitude: 7.9610,
    longitude: 39.1330,
    isOnline: true,
    isAvailable: true,
    batteryPercentage: 75,
    lastUpdated: '3 mins ago'
  }
];
