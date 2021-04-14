<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfessionArtisan extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profession_artisan', function (Blueprint $table) {
            $table->foreignId('categorie_pro_id');
            $table->foreignId('artisan_id');
            
            $table->foreign('categorie_pro_id')
                  ->references('id')
                  ->on('categories_professionelles');
            $table->foreign('artisan_id')
                  ->references('id')
                  ->on('artisans')->onDelete('cascade');;

            $table->primary(['categorie_pro_id', 'artisan_id']);
        });
        //

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profession_artisan');
    }
}
