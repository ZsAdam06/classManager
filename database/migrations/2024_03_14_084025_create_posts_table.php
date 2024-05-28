<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description');
            $table->date('date')->nullable();
            $table->enum('topic', ['learn', 'help', 'parent', 'event', 'calendar']);
            $table->enum('subject', ['m', 'g', 'h', 'l', 's', 'o'])->nullable();
            $table->enum('visibility', ['school', 'class'])->nullable();
            
            $table->string('filename')->nullable();
            $table->string('filename_hash')->nullable();

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
