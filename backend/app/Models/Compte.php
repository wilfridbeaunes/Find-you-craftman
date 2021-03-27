<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compte extends Model
{
    //use HasFactory;

    protected $table = 'comptes';

    public $timestamps = false;

    protected $fillable = [
        'email', 'mot_de_passe',
    ];

}
