<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entreprise extends Model
{
    //use HasFactory;
    
    protected $table = 'entreprises';

    public $timestamps = false;

    protected $fillable = [
        'nom', 'url', 'logo',
    ];

    public function adresse(){
        return $this->belongsTo(Adresse::class, 'adresse_id');
    }
}
