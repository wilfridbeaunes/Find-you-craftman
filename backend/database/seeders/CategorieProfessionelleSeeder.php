<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CategorieProfessionelleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories_professionelles')->insert([
            'titre' => "Charpentier",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Bainiste | Agencement de salles de bains",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Carreleur | Poseur de pavés,  faiences,  mosaiques",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Chauffagiste",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Couvreur | Installateur de fenêtres de toit",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Cuisiniste | Agencement de cuisines",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Décorateur d'intérieur",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Déménageur",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Electricien | Cablage électrique,  informatique,  multimédia",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Entreprise générale du bâtiment",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Excavation | Terrassement | Allée | Démolition",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Ferronnerie | Métallerie",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Géomètre / Métreur",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Installateur de cheminées",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Installateur de systèmes de climatisation",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Installateur d'alarmes | Videosurveillance",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Installateur d'antennes satellite | TV",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Jardinier | Entretien de jardin",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Maçon | Structures en pierres,  briques,  béton",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Maitre d'oeuvre",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Menuisier | Bois,  PVC,  Aluminium",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Paysagiste | Création et plantation de jardins",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Peintre et décorateur",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Personne polyvalente pour petits travaux",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Platrier | Plaquiste | Isolation thermique,  acoustique",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Plombier",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Poseur de moquettes,  parquets,  vinyles,  résines",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Professionnel de l'Assainissement | Contrôle,  conseil,  pose et entretien",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Professionnel Fosses septiques | Installation,  entretien,  vidange",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Professionnel Piscines | Jacuzzi  -  construction / vente",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Professionnel Piscines | Jacuzzi -  entretien",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Ramoneur",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Serrurier",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Architecte",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Spécialiste de l'élagage,  de l'abattage d'arbres",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Spécialiste des énergies nouvelles,  solaire,  géothermie",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Spécialiste des fenêtres,  vérandas,  serres,  patios",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Spécialiste des portes de garage,  portails",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Spécialiste des portes,  porte-fenêtres,  portes blindées",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Spécialiste des sols - marbre | carrelage | béton ciré",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Spécialiste des volets,  stores",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Spécialiste du nettoyage de sols,  vitres,  locaux",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Spécialiste Façades | Enduit,  ravalement,  sablage,  isolation",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Tapissier | Spécialiste des tissus,  rideaux,  voilages",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Traitement des Nuisibles | Spécialiste Traitement du bois | Charpente de l'humidité | Étanchéité",
            'description' => "Some random description about the job",
        ]);
        DB::table('categories_professionelles')->insert([
            'titre' => "Vitrier | Miroitier | Films de protection solaire | Vitrage de sécurité",
            'description' => "Some random description about the job",
        ]);


    }
}
