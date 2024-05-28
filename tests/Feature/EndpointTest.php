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

class EndpointTest extends TestCase
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

    public function test_the_learn_page_returns_a_successful_response(): void
    {
        $this->assertAuthenticated();
        $response = $this->get('/learnposts');
        $response->assertStatus(200);
    }

    public function test_the_help_page_returns_a_successful_response(): void
    {
        $this->assertAuthenticated();
        $response = $this->get('/helpposts');
        $response->assertStatus(200);
    }

    public function test_the_event_page_returns_a_successful_response(): void
    {
        $this->assertAuthenticated();
        $response = $this->get('/eventposts');
        $response->assertStatus(200);
    }

    public function test_the_calendar_page_returns_a_successful_response(): void
    {
        $this->assertAuthenticated();
        $response = $this->get('/calendarposts');
        $response->assertStatus(200);
    }

    public function test_the_parent_page_returns_a_successful_response(): void
    {
        $school = School::factory()->create();
        $group = Group::factory()->create([
            'school_id' => $school->id,
        ]);

        $response = $this->post('/register', [
            'name' => 'Test Parent',
            'email' => 'testparent@example.com',
            'role' => 'parent',
            'group_id' => $group->id,
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $this->assertAuthenticated();
        $response = $this->get('/parentposts');
        $response->assertStatus(200);
    }

    public function test_the_create_post_page_returns_a_successful_response(): void
    {
        $response = $this->get('/create/learn');
        $response->assertStatus(200);
    }

    public function test_the_create_post_and_redirect(): void
    {
        $school = School::factory()->create();
        $group = Group::factory()->create([
            'school_id' => $school->id,
        ]);
        $user = User::factory()->create([
            'role' => 'student',
            'group_id' => $group->id,
        ]);

        $response = $this
            ->actingAs($user)
            ->from('/create/learn')
            ->post('/store', [
                'title' => "Test Post",
                'description' => "This is a test learn post.",
                'topic' => "learn",
                'subject' => "m",
                'user_id' => $user->id
            ]);
        
        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/learnposts');
        
        $count = Post::count();
        $this->assertTrue($count == 1);
    }

    public function test_the_edit_post_page_returns_a_successful_response(): void
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
        $postId = $post->id;

        $response = $this
            ->actingAs($user)
            ->get("/edit/$postId");
        $response->assertStatus(200);
    }

    public function test_the_update_post_and_redirect(): void
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
            'topic' => 'learn',
            'user_id' => $user->id
        ]);
        $postId = $post->id;

        $response = $this
            ->actingAs($user)
            ->from("/edit/$postId")
            ->post("/update/$postId", [
                'title' => "Test Post",
                'description' => "This is a test learn post.",
                'topic' => "learn",
                'subject' => "m",
                'user_id' => $user->id
            ]);
        
        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/learnposts');
        
        $post = Post::find($postId);
        $this->assertTrue($post->title == "Test Post");
    }

    public function test_the_destroy_post_and_redirect(): void
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
            'topic' => 'learn',
            'user_id' => $user->id
        ]);
        $postId = $post->id;

        $count = Post::count();
        $this->assertTrue($count == 1);

        $response = $this
            ->actingAs($user)
            ->from("/learnposts")
            ->delete("/destroy/$postId");
        
        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/learnposts');
        
        $count = Post::count();
        $this->assertTrue($count == 0);
    }

    public function test_the_create_comment_page_returns_a_successful_response(): void
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
            'topic' => 'learn',
            'user_id' => $user->id
        ]);
        $postId = $post->id;

        $response = $this->get("/createComment/$postId");
        $response->assertStatus(200);
    }

    public function test_the_create_comment_and_redirect(): void
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
            'topic' => 'learn',
            'user_id' => $user->id
        ]);
        $postId = $post->id;

        $response = $this
            ->actingAs($user)
            ->from("/createComment/$postId")
            ->post("storeComment", [
                'description' => "This is a test comment.",
                'user_id' => $user->id,
                'post_id' => $postId
            ]);
        
        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect("/posts/$postId");
        
        $count = Comment::count();
        $this->assertTrue($count == 1);
    }

    public function test_the_edit_comment_page_returns_a_successful_response(): void
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
        $postId = $post->id;
        $comment = Comment::factory()->create([
            'user_id' => $user->id,
            'post_id' => $postId
        ]);
        $commentId = $comment->id;

        $response = $this
            ->actingAs($user)
            ->get("/editComment/$commentId");
        $response->assertStatus(200);
    }

    public function test_the_update_comment_and_redirect(): void
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
            'topic' => 'learn',
            'user_id' => $user->id
        ]);
        $postId = $post->id;
        $comment = Comment::factory()->create([
            'user_id' => $user->id,
            'post_id' => $postId
        ]);
        $commentId = $comment->id;

        $response = $this
            ->actingAs($user)
            ->from("/editComment/$commentId")
            ->post("/updateComment/$commentId", [
                'description' => "This is a test comment.",
                'user_id' => $user->id,
                'post_id' => $postId
            ]);
        
        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect("/posts/$postId");
        
        $comment = Comment::find($commentId);
        $this->assertTrue($comment->description == "This is a test comment.");
    }

    public function test_the_destroy_comment_and_redirect(): void
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
            'topic' => 'learn',
            'user_id' => $user->id
        ]);
        $postId = $post->id;
        $comment = Comment::factory()->create([
            'user_id' => $user->id,
            'post_id' => $postId
        ]);
        $commentId = $comment->id;

        $count = Comment::count();
        $this->assertTrue($count == 1);

        $response = $this
            ->actingAs($user)
            ->from("/posts/$postId")
            ->delete("/destroyComment/$commentId");
        
        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect("/posts/$postId");
        
        $count = Comment::count();
        $this->assertTrue($count == 0);
    }

    public function test_the_create_votes_page_returns_a_successful_response(): void
    {
        $response = $this->get('/votes');
        $response->assertStatus(200);
    }

    public function test_the_create_vote_page_returns_a_successful_response(): void
    {
        $response = $this->get('/createVote');
        $response->assertStatus(200);
    }

    public function test_the_edit_vote_page_returns_a_successful_response(): void
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
            'author_id' => $user->id,
        ]);
        $voteId = $vote->id;

        $response = $this
            ->actingAs($user)    
            ->get("/voteEdit/$voteId");
        $response->assertStatus(200);
    }
    
    public function test_the_vote_page_returns_a_successful_response(): void
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
            'author_id' => $user->id,
        ]);
        $voteId = $vote->id;

        $response = $this->get("/votes/$voteId");
        $response->assertStatus(200);
    }

    public function test_the_create_vote_and_redirect(): void
    {
        $school = School::factory()->create();
        $group = Group::factory()->create([
            'school_id' => $school->id,
        ]);
        $user = User::factory()->create([
            'role' => 'student',
            'group_id' => $group->id,
        ]);

        $response = $this
            ->actingAs($user)
            ->from('/createVote')
            ->post('/storeVote', [
                'question' => "Test question",
                'ans' => "Test answer",
                'deadline' => "2024-05-29",
                'is_finished' => false,
                'author_id' => $user->id
            ]);
        
        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/votes');
        
        $count = Vote::count();
        $this->assertTrue($count == 1);
    }

    public function test_the_update_vote_and_redirect(): void
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
            'author_id' => $user->id,
        ]);
        $voteId = $vote->id;

        $response = $this
            ->actingAs($user)
            ->from("/voteEdit/$voteId")
            ->put("/voteUpdate/$voteId", [
                'question' => "Test question",
                'ans' => "Test answer",
                'deadline' => "2024-05-29",
                'is_finished' => false,
                'author_id' => $user->id
            ]);
        
        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/votes');
        
        $vote = Vote::find($voteId+1);
        $this->assertTrue($vote->question == "Test question");
    }

    public function test_the_destroy_vote_and_redirect(): void
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
            'author_id' => $user->id,
        ]);
        $voteId = $vote->id;

        $count = Vote::count();
        $this->assertTrue($count == 1);

        $response = $this
            ->actingAs($user)
            ->from("/votes/$voteId")
            ->delete("/voteDestroy/$voteId");
        
        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/votes');
        
        $count = Vote::count();
        $this->assertTrue($count == 0);
    }

    public function test_the_makeVote_and_redirect(): void
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
            'author_id' => $user->id,
        ]);
        $voteId = $vote->id;
        $answer = Answer::factory()->create([
            'vote_id' => $voteId
        ]);
        $answerId = $answer->id;
        $ansCount = $answer->count;

        $count = Vote::count();
        $this->assertTrue($count == 1);

        $response = $this
            ->actingAs($user)
            ->from("/votes/$voteId")
            ->post("/makeVote/$voteId/$answerId");
        
        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/votes');
        
        $ans = Answer::find($answerId);
        $this->assertTrue($ans->count == $ansCount+1);
    }

    public function test_the_schools_admin_page_returns_a_successful_response(): void
    {
        $school = School::factory()->create();
        $group = Group::factory()->create([
            'school_id' => $school->id,
        ]);

        $user = $this->post('/register', [
            'name' => 'Admin',
            'email' => 'testadmin@example.com',
            'role' => 'admin',
            'group_id' => $group->id,
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response = $this->get('/schools');
        $response->assertStatus(200);
    }

    public function test_the_school_create_admin_page_returns_a_successful_response(): void
    {
        $user = $this->post('/register', [
            'name' => 'Admin',
            'email' => 'testadmin@example.com',
            'role' => 'admin',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response = $this->get('/schoolCreate');
        $response->assertStatus(200);
    }

    public function test_the_school_edit_admin_page_returns_a_successful_response(): void
    {
        $school = School::factory()->create();
        $schoolId = $school->id;
        
        $user = $this->post('/register', [
            'name' => 'Admin',
            'email' => 'testadmin@example.com',
            'role' => 'admin',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response = $this->get("/schoolEdit/$schoolId");
        $response->assertStatus(200);
    }
    
    public function test_the_create_school_and_redirect(): void
    {
        $user = $this->post('/register', [
            'name' => 'Admin',
            'email' => 'testadmin@example.com',
            'role' => 'admin',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);
        
        $schoolCount = School::count();
        
        $response = $this
            ->from('/schoolCreate')
            ->post('/schoolStore', [
                'name' => "Test School",
            ]);
        
        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/schools');
        
        $count = School::count();
        $this->assertTrue($count == $schoolCount+1);
    }

    public function test_the_update_school_and_redirect(): void
    {
        $school = School::factory()->create();
        $schoolId = $school->id;

        $response = $this
            ->from("/schoolEdit/$schoolId")
            ->put("/schoolUpdate/$schoolId", [
                'name' => "Test School",
            ]);
        
        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/schools');
        
        $school = School::find($schoolId);
        $this->assertTrue($school->name == "Test School");
    }


    public function test_the_destroy_school_and_redirect(): void
    {
        $user = $this->post('/register', [
            'name' => 'Admin',
            'email' => 'testadmin@example.com',
            'role' => 'admin',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);
        
        $schoolCount = School::count();

        $school = School::factory()->create();
        $schoolId = $school->id;
        
        $count = School::count();
        $this->assertTrue($count == $schoolCount+1);

        $response = $this
            ->from("/schools")
            ->delete("/schoolDestroy/$schoolId");
        
        $response
            ->assertSessionHasNoErrors();
        
        $count = School::count();
        $this->assertTrue($count == $schoolCount);
    }

    public function test_the_group_show_admin_page_returns_a_successful_response(): void
    {
        $school = School::factory()->create();
        $group = Group::factory()->create([
            'school_id' => $school->id,
        ]);
        $groupId = $group->id;

        $user = $this->post('/register', [
            'name' => 'Admin',
            'email' => 'testadmin@example.com',
            'role' => 'admin',
            'group_id' => $group->id,
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response = $this->get("/groups/$groupId");
        $response->assertStatus(200);
    }

    public function test_the_group_show_admin_page_returns_a_not_found_response(): void
    {
        $user = $this->post('/register', [
            'name' => 'Admin',
            'email' => 'testadmin@example.com',
            'role' => 'admin',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response = $this->get("/groups/999999999");
        $response->assertStatus(404);
    }

    public function test_the_group_create_admin_page_returns_a_successful_response(): void
    {
        $school = School::factory()->create();
        $schoolId = $school->id;

        $user = $this->post('/register', [
            'name' => 'Admin',
            'email' => 'testadmin@example.com',
            'role' => 'admin',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response = $this->get("/groupCreate/$schoolId");
        $response->assertStatus(200);
    }
    
    public function test_the_create_group_and_redirect(): void
    {
        $school = School::factory()->create();
        $schoolId = $school->id;

        $user = $this->post('/register', [
            'name' => 'Admin',
            'email' => 'testadmin@example.com',
            'role' => 'admin',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);
        
        $groupCount = Group::count();
        
        $response = $this
            ->from("/groupCreate/$schoolId")
            ->post("/groupStore/$schoolId", [
                'name' => "Test Group",
                'school_id' => $schoolId
            ]);
        
        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/schools');
        
        $count = Group::count();
        $this->assertTrue($count == $groupCount+1);
    }

    public function test_the_group_edit_admin_page_returns_a_successful_response(): void
    {
        $school = School::factory()->create();
        $schoolId = $school->id;
        $group = Group::factory()->create([
            'school_id' => $school->id,
        ]);
        $groupId = $group->id;

        $user = $this->post('/register', [
            'name' => 'Admin',
            'email' => 'testadmin@example.com',
            'role' => 'admin',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response = $this->get("/groupEdit/$groupId");
        $response->assertStatus(200);
    }

    public function test_the_update_group_and_redirect(): void
    {
        $school = School::factory()->create();
        $schoolId = $school->id;
        $group = Group::factory()->create([
            'school_id' => $school->id,
        ]);
        $groupId = $group->id;

        $user = $this->post('/register', [
            'name' => 'Admin',
            'email' => 'testadmin@example.com',
            'role' => 'admin',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);
                
        $response = $this
            ->from("/groupEdit/$groupId")
            ->put("/groupUpdate/$groupId", [
                'name' => "Test Group",
                'school_id' => $schoolId
            ]);
        
        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/schools');
        
        $group = Group::find($groupId);
        $this->assertTrue($group->name == "Test Group");
    }

    public function test_the_destroy_group_and_redirect(): void
    {
        $user = $this->post('/register', [
            'name' => 'Admin',
            'email' => 'testadmin@example.com',
            'role' => 'admin',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);
        
        $groupCount = Group::count();

        $school = School::factory()->create();
        $schoolId = $school->id;
        $group = Group::factory()->create([
            'school_id' => $school->id,
        ]);
        $groupId = $group->id;
        
        $count = Group::count();
        $this->assertTrue($count == $groupCount+1);

        $response = $this
            ->from("/schools")
            ->delete("/groupDestroy/$groupId");
        
        $response
            ->assertSessionHasNoErrors();
        
        $count = Group::count();
        $this->assertTrue($count == $groupCount);
    }
}
