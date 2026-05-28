<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        return [
            'descripcion' => ['required','string','max:255'],
            'categoria' => ['required','integer','max:200'],
            'stock_actual' => ['required','integer','max:9999'],
            'stock_minimo' => ['required','integer','max:9999'],
            'precio_unitario' => ['required','float','max:9999.99']
        ];
    }
}
