import React from 'react';
import { Brain, Heart, AlertCircle, Eye, Clock, Shield } from 'lucide-react';

const SPTInfographic: React.FC = () => {
  return (
    <div className="w-[800px] bg-white p-8 font-sans" id="spt-infographic">
      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-medical-500 pb-6">
        <h1 className="text-4xl font-bold text-medical-800 mb-2">
          STRESS POST-TRAUMATIQUE
        </h1>
        <h2 className="text-2xl text-therapeutic-600 font-semibold">
          Symptômes et Mécanismes
        </h2>
        <p className="text-gray-600 mt-3">Guide de reconnaissance et compréhension</p>
      </div>

      {/* Definition Box */}
      <div className="bg-medical-50 border-l-6 border-medical-500 p-6 mb-8 rounded-r-lg">
        <h3 className="text-xl font-bold text-medical-800 mb-3 flex items-center gap-2">
          <Brain className="w-6 h-6" />
          Qu'est-ce que le SPT ?
        </h3>
        <p className="text-gray-700 leading-relaxed">
          <strong>Réaction psychologique et physiologique</strong> qui survient après un événement choquant 
          ou violent, et qui peut persister longtemps si elle n'est pas reconnue et prise en charge.
        </p>
        <div className="mt-4 bg-yellow-100 p-3 rounded border-l-4 border-yellow-500">
          <p className="text-sm text-yellow-800">
            <strong>⚠️ Important :</strong> Symptômes persistants au-delà d'1 mois et perturbant la vie quotidienne
          </p>
        </div>
      </div>

      {/* 4 Main Symptoms */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-center text-medical-800 mb-6">
          LES 4 GRANDS TYPES DE SYMPTÔMES
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Reviviscences */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-6 h-6 text-red-600" />
              <h4 className="font-bold text-red-800 text-lg">1. REVIVISCENCES</h4>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Quand :</strong> Déclenchées soudainement</p>
              <p><strong>Manifestations :</strong></p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Flashbacks vivaces</li>
                <li>Cauchemars récurrents</li>
                <li>Impression que l'événement se reproduit</li>
              </ul>
              <p><strong>Cause :</strong> L'hippocampe n'intègre pas le souvenir comme passé</p>
            </div>
          </div>

          {/* Évitement */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-6 h-6 text-orange-600" />
              <h4 className="font-bold text-orange-800 text-lg">2. ÉVITEMENT</h4>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Quand :</strong> Dès qu'une situation rappelle le trauma</p>
              <p><strong>Manifestations :</strong></p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Évitement des lieux</li>
                <li>Évitement des personnes</li>
                <li>Évitement des activités liées</li>
              </ul>
              <p><strong>Cause :</strong> Mécanisme de protection contre la détresse</p>
            </div>
          </div>

          {/* Hypervigilance */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
              <h4 className="font-bold text-yellow-800 text-lg">3. HYPERVIGILANCE</h4>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Quand :</strong> État permanent d'alerte, 24h/24</p>
              <p><strong>Manifestations :</strong></p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Sursauts exagérés</li>
                <li>Scanning constant de l'environnement</li>
                <li>Insomnie, irritabilité</li>
              </ul>
              <p><strong>Cause :</strong> L'amygdale reste activée en continu</p>
            </div>
          </div>

          {/* Altérations émotionnelles */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-6 h-6 text-blue-600" />
              <h4 className="font-bold text-blue-800 text-lg">4. ALTÉRATIONS ÉMOTIONNELLES</h4>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Quand :</strong> Changements persistants</p>
              <p><strong>Manifestations :</strong></p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Culpabilité excessive</li>
                <li>Détachement social</li>
                <li>Colères explosives</li>
              </ul>
              <p><strong>Cause :</strong> Dysfonctionnement du cortex préfrontal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Brain Mechanisms */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-center text-medical-800 mb-6">
          CERVEAU EN "MODE SURVIE"
        </h3>
        
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
          <div className="text-center mb-4">
            <div className="inline-block bg-red-100 p-4 rounded-full">
              <Brain className="w-12 h-12 text-red-600" />
            </div>
            <p className="mt-2 text-lg font-semibold text-red-800">
              Système d'alarme déréglé qui sonne en permanence
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded border">
              <h5 className="font-bold text-red-700 mb-2">🚨 "Radar à danger" déréglé</h5>
              <ul className="space-y-1 text-gray-700">
                <li>• Sursauts pour un rien</li>
                <li>• Scanning constant</li>
                <li>• Corps tendu en permanence</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border">
              <h5 className="font-bold text-blue-700 mb-2">�� "Machine à temps" cassée</h5>
              <ul className="space-y-1 text-gray-700">
                <li>• Passé revient comme présent</li>
                <li>• Confusion temporelle</li>
                <li>• Impossibilité de "ranger" le souvenir</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border">
              <h5 className="font-bold text-green-700 mb-2">🛡️ "Bouclier émotionnel" affaibli</h5>
              <ul className="space-y-1 text-gray-700">
                <li>• Émotions incontrôlables</li>
                <li>• Débordement facile</li>
                <li>• Perte de relativisation</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border">
              <h5 className="font-bold text-purple-700 mb-2">👥 "Mode social" coupé</h5>
              <ul className="space-y-1 text-gray-700">
                <li>• Fuite des situations sociales</li>
                <li>• Isolement protecteur</li>
                <li>• Incompréhension des autres</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Triggers */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-center text-medical-800 mb-6">
          PRINCIPAUX DÉCLENCHEURS
        </h3>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="grid grid-cols-5 gap-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-yellow-800 mb-2">SENSORIELS</div>
              <ul className="space-y-1 text-gray-700">
                <li>Sons</li>
                <li>Odeurs</li>
                <li>Textures</li>
                <li>Lumières</li>
              </ul>
            </div>
            <div className="text-center">
              <div className="font-bold text-yellow-800 mb-2">TEMPORELS</div>
              <ul className="space-y-1 text-gray-700">
                <li>Anniversaires</li>
                <li>Heures précises</li>
                <li>Saisons</li>
                <li>Dates</li>
              </ul>
            </div>
            <div className="text-center">
              <div className="font-bold text-yellow-800 mb-2">SITUATIONNELS</div>
              <ul className="space-y-1 text-gray-700">
                <li>Lieux similaires</li>
                <li>Foules</li>
                <li>Espaces confinés</li>
                <li>Hauteurs</li>
              </ul>
            </div>
            <div className="text-center">
              <div className="font-bold text-yellow-800 mb-2">ÉMOTIONNELS</div>
              <ul className="space-y-1 text-gray-700">
                <li>Stress</li>
                <li>Fatigue</li>
                <li>Disputes</li>
                <li>Impuissance</li>
              </ul>
            </div>
            <div className="text-center">
              <div className="font-bold text-yellow-800 mb-2">SOCIAUX</div>
              <ul className="space-y-1 text-gray-700">
                <li>Récits d'accidents</li>
                <li>Films violents</li>
                <li>Actualités</li>
                <li>Témoignages</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Key Message */}
      <div className="bg-medical-600 text-white rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold mb-3 flex items-center justify-center gap-2">
          <Heart className="w-6 h-6" />
          MESSAGE ESSENTIEL
        </h3>
        <p className="text-lg leading-relaxed">
          <strong>Le SPT n'est jamais lié à une faiblesse personnelle.</strong><br />
          C'est une réaction normale à un événement anormal.<br />
          Avec un accompagnement adapté, la récup��ration est possible.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t-2 border-gray-200 text-center text-sm text-gray-600">
        <p>Module 4 : Comprendre, reconnaître et accompagner le Stress Post-Traumatique</p>
      </div>
    </div>
  );
};

export default SPTInfographic;
