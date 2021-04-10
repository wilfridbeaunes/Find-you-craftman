<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTravauxTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('travaux', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->dateTime('date_debut');
            $table->dateTime('date_fin');
            $table->text('objectif');
            $table->foreignId('artisan_id');

            $table->foreign('artisan_id')
              ->references('id')
              ->on('artisans');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('travaux');
    }
}
