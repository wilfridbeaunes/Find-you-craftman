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
    private $i= 1;
    public function run()
    {   
        $this->call([
            CategorieProfessionelleSeeder::class,
        ]);
        $this->createArtisan(
            $this->i,
            1,
            47.6379989,
            6.8580693,
            "NIKE",
            "jack",
            "6 Rue du Général Hoche, 90000 Belfort",
            "Google"
        );
        $this->createArtisan(
            $this->i,
            1,
            47.6454685,
            6.8545702,
            "TYSON",
            "Mike",
            "Rue Victor Hugo, 90000 Belfort",
            "Adidas"
        );
        $this->createArtisan(
            $this->i,
            1,
            47.6382389,
            6.8550704,
            "SCOTT",
            "Michel",
            "Rue de l'As de Carreau, 90000 Belfort",
            "DOMINOS"
        );
        $this->createArtisan(
            $this->i,
            4,
            47.6364523,
            6.8396491,
            "MANSOUR",
            "Ahmed",
            "77 Avenue du Général Leclerc, 90000 Belfort",
            "CASTORAMA"
        );
        
    }
    
    public function createArtisan($id,$profession,$lat, $lon,$nom, $prenom, $addr,$entreprise){
        
        DB::table('comptes')->insert([
            'email' => "$prenom.$nom@gmail.com",
            'password' => Hash::make('password'),
        ]);
        DB::table('adresses')->insert([
            'adresse_postale' => $addr,
            'code_postal' => "90000",
            'cp_commune'=>"90010",
            'longitude' => $lon,
            'latitude' => $lat,
        ]);
        DB::table('entreprises')->insert([
            'nom' => $entreprise,
            'url' => "https://www.$entreprise.com",
            'adresse_id' => $id,
        ]);
        DB::table('artisans')->insert([
            'nom' => $nom,
            'prenom' => $prenom,
            'telephone' => "0612345678",
            'compte_id' => $id,
            'entreprise_id' => $id,
        ]);
        DB::table('profession_artisan')->insert([
            'categorie_pro_id' => $profession,
            'artisan_id' => $id
        ]);
        DB::table('travaux')->insert([
            'objectif' => "Construction d'une cabane en boite pour enfants",
            'date_debut' => "2020-03-9",
            'date_fin' =>  "2020-03-10",
            'artisan_id' => $id,
        ]);
        DB::table('travaux')->insert([
            'objectif' => "Rénovation d'une toiture de maison ",
            'date_debut' => "2020-04-10",
            'date_fin' =>  "2020-04-15",
            'artisan_id' => $id,
        ]);
        $this->i++;
    }
}
