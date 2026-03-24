export const COUNTRY_REGIONS: Record<string, string[]> = {
  Brazil: ["Amazonas", "Sao Paulo", "Rio de Janeiro", "Bahia", "Mato Grosso", "Parana", "Minas Gerais"],
  Argentina: ["Buenos Aires", "Cordoba", "Santa Fe", "Mendoza", "Chaco", "Patagonia"],
  Colombia: ["Bogota", "Antioquia", "Valle del Cauca", "Cundinamarca", "Atlantico", "Bolivar"],
  Peru: ["Lima", "Arequipa", "Cusco", "Loreto", "Piura", "La Libertad"],
  Chile: ["Santiago", "Valparaiso", "Antofagasta", "Biobio", "Araucania"],
  Ecuador: ["Guayas", "Pichincha", "Azuay", "Manabi", "El Oro"],
  Bolivia: ["La Paz", "Santa Cruz", "Cochabamba", "Potosi", "Beni"],
  Paraguay: ["Asuncion", "Central", "Alto Parana", "Itapua"],
  Uruguay: ["Montevideo", "Canelones", "Maldonado", "Salto"],
  Venezuela: ["Zulia", "Miranda", "Carabobo", "Bolivar", "Distrito Capital"],
  Guyana: ["Demerara-Mahaica", "Cuyuni-Mazaruni", "Barima-Waini"],
  Suriname: ["Paramaribo", "Wanica", "Nickerie", "Sipaliwini"],
};

export const REGION_COORDS: Record<string, [number, number]> = {
  // Brazil
  Amazonas: [-63.0, -3.4],
  "Sao Paulo": [-46.6, -23.5],
  "Rio de Janeiro": [-43.1, -22.9],
  Bahia: [-38.5, -12.9],
  "Mato Grosso": [-56.0, -12.6],
  
  // Argentina
  "Buenos Aires": [-58.3, -34.6],
  Cordoba: [-64.1, -31.4],
  "Santa Fe": [-60.6, -32.9],
  Mendoza: [-68.8, -32.8],
  
  // Colombia
  Bogota: [-74.0, 4.7],
  Antioquia: [-75.5, 6.2],
  "Valle del Cauca": [-76.5, 3.4],
  
  // Peru
  Lima: [-77.0, -12.0],
  Arequipa: [-71.5, -16.4],
  Cusco: [-71.9, -13.5],
  
  // Chile
  Santiago: [-70.6, -33.4],
  Valparaiso: [-71.6, -33.0],
};
