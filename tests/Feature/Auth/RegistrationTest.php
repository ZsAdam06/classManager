<?php

namespace Tests\Feature\Auth;

use App\Models\Group;
use App\Models\School;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {   
        $school = School::factory()->create();
        $group = Group::factory()->create([
            'school_id' => $school->id,
        ]);

        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'testuser@example.com',
            'role' => 'student',
            'group_id' => $group->id,
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(RouteServiceProvider::HOME);
    }
}
