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

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            PostSeeder::class,
            CommentSeeder::class,
            SchoolSeeder::class,
            GroupSeeder::class,
            AdminSeeder::class,
        ]);

        $groups = Group::all();
        for($i=0; $i<20; $i+=1){
            $group = $groups[$i];
            for($j=0; $j<20; $j+=1){
                $user = User::factory()
                            ->for($group)
                            ->create(['group_id' => $group->id]);
                Post::factory()
                            ->for($user)
                            ->create(['user_id' => $user->id]);
                Vote::factory()
                            ->hasAttached($user)
                            ->create(['author_id' => $user->id]);
            }
        }

        $posts = Post::all();
        $users = User::all();
        foreach($posts as $post){
            $user = $users->random(1);
            Comment::factory()
                            ->for($user->first())
                            ->create(['user_id' => $user->first()->id, 'post_id' => $post->id]);
        }
        //\App\Models\User::factory(50)->create();

        $votes = Vote::all();
        foreach ($votes as $vote) {
            for($i=0; $i<4; $i++){
                Answer::factory()
                        ->for($vote)
                        ->create(['vote_id' => $vote->id]);
            }
        }
        
        for($i=0; $i<20; $i+=1){
            \App\Models\User::factory()->create([
                'name' => 'Teacher User'.$i,
                'email' => 't'.$i.'@teacher.com',
                'role' => (($i % 9 == 0) ? 'parent-teacher' : 'teacher' ),
                'group_id' => $groups[$i]->id,
            ]);
        }

    }
}
