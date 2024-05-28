<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use App\Models\User;
use App\Models\Vote;
use App\Models\Answer;
use App\Models\Group;
use Illuminate\Http\Request;
use App\Http\Requests\VoteRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $votes = Vote::with('author')->orderBy('deadline')->with('author')->get();
        $answers = Answer::with('vote')->get();

        $id = Auth::id();
        $user = User::find($id);
        $groupId = $user['group_id'];
        
        $group = Group::find($groupId);
        $schoolId = $group['school_id'];
        $groups = Group::where([['school_id', '=', $schoolId]])->get();

        return Inertia::render('Vote/Index', ['votes' => $votes, 'answers' => $answers, 'groupId' => $groupId, 'schoolId' => $schoolId, 'groups' => $groups]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Vote/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VoteRequest $request)
    {   
        $validated = $request->validated();
        
        $vote = Vote::create($validated);

        $parts = [];
        $tok = strtok($vote->ans, "\n");
        while ($tok !== false) {
            $parts[] = $tok;
            $tok = strtok("\n");
        }
        
        foreach ($parts as $answer) {
            Answer::create(['label' => $answer, 'count' => 0, 'vote_id' => $vote->id]);
        }

        return redirect()->route('votes.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $vote = Vote::find($id);
        if(!$vote){
            abort(404);
        }
        $author = Vote::find($id)->author;

        $answers = Answer::where('vote_id', '=', $vote->id)->get();

        $id = Auth::id();
        $user = User::find($id);

        $votes = $user->votes;

        $isVoted = $votes->contains($vote);

        return Inertia::render('Vote/Show', ['vote' => $vote, 'author' => $author, 'answers' => $answers, 'isVoted' => $isVoted]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $vote = Vote::find($id);
        if(!$vote || Auth::id() != $vote['author_id']){
            abort(404);
        }
        return Inertia::render('Vote/Edit', ['vote' => $vote]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(VoteRequest $request, string $id)
    {
        $validated = $request->validated();
        
        $vote = Vote::find($id);
        
        if(!$vote || Auth::id() != $vote['author_id']){
            abort(404);
        }

        $answerList = Answer::where('vote_id', '=', $vote->id)->get();

        foreach ($answerList as $a) {
            $a->delete();
        }
        foreach ($vote->users as $u) {
            $vote->users()->detach($u->id);
        }

        $vote->delete();
        $vote = Vote::create($validated);
        
        $parts = [];
        $tok = strtok($vote->ans, "\n");
        while ($tok !== false) {
            $parts[] = $tok;
            $tok = strtok("\n");
        }
        
        foreach ($parts as $answer) {
            Answer::create(['label' => $answer, 'count' => 0, 'vote_id' => $vote->id]);
        }
        
        return redirect()->route('votes.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $vote = Vote::find($id);
        if(!$vote || Auth::id() != $vote['author_id']){
            abort(404);
        }
        
        $answers = Answer::where('vote_id', '=', $vote->id)->get();

        foreach ($answers as $answer) {
            $answer->delete();
        }
        foreach ($vote->users as $u) {
            $vote->users()->detach($u->id);
        }
        $vote->delete();
        return redirect()->route('votes.index');
    }

    public function makeVote(string $voteId, string $answerId)
    {
        $id = Auth::id();
        $user = User::find($id);
        $user->votes()->attach($voteId);

        $answer = Answer::find($answerId);
        $answer->count = $answer->count + 1;
        $answer->save();
        return redirect()->route('votes.index');
    }
}
