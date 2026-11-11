export type InstrumentCategory = 'Todos' | 'Cuerda' | 'Viento Metal' | 'Viento Madera' | 'Percusión';

export interface Instrument {
  id: string;
  name: string;
  category: 'Cuerda' | 'Viento Metal' | 'Viento Madera' | 'Percusión';
  subcategory: string;
  price: number;
  currency: string;
  origin: string;
  materials: string;
  craftLevel: 'Maestro Luthier' | 'Conservatorio Superior' | 'Edición Solista' | 'Taller Tradicional';
  image: string;
  altText: string;
  shortDescription: string;
  fullDescription: string;
  specifications: {
    woodType?: string;
    varnish?: string;
    tuning?: string;
    weight?: string;
    dimensions?: string;
    yearOfCraft?: string;
    stringsOrValves?: string;
    bellDiameter?: string;
  };
  audioPreset: 'violin' | 'viola' | 'saxophone' | 'frenchHorn' | 'cello' | 'clarinet' | 'flute' | 'trumpet' | 'timpani';
  inStock: boolean;
  featured?: boolean;
}

export interface ConsultationRequest {
  fullName: string;
  email: string;
  phone: string;
  socialOrHandle: string;
  instrumentId?: string;
  instrumentName?: string;
  message: string;
  preferredDate?: string;
  serviceType: 'Compra Directa' | 'Prueba Acústica Privada' | 'Restauración / Ajuste' | 'Consulta General';
}

export interface CartItem {
  instrument: Instrument;
  quantity: number;
  notes?: string;
}
