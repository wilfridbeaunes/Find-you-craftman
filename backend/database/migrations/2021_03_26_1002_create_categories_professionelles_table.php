<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesProfessionellesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories_professionelles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('titre');
            $table->text('description')->nullable();
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
        Schema::dropIfExists('categories_professionelles');
    }
}
