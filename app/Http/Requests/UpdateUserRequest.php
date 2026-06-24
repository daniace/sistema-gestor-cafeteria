<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre' => ['string', 'max:255', 'regex:/^[\pL\s]+$/u'],
            'apellido' => ['string', 'max:255', 'regex:/^[\pL\s]+$/u'],
            'email' => ['string', 'email', 'max:255', 'unique:users'],
            'dni' => ['string', 'max:255', 'unique:users'],
            'nro_rol' => ['exists:roles,id'],
        ];
    }
}
