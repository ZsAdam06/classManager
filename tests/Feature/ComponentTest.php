<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;
use App\Models\Group;
use App\Models\School;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Vote;
use App\Models\Answer;

class ComponentTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setup();

        $school = School::factory()->create();
        $group = Group::factory()->create([
            'school_id' => $school->id,
        ]);

        $user = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'testuser@example.com',
            'role' => 'student',
            'group_id' => $group->id,
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);
    }

    public function test_the_posts_learn_component(): void
    {
        $this
            ->get(route('posts.learn'))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Post/Learn')
            );
    }

    public function test_the_posts_help_component(): void
    {
        $this
            ->get(route('posts.help'))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Post/Help')
            );
    }
    
    public function test_the_posts_event_component(): void
    {
        $this
            ->get(route('posts.event'))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Post/Event')
            );
    }

    public function test_the_posts_calendar_component(): void
    {
        $this
            ->get(route('posts.calendar'))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Post/Calendar')
            );
    }

    public function test_the_posts_parent_component(): void
    {
        $school = School::factory()->create();
        $group = Group::factory()->create([
            'school_id' => $school->id,
        ]);

        $user = $this->post('/register', [
            'name' => 'Test Parent',
            'email' => 'testparent@example.com',
            'role' => 'parent',
            'group_id' => $group->id,
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);
        
        $this
            ->get(route('posts.parent'))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Post/Parent')
            );
    }

    public function test_the_posts_index_component(): void
    {
        $this
            ->get(route('posts.index'))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Post/Index')
            );
    }

    public function test_the_posts_show_component(): void
    {
        $school = School::factory()->create();
        $group = Group::factory()->create([
            'school_id' => $school->id,
        ]);
        $user = User::factory()->create([
            'role' => 'student',
            'group_id' => $group->id,
        ]);
        $post = Post::factory()->create([
            'user_id' => $user->id
        ]);

        $this
            ->get(route('posts.show', $post->id))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Post/Show')
            );
    }

    public function test_the_posts_create_component(): void
    {
        $this
            ->get(route('posts.create', 'learn'))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Post/Create')
            );
    }

    public function test_the_comments_create_component(): void
    {
        $school = School::factory()->create();
        $group = Group::factory()->create([
            'school_id' => $school->id,
        ]);
        $user = User::factory()->create([
            'role' => 'student',
            'group_id' => $group->id,
        ]);
        $post = Post::factory()->create([
            'user_id' => $user->id
        ]);
        $this
            ->get(route('comments.create', $post->id))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Comment/Create')
            );
    }

    public function test_the_comments_edit_component(): void
    {
        $school = School::factory()->create();
        $group = Group::factory()->create([
            'school_id' => $school->id,
        ]);
        $user = User::factory()->create([
            'role' => 'student',
            'group_id' => $group->id,
        ]);
        $post = Post::factory()->create([
            'user_id' => $user->id
        ]);
        $comment = Comment::factory()->create([
            'user_id' => $user->id,
            'post_id' => $post->id
        ]);
        $commentId = $comment->id;

        $this
            ->actingAs($user)
            ->get(route('comments.edit', $commentId))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Comment/Edit')
            );
    }

    public function test_the_vote_create_component(): void
    {
        $this
            ->get(route('votes.create'))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Vote/Create')
            );
    }

    public function test_the_vote_edit_component(): void
    {
        $school = School::factory()->create();
        $group = Group::factory()->create([
            'school_id' => $school->id,
        ]);
        $user = User::factory()->create([
            'role' => 'student',
            'group_id' => $group->id,
        ]);
        $vote = Vote::factory()->create([
            'author_id' => $user->id
        ]);

        $this
            ->actingAs($user)
            ->get(route('votes.edit', $vote->id))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Vote/Edit')
            );
    }

    public function test_the_vote_index_component(): void
    {
        $this
            ->get(route('votes.index'))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Vote/Index')
            );
    }

    public function test_the_vote_show_component(): void
    {
        $school = School::factory()->create();
        $group = Group::factory()->create([
            'school_id' => $school->id,
        ]);
        $user = User::factory()->create([
            'role' => 'student',
            'group_id' => $group->id,
        ]);
        $vote = Vote::factory()->create([
            'author_id' => $user->id
        ]);

        $this
            ->actingAs($user)
            ->get(route('votes.show', $vote->id))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Vote/Show')
            );
    }

    public function test_the_school_create_component(): void
    {
        $this
            ->get(route('schools.create'))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('School/Create')
            );
    }

    public function test_the_school_edit_component(): void
    {
        $school = School::factory()->create();
        $group = Group::factory()->create([
            'school_id' => $school->id,
        ]);
        $user = User::factory()->create([
            'role' => 'admin',
            'group_id' => $group->id,
        ]);

        $this
            ->actingAs($user)
            ->get(route('schools.edit', $school->id))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('School/Edit')
            );
    }

    public function test_the_school_index_component(): void
    {
        $this
            ->get(route('schools.index'))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('School/Index')
            );
    }

    public function test_the_group_create_component(): void
    {
        $school = School::factory()->create();

        $this
            ->get(route('groups.create', $school->id))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Group/Create')
            );
    }

    public function test_the_group_edit_component(): void
    {
        $school = School::factory()->create();
        $group = Group::factory()->create([
            'school_id' => $school->id,
        ]);
        $user = User::factory()->create([
            'role' => 'admin',
            'group_id' => $group->id,
        ]);

        $this
            ->actingAs($user)
            ->get(route('groups.edit', $group->id))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Group/Edit')
            );
    }

    public function test_the_group_show_component(): void
    {
        $school = School::factory()->create();
        $group = Group::factory()->create([
            'school_id' => $school->id,
        ]);
        $user = User::factory()->create([
            'role' => 'admin',
            'group_id' => $group->id,
        ]);

        $this
            ->actingAs($user)
            ->get(route('groups.show', $group->id))
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Group/Show')
            );
    }

    
}
