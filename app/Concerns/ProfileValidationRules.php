<?php

namespace App\Concerns;

use App\Models\User;
use Illuminate\Validation\Rule;

trait ProfileValidationRules
{
    /**
     * Get the validation rules used to validate user profiles.
     *
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    protected function profileRules(?int $userId = null): array
    {
        return [
            'nombre' => $this->firstNameRules(),
            'apellido' => $this->lastNameRules(),
            'email' => $this->emailRules($userId),
            'dni' => $this->dniRules($userId),
            'estado_cuenta_usuario' => $this->estadoCuentaUsuarioRules(),
            'causa_eliminacion' => $this->causaEliminacionRules(),
            'rol' => $this->roleRules(),
        ];
    }

    /**
     * Get the validation rules used to validate user names.
     *
     * @return array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>
     */
    protected function firstNameRules(): array
    {
        return ['required', 'string', 'max:255'];
    }

    protected function lastNameRules(): array
    {
        return ['required', 'string', 'max:255'];
    }

    protected function dniRules(?int $userId = null): array
    {
        return [
            'required',
            'string',
            'max:255',
            $userId === null
                ? Rule::unique(User::class)
                : Rule::unique(User::class)->ignore($userId),
        ];
    }

    protected function estadoCuentaUsuarioRules(): array
    {
        return ['boolean'];
    }

    protected function causaEliminacionRules(): array
    {
        return ['nullable', 'string', 'max:255'];
    }

    protected function roleRules(): array
    {
        return ['string', 'in:admin,user'];
    }

    /**
     * Get the validation rules used to validate user emails.
     *
     * @return array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>
     */
    protected function emailRules(?int $userId = null): array
    {
        return [
            'required',
            'string',
            'email',
            'max:255',
            $userId === null
                ? Rule::unique(User::class)
                : Rule::unique(User::class)->ignore($userId),
        ];
    }
}
