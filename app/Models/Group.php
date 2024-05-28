<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'school_id'
    ];

    public function school(): BelongsTo {
        return $this->belongsTo(School::class);
    }

    public function users(): HasMany {
        return $this->hasMany(User::class);
    }
}
