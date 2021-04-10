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
    public function userConnected(Request $request){
        $id= $request->input('id'); //id of the user connected 
        
        //now let use this value to get user information in database
        $usercompte=Compte::where('id',$id)->firstOrFail();
        $userartisan=Artisan::where('compte_id',$id)->firstOrFail();
        $useradresse=Adresse::where('id',$id)->firstOrFail();
        $userentreprise=Entreprise::where('adresse_id',$id)->firstOrFail();
        $usercatpro=CategorieProfessionelle::where('id',$id)->firstOrFail();
        //$usertravaux=Travaux::where('artisan_id',$id)->firstOrFail(); //id null in data base
       // $userphoto=Photo::where('travaux_id',$id)->firstOrFail(); //id null in data base

        $user = ["usercompte"=>$usercompte,"useradresse"=>$useradresse,
        "userartisan"=>$userartisan,"userentreprise"=>$userentreprise,"usercatpro"=>$usercatpro];
        
        return response()->json($user);

    }
}
