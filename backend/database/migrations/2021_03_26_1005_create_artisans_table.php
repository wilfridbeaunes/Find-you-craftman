<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArtisansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('artisans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nom');
            $table->string('prenom');
            $table->decimal('telephone', $precision = 10, $scale = 0);
            $table->text('biographie')->nullable();
            $table->binary('image_profil')->nullable();
            $table->foreignId('entreprise_id');
            $table->foreignId('compte_id');

            $table->foreign('compte_id')
              ->references('id')
              ->on('comptes')->onDelete('cascade');
            $table->foreign('entreprise_id')
              ->references('id')
              ->on('entreprises');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('artisans');
    }
}
