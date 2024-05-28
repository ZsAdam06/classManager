<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Group;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Vote;
use App\Models\Answer;

class AdminSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {   
        User::factory()->create([
            'name' => 'Admin Admin',
            'email' => 'admin@admin.com',
            'role' => 'admin',
        ]);

    }
}
