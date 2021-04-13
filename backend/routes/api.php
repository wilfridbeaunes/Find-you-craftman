<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ResearchController;
use App\Http\Controllers\CategorieProfessionelleController;
use App\Http\Controllers\UserInformationController;

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

//route to get login data from the frontend
Route::post('login',[UserController::class, 'autentification']);

//route for user data typed from the frontend
Route::post('signup',[UserController::class, 'inscription']);

//route to create a new travaux
Route::post('travaux/{artisan}',[UserController::class, 'newTravaux']);

//route to update compte informations
Route::post('compte/{compte}',[UserController::class, 'updateCompte']);

//route to update artisan informations
Route::post('artisan/{artisan}',[UserController::class, 'updateArtisan']);

//route to update entreprise informations
Route::post('entreprise/{entreprise}/artisan/{artisan}',[UserController::class, 'updateEntreprise']);

//route to update travaux informations
Route::post('travaux/{travaux}',[UserController::class, 'updateTravaux']);

//route to update travaux informations
Route::get('delete/{compte}',[UserController::class, 'deleteCompte']);


//route to check if a given email already exists in the database
Route::get('exists',[UserController::class, 'exists']);

//route to check if a given email already exists in the database
Route::get('password/{compte}',[UserController::class, 'IsCurrentPassword']);

//route to catch data of user from database
route::get('profil',[UserInformationController::class, 'getProfilInfos']);

//route to get the local craftmans from database
route::get('research',[ResearchController::class, 'getArtisans']);

//route to get the list of all the "categories professsionelles"
route::get('categories',[CategorieProfessionelleController::class, 'getAllCategories']);
