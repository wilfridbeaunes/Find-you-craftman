<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Adresse;
use App\Models\Artisan;
use App\Models\CategorieProfessionelle;
use Illuminate\Http\Request;
use App\Models\Compte;
use App\Models\Entreprise;
use App\Models\Photo;
use App\Models\Travaux;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;


class Usercontroller extends Controller
{

    //login
    public function autentification(Request $request){   //user authentifition fuction

        $user= null; //  initialisation
        $error=null;
        try{
            $user =Compte::where('email',$request->input('email'))->firstOrFail(); //i check in my database if there is an user with the email given    
        }catch(ModelNotFoundException $exception){ //if there is not user with the email adress given i generate a error message
            $error= $exception;
        }finally{
            if(!$error && password_verify($request->input('password'),$user->password)){ //in case the  user have the email typed corectly and which exist i check if the password if correct as well   
               return response()->json(['success'=>true,'message'=>'welcom']); //message authenfification success
            }
            else return response()->json(['success'=>false,'message'=>'Identifiant ou mot de passe incorrect']); //i send a message with a error when email adresse don't fit with the correct password 
        }
   }

    public function inscription(Request $request){
        
        DB::beginTransaction();

        $query = $this->newCompte($request->input('email'),$request->input('password'));
        if($query[0]==null) {DB::rollback(); return response()->json( ['success'=>false,'artisan'=> null, 'error' => "error compte : $query[1]"]);}
        $compte = $query[0];

        $query = $this->newAdresse($request->input('addr'), $request->input('cp'), $request->input('lon'), $request->input('lat'));
        if($query[0]==null) {DB::rollback(); return response()->json(['success'=>false,'artisan'=> null, 'error' => "error adresse : $query[1]"]);}
        $adresse = $query[0];

        $query = $this->newEntreprise($request->input('nom_entreprise'), $adresse->id);
        if($query[0]==null) {DB::rollback(); return response()->json(['success'=>false,'artisan'=> null, 'error' => "error entreprise : $query[1]"]);}
        $entreprise = $query[0];

        $query = $this->newArtisan($request->input('nom'), $request->input('prenom'),$request->input('phone'), $entreprise->id, $compte->id);
        if($query[0]==null) {DB::rollback(); return response()->json(['success'=>false,'artisan'=> null, 'error' => "error artisan: $query[1]"]);}
        $artisan = $query[0];

        $query = $this->attachProfession($artisan ,$request->input('act'));
        if($query[0]==null) {DB::rollback(); return response()->json(['success'=>false,'artisan'=> null, 'error' => "error profession: $query[1]"]);}
        $profession = $query[0];
        
        DB::commit();

        return response()->json(['success'=>true, 'artisan'=>$artisan, 'error'=> null]);
    }

    public function newCompte($email,$password){
            try {
                $compte = new Compte();
                $compte->email = $email;
                $compte->password = password_hash($password, PASSWORD_DEFAULT); //here i say i want the imput password to be hash in database for sécurity 
                $compte->save();
                return [$compte, null];
            } catch (QueryException $e) {
                $err = $e->getMessage();
                return [null, "failure: $err"];
            } 
    }

    public function newAdresse($adresse_postale,$code_postal, $lon , $lat){
        try {
            $adresse = new Adresse();
            $adresse->adresse_postale= $adresse_postale;
            $adresse->code_postal= $code_postal;
            $adresse->longitude= $lon;
            $adresse->latitude= $lat;
            $adresse->save();
            return [$adresse, null];
        } catch (QueryException $e) {
            $err = $e->getMessage();
            return [null, "failure: $err"];
        }    
    }
    
    public function newEntreprise($nom,$addr_id){
        try {
            $entreprise = new Entreprise();
            $entreprise->nom= $nom;
            $entreprise->adresse_id= $addr_id;
            $entreprise->save();
            return [$entreprise, null];
        } catch (QueryException $e) {
            $err = $e->getMessage();
            return [null, "failure: $err"];
        }    
        
    }

    public function newArtisan($nom,$prenom,$phone,$entreprise_id,$compte_id){
        try {
            $artisan = new Artisan();
            $artisan->nom = $nom;
            $artisan->prenom = $prenom;
            $artisan->telephone = $phone;
            $artisan->entreprise_id = $entreprise_id;
            $artisan->compte_id = $compte_id;
            $artisan->save();
            return [$artisan, null];
        } catch (QueryException $e) {
            $err = $e->getMessage();
            return [null, "failure: $err"];
        } 
    }

    public function attachProfession($artisan, $act){
        try{
            $profession=CategorieProfessionelle::find($act);
            $artisan->professions()->attach($profession->id);
            return [$profession, null];
        }catch(QueryException $e){
            $err = $e->getMessage();
            return [null, "failure:$err"];
        }
    }

    public function exists($email){
        try{
            $user=Compte::where('email',$firstOrFail)->get(); //i wanna check if there is an user having already the email address typed
            return true;
        }catch(ModelNotFoundException $e){
            return false;
        }   
    }

        // user Logged
    public function userlogin(Request $request){
        echo Compte::all();
        //autentification($request);
        //return $request->ompte();

    }

}
