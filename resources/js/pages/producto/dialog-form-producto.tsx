import { Form, usePage } from '@inertiajs/react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    NativeSelect,
    NativeSelectOption,
} from '@/components/ui/native-select';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/producto';
import type { Producto } from '@/types/models';
import type { CategoriaProducto } from '@/types/models';

export default function DialogFormProducto({
    producto,
}: {
    producto: Producto;
}) {
    const { categorias } = usePage().props as {
        categorias: CategoriaProducto[];
    };
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        descripcion: producto.descripcion,
        categoria_id: producto.categoria_id,
        precio: producto.precio,
        stock_actual: producto.stock_actual,
        stock_minimo: producto.stock_minimo,
    });

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Editar Información de Producto
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <Form
                    {...update.form({
                        producto: producto.id,
                    })}
                    resetOnSuccess={[
                        'descripcion',
                        'categoria_id',
                        'precio',
                        'stock_actual',
                        'stock_minimo',
                    ]}
                    onSuccess={() => setDialogOpen(false)}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle>Modificar Producto</DialogTitle>
                            </DialogHeader>
                            <FieldGroup>
                                <Field className="flex gap-2">
                                    <Input
                                        id="descripcion"
                                        type="text"
                                        required
                                        autoFocus
                                        autoComplete="descripcion"
                                        name="descripcion"
                                        placeholder="Nombre"
                                        value={formData.descripcion}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                descripcion: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError
                                        message={errors.descripcion}
                                        className="mt-2"
                                    />
                                    <NativeSelect
                                        name="categoria_id"
                                        required
                                        className="w-full"
                                        value={String(formData.categoria_id)}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                categoria_id: parseInt(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                    >
                                        {categorias.map((cat) => (
                                            <NativeSelectOption
                                                key={cat.id}
                                                value={String(cat.id)}
                                            >
                                                {cat.nombre_categoria_producto}
                                            </NativeSelectOption>
                                        ))}
                                    </NativeSelect>
                                </Field>

                                <Field>
                                    <FieldLabel for="precio">Precio</FieldLabel>
                                    <Input
                                        id="precio"
                                        type="number"
                                        required
                                        autoFocus
                                        autoComplete="0"
                                        name="precio"
                                        placeholder="Precio"
                                        value={formData.precio}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                precio: parseFloat(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                    />
                                    <InputError
                                        message={errors.precio}
                                        className="mt-2"
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel for="stock_actual">
                                        Stock Actual
                                    </FieldLabel>
                                    <Input
                                        id="stock_actual"
                                        type="number"
                                        required
                                        autoFocus
                                        autoComplete="0"
                                        name="stock_actual"
                                        placeholder="Stock Actual"
                                        value={formData.stock_actual}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                stock_actual: parseInt(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                    />
                                    <InputError
                                        message={errors.stock_actual}
                                        className="mt-2"
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel for="stock_minimo">
                                        Stock Minimo
                                    </FieldLabel>
                                    <Input
                                        id="stock_minimo"
                                        type="number"
                                        required
                                        autoFocus
                                        autoComplete="0"
                                        name="stock_minimo"
                                        placeholder="Stock Minimo"
                                        value={formData.stock_minimo}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                stock_minimo: parseInt(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                    />
                                    <InputError
                                        message={errors.stock_minimo}
                                        className="mt-2"
                                    />
                                </Field>
                            </FieldGroup>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancelar</Button>
                                </DialogClose>
                                <Button className="w-1/2" type="submit">
                                    {processing && <Spinner />}
                                    Guardar
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
