<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Compte;
use GrahamCampbell\ResultType\Success;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class Usercontroller extends Controller
{

 
    //login
    public function autentification(Request $request){   //user authentifition fuction

        $user= null; //  initialisation
        $error=null;
        try{
            $user =Compte::where('email',$request->input('email'))->firstOrFail(); //i check in my database if there is a user with a email given    
        }catch(ModelNotFoundException $exception){ //if there is not user with the email adress given i generate a error message
            $error= $exception;
        }finally{
            if(!$error && password_verify($request->input('password'),$user->password)){ //in case the  user have the email typed corectly i check if the password if correct as well   
               return response()->json(['success'=>true,'message'=>'welcom']); //message authenfification success
            }
            else return response()->json(['success'=>false,'message'=>' "Identifiant ou mot de passe incorrect"']); //i send a message with a error when email adresse don't fit with the correct password   
        }
   }
  
   // user Login
   public function userlogin(Request $request){
        return $request->user();
       //return $request->compte();
   }

   //new user 
   public function newuser(Request $request){ // function that create new user in our data base 

    $user = Compte::create([
          'email' => $request->input('email'),
          'password' => password_hash($request->input('password'), PASSWORD_DEFAULT),
       ]);
    $user->save();

    
    }



}
