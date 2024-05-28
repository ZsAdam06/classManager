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


class SchoolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $schools = School::with('groups')->get();
        $groups = Group::with('users')->get();
        $users = User::get();
        return Inertia::render('School/Index', ['schools' => $schools, 'groups' => $groups, 'users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('School/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {   
        $validated = $request->validate(['name' => 'required|string|max:255']);
        
        $school = School::create($validated);
        
        return redirect()->route('schools.index');
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
        $school = School::find($id);
        if(!$school){
            abort(404);
        }
        return Inertia::render('School/Edit', ['school' => $school]);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {           
        $validated = $request->validate(['name' => 'required|string|max:255']);
        
        $school = School::find($id);

        if(!$school){
            abort(404);
        }
        $school->update($validated);
        
        return redirect()->route('schools.index');

        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $school = School::find($id);
        if(!$school){
            abort(404);
        }
        
        $school->delete()->save();
        
        return redirect()->route('schools.index');
        
    }
}
