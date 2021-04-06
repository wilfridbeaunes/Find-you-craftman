<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::post('signup',[Usercontroller::class, 'newuser']);

// //i'm using this route to catch data from database
route::get('user/logged',[Usercontroller::class, 'userlogin']);
