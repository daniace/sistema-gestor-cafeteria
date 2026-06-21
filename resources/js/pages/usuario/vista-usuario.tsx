import { Head, Form } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
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
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    NativeSelect,
    NativeSelectOption,
} from '@/components/ui/native-select';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import { usuario } from '@/routes';
import { store } from '@/routes/usuario';
import type { BreadcrumbItem } from '@/types';
import type { User } from '@/types/auth';
import { columns } from './columns';
import { DataTable } from './data-tabla-usuarios';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: usuario(),
    },
];

export default function VistaUsuario({ usuarios }: { usuarios: User[] }) {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />
            <div className="flex flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Gestion Usuarios</h1>
                <p>Administra el acceso y roles del personal del café</p>
                <div className="flex gap-2">
                    <div className="">
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline">Nuevo Usuario</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-sm">
                                <Form
                                    {...store.form()}
                                    resetOnSuccess={[
                                        'nombre',
                                        'apellido',
                                        'dni',
                                        'email',
                                        'password',
                                        'password_confirmation',
                                    ]}
                                    onSuccess={() =>
                                        setDialogOpen(false) &&
                                        toast.success(
                                            'Usuario creado exitosamente',
                                        )
                                    }
                                    disableWhileProcessing
                                    className="flex flex-col gap-6"
                                >
                                    {({ processing, errors }) => (
                                        <>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Nuevo Usuario
                                                </DialogTitle>
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
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.apellido
                                                        }
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
                                                    />
                                                    <InputError
                                                        message={errors.email}
                                                        className="mt-2"
                                                    />
                                                </Field>
                                                <Field>
                                                    <PasswordInput
                                                        id="password"
                                                        required
                                                        autoComplete="new-password"
                                                        name="password"
                                                        placeholder="Password"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.password
                                                        }
                                                    />
                                                </Field>
                                                <Field>
                                                    <PasswordInput
                                                        id="password_confirmation"
                                                        required
                                                        autoComplete="new-password"
                                                        name="password_confirmation"
                                                        placeholder="Confirm password"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.password_confirmation
                                                        }
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
                                                            value="user"
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
                                                    <Button variant="outline">
                                                        Cancelar
                                                    </Button>
                                                </DialogClose>
                                                <Button
                                                    className="w-1/2"
                                                    type="submit"
                                                >
                                                    {processing && <Spinner />}
                                                    Guardar
                                                </Button>
                                            </DialogFooter>
                                        </>
                                    )}
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <DataTable columns={columns} data={usuarios} />
            </div>
        </AppLayout>
    );
}
