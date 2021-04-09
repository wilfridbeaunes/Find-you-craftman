<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artisan;
use App\Models\Entreprise;

use App\Models\CategorieProfessionelle;
use Illuminate\Support\Facades\DB;



class ResearchController extends Controller
{
    // return the "artisans" by the "codepostale" and "activite" from the database
    public function getArtisans(Request $request){ 

        $codePostale = $request->get('cp');
        $activite = $request->get('act');
        $listArtisans = array();
        $categoriePro = CategorieProfessionelle::find($activite);
        foreach ($categoriePro->professions()->get() as $artisan) {
            $cp = $artisan->entreprise->adresse->code_postal;
            $cc = $artisan->entreprise->adresse->cp_commune;
            if($codePostale == $cp || $codePostale == $cc){
                $listArtisans[]=$artisan;
            }
        }

        return json_encode($listArtisans);
    }
}
