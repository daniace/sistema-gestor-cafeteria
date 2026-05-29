import {
    NativeSelect,
    NativeSelectOption,
} from '@/components/ui/native-select';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Field, FieldGroup } from '@/components/ui/field';
import { Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';
import { update } from '@/routes/usuario';
import { User } from '@/types/auth';

export default function DialogFormUsuario({ usuario }: { usuario: User }) {
    const [dialogOpen, setDialogOpen] = useState(true);
    const [formData, setFormData] = useState({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        dni: usuario.dni,
        email: usuario.email,
        rol: usuario.rol,
    });
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Editar Usuario</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <Form
                    {...update.form({ user: usuario.id })}
                    resetOnSuccess={[
                        'nombre',
                        'apellido',
                        'dni',
                        'email',
                        'password',
                        'password_confirmation',
                    ]}
                    onSuccess={() => setDialogOpen(false)}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle>Nuevo Usuario</DialogTitle>
                            </DialogHeader>
                            <FieldGroup>
                                <Field className="flex gap-2">
                                    <Input
                                        id="nombre"
                                        type="text"
                                        required
                                        autoFocus
                                        autoComplete="nombre"
                                        name="nombre"
                                        placeholder="Nombre"
                                        value={formData.nombre}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                nombre: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError
                                        message={errors.nombre}
                                        className="mt-2"
                                    />
                                    <Input
                                        id="apellido"
                                        type="text"
                                        required
                                        autoFocus
                                        autoComplete="apellido"
                                        name="apellido"
                                        placeholder="Apellido"
                                        value={formData.apellido}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                apellido: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError
                                        message={errors.apellido}
                                        className="mt-2"
                                    />
                                </Field>
                                <Field>
                                    <Input
                                        id="dni"
                                        type="text"
                                        required
                                        autoFocus
                                        autoComplete="dni"
                                        name="dni"
                                        placeholder="DNI"
                                        value={formData.dni}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                dni: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError
                                        message={errors.dni}
                                        className="mt-2"
                                    />
                                </Field>
                                <Field>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        autoFocus
                                        autoComplete="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </Field>
                                <Field>
                                    <NativeSelect
                                        name="rol"
                                        required
                                        className="w-full"
                                    >
                                        <NativeSelectOption
                                            disabled
                                            selected
                                            value={usuario.rol}
                                        >
                                            Seleccionar Rol
                                        </NativeSelectOption>
                                        <NativeSelectOption value="user">
                                            Usuario
                                        </NativeSelectOption>
                                        <NativeSelectOption value="admin">
                                            Admin
                                        </NativeSelectOption>
                                    </NativeSelect>
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
