<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CategorieProfessionelle;

class CategorieProfessionelleController extends Controller
{
    public function getAllCategories(){
        return CategorieProfessionelle::all();
    }
}
