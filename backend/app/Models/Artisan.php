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
        'nom', 'prenom', 'telephone', 'biographie', 'image_profil','compte_id', 'entreprise_id'
    ];

    public function professions(){
        return $this->belongsToMany(CategorieProfessionelle::class, 'profession_artisan', 'artisan_id', 'profession_id');
    }
    public function entreprise(){
        return $this->belongsTo(Entreprise::class, 'entreprise_id');
    }
    public function compte(){
        return $this->belongsTo(Compte::class, 'compte_id');
    }
    

}
