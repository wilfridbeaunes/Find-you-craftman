<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Usercontroller;
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

//route to get login data from the frontend
Route::post('login',[Usercontroller::class, 'autentification']);

//route for user data typed from the frontend
Route::post('signup',[Usercontroller::class, 'inscription']);

// //i'm using this route to catch data from database
route::get('user/logged',[Usercontroller::class, 'userlogin']);

//route to get the local craftmans from database
route::get('research',[ResearchController::class, 'getArtisans']);

//route to get the list of all the "categories professsionelles"
route::get('categories',[CategorieProfessionelleController::class, 'getAllCategories']);
