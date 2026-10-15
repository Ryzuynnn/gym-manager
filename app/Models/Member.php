<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'name',
        'contact',
        'membership_type',
        'start_date',
        'expiry_date',
    ];
}