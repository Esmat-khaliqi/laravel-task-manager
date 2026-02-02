<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::get('/',[PageController::class ,'login'])->name('login');
Route::get('/home',[PageController::class ,'home'])->middleware('auth');
Route::get('/register',[PageController::class ,'register']);
Route::get('/get-todo', [TodoController::class ,'getTodo'])->middleware('auth');
Route::get('/completed-todo', [TodoController::class ,'getTodo'])->middleware('auth');
Route::get('/todo-history', [TodoController::class ,'getTodo'])->middleware('auth');
Route::delete('/delete/{todo}', [TodoController::class ,'taskDelete'])->middleware('auth');
Route::post('/sign', [AuthController::class ,'store']);
Route::post('/login', [AuthController::class ,'userAuth']);
Route::post('/add-todo', [TodoController::class ,'task'])->middleware('auth');
Route::patch('/completed/{todo}', [TodoController::class ,'taskCompleted'])->middleware('auth');
Route::put('/update/{todo}', [TodoController::class ,'taskUpdate'])->middleware('auth');
