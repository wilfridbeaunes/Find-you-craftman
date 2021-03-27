<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Adresse extends Model
{
    //use HasFactory;

    protected $table = 'adresses';

    public $timestamps = false;

    protected $fillable = [
        'adresse_postale', 
    ];

}
