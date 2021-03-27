<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artisan extends Model
{
    //use HasFactory;

    protected $table = 'artisans';

    public $timestamps = false;

    protected $fillable = [
        'nom', 'prenom', 'telephone', 'biographie', 'image_profil',
    ];

    public function professions(){
        return $this->belongsToMany(CategorieProfessionelle::class, 'profession_artisan', 'artisan_id', 'profession_id');
    }
    public function entreprise(){
        return $this->hasOne(Entreprise::class, 'entreprise_id');
    }
    public function compte(){
        return $this->hasOne(Compte::class, 'compte_id');
    }
    

}
