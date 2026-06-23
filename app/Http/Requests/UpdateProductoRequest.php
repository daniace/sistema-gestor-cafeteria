<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductoRequest extends FormRequest
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
            'descripcion' => ['required', 'string', 'max:255', 'regex:/^[\pL\s]+$/u'],
            'categoria_id' => ['required', 'integer', 'exists:categoria_producto,id'],
            'stock_actual' => ['required', 'integer', 'max:9999'],
            'stock_minimo' => ['required', 'integer', 'max:9999'],
            'precio' => ['required', 'decimal:0,2', 'max:9999.99'],
        ];
    }
}
