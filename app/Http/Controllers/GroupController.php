<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\School;
use App\Models\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class GroupController extends Controller
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
    public function create(string $schoolId)
    {
        return Inertia::render('Group/Create', ['schoolId' => $schoolId]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $schoolId)
    {   
        $validated = $request->validate(['name' => 'required|string|max:255', 'school_id' => 'nullable']);
        
        $group = Group::create($validated);
        
        return redirect()->route('schools.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $group = Group::find($id);
        if(!$group){
            abort(404);
        }
        $users = User::where([['group_id', '=', $group['id']]])->orderBy('name')->get();
        return Inertia::render('Group/Show', ['group' => $group, 'users' => $users]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $group = Group::find($id);
        if(!$group){
            abort(404);
        }
        return Inertia::render('Group/Edit', ['group' => $group]);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {           
        $validated = $request->validate(['name' => 'required|string|max:255']);
        
        $group = Group::find($id);

        if(!$group){
            abort(404);
        }
        $group->update($validated);
        
        return redirect()->route('schools.index');

        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $group = Group::find($id);
        if(!$group){
            abort(404);
        }

        $group->delete()->save();
        
        return redirect()->route('schools.index');
        
    }
}
