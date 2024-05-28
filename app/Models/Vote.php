<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;

    protected $fillable = [
        'question',
        'ans',
        'deadline',
        'is_finished',
        'visibility',
        'author_id'
    ];

    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class);
    }

    public function author(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
