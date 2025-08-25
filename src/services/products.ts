import apiFetch from './api';

// Mock products data
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Taller Bolso Summer",
    description: "Vamos a realizar 3 proyectos que te van a enamorar por lo rápido y fácil de su confección.",
    detailed_description: "👜1.0 Bolso combinado Calado y Grannys 👜2.0 Bolso tres Colores👜3.0 Bolso Súper Grannys XL.",
    materials: ["1° Bolso🧶Hilo de algodón 8/8 o 8/6. 250gr para el color principal, y el secundario 30gr",
        "2° Bolso🧶Hilo de algodón 8/8. para el color principal 120gr, y los otros dos 80gr",
        "3° Bolso🧶Hilo de algodón 8/8. para el primero 120gr, y los otros dos 100gr"],
    workshop_includes: [
      "Patrón completo de los 3 bolsos",
      "Técnicas de tejido basicas",
      "Secretos de terminación",
      "Clases en vivo grabadas para que puedas aprender a tu ritmo",
      "Asesoramiento personalizado",
    ],
    price: 0,
    category: "Talleres",
    categories: ["Talleres", "Online"],
    images: [
      "/BolsoSum/BolsoSum1.png",
      "/BolsoSum/BolsoSum2.png",
      "/BolsoSum/BolsoSum3.png"
    ],
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: "Taller Chaleco Grannys",
    description: "No vas a creer lo sencillo y rápido que podes realizar una prenda tejida !!️",
    detailed_description: "En este taller completo aprenderás desde los fundamentos básicos del cuadrado granny hasta las técnicas avanzadas de construcción de prendas. Trabajaremos con diferentes combinaciones de colores para crear efectos visuales únicos y aprenderás a adaptar el patrón a tu talla específica. El chaleco resultante será una prenda versátil que podrás usar en cualquier ocasión, desde un look casual hasta uno más elegante.",
    materials: [
      "Hilo de algodón 8/6 o 8/8",
      "Aguja N° 4 o 5",
      "50 gr 1° color",
      "80 gr 2° color",
      "80 gr 3° color",
      "500 gr 4° color",
    ],
    workshop_includes: [      
      "Patrón completo para la confexion del chaleco",
      "Técnicas de tejido basicas",
      "Secretos de terminación",
      "Clases en vivo grabadas para que puedas aprender a tu ritmo",
      "Asesoramiento personalizado",
    ],
    price: 0,
    category: "Talleres",
    images: [
      "/ChalecoGrannys/ChalecoGrannys1.png",
      "/ChalecoGrannys/ChalecoGrannys2.png"
    ],
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: "Taller Deco Hogar",
    description: "Te vas a sorprender de la cantidad de proyectos y accesorios, que vas a poder realizar para tu casa con tan solo este TALLER",
    detailed_description: "🧶 1° Camino de Mesa Grannys Flor c/punto Pop Corn" + "🧶 2° Carpeta o Individual recto Libélula con terminación en punto Puff y sus variantes." +
     "🧶 3° Camino de mesa combinado en 2 colores, textura y trama.",
    price: 0,
    category: "Talleres",
    images: [
      "/DecoHogar/DecoHogar1.png", 
      "/DecoHogar/DecoHogar2.png"
    ],
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    name: "Taller Manta Nordica",
    description: "Lana de algodón 100% natural, perfecta para amigurumis y proyectos delicados. Disponible en múltiples colores. Suave al tacto y fácil de trabajar.",
    detailed_description: "Este taller está diseñado especialmente para el verano, donde aprenderás a crear un bolso funcional y estiloso usando técnicas de crochet modernas. El diseño incluye un forro interior resistente al agua y asas cómodas para uso prolongado. Perfecto para principiantes que quieren crear algo útil y hermoso.",
    materials: [
      "Hilo de algodón mercerizado en 2 colores",
      "Aguja de crochet N° 4mm",
    ],
    workshop_includes: [
      "Patrón completo del bolso",
      "Técnicas de tejido en redondo",
    ],
    price: 0,
    category: "Talleres",
    images: [
      "/MantaNordica/MantaNordica.png"
    ],
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    name: "Vestido Arcoíris",
    description: "Aprende a tejer un vestido con los colores del arcoíris, para ser la sensación del verano.",
    detailed_description: "Este taller está diseñado especialmente para el verano, donde aprenderás a crear un bolso funcional y estiloso usando técnicas de crochet modernas. El diseño incluye un forro interior resistente al agua y asas cómodas para uso prolongado. Perfecto para principiantes que quieren crear algo útil y hermoso.",
    materials: [
      "Hilo de algodón mercerizado en 2 colores",
      "Aguja de crochet N° 4mm",
    ],
    workshop_includes: [
      "Patrón completo del bolso",
      "Técnicas de tejido en redondo",
    ],
    price: 0,
    category: "Talleres",
    images: [
      "/VestidoArc/Arcoiris1.png",
      "/VestidoArc/Arcoiris2.png"
    ],
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 6,
    name: "Grannys para Sacon",
    description: "Les aseguro que van aprender a tejer este Sacón con grannys y todas sus variantes chaqueta Sacón y Tapado Largo!",
    detailed_description: "También vas leer un patrón y lo más importante los secretos, para que las terminaciones queden excelentes.",
    materials: [
      "Lana Merino Sedificada 8/6",
      "180 gr. 1°color",
      "180 gr. 2° color",
      "960 gr. 3° color",
      "Aguja N° 4 o 5",
    ],
    workshop_includes: [
      "Patrón completo de grannys",
      "Técnicas de tejido basicas",
      "Secretos de terminación",
      "Clases en vivo grabadas para que puedas aprender a tu ritmo",
      "Asesoramiento personalizado",
    ],
    price: 0,
    category: "Talleres",
    images: [
      "/GrannysSacon/Imagen1.png",
      "/GrannysSacon/Imagen2.png",
    ],
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 7,
    name: "Taller Grannys XXL",
    description: "Les aseguro que van aprender a tejer estos grannys y todas sus variantes. También vas a leer un patrón y lo más importante los secretos, para que las terminaciones queden excelentes.",
    detailed_description: "Este taller está diseñado especialmente para el verano, donde aprenderás a crear un bolso funcional y estiloso usando técnicas de crochet modernas. El diseño incluye un forro interior resistente al agua y asas cómodas para uso prolongado. Perfecto para principiantes que quieren crear algo útil y hermoso.",
    materials: [
      "Hilo de algodón mercerizado en 2 colores",
      "Aguja de crochet N° 4mm",
    ],
    workshop_includes: [
      "Patrón completo del bolso",
      "Técnicas de tejido en redondo",
    ],
    price: 0,
    category: "Talleres",
    images: [
      "/GrannysXXL/imagen1.jpg",
      "/GrannysXXL/imagen2.jpg",
      "/GrannysXXL/imagen3.jpg"
    ],
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 8,
    name: "Taller Sacon Penelope",
    description: "Estoy segura que te vas a sorprender de lo básico, rápido y sencillo que podes realizar una prenda tan elegante y abrigada !",
    detailed_description: "Este taller está diseñado especialmente para el verano, donde aprenderás a crear un bolso funcional y estiloso usando técnicas de crochet modernas. El diseño incluye un forro interior resistente al agua y asas cómodas para uso prolongado. Perfecto para principiantes que quieren crear algo útil y hermoso.",
    materials: [
      "Hilo de algodón mercerizado en 2 colores",
      "Aguja de crochet N° 4mm",
    ],
    workshop_includes: [
      "Patrón completo del bolso",
      "Técnicas de tejido en redondo",
    ],
    price: 0,
    category: "Talleres",
    images: [
      "/SaconPenelope/SaconPenelope1.png",
      "/SaconPenelope/SaconPenelope2.png"
    ],
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 9,
    name: "Taller Puntillas Deco Hogar",
    description: "Estoy segura que te vas a sorprender de lo básico, rápido y sencillo que podes realizar una prenda tan elegante y abrigada !",
    detailed_description: "Este taller está diseñado especialmente para el verano, donde aprenderás a crear un bolso funcional y estiloso usando técnicas de crochet modernas. El diseño incluye un forro interior resistente al agua y asas cómodas para uso prolongado. Perfecto para principiantes que quieren crear algo útil y hermoso.",
    materials: [
      "Hilo de algodón mercerizado en 2 colores",
      "Aguja de crochet N° 4mm",
    ],
    workshop_includes: [
      "Patrón completo del bolso",
      "Técnicas de tejido en redondo",
    ],
    price: 0,
    category: "Talleres",
    images: [
      "/PuntillasDecoHogar/PuntillasDecoHogar1.png",
      "/PuntillasDecoHogar/PuntillasDecoHogar2.png"
    ],
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 10,
    name: "Taller Vestido Flowers",
    description: "Estoy segura que te vas a sorprender de lo básico, rápido y sencillo que podes realizar una prenda tan elegante y abrigada !",
    detailed_description: "Este taller está diseñado especialmente para el verano, donde aprenderás a crear un bolso funcional y estiloso usando técnicas de crochet modernas. El diseño incluye un forro interior resistente al agua y asas cómodas para uso prolongado. Perfecto para principiantes que quieren crear algo útil y hermoso.",
    materials: [
      "Hilo de algodón mercerizado en 2 colores",
      "Aguja de crochet N° 4mm",
    ],
    workshop_includes: [
      "Patrón completo del bolso",
      "Técnicas de tejido en redondo",
    ],
    price: 0,
    category: "Talleres",
    images: [
      "/VestidoFlowers/VestidoFlowers1.png",
      "/VestidoFlowers/VestidoFlowers2.png"
    ],
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 11,
    name: "Taller Puntillas Deco III",
    description: "Estoy segura que te vas a sorprender de lo básico, rápido y sencillo que podes realizar una prenda tan elegante y abrigada !",
    detailed_description: "Este taller está diseñado especialmente para el verano, donde aprenderás a crear un bolso funcional y estiloso usando técnicas de crochet modernas. El diseño incluye un forro interior resistente al agua y asas cómodas para uso prolongado. Perfecto para principiantes que quieren crear algo útil y hermoso.",
    materials: [
      "Hilo de algodón mercerizado en 2 colores",
      "Aguja de crochet N° 4mm",
    ],
    workshop_includes: [
      "Patrón completo del bolso",
      "Técnicas de tejido en redondo",
    ],
    price: 0,
    category: "Talleres",
    images: [
      "/DecoIII/Deco1.png",
      "/DecoIII/Deco2.png"
    ],
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 12,
    name: "Taller Manga Margott",
    description: "Estoy segura que te vas a sorprender de lo básico, rápido y sencillo que podes realizar una prenda tan elegante y abrigada !",
    detailed_description: "Este taller está diseñado especialmente para el verano, donde aprenderás a crear un bolso funcional y estiloso usando técnicas de crochet modernas. El diseño incluye un forro interior resistente al agua y asas cómodas para uso prolongado. Perfecto para principiantes que quieren crear algo útil y hermoso.",
    materials: [
      "Hilo de algodón mercerizado en 2 colores",
      "Aguja de crochet N° 4mm",
    ],
    workshop_includes: [
      "Patrón completo del bolso",
      "Técnicas de tejido en redondo",
    ],
    price: 0,
    category: "Talleres",
    images: [
      "/MangasMargott/MangaMar1.jpeg",
      "/MangasMargott/MangaMar2.jpeg"
    ],
    is_active: true,
    created_at: new Date().toISOString()
  },
];

