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
};

export type Mesa = {
    id: number;
    capacidad: number;
    estado: 'libre' | 'ocupada';
    hace?: string;
    icono?: string;
};

export type Pedido = {
    id: number;
    numero_mesa: number;
    cliente: string;
    estado: string;
    total: number;
    user_id: number | null;
    created_at: string;
    updated_at: string;
    productos?: (Producto & { pivot: { cantidad: number; precio_unitario: number } })[];
};
