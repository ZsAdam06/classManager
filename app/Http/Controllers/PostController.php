<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use App\Models\User;
use App\Models\Group;
use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::all();
        return Inertia::render('Post/Index', ['posts' => $posts]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(string $topic)
    {
        return Inertia::render('Post/Create', ["topic" => $topic]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {   
        $validated = $request->validated();
        
        if($request->hasFile('file')){
            $path = $request->file('file')->store();
            $validated['filename'] = $request->file('file')->getClientOriginalName();
            $validated['filename_hash'] = $path;
            $post = Post::create($validated);
            
        }else{
            $post = Post::create($validated);
        }

        $route = "posts." . $post['topic'];
        
        return redirect()->route($route);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::find($id);
        if(!$post){
            abort(404);
        }
        $author = Post::find($id)->user;
        $comments = Comment::where('post_id', '=', $id)->with('user')->get();
        if($post->filename){
            $fileUrl = Storage::url($post->filename_hash);
        }else{
            $fileUrl = "";
        }

        $commentUrls = [];

        foreach ($post->comments as $comment) {
            if($comment->filename){
                $commentUrl = Storage::url($comment->filename_hash);
                $commentUrls[$comment->id] = $commentUrl;
            }else{
                $commentUrl = "";
            }
        }
        return Inertia::render('Post/Show', ['post' => $post, 'author' => $author, 'comments' => $comments, 'fileUrl' => $fileUrl, 'commentUrls' => $commentUrls]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $post = Post::find($id);
        if(!$post || Auth::id() != $post['user_id']){
            abort(404);
        }

        if($post->filename){
            $fileUrl = Storage::url($post->filename_hash);
        }else{
            $fileUrl = "";
        }

        

        return Inertia::render('Post/Edit', ['p' => $post, 'fileUrl' => $fileUrl]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, string $id)
    {
        $validated = $request->validated();
        
        $post = Post::find($id);
        
        if(!$post || Auth::id() != $post['user_id']){
            abort(404);
        }


        if($request->hasFile('file') && $request->file != ""){
            $path = $request->file('file')->store();
            $validated['filename'] = $request->file('file')->getClientOriginalName();
            $validated['filename_hash'] = $path;
            if($post->filename_hash){Storage::delete($post->filename_hash);}
            $post->update($validated);
        }else{
            $post->update($validated);
        }

        $route = "posts." . $post['topic'];
        
        return redirect()->route($route);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::find($id);
        if(!$post || Auth::id() != $post['user_id']){
            abort(404);
        }
        $route = "posts." . $post['topic'];
        
        if($post->filename_hash){
            Storage::delete($post->filename_hash);
        }
        if($post->comments){
            foreach ($post->comments as $comment) {
                if($comment->filename_hash){
                    Storage::delete($comment->filename_hash);
                }
                $comment->delete();
            }
        }
        $post->delete();
        
        return redirect()->route($route);
    }

    public function learnPosts()
    {
        $id = Auth::id();
        $user = User::find($id);
        $posts = Post::where('topic', '=', 'learn')->orderByDesc('updated_at')->with('user')->get();
        $schools = School::with('groups')->get();

        if($user['role'] == 'admin'){
            Inertia::render('School/Index', ['schools' => $schools]);
            return redirect()->route('schools.index');            
        }else if($user['role'] != 'student'){
            return redirect()->route('posts.parent');
        }
        
        return Inertia::render('Post/Learn', ['posts' => $posts]);
    }
    public function helpPosts()
    {
        $id = Auth::id();
        $user = User::find($id);
        $groupId = $user['group_id'];
        $posts = Post::where([['topic', '=', 'help']])->orderByDesc('updated_at')->with('user')->get();
        $group = Group::find($groupId);
        $schoolId = $group['school_id'];
        $groups = Group::where([['school_id', '=', $schoolId]])->get();
        return Inertia::render('Post/Help', ['posts' => $posts, 'groupId' => $groupId, 'schoolId' => $schoolId, 'groups' => $groups]);
    }
    public function parentPosts()
    {
        $id = Auth::id();
        $user = User::find($id);
        $groupId = $user['group_id'];
        $group = Group::find($groupId);
        $schoolId = $group['school_id'];
        $groups = Group::where([['school_id', '=', $schoolId]])->get();

        $posts = Post::where('topic', '=', 'parent')->orderByDesc('updated_at')->with('user')->get();
        return Inertia::render('Post/Parent', ['posts' => $posts, 'groupId' => $groupId, 'schoolId' => $schoolId, 'groups' => $groups]);
    }
    public function eventPosts()
    {
        $id = Auth::id();
        $user = User::find($id);
        $groupId = $user['group_id'];
        $group = Group::find($groupId);
        $schoolId = $group['school_id'];
        $groups = Group::where([['school_id', '=', $schoolId]])->get();

        $posts = Post::where('topic', '=', 'event')->orderByDesc('updated_at')->with('user')->get();
        return Inertia::render('Post/Event', ['posts' => $posts, 'groupId' => $groupId, 'schoolId' => $schoolId, 'groups' => $groups]);
    }
    public function calendarPosts()
    {
        $id = Auth::id();
        $user = User::find($id);
        $groupId = $user['group_id'];
        $group = Group::find($groupId);
        $schoolId = $group['school_id'];
        $groups = Group::where([['school_id', '=', $schoolId]])->get();

        $currentDate = date("Y-m-d");
        $posts = Post::where([['topic', '=', 'calendar'], ['date', '>=', $currentDate]])->orderBy('date')->with('user')->get();
        $pastPosts = Post::where([['topic', '=', 'calendar'], ['date', '<', $currentDate]])->orderBy('date')->with('user')->get();
        return Inertia::render('Post/Calendar', ['posts' => $posts, 'pastPosts' => $pastPosts, 'groupId' => $groupId, 'schoolId' => $schoolId, 'groups' => $groups]);
    }
}
