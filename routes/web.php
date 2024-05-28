<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\GroupController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return redirect()->route('posts.learn');
    });
    Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
    Route::get('/posts/{id}', [PostController::class, 'show'])->name('posts.show');
    Route::get('/create/{topic}', [PostController::class, 'create'])->name('posts.create');
    Route::post('/store', [PostController::class, 'store'])->name('posts.store');
    Route::get('/edit/{id}', [PostController::class, 'edit'])->name('posts.edit');
    Route::post('/update/{id}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('/destroy/{id}', [PostController::class, 'destroy'])->name('posts.destroy');
    Route::get('/learnposts', [PostController::class, 'learnPosts'])->name('posts.learn');
    Route::get('/helpposts', [PostController::class, 'helpPosts'])->name('posts.help');
    Route::get('/parentposts', [PostController::class, 'parentPosts'])->name('posts.parent');
    Route::get('/eventposts', [PostController::class, 'eventPosts'])->name('posts.event');
    Route::get('/calendarposts', [PostController::class, 'calendarPosts'])->name('posts.calendar');

    Route::get('/createComment/{id}', [CommentController::class, 'create'])->name('comments.create');
    Route::post('/storeComment', [CommentController::class, 'store'])->name('comments.store');
    Route::get('/editComment/{id}', [CommentController::class, 'edit'])->name('comments.edit');
    Route::post('/updateComment/{id}', [CommentController::class, 'update'])->name('comments.update');
    Route::delete('/destroyComment/{id}', [CommentController::class, 'destroy'])->name('comments.destroy');
    
    Route::get('/votes', [VoteController::class, 'index'])->name('votes.index');
    Route::get('/votes/{id}', [VoteController::class, 'show'])->name('votes.show');
    Route::get('/voteEdit/{id}', [VoteController::class, 'edit'])->name('votes.edit');
    Route::put('/voteUpdate/{id}', [VoteController::class, 'update'])->name('votes.update');
    Route::delete('/voteDestroy/{id}', [VoteController::class, 'destroy'])->name('votes.destroy');
    Route::get('/createVote', [VoteController::class, 'create'])->name('votes.create');
    Route::post('/storeVote', [VoteController::class, 'store'])->name('votes.store');
    Route::post('/makeVote/{voteId}/{answerId}', [VoteController::class, 'makeVote'])->name('votes.makeVote');
    
    Route::get('/schools', [SchoolController::class, 'index'])->name('schools.index');
    Route::get('/schoolCreate', [SchoolController::class, 'create'])->name('schools.create');
    Route::post('/schoolStore', [SchoolController::class, 'store'])->name('schools.store');
    Route::get('/schoolEdit/{id}', [SchoolController::class, 'edit'])->name('schools.edit');
    Route::put('/schoolUpdate/{id}', [SchoolController::class, 'update'])->name('schools.update');
    Route::delete('/schoolDestroy/{id}', [SchoolController::class, 'destroy'])->name('schools.destroy');
    
    Route::get('/groups/{id}', [GroupController::class, 'show'])->name('groups.show');
    Route::get('/groupCreate/{schoolId}', [GroupController::class, 'create'])->name('groups.create');
    Route::post('/groupStore/{schoolId}', [GroupController::class, 'store'])->name('groups.store');
    Route::get('/groupEdit/{id}', [GroupController::class, 'edit'])->name('groups.edit');
    Route::put('/groupUpdate/{id}', [GroupController::class, 'update'])->name('groups.update');
    Route::delete('/groupDestroy/{id}', [GroupController::class, 'destroy'])->name('groups.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
