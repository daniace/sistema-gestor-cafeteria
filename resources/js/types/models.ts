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
    numero: number;
    capacidad: number;
    estado: 'libre' | 'ocupada';
    created_at: string;
    updated_at: string;
};

export type MetodoPago = {
    id: number;
    descripcion: string;
    habilitado: boolean;
    descuento: number;
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

export type Venta = {
    id: number;
    pedido_id: number;
    metodo_pago_id: number | null;
    total_original: number;
    total_final: number;
    descuento_aplicado: number;
    created_at: string;
    pedido?: Pedido;
    metodo_pago?: MetodoPago;
};
