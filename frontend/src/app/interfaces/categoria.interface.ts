export interface Subcategory {
  id: number;
  nombre: string;
}

export interface Categoria {
  id: number;
  nombre: string;
  sub: Subcategory[];
}
