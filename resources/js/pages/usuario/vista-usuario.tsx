import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { usuario } from '@/routes';
import { TableActions } from './tabla-usuarios';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@inertiajs/react';
import { store } from '@/routes/usuario';
import {
    NativeSelect,
    NativeSelectOption,
} from '@/components/ui/native-select';
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: usuario(),
    },
];

export default function vistaUsuario({ usuarios }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Gestion Usuarios</h1>
                <p>Administra el acceso y roles del personal del café</p>
                <div className="flex gap-2">
                    <div className="w-10/12">
                        <TableActions usuarios={usuarios} />
                    </div>
                    <div className="mt-4">
                        <Card className="w-full bg-card p-4 text-card-foreground">
                            <Form
                                {...store.form()}
                                resetOnSuccess={[
                                    'password',
                                    'password_confirmation',
                                ]}
                                disableWhileProcessing
                                className="flex flex-col gap-6"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <h1 className="text-lg font-semibold">
                                            Nuevo Usuario
                                        </h1>
                                        <div className="flex gap-2">
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
                                                message={errors.apellido}
                                                className="mt-2"
                                            />
                                        </div>
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

                                        <div className="grid gap-2">
                                            <PasswordInput
                                                id="password"
                                                required
                                                tabIndex={3}
                                                autoComplete="new-password"
                                                name="password"
                                                placeholder="Password"
                                            />
                                            <InputError
                                                message={errors.password}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <PasswordInput
                                                id="password_confirmation"
                                                required
                                                tabIndex={4}
                                                autoComplete="new-password"
                                                name="password_confirmation"
                                                placeholder="Confirm password"
                                            />
                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
                                            />
                                        </div>

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

                                        <div className="flex gap-2">
                                            <Button
                                                className="w-1/2"
                                                variant="secondary"
                                                type="reset"
                                            >
                                                Limpiar
                                            </Button>

                                            <Button
                                                className="w-1/2"
                                                type="submit"
                                            >
                                                {processing && <Spinner />}
                                                Guardar
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
