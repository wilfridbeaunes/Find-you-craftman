<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    //use HasFactory;

    protected $table = 'photos';

    public $timestamps = false;

    protected $fillable = [
        'logo', 
    ];

    public function travaux(){
        return $this->belongsTo(Travaux::class, 'travaux_id');
    }
}
