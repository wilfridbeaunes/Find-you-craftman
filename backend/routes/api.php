<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Usercontroller;
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
Route::post('login',[Usercontroller::class, 'autentification']);

//route for user data typed from the frontend
Route::post('signup',[Usercontroller::class, 'inscription']);

//route to check if a given email already exists in the database
Route::get('exists',[Usercontroller::class, 'exists']);

//route to catch data of user from database
route::get('user/login',[UserInformationController::class, 'userConnected']);

//route to get the local craftmans from database
route::get('research',[ResearchController::class, 'getArtisans']);

//route to get the list of all the "categories professsionelles"
route::get('categories',[CategorieProfessionelleController::class, 'getAllCategories']);
