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
        "Reviviscences, Évitement, Hypervigilance, Altérations émotionnelles",
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
                      Animation de 30 secondes : Deux collègues témoins d'un accident de voiture
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
                    <p className="text-gray-700">
                      "Shell shock", fatigue de combat. Les symptômes étaient reconnus mais mal compris, 
                      souvent attribués à la faiblesse ou au manque de courage.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg">1945-1980</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      Période de "névrose traumatique" avec une reconnaissance progressive des effets 
                      psychologiques durables des traumatismes, notamment chez les vétérans du Vietnam.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg">Depuis 1980</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">
                      Trouble officiellement reconnu : SPT. Critères diagnostiques précis, recherche 
                      scientifique avancée et développement de traitements spécialisés.
                    </p>
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
              <p className="text-lg text-gray-700 mb-6">
                Le SPT regroupe 4 grands types de symptômes :
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="relative bg-gradient-to-br from-medical-100 to-therapeutic-100 p-8 rounded-lg">
                    <div className="text-center mb-6">
                      <h4 className="text-xl font-semibold text-medical-800 mb-4">Zones de symptômes</h4>
                      <div className="relative mx-auto w-48 h-64 bg-medical-200 rounded-full">
                        {/* Head hotspot */}
                        <button 
                          className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-medical-500 rounded-full hover:bg-medical-600 transition-colors"
                          title="Reviviscences (flashbacks, cauchemars)"
                        >
                          <Brain className="w-4 h-4 text-white mx-auto" />
                        </button>
                        
                        {/* Chest hotspot */}
                        <button 
                          className="absolute top-20 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-therapeutic-500 rounded-full hover:bg-therapeutic-600 transition-colors"
                          title="Hypervigilance (sursauts, anxiété constante)"
                        >
                          <Heart className="w-4 h-4 text-white mx-auto" />
                        </button>
                        
                        {/* Eyes hotspot */}
                        <button 
                          className="absolute top-12 left-8 w-6 h-6 bg-wellness-500 rounded-full hover:bg-wellness-600 transition-colors"
                          title="Évitement (personnes, lieux, pensées)"
                        >
                          <Eye className="w-3 h-3 text-white mx-auto" />
                        </button>
                        
                        {/* Ears hotspot */}
                        <button 
                          className="absolute top-12 right-8 w-6 h-6 bg-wellness-500 rounded-full hover:bg-wellness-600 transition-colors"
                          title="Altérations émotionnelles et cognitives"
                        >
                          <Ear className="w-3 h-3 text-white mx-auto" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-medical-50 p-4 rounded-lg border border-medical-200">
                    <h5 className="font-semibold text-medical-800 mb-2">1. Reviviscences</h5>
                    <p className="text-sm text-gray-600">Flashbacks, cauchemars récurrents</p>
                  </div>
                  <div className="bg-therapeutic-50 p-4 rounded-lg border border-therapeutic-200">
                    <h5 className="font-semibold text-therapeutic-800 mb-2">2. Évitement</h5>
                    <p className="text-sm text-gray-600">Personnes, lieux, pensées liés au trauma</p>
                  </div>
                  <div className="bg-wellness-50 p-4 rounded-lg border border-wellness-200">
                    <h5 className="font-semibold text-wellness-800 mb-2">3. Hypervigilance</h5>
                    <p className="text-sm text-gray-600">Sursauts, anxiété constante, sommeil perturbé</p>
                  </div>
                  <div className="bg-medical-50 p-4 rounded-lg border border-medical-200">
                    <h5 className="font-semibold text-medical-800 mb-2">4. Altérations émotionnelles</h5>
                    <p className="text-sm text-gray-600">Culpabilité, isolement, colère</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h5 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                  ⚡ Déclencheurs possibles
                </h5>
                <p className="text-sm text-yellow-700">
                  Sons (sirènes, explosions), odeurs, anniversaires de l'événement, situations similaires
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
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="relative mx-auto w-48 h-32 bg-gradient-to-r from-medical-200 to-therapeutic-200 rounded-lg flex items-center justify-center">
                      <Brain className="w-16 h-16 text-medical-600" />
                      <div className="absolute top-2 left-4 w-4 h-4 bg-red-500 rounded-full animate-pulse" title="Amygdale hyperactive" />
                      <div className="absolute bottom-2 right-4 w-4 h-4 bg-blue-500 rounded-full opacity-50" title="Hippocampe dérégulé" />
                      <div className="absolute top-2 right-4 w-4 h-4 bg-green-500 rounded-full opacity-30" title="Cortex préfrontal affaibli" />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Schéma simplifié du cerveau</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Hyperactivité de l'amygdale (centre de la peur)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Mauvaise régulation par l'hippocampe (mémoire)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Production anormale de cortisol → boucle de stress</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="amygdale">
                      <AccordionTrigger className="text-lg">Amygdale</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">
                          Alarme trop sensible. L'amygdale reste en état d'hypervigilance constant, 
                          déclenchant des réactions de peur même en l'absence de danger réel.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="hippocampe">
                      <AccordionTrigger className="text-lg">Hippocampe</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">
                          Mémoire déréglée qui confond présent et passé. Les souvenirs traumatiques 
                          sont mal intégrés et resurviennent comme s'ils se reproduisaient.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="cortex">
                      <AccordionTrigger className="text-lg">Cortex préfrontal</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">
                          Baisse de contrôle rationnel. La capacité à analyser et contrôler 
                          les émotions est diminuée, rendant difficile la régulation des réactions.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
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
