import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Heart, 
  AlertCircle, 
  Download, 
  Phone, 
  FileText, 
  Play,
  CheckCircle2,
  XCircle,
  Eye,
  Ear,
  Clock,
  Shield,
  Users,
  Target
} from "lucide-react";

interface DragItem {
  id: string;
  text: string;
  category: 'normal' | 'spt';
}

export default function Index() {
  // Drag & Drop state
  const [dragItems] = useState<DragItem[]>([
    { id: '1', text: 'Tremblements', category: 'normal' },
    { id: '2', text: 'Cauchemars récurrents', category: 'spt' },
    { id: '3', text: 'Sursaut après un bruit', category: 'normal' },
    { id: '4', text: 'Reviviscences en boucle', category: 'spt' },
    { id: '5', text: 'Tristesse passagère', category: 'normal' },
    { id: '6', text: 'Évitement systématique', category: 'spt' }
  ]);
  
  const [droppedItems, setDroppedItems] = useState<{ normal: DragItem[], spt: DragItem[] }>({
    normal: [],
    spt: []
  });
  
  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(boolean | string)[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  const questions = [
    {
      question: "Le SPT est reconnu depuis la Première Guerre mondiale.",
      type: "boolean" as const,
      answer: false,
      explanation: "Faux - Le SPT est officiellement reconnu depuis 1980 dans le DSM-III."
    },
    {
      question: "Les cauchemars récurrents sont un symptôme du SPT.",
      type: "boolean" as const,
      answer: true,
      explanation: "Vrai - Les cauchemars récurrents font partie des reviviscences, symptôme clé du SPT."
    },
    {
      question: "L'hypervigilance est une réaction normale uniquement à court terme.",
      type: "boolean" as const,
      answer: false,
      explanation: "Faux - L'hypervigilance persistante est un symptôme du SPT quand elle dure plus d'un mois."
    },
    {
      question: "Quels sont les 4 grands types de symptômes du SPT ?",
      type: "multiple" as const,
      options: [
        "Reviviscences, ��vitement, Hypervigilance, Altérations émotionnelles",
        "Panique, Anxiété, Peur, Dépression",
        "Tristesse, Colère, Fatigue, Confusion",
        "Insomnie, Cauchemars, Stress, Isolement"
      ],
      answer: 0,
      explanation: "Correct - Les 4 grands types sont : Reviviscences, Évitement, Hypervigilance, et Altérations émotionnelles et cognitives."
    },
    {
      question: "Le SPT apparaît toujours immédiatement après l'événement.",
      type: "boolean" as const,
      answer: false,
      explanation: "Faux - Le SPT peut parfois apparaître avec un délai après l'événement traumatique."
    }
  ];

  const handleDrop = (item: DragItem, category: 'normal' | 'spt') => {
    setDroppedItems(prev => ({
      ...prev,
      [category]: [...prev[category], item]
    }));
  };

  const handleQuizAnswer = (answer: boolean | string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getQuizScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      const question = questions[index];
      const isCorrect = question.type === 'boolean' 
        ? answer === question.answer
        : answer === question.answer;
      return score + (isCorrect ? 1 : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-therapeutic-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-medical-600 to-therapeutic-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Le Stress Post-Traumatique (SPT)
            </h1>
            <p className="text-xl leading-relaxed">
              Module 4 : Comprendre, reconnaître et accompagner
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 space-y-16">
        
        {/* Bloc 1 - Introduction & accroche */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-4 h-4 bg-medical-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-medical-800">
              Quand le stress devient traumatisme
            </h2>
          </div>
          
          <Card className="p-8 border-medical-200 shadow-lg">
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-700">
                "Le stress post-traumatique n'est pas seulement du stress prolongé. C'est une réaction 
                psychologique et physiologique qui survient après un événement choquant ou violent, 
                et qui peut persister longtemps si elle n'est pas reconnue et prise en charge."
              </p>
              
              <div className="bg-medical-50 p-6 rounded-lg border border-medical-200">
                <div className="flex items-center gap-4">
                  <Play className="w-8 h-8 text-medical-600" />
                  <div>
                    <h4 className="font-semibold text-medical-800">Vidéo recommandée</h4>
                    <p className="text-sm text-gray-600">
                      Animation de 30 secondes : Deux collègues t��moins d'un accident de voiture
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Bloc 2 - Définition & historique */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-4 h-4 bg-medical-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-medical-800">
              De la guerre aux bureaux : l'évolution du SPT
            </h2>
          </div>
          
          <Card className="p-8 border-medical-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-medical-800">Qu'est-ce que le SPT ?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-medical-600" />
                  </div>
                  <p className="font-semibold">Trouble reconnu</p>
                  <p className="text-sm text-gray-600">depuis 1980 (DSM-III)</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-therapeutic-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-therapeutic-600" />
                  </div>
                  <p className="font-semibold">Anciennement</p>
                  <p className="text-sm text-gray-600">"névrose de guerre"</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-wellness-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-wellness-600" />
                  </div>
                  <p className="font-semibold">Défini par</p>
                  <p className="text-sm text-gray-600">DSM-5 et CIM-11</p>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg">Avant 1945</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        Durant la Première Guerre mondiale, les soldats présentant des symptômes de stress post-traumatique
                        étaient diagnostiqués avec le "Shell shock" (choc de l'obus) ou la "fatigue de combat".
                        Ces termes reflétaient une compréhension limitée du phénomène.
                      </p>
                      <p>
                        Les symptômes étaient souvent attribués à la lâcheté, au manque de courage moral, ou à une
                        faiblesse de caractère. Certains soldats étaient même fusillés pour "désertion" alors qu'ils
                        souffraient en réalité de troubles psychologiques sévères.
                      </p>
                      <p>
                        Les médecins militaires commençaient néanmoins à observer des patterns récurrents :
                        tremblements, cauchemars, mutisme, paralysies sans cause physique apparente.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg">1945-1980</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        Après la Seconde Guerre mondiale, le terme "névrose traumatique" remplace progressivement
                        le "shell shock". Les psychiatres commencent à comprendre que les traumatismes peuvent avoir
                        des effets psychologiques durables, indépendamment du courage ou de la moralité.
                      </p>
                      <p>
                        La guerre du Vietnam marque un tournant décisif. Des milliers de vétérans reviennent avec
                        des symptômes persistants : flashbacks, hypervigilance, évitement, colère incontrôlable.
                        Le terme "syndrome du Vietnam" émerge dans les années 1970.
                      </p>
                      <p>
                        Les associations d'anciens combattants se mobilisent pour faire reconnaître ces troubles.
                        Des études scientifiques commencent à documenter la prévalence et la persistance des symptômes,
                        préparant le terrain pour une reconnaissance officielle.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg">Depuis 1980</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        <strong>1980 :</strong> Le trouble de stress post-traumatique entre officiellement dans le DSM-III
                        (Manuel diagnostique et statistique des troubles mentaux). Pour la première fois, des critères
                        diagnostiques précis sont établis, définissant clairement les symptômes et leur durée.
                      </p>
                      <p>
                        <strong>Évolutions successives :</strong> Le DSM-IV (1994) puis le DSM-5 (2013) affinent les critères.
                        La classification internationale des maladies (CIM-11) de l'OMS intègre également le diagnostic.
                        Le SPT sort définitivement du domaine militaire pour être reconnu dans tous les contextes.
                      </p>
                      <p>
                        <strong>Avancées scientifiques :</strong> L'imagerie cérébrale révèle les mécanismes neurobiologiques.
                        Des traitements efficaces se développent : thérapies cognitivo-comportementales, EMDR,
                        thérapies d'exposition. La recherche explore aussi les facteurs de vulnérabilité et de résilience.
                      </p>
                      <p>
                        Aujourd'hui, le SPT est reconnu comme pouvant affecter toute personne exposée à un traumatisme :
                        accidents, agressions, catastrophes naturelles, violences domestiques, etc.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Bloc 3 - Réactions immédiates vs SPT */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-4 h-4 bg-medical-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-medical-800">
              Stress normal ou signal d'alarme ?
            </h2>
          </div>
          
          <Card className="p-8 border-medical-200 shadow-lg">
            <CardContent className="space-y-6">
              <p className="text-lg text-gray-700 mb-6">
                Face à un événement traumatique, plusieurs réactions sont possibles :
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-wellness-50 p-4 rounded-lg border border-wellness-200">
                  <h4 className="font-semibold text-wellness-800 mb-2">Panique</h4>
                  <p className="text-sm text-gray-600">Réaction immédiate, crise brève</p>
                </div>
                <div className="bg-therapeutic-50 p-4 rounded-lg border border-therapeutic-200">
                  <h4 className="font-semibold text-therapeutic-800 mb-2">Anxiété / Peur</h4>
                  <p className="text-sm text-gray-600">Normales dans les heures ou jours suivant</p>
                </div>
                <div className="bg-medical-50 p-4 rounded-lg border border-medical-200">
                  <h4 className="font-semibold text-medical-800 mb-2">SPT</h4>
                  <p className="text-sm text-gray-600">Symptômes persistants au-delà d'1 mois</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-4 text-center">Classez les réactions</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h5 className="font-medium text-wellness-700 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Réaction normale
                    </h5>
                    <div className="min-h-32 border-2 border-dashed border-wellness-300 rounded-lg p-3 bg-wellness-50">
                      {droppedItems.normal.map((item, index) => (
                        <Badge key={index} variant="outline" className="m-1">
                          {item.text}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-medium text-medical-700 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Symptôme SPT
                    </h5>
                    <div className="min-h-32 border-2 border-dashed border-medical-300 rounded-lg p-3 bg-medical-50">
                      {droppedItems.spt.map((item, index) => (
                        <Badge key={index} variant="outline" className="m-1">
                          {item.text}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <h6 className="font-medium">Éléments à classer :</h6>
                  <div className="flex flex-wrap gap-2">
                    {dragItems.filter(item => 
                      !droppedItems.normal.includes(item) && !droppedItems.spt.includes(item)
                    ).map((item) => (
                      <div key={item.id} className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDrop(item, 'normal')}
                          className="text-xs"
                        >
                          {item.text} → Normal
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDrop(item, 'spt')}
                          className="text-xs"
                        >
                          {item.text} → SPT
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Bloc 4 - Symptômes et déclencheurs */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-4 h-4 bg-medical-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-medical-800">
              Reconnaître les signes invisibles
            </h2>
          </div>
          
          <Card className="p-8 border-medical-200 shadow-lg">
            <CardContent className="space-y-6">
              <div className="space-y-4 mb-6">
                <p className="text-lg text-gray-700">
                  Le SPT regroupe 4 grands types de symptômes qui se manifestent de façon interconnectée :
                </p>
                <p className="text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <strong>Important :</strong> Ces symptômes apparaissent généralement dans les 30 jours suivant le trauma,
                  mais peuvent parfois surgir des mois plus tard. Ils persistent plus d'un mois et perturbent
                  significativement la vie quotidienne, professionnelle ou sociale.
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-medical-50 p-4 rounded-lg border border-medical-200">
                    <h5 className="font-semibold text-medical-800 mb-3">1. Reviviscences</h5>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p className="font-medium text-medical-700">Quand : Déclenchées soudainement par des stimuli rappelant le trauma</p>
                      <p><strong>Raison :</strong> L'hippocampe n'arrive pas à intégrer le souvenir traumatique comme un ��vénement passé</p>
                      <p><strong>Manifestations :</strong> Flashbacks vivaces, cauchemars récurrents, impression que l'événement se reproduit ici et maintenant</p>
                      <p className="text-xs text-gray-600">Ex : Une sirène déclenche le revécu complet d'un accident</p>
                    </div>
                  </div>
                  <div className="bg-therapeutic-50 p-4 rounded-lg border border-therapeutic-200">
                    <h5 className="font-semibold text-therapeutic-800 mb-3">2. Évitement</h5>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p className="font-medium text-therapeutic-700">Quand : Dès qu'une situation rappelle de près ou de loin le trauma</p>
                      <p><strong>Raison :</strong> Mécanisme de protection pour éviter la réactivation de la détresse</p>
                      <p><strong>Manifestations :</strong> Évitement des lieux, personnes, activités, conversations liées au trauma</p>
                      <p className="text-xs text-gray-600">Ex : Refuser de conduire après un accident de voiture</p>
                    </div>
                  </div>
                  <div className="bg-wellness-50 p-4 rounded-lg border border-wellness-200">
                    <h5 className="font-semibold text-wellness-800 mb-3">3. Hypervigilance</h5>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p className="font-medium text-wellness-700">Quand : État permanent d'alerte, 24h/24</p>
                      <p><strong>Raison :</strong> L'amygdale reste activée en continu, cherchant constamment le danger</p>
                      <p><strong>Manifestations :</strong> Sursauts exagérés, scanning constant de l'environnement, insomnie, irritabilité</p>
                      <p className="text-xs text-gray-600">Ex : Se retourner sans cesse dans la rue, analyser chaque bruit</p>
                    </div>
                  </div>
                  <div className="bg-medical-50 p-4 rounded-lg border border-medical-200">
                    <h5 className="font-semibold text-medical-800 mb-3">4. Altérations émotionnelles</h5>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p className="font-medium text-medical-700">Quand : Changements persistants dans l'humeur et les pensées</p>
                      <p><strong>Raison :</strong> Dysfonctionnement du cortex préfrontal, incapacité à réguler les émotions</p>
                      <p><strong>Manifestations :</strong> Culpabilité excessive, détachement social, colères explosives, anhédonie</p>
                      <p className="text-xs text-gray-600">Ex : "C'est de ma faute", perte d'intérêt pour les activités plaisantes</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h5 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                  ��� Principaux déclencheurs
                </h5>
                <div className="space-y-2 text-sm text-yellow-800">
                  <p><strong>Sensoriels :</strong> Sons (sirènes, explosions), odeurs spécifiques, textures, lumières</p>
                  <p><strong>Temporels :</strong> Anniversaires du trauma, heures précises, saisons</p>
                  <p><strong>Situationnels :</strong> Lieux similaires, foules, espaces confinés, hauteurs</p>
                  <p><strong>Émotionnels :</strong> Stress, fatigue, disputes, sentiment d'impuissance</p>
                  <p><strong>Sociaux :</strong> Récits d'accidents, films violents, actualités traumatisantes</p>
                </div>
                <p className="text-xs text-yellow-600 mt-3 italic">
                  Ces déclencheurs peuvent provoquer une réaction instantanée et disproportionnée,
                  comme si le danger était immédiat.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Bloc 5 - Mécanismes du SPT */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-4 h-4 bg-medical-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-medical-800">
              Votre cerveau en mode survie
            </h2>
          </div>
          
          <Card className="p-8 border-medical-200 shadow-lg">
            <CardContent className="space-y-8">

              {/* Introduction claire du concept */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border border-red-200">
                <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6" />
                  Que signifie "mode survie" ?
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Après un traumatisme, votre cerveau reste "bloqué" en mode urgence.
                  Imaginez une alarme qui ne s'arrête jamais : elle sonne même quand il n'y a pas de danger.
                </p>
              </div>

              {/* Analogie simple */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">Analogie simple :</h4>
                <p className="text-gray-700 mb-4">
                  <strong>Cerveau normal</strong> = Système de sécurité maison qui se déclenche quand un cambrioleur entre,
                  puis se calme une fois le danger passé.
                </p>
                <p className="text-gray-700">
                  <strong>Cerveau avec SPT</strong> = Système défaillant qui sonne sans arrêt, même pour un chat
                  qui passe dans le jardin. Il ne fait plus la différence entre danger réel et fausse alerte.
                </p>
              </div>

              {/* Ce que cela signifie concrètement */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-medical-800">Concrètement, cela veut dire :</h4>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-5 rounded-lg border border-red-200">
                    <h5 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      Votre « radar à danger » est déréglé
                    </h5>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Vous sursautez pour un rien</li>
                      <li>• Vous scannez constamment votre environnement</li>
                      <li>• Votre corps reste tendu, prêt à fuir ou combattre</li>
                      <li>• Vous ne vous sentez jamais vraiment en sécurité</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                    <h5 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Votre « machine à temps » est cassée
                    </h5>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Le passé traumatique revient comme s'il était présent</li>
                      <li>• Votre cerveau confond « c'était » et « c'est maintenant »</li>
                      <li>• Les flashbacks vous font revivre l'événement</li>
                      <li>• Vous ne pouvez pas « ranger » le souvenir au passé</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                    <h5 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Votre « bouclier émotionnel » est affaibli
                    </h5>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Difficulté à contrôler vos émotions</li>
                      <li>• Colères soudaines ou tristesse intense</li>
                      <li>• Sensation d'être débordé(e) facilement</li>
                      <li>• Perte de la capacité à « relativiser »</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
                    <h5 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Votre « mode social » est coupé
                    </h5>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Besoin de fuir les gens et les situations</li>
                      <li>• Impression que personne ne peut comprendre</li>
                      <li>• Évitement de tout ce qui rappelle le trauma</li>
                      <li>• Isolement pour se « protéger »</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Message d'espoir */}
              <div className="bg-medical-50 p-6 rounded-lg border border-medical-200">
                <h4 className="font-semibold text-medical-800 mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  La bonne nouvelle
                </h4>
                <p className="text-gray-700">
                  Ce "mode survie" n'est pas irréversible ! Avec un accompagnement adapté,
                  votre cerveau peut réapprendre à faire la différence entre danger réel et fausse alerte.
                  Les thérapies spécialisées aident à « réparer » ces mécanismes déréglés.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Bloc 6 - Quiz final */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-4 h-4 bg-medical-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-medical-800">
              Testez vos connaissances
            </h2>
          </div>
          
          <Card className="p-8 border-medical-200 shadow-lg">
            <CardContent className="space-y-6">
              {!showResults ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xl font-semibold">Question {currentQuestion + 1} / {questions.length}</h4>
                    <Progress value={(currentQuestion / questions.length) * 100} className="w-32" />
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-lg">{questions[currentQuestion].question}</p>
                    
                    {questions[currentQuestion].type === 'boolean' ? (
                      <div className="flex gap-4">
                        <Button 
                          onClick={() => handleQuizAnswer(true)}
                          className="flex-1"
                          variant="outline"
                        >
                          Vrai
                        </Button>
                        <Button 
                          onClick={() => handleQuizAnswer(false)}
                          className="flex-1"
                          variant="outline"
                        >
                          Faux
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {questions[currentQuestion].options?.map((option, index) => (
                          <Button
                            key={index}
                            onClick={() => handleQuizAnswer(index)}
                            variant="outline"
                            className="w-full text-left justify-start h-auto p-4"
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <h4 className="text-2xl font-bold mb-4">Résultats du quiz</h4>
                    <div className="text-4xl font-bold text-medical-600 mb-2">
                      {getQuizScore()} / {questions.length}
                    </div>
                    <p className="text-gray-600">
                      {getQuizScore() >= 4 ? "Excellente compréhension !" : 
                       getQuizScore() >= 3 ? "Bonne compréhension" : 
                       "Revoyez les concepts clés"}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {questions.map((question, index) => {
                      const userAnswer = userAnswers[index];
                      const isCorrect = question.type === 'boolean' 
                        ? userAnswer === question.answer
                        : userAnswer === question.answer;
                      
                      return (
                        <div key={index} className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                          <div className="flex items-start gap-3">
                            {isCorrect ? 
                              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" /> : 
                              <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                            }
                            <div className="flex-1">
                              <p className="font-medium mb-1">{question.question}</p>
                              <p className="text-sm text-gray-600">{question.explanation}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <Button 
                    onClick={() => {
                      setCurrentQuestion(0);
                      setUserAnswers([]);
                      setShowResults(false);
                    }}
                    className="w-full"
                  >
                    Recommencer le quiz
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Bloc 7 - Clôture & ressources */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-4 h-4 bg-medical-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-medical-800">
              Vers la guérison : ressources et espoir
            </h2>
          </div>
          
          <Card className="p-8 border-medical-200 shadow-lg">
            <CardContent className="space-y-8">
              <div className="text-center">
                <p className="text-xl text-gray-700 leading-relaxed">
                  "Le stress post-traumatique n'est pas une fatalité. Avec un repérage précoce, 
                  du soutien social et un accompagnement professionnel, il est possible de se rétablir."
                </p>
              </div>
              
              <Separator />
              
              <div className="grid md:grid-cols-2 gap-6">
                <Button size="lg" className="h-auto p-6 flex-col gap-3 bg-medical-600 hover:bg-medical-700">
                  <Download className="w-8 h-8" />
                  <div className="text-center">
                    <div className="font-semibold">Télécharger l'infographie</div>
                    <div className="text-sm opacity-90">SPT – Symptômes et mécanismes</div>
                  </div>
                </Button>
                
                <Button size="lg" variant="outline" className="h-auto p-6 flex-col gap-3 border-therapeutic-300 hover:bg-therapeutic-50">
                  <Phone className="w-8 h-8 text-therapeutic-600" />
                  <div className="text-center">
                    <div className="font-semibold text-therapeutic-800">Ressources d'aide</div>
                    <div className="text-sm text-gray-600">Cellule d'écoute & médecin du travail</div>
                  </div>
                </Button>
              </div>
              
              <div className="bg-gradient-to-r from-medical-50 to-therapeutic-50 p-6 rounded-lg border border-medical-200">
                <div className="text-center space-y-4">
                  <h4 className="font-semibold text-medical-800 flex items-center justify-center gap-2">
                    <Shield className="w-5 h-5" />
                    Numéros d'urgence psychologique
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-3 rounded border">
                      <p className="font-medium">SOS Amitié</p>
                      <p className="text-medical-600">09 72 39 40 50</p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="font-medium">Suicide Écoute</p>
                      <p className="text-medical-600">01 45 39 40 00</p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="font-medium">Urgences</p>
                      <p className="text-medical-600">15 ou 112</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
      
      {/* Footer */}
      <footer className="bg-medical-800 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8" />
            <h3 className="text-2xl font-bold">SPT Formation</h3>
          </div>
          <p className="text-medical-200">
            Module éducatif sur le stress post-traumatique - Formation continue en santé mentale
          </p>
        </div>
      </footer>
    </div>
  );
}
