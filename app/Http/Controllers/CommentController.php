<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(string $id)
    {
        $post = Post::find($id);
        if(!$post){
            abort(404);
        }
        $description = $post['description'];
        $topic = $post['topic'];
        return Inertia::render('Comment/Create', ['postId' => $id, 'postDescription' => $description, 'topic' => $topic]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request)
    {   
        $validated = $request->validated();

        if($request->hasFile('file')){
            $path = $request->file('file')->store();
            $validated['filename'] = $request->file('file')->getClientOriginalName();
            $validated['filename_hash'] = $path;
            $comment = Comment::create($validated);

        }else{
            $comment = Comment::create($validated);
        }
        
        return redirect()->route('posts.show', $validated['post_id']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //   
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $comment = Comment::find($id);
        if(!$comment || Auth::id() != $comment['user_id']){
            abort(404);
        }
        
        $commentUrl = Storage::url($comment->filename_hash);
        $post = Post::find($comment['post_id']);
        if(!$post){
            abort(404);
        }
        $topic = $post['topic'];

        return Inertia::render('Comment/Edit', ['comment' => $comment, 'commentUrl' => $commentUrl, 'topic' => $topic]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, string $id)
    {
        $validated = $request->validated();
        
        $comment = Comment::find($id);
        
        if(!$comment || Auth::id() != $comment['user_id']){
            abort(404);
        }
        
        if($request->hasFile('file') && $request->file != ""){
            $path = $request->file('file')->store();
            $validated['filename'] = $request->file('file')->getClientOriginalName();
            $validated['filename_hash'] = $path;
            if($comment->filename_hash){Storage::delete($comment->filename_hash);}
            $comment->update($validated);
        }else{
            $comment->update($validated);
        }

        return redirect()->route('posts.show', $comment['post_id']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $comment = Comment::find($id);
        if(!$comment || Auth::id() != $comment['user_id']){
            abort(404);
        }

        if($comment->filename_hash){
            Storage::delete($comment->filename_hash);
        }

        $comment->delete();
        return redirect()->route('posts.show', $comment['post_id']);
    }
}
