<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Travaux extends Model
{
    //use HasFactory;

    protected $table = 'travaux';

    public $timestamps = false;

    protected $fillable = [
        'date_debut', 'date_fin', 'objectif', 'biographie', 'image_profil','artisan_id'
    ];

    public function artisan()
    {
        return $this->belongsTo(Artisan::class, 'artisan_id');
    }
    
}