export interface Product {
  id: number;
  name: string;
  description: string;
  detailed_description?: string;
  materials?: string[];
  workshop_includes?: string[];
  price: number;
  category: string; // legacy single category used for filters
  categories?: string[]; // optional multiple categories for UI badges
  images: string[];
  is_active: boolean;
  created_at: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  detailed_description?: string;
  materials?: string[];
  workshop_includes?: string[];
  price: number;
  category: string;
  images: string[];
}

class ProductService {
  // Get all products (public)
  async getProducts(filters?: { category?: string; search?: string }): Promise<Product[]> {
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filteredProducts = [...mockProducts];
    
    // Apply category filter
    if (filters?.category) {
      const cat = filters.category;
      filteredProducts = filteredProducts.filter(p => 
        p.category === cat || (Array.isArray(p.categories) && p.categories.includes(cat))
      );
    }
    
    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      );
    }
    
    return filteredProducts;
  }

  // Get single product (public)
  async getProduct(id: number): Promise<Product> {
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  // Get categories (public)
  async getCategories(): Promise<{ categories: string[] }> {
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const set = new Set<string>();
    for (const p of mockProducts) {
      if (p.category) set.add(p.category);
      if (Array.isArray(p.categories)) {
        for (const c of p.categories) set.add(c);
      }
    }
    const categories = [...set];
    return { categories };
  }

  // Create product (admin only)
  async createProduct(productData: CreateProductRequest): Promise<Product> {
    return apiFetch('/admin/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  // Update product (admin only)
  async updateProduct(id: number, productData: Partial<CreateProductRequest>): Promise<Product> {
    return apiFetch(`/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  // Delete product (admin only)
  async deleteProduct(id: number): Promise<{ message: string }> {
    return apiFetch(`/admin/products/${id}`, {
      method: 'DELETE',
    });
  }
}

export const productService = new ProductService();
