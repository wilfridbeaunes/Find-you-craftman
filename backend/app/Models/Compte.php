<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Compte extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'comptes';

    public $timestamps = false;

    protected $fillable = [
        'email', 'password',
    ];

}
