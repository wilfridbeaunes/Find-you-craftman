<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {   
        $this->call([
            CategorieProfessionelleSeeder::class,
        ]);
        for ($i=1; $i <= 10; $i++) { 
            DB::table('comptes')->insert([
                'email' => Str::random(10).'@gmail.com',
                'password' => Hash::make('password'),
            ]);
            DB::table('adresses')->insert([
                'adresse_postale' => "$i rue random",
                'code_postal' => "90000",
                'cp_commune'=>"90010",
                'longitude' => 6.85289800,
                'latitude' => 47.639313,
            ]);
            DB::table('entreprises')->insert([
                'nom' => "Google$i",
                'url' => "https://www.google.com",
                'adresse_id' => $i,
            ]);
            DB::table('artisans')->insert([
                'nom' => "RANDOM$i",
                'prenom' => "Random$i ",
                'telephone' => "0612345678",
                'compte_id' => $i,
                'entreprise_id' => $i,
            ]);
            DB::table('profession_artisan')->insert([
                'categorie_pro_id' => 1,
                'artisan_id' => $i
            ]);
            
        }
        
        
    }
}
