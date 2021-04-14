<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ResearchController;
use App\Http\Controllers\CategorieProfessionelleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//###########################POST REQUESTS###########################
//route to get login data from the frontend
Route::post('login',[UserController::class, 'autentification']);

//route for user data typed from the frontend
Route::post('signup',[UserController::class, 'inscription']);

//route to create a new travaux
Route::post('artisan/{artisan}/travaux',[UserController::class, 'newTravaux']);

//###########################PATCH REQUESTS###########################

//route to update compte informations
Route::patch('compte/{compte}',[UserController::class, 'updateCompte']);

//route to update artisan informations
Route::patch('artisan/{artisan}',[UserController::class, 'updateArtisan']);

//route to update entreprise informations
Route::patch('entreprise/{entreprise}/artisan/{artisan}',[UserController::class, 'updateEntreprise']);

//route to update travaux informations
Route::patch('travaux/{travaux}',[UserController::class, 'updateTravaux']);

//###########################DELETE REQUESTS###########################

//route to delete a compte
Route::delete('delete/{compte}',[UserController::class, 'deleteCompte']);

//route to delete a travaux
Route::delete('delete/travaux/{travaux}',[UserController::class, 'deleteTravaux']);

//###########################GET REQUESTS###########################

//route to check if a given email already exists in the database
Route::get('exists',[UserController::class, 'exists']);

//route to check if a given email already exists in the database
Route::get('password/{compte}',[UserController::class, 'IsCurrentPassword']);

//route to catch data of user from database
route::get('profil',[UserController::class, 'getProfilInfos']);

//route to get the local craftmans from database
route::get('research',[ResearchController::class, 'getArtisans']);

//route to get the list of all the "categories professsionelles"
route::get('categories',[CategorieProfessionelleController::class, 'getAllCategories']);
