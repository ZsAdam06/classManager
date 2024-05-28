<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'count',
        'vote_id'
    ];

    public function vote(): BelongsTo {
        return $this->belongsTo(Vote::class);
    }
}
