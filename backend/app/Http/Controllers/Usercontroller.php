<?php

namespace App\Http\Controllers;

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
               return response()->json(['success'=>true,'message'=>['msg'=>'welcom','id'=>$user->id]]); //message authenfification success
            }
            else return response()->json(['success'=>false,'message'=>'Identifiant ou mot de passe incorrect']); //i send a message with a error when email adresse don't fit with the correct password 
        }
   }
  
   //new user 
    public function newuser(Request $request ){ // function that create new user in our data base 
        $error=null;
        try{
            $user=Compte::where('email',$request->input('email'))->firstOrFail(); //i wanna check if there is an user having already the email address typed
            return $user->email;
        }catch(ModelNotFoundException $exception){
            $error = $exception; // if there is an user having the email given an error will be display 
        }finally{
            if($error){  // if error is null
                $useradresse = Adresse::create([ //user company ADRESSE
                    'adresse_postale' => $request->input('adresse'), 
                ]);
                //$r=Adresse::where('adresse_postale',$request->input('adresse'))->firstOrFail()->id;

                $usercompany = Entreprise::create([ //user company information 
                    'nom' => $request->input('companyName'), 
                    'adresse_id'=>$useradresse->id,
                ]);
                $userauth = Compte::create([  //user authentification information is strore in the table compte in our database
                    'email' => $request->input('email'), 
                    'password' => password_hash($request->input('password'), PASSWORD_DEFAULT), //here i say i want the imput password to be hash in database for sécurity 
                 ]);
                $userinfo = Artisan::create([ //user basic information 
                    'nom' => $request->input('nom'),
                    'prenom' => $request->input('prenom'),
                    'telephone' => $request->input('number'),
                    'entreprise_id'=>$usercompany->id,
                    'compte_id'=>$userauth->id,
                ]);
                CategorieProfessionelle::create([ //user job title
                    'titre' => $request->input('job'),
                    'artisan_id' =>$userinfo->id,
                ]);
                $userwork = Travaux::create([ //user work released
                    'artisan_id' =>$userinfo->id, // even if i don't store data i increment de id 
                ]);
                Photo::create([ //user photo add
                    'travaux_id' =>$userwork->id, //i increment the id 
                ]);
                
                if($userauth->save() && $userinfo->save() && $usercompany->save() && $useradresse->save())  return response()->json(['success'=>true,'message'=>'votre compte a été crée avec succes']);  // i save data and send success message 
                else return response()->json(['success'=>false,'message'=>'probleme de serveur contacter le service']);  // data couldn't be save  
            }
            else  return response()->json(['success'=>false,'message'=>'email que vous avez reseigné est déja utilisé']); // if an error i send the message email have been used 
        }
    }
    

    }

}
