<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategorieProfessionelle extends Model
{
    //use HasFactory;

    protected $table = 'categories_professionelles';

    public $timestamps = false;

    protected $fillable = [
        'titre', 'description',
    ];
    public function professions(){
        return $this->belongsToMany(Artisan::class, 'profession_artisan', 'categorie_pro_id', 'artisan_id');
    }

}
