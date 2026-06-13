export type Producto = {
    id: number;
    descripcion: string;
    categoria: number;
    precio: number;
    stock_actual: number;
    stock_minimo: number;
    producto_esta_vigente: boolean;
    motivo_baja: string | null;
    updated_at: string;
    puede_eliminar: boolean;
};
