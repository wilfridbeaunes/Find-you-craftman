<?php

namespace App\Http\Controllers;

use App\Models\Adresse;
use App\Models\Artisan;
use App\Models\CategorieProfessionelle;
use App\Models\Compte;
use App\Models\Entreprise;
use App\Models\Photo;
use App\Models\Travaux;
use Illuminate\Http\Request;


class UserInformationController extends Controller
{
    // user connected
    public function getProfilInfos(Request $request){
        $id= $request->input('id'); //id of the user connected 

        $compte=Compte::find($id);
        $artisan= $compte->artisan()->get()->first();
        $artisan->entreprise;
        $artisan->entreprise->adresse;
        $artisan->compte;
        $travaux=$artisan->travaux;
        foreach ($travaux as $travail) {
            $travail->photos;
        }
        $artisan->professions;
        return response()->json($artisan);

    }
}
