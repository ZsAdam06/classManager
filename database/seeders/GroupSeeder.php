<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\School;
use App\Models\Group;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $schools = School::all();
        for($i=0; $i<20; $i+=1){
            $school = $schools->random(1);
            Group::factory()
                        ->for($school->first())
                        ->create(['school_id' => $school->first()->id]);
        }
    }
}
