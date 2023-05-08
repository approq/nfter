<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Currency extends Model
{
    const DEFAULT = 1;

    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];
}
