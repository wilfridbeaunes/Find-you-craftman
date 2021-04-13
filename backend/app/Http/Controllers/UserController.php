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


class UserController extends Controller
{

    public function autentification(Request $request){   //user authentifition fuction

        $user= null; //  initialisation
        $error=null;
        try{
            $user =Compte::where('email',$request->input('email'))->firstOrFail(); //i check in my database if there is an user with the email given    
        }catch(ModelNotFoundException $exception){ //if there is not user with the email adress given i generate a error message
            $error= $exception;
        }finally{
            if(!$error && password_verify($request->input('password'),$user->password)){ //in case the  user have the email typed corectly and which exist i check if the password if correct as well   
               return response()->json(['success'=>true,'message'=>['msg'=>'welcom','id'=>$user->id]]); //message authenfification success
            }
            else return response()->json(['success'=>false,'message'=>'Identifiant ou mot de passe incorrect']); //i send a message with a error when email adresse don't fit with the correct password 
        }
   }

    public function inscription(Request $request){
        
        DB::beginTransaction();

        $query = $this->newCompte($request->input('email'),$request->input('password'));
        if($query[0]==null) {DB::rollback(); return response()->json( ['success'=>false,'artisan'=> null, 'error' => "error compte : $query[1]"]);}
        $compte = $query[0];

        $query = $this->newAdresse($request->input('addr'), $request->input('cp'), $request->input('cc'), $request->input('lon'), $request->input('lat'));
        if($query[0]==null) {DB::rollback(); return response()->json(['success'=>false,'artisan'=> null, 'error' => "error adresse : $query[1]"]);}
        $adresse = $query[0];

        $query = $this->newEntreprise($request->input('entreprise'), $adresse->id);
        if($query[0]==null) {DB::rollback(); return response()->json(['success'=>false,'artisan'=> null, 'error' => "error entreprise : $query[1]"]);}
        $entreprise = $query[0];

        $query = $this->newArtisan($request->input('nom'), $request->input('prenom'),$request->input('phone'),$request->input('bio'), $entreprise->id, $compte->id);
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

    public function newAdresse($addr,$cp,$cc, $lon , $lat){
        try {
            $adresse = new Adresse();
            $adresse->adresse_postale= $addr;
            $adresse->code_postal= $cp;
            $adresse->cp_commune= $cc;
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

    public function newArtisan($nom,$prenom,$phone, $bio,$entreprise_id,$compte_id){
        try {
            $artisan = new Artisan();
            $artisan->nom = $nom;
            $artisan->prenom = $prenom;
            $artisan->telephone = $phone;
            $artisan->biographie = $bio;
            $artisan->entreprise_id = $entreprise_id;
            $artisan->compte_id = $compte_id;
            $artisan->save();
            return [$artisan, null];
        } catch (QueryException $e) {
            $err = $e->getMessage();
            return [null, "failure: $err"];
        }
    }

    public function newTravaux(Request $request, Artisan $artisan){
        try{
            $travaux = new Travaux();
            $travaux->date_debut = $request->input('dd');
            $travaux->date_fin = $request->input('df');
            $travaux->objectif = $request->input('obj');
            if($request->input('photos') != null){
                foreach ($request->input('photos') as $image) {
                    $photo = new Photo();
                    $photo->logo= $image;
                    $travaux->photos->save($photo);
                }
            }            
            $artisan->travaux()->save($travaux);
            $artisan->save();
            return response()->json(['success'=>true, 'travaux'=>$travaux, 'error'=> null]);
        }catch(QueryException $e){
            $err = $e->getMessage();
            return response()->json(['success'=>false, 'travaux'=>null, 'error'=> 'failure:'.$err]);
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

    public function exists(Request $request){
        $email = $request->input('email');
        try{
            $user=Compte::where('email',$email)->get(); //i wanna check if there is an user having already the email address typed
            return response()->json($user);
        }catch(ModelNotFoundException $e){
            return array();
        }   
    }

    public function updateArtisan(Request $request, Artisan $artisan){

        $artisan->nom=$request->input('nom');
        $artisan->prenom=$request->input('prenom');
        $artisan->telephone=$request->input('phone');
        $artisan->biographie=$request->input('bio');
        $artisan->save();
        
        return response()->json(['success'=>true, 'artisan'=>$artisan, 'error'=> null]);
    }

    public function updateEntreprise(Request $request, Entreprise $entreprise, Artisan $artisan){

        $entreprise->nom=$request->input('nom');
        $entreprise->url=$request->input('url');
        $entreprise->logo=$request->input('logo');
        $entreprise->save();

        $adresse = $entreprise->adresse;
        $adresse->adresse_postale=$request->input('addr');
        $adresse->code_postal=$request->input('cp');
        $adresse->cp_commune=$request->input('cc');
        $adresse->longitude=$request->input('lon');
        $adresse->latitude=$request->input('lat');
        $adresse->save();
        
        $cat= $artisan->professions->first();
        $newCat= CategorieProfessionelle::find($request->input('act'));

        if($cat->id != $newCat->id){
            $artisan->professions()->detach($cat);
            $artisan->save();
            $artisan->professions()->attach($newCat);
            $artisan->save();
        }
        
        return response()->json(['success'=>true,'artisan'=>$artisan,'entreprise'=>$entreprise, 'error'=> null]);
    }

    public function updateTravaux(Request $request, Travaux $travaux){

        $travaux->date_debut = $request->input('dd');
        $travaux->date_fin = $request->input('df');
        $travaux->objectif = $request->input('obj');
        if($request->input('photos')!=null){
            $travaux->photos->delete();
            foreach ($request->input('photos') as $image) {
                $photo = new Photo();
                $photo->logo= $image;
                $travaux->photos->save($photo);
            }
        }
    
        return response()->json(['success'=>true,'travaux'=>$travaux, 'error'=> null]);
    }
    public function IsCurrentPassword(Request $request, Compte $compte){
        $same = password_verify($request->input('password'), $compte->password);
        return response()->json(['same'=>$same]);
    }

    public function updateCompte(Request $request, Compte $compte){
        $compte->password = password_hash($request->input('password'), PASSWORD_DEFAULT); 
        $compte->save();
        return response()->json(['success'=>true,'compte'=>$compte, 'error'=> null]);
    }
}
