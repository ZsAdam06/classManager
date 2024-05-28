<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePostRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'string',
                // Rule::unique('posts', 'title')->ignore($this->post->id),
                'max:255',
            ],
            'description' => [
                'required',
                'string',
            ],
            'date' => [
                'nullable',
                'date',
            ],
            'file' => [
                'nullable',
                'file',
                'max:2000',
                'mimes:jpg,png,pdf,zip'
            ],
            'topic' => [
                'required',
            ],
            'subject' => [
                'nullable',
            ],
            'visibility' => [
                'nullable',
            ],
            'user_id' => [
                'required',
            ]
        ];
    }
}
