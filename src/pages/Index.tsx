import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LIFE_SPHERES = [
  { id: 1, name: 'Активная, деятельная жизнь' },
  { id: 2, name: 'Здоровье (физическое и психологическое)' },
  { id: 3, name: 'Интересная работа' },
  { id: 4, name: 'Красота природы и искусства (переживание прекрасного)' },
  { id: 5, name: 'Любовь' },
  { id: 6, name: 'Материально обеспеченная жизнь' },
  { id: 7, name: 'Наличие хороших и верных друзей' },
  { id: 8, name: 'Уверенность в себе (свобода от внутренних противоречий, сомнений)' },
  { id: 9, name: 'Познание (возможность расширения своего образования)' },
  { id: 10, name: 'Свобода как независимость в поступках и действиях' },
  { id: 11, name: 'Счастливая семейная жизнь' },
  { id: 12, name: 'Творчество (возможность творческой деятельности)' }
];

type RankingType = 'value' | 'accessibility';

type ComparisonPair = {
  id: number;
  sphere1: number;
  sphere2: number;
};

const COMPARISON_PAIRS: ComparisonPair[] = [
  { id: 1, sphere1: 1, sphere2: 2 },
  { id: 2, sphere1: 1, sphere2: 3 },
  { id: 3, sphere1: 1, sphere2: 4 },
  { id: 4, sphere1: 1, sphere2: 5 },
  { id: 5, sphere1: 1, sphere2: 6 },
  { id: 6, sphere1: 1, sphere2: 7 },
  { id: 7, sphere1: 1, sphere2: 8 },
  { id: 8, sphere1: 1, sphere2: 9 },
  { id: 9, sphere1: 1, sphere2: 10 },
  { id: 10, sphere1: 1, sphere2: 11 },
  { id: 11, sphere1: 1, sphere2: 12 },
  { id: 12, sphere1: 2, sphere2: 3 },
  { id: 13, sphere1: 2, sphere2: 4 },
  { id: 14, sphere1: 2, sphere2: 5 },
  { id: 15, sphere1: 2, sphere2: 6 },
  { id: 16, sphere1: 2, sphere2: 7 },
  { id: 17, sphere1: 2, sphere2: 8 },
  { id: 18, sphere1: 2, sphere2: 9 },
  { id: 19, sphere1: 2, sphere2: 10 },
  { id: 20, sphere1: 2, sphere2: 11 },
  { id: 21, sphere1: 2, sphere2: 12 },
  { id: 22, sphere1: 3, sphere2: 4 },
  { id: 23, sphere1: 3, sphere2: 5 },
  { id: 24, sphere1: 3, sphere2: 6 },
  { id: 25, sphere1: 3, sphere2: 7 },
  { id: 26, sphere1: 3, sphere2: 8 },
  { id: 27, sphere1: 3, sphere2: 9 },
  { id: 28, sphere1: 3, sphere2: 10 },
  { id: 29, sphere1: 3, sphere2: 11 },
  { id: 30, sphere1: 3, sphere2: 12 },
  { id: 31, sphere1: 4, sphere2: 5 },
  { id: 32, sphere1: 4, sphere2: 6 },
  { id: 33, sphere1: 4, sphere2: 7 },
  { id: 34, sphere1: 4, sphere2: 8 },
  { id: 35, sphere1: 4, sphere2: 9 },
  { id: 36, sphere1: 4, sphere2: 10 },
  { id: 37, sphere1: 4, sphere2: 11 },
  { id: 38, sphere1: 4, sphere2: 12 },
  { id: 39, sphere1: 5, sphere2: 6 },
  { id: 40, sphere1: 5, sphere2: 7 },
  { id: 41, sphere1: 5, sphere2: 8 },
  { id: 42, sphere1: 5, sphere2: 9 },
  { id: 43, sphere1: 5, sphere2: 10 },
  { id: 44, sphere1: 5, sphere2: 11 },
  { id: 45, sphere1: 5, sphere2: 12 },
  { id: 46, sphere1: 6, sphere2: 7 },
  { id: 47, sphere1: 6, sphere2: 8 },
  { id: 48, sphere1: 6, sphere2: 9 },
  { id: 49, sphere1: 6, sphere2: 10 },
  { id: 50, sphere1: 6, sphere2: 11 },
  { id: 51, sphere1: 6, sphere2: 12 },
  { id: 52, sphere1: 7, sphere2: 8 },
  { id: 53, sphere1: 7, sphere2: 9 },
  { id: 54, sphere1: 7, sphere2: 10 },
  { id: 55, sphere1: 7, sphere2: 11 },
  { id: 56, sphere1: 7, sphere2: 12 },
  { id: 57, sphere1: 8, sphere2: 9 },
  { id: 58, sphere1: 8, sphere2: 10 },
  { id: 59, sphere1: 8, sphere2: 11 },
  { id: 60, sphere1: 8, sphere2: 12 },
  { id: 61, sphere1: 9, sphere2: 10 },
  { id: 62, sphere1: 9, sphere2: 11 },
  { id: 63, sphere1: 9, sphere2: 12 },
  { id: 64, sphere1: 10, sphere2: 11 },
  { id: 65, sphere1: 10, sphere2: 12 },
  { id: 66, sphere1: 11, sphere2: 12 }
];

export default function Index() {
  const [currentView, setCurrentView] = useState<'start' | 'course' | 'instructions' | 'ranking' | 'comparison' | 'results'>('start');
  const [courseYear, setCourseYear] = useState<string>('');
  const [rankingType, setRankingType] = useState<RankingType>('value');
  const [valueRankings, setValueRankings] = useState<Record<number, number>>({});
  const [accessibilityRankings, setAccessibilityRankings] = useState<Record<number, number>>({});
  const [currentComparisonIndex, setCurrentComparisonIndex] = useState(0);
  const [comparisonChoices, setComparisonChoices] = useState<Record<number, number>>({});

  const currentRankings = rankingType === 'value' ? valueRankings : accessibilityRankings;
  const setCurrentRankings = rankingType === 'value' ? setValueRankings : setAccessibilityRankings;

  const handleRankingChange = (sphereId: number, rank: string) => {
    setCurrentRankings({
      ...currentRankings,
      [sphereId]: parseInt(rank)
    });
  };

  const canProceed = () => {
    const rankings = Object.values(currentRankings);
    if (rankings.length !== 12) return false;
    
    const uniqueRankings = new Set(rankings);
    return uniqueRankings.size === 12 && rankings.every(r => r >= 1 && r <= 12);
  };

  const handleContinue = () => {
    if (rankingType === 'value') {
      setRankingType('accessibility');
      setCurrentView('ranking');
    } else {
      setCurrentView('comparison');
      setCurrentComparisonIndex(0);
    }
  };

  const handleComparisonChoice = (chosenSphereId: number) => {
    const currentPair = COMPARISON_PAIRS[currentComparisonIndex];
    const updatedChoices = {
      ...comparisonChoices,
      [currentPair.id]: chosenSphereId
    };
    setComparisonChoices(updatedChoices);

    if (currentComparisonIndex < COMPARISON_PAIRS.length - 1) {
      setCurrentComparisonIndex(currentComparisonIndex + 1);
    } else {
      setCurrentView('results');
      saveResults();
    }
  };

  const handleComparisonPrevious = () => {
    if (currentComparisonIndex > 0) {
      setCurrentComparisonIndex(currentComparisonIndex - 1);
    }
  };

  const calculateResults = () => {
    const results = LIFE_SPHERES.map(sphere => {
      const value = valueRankings[sphere.id] || 0;
      const accessibility = accessibilityRankings[sphere.id] || 0;
      const difference = Math.abs(value - accessibility);
      return {
        sphere: sphere.name,
        sphereId: sphere.id,
        value,
        accessibility,
        difference
      };
    });

    const totalDifference = results.reduce((sum, r) => sum + r.difference, 0);
    
    return { results, totalDifference };
  };

  const saveResults = async () => {
    const { totalDifference } = calculateResults();
    const maxPossibleDifference = 66;
    const satisfactionIndex = Math.max(0, 100 - (totalDifference / maxPossibleDifference) * 100);

    try {
      const response = await fetch('https://functions.poehali.dev/2f114e68-4d9f-41c1-b82b-62a01fc8f046', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          valueRankings,
          accessibilityRankings,
          comparisonChoices,
          totalDifference,
          satisfactionIndex,
          courseYear
        })
      });
      
      if (!response.ok) {
        console.error('Failed to save results');
      }
    } catch (error) {
      console.error('Error saving results:', error);
    }
  };

  if (currentView === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full p-8 md:p-12 animate-scale-in shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Инструкция
            </h1>
            <Button 
              onClick={() => setCurrentView('start')}
              variant="ghost"
              size="icon"
              className="hover:scale-110 transition-transform"
            >
              <Icon name="X" size={24} />
            </Button>
          </div>

          <div className="space-y-6 text-foreground/80 text-base">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6">
              <p className="leading-relaxed">
                Вам предлагаются <span className="font-semibold">12 жизненных ценностей</span>. Вы должны дважды произвести попарное сравнение (попарное ранжирование):
              </p>
              <ul className="mt-4 space-y-2 ml-4">
                <li className="flex gap-2">
                  <span className="text-primary font-semibold">1.</span>
                  <span>Первый раз — по <span className="font-semibold text-primary">ценности (важности)</span></span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary font-semibold">2.</span>
                  <span>Второй раз — по <span className="font-semibold text-secondary">доступности (возможности)</span></span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="ArrowUpDown" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Как ранжировать</h3>
                  <p>Присвойте каждой ценности номер от 1 до 12, где <span className="font-semibold">1 — самая важная/доступная</span>, а <span className="font-semibold">12 — наименее важная/доступная</span>.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Icon name="AlertCircle" size={20} className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Важно</h3>
                  <p>Каждый номер должен быть использован только один раз. Нельзя присваивать одинаковые ранги разным ценностям.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Icon name="Target" size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Цель теста</h3>
                  <p>Методика позволяет определить степень рассогласования между тем, что вы цените, и тем, что реально доступно в вашей жизни.</p>
                </div>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => {
              setRankingType('value');
              setCurrentView('ranking');
            }} 
            className="w-full mt-8 h-14 text-lg font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all hover:scale-105"
          >
            Начать тестирование
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </Card>
      </div>
    );
  }

  if (currentView === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <div className="absolute top-4 right-4">
          <Button 
            onClick={() => window.location.href = '/admin'}
            variant="outline"
            className="gap-2"
          >
            <Icon name="BarChart3" size={16} />
            Аналитика
          </Button>
        </div>
        
        <Card className="max-w-3xl w-full p-8 md:p-12 text-center animate-scale-in shadow-2xl">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-6 animate-pulse">
              <Icon name="Scale" size={40} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Тест: Ценность и Доступность
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Уровень соотношения ценности и доступности в различных жизненных сферах
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={() => setCurrentView('course')} 
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all hover:scale-105"
            >
              Начать тест
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex items-center justify-center gap-6 text-sm text-foreground/60">
              <div className="flex items-center gap-2">
                <Icon name="List" size={16} />
                <span>12 ценностей</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} />
                <span>5-7 минут</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="BarChart3" size={16} />
                <span>Детальный анализ</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (currentView === 'course') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 md:p-12 text-center animate-scale-in shadow-2xl">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-6">
              <Icon name="GraduationCap" size={40} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              На каком вы курсе?
            </h1>
            <p className="text-lg text-foreground/70">
              Укажите ваш текущий курс обучения
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {['1 курс', '2 курс', '3 курс', '4 курс'].map((course) => (
              <Button
                key={course}
                onClick={() => {
                  setCourseYear(course);
                  setCurrentView('instructions');
                }}
                variant={courseYear === course ? 'default' : 'outline'}
                className="h-20 text-xl font-semibold hover:scale-105 transition-all"
              >
                {course}
              </Button>
            ))}
          </div>

          <Button
            onClick={() => setCurrentView('start')}
            variant="ghost"
            className="gap-2"
          >
            <Icon name="ArrowLeft" size={16} />
            Назад
          </Button>
        </Card>
      </div>
    );
  }

  if (currentView === 'results') {
    const { results, totalDifference } = calculateResults();
    const maxPossibleDifference = 66;
    const satisfactionIndex = Math.max(0, 100 - (totalDifference / maxPossibleDifference) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-5xl w-full p-8 md:p-12 animate-scale-in shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-6 animate-pulse">
              <Icon name="Award" size={40} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Результаты теста
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Icon name="TrendingUp" size={20} className="text-primary" />
                Индекс удовлетворенности
              </h3>
              <div className="text-5xl font-bold text-primary mb-2">
                {satisfactionIndex.toFixed(0)}%
              </div>
              <Progress value={satisfactionIndex} className="h-3" />
            </div>

            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Icon name="AlertTriangle" size={20} className="text-secondary" />
                Общее расхождение
              </h3>
              <div className="text-5xl font-bold text-secondary mb-2">
                {totalDifference}
              </div>
              <p className="text-sm text-foreground/60">баллов из {maxPossibleDifference} максимальных</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-6 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">Детальная таблица</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-2">Жизненная сфера</th>
                  <th className="text-center py-3 px-2 text-primary">Ценность</th>
                  <th className="text-center py-3 px-2 text-secondary">Доступность</th>
                  <th className="text-center py-3 px-2 text-accent">Расхождение</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-2 text-foreground/80">{result.sphere}</td>
                    <td className="text-center py-3 px-2 font-semibold text-primary">{result.value}</td>
                    <td className="text-center py-3 px-2 font-semibold text-secondary">{result.accessibility}</td>
                    <td className="text-center py-3 px-2">
                      <span className={`px-3 py-1 rounded-full font-semibold ${
                        result.difference === 0 ? 'bg-green-100 text-green-700' :
                        result.difference <= 2 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {result.difference}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-purple-100/50 to-pink-100/50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Icon name="Lightbulb" size={20} className="text-accent" />
              Обработка результатов и интерпретация
            </h3>
            <div className="space-y-4 text-sm text-foreground/80">
              <div className="bg-white/50 rounded-lg p-4">
                <p className="font-semibold mb-2">Подсчет расхождений:</p>
                <p className="text-xs leading-relaxed">
                  Для каждой из 12 ценностей подсчитано, сколько раз она была выбрана по «ценности» (Ц) и сколько раз по «доступности» (Д). 
                  Затем все ценности и доступности ранжируются отдельно друг от друга. После этого происходит сравнение рангов Ц и Д 
                  и определяются величины расхождений между каждой Ц и Д.
                </p>
              </div>

              <div className="bg-white/50 rounded-lg p-4">
                <p className="font-semibold mb-2">Интегральный показатель методики:</p>
                <p className="mb-2">Сумма расхождений по модулю всех 12 понятий: <span className="font-bold text-primary">{totalDifference}</span></p>
              </div>

              <div className="bg-white/50 rounded-lg p-4">
                <p className="font-semibold mb-3">Уровень дезинтеграции в мотивационно-личностной сфере:</p>
                <div className="space-y-2">
                  <div className={`p-3 rounded-lg ${totalDifference >= 0 && totalDifference <= 33 ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50'}`}>
                    <p className="font-semibold">От 0 до НОРМЫ (33 у мужчин, 37 у женщин)</p>
                    <p className="text-xs mt-1">Низкий уровень дезинтеграции — хорошая согласованность ценностей и возможностей</p>
                  </div>
                  <div className={`p-3 rounded-lg ${totalDifference > 33 && totalDifference <= 50 ? 'bg-yellow-100 border-2 border-yellow-500' : 'bg-gray-50'}`}>
                    <p className="font-semibold">От НОРМЫ до 50</p>
                    <p className="text-xs mt-1">Средний уровень дезинтеграции — умеренное расхождение</p>
                  </div>
                  <div className={`p-3 rounded-lg ${totalDifference > 50 ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-50'}`}>
                    <p className="font-semibold">От 50 до 72</p>
                    <p className="text-xs mt-1">Высокий уровень дезинтеграции — значительный внутриличностный конфликт</p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 rounded-lg p-4 border-l-4 border-accent">
                <p className="text-sm">
                  <span className="font-semibold">Вывод:</span> Чем больше сумма расхождений между Ц и Д, тем больше выражен 
                  <span className="font-semibold text-accent"> внутриличностный конфликт</span>, обусловленный вследствие неудовлетворения жизненных ценностей.
                </p>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => {
              setValueRankings({});
              setAccessibilityRankings({});
              setComparisonChoices({});
              setCurrentComparisonIndex(0);
              setCurrentView('start');
            }} 
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all hover:scale-105"
          >
            <Icon name="RotateCcw" size={20} className="mr-2" />
            Пройти тест заново
          </Button>
        </Card>
      </div>
    );
  }

  if (currentView === 'comparison') {
    const currentPair = COMPARISON_PAIRS[currentComparisonIndex];
    const sphere1 = LIFE_SPHERES.find(s => s.id === currentPair.sphere1);
    const sphere2 = LIFE_SPHERES.find(s => s.id === currentPair.sphere2);
    const progress = ((currentComparisonIndex + 1) / COMPARISON_PAIRS.length) * 100;
    const currentChoice = comparisonChoices[currentPair.id];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full p-6 md:p-10 animate-fade-in shadow-2xl">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <Button
                onClick={() => setCurrentView('start')}
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-transform"
              >
                <Icon name="Home" size={20} />
              </Button>
              <div className="flex-1 text-center">
                <h2 className="text-xl md:text-2xl font-bold text-accent">
                  Матрица 2: Сравнительные понятия
                </h2>
                <p className="text-sm text-foreground/60 mt-1">
                  Выберите более важную ценность для вас
                </p>
              </div>
              <div className="w-10" />
            </div>
            
            <Progress value={progress} className="h-2 mb-4" />
            <p className="text-center text-sm text-foreground/60">
              Пара {currentComparisonIndex + 1} из {COMPARISON_PAIRS.length}
            </p>
          </div>

          <div className="mb-8">
            <p className="text-center text-lg text-foreground/80 mb-6">
              Что для вас <span className="font-semibold text-primary">более значимо</span>?
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div
                onClick={() => handleComparisonChoice(currentPair.sphere1)}
                className={`
                  group cursor-pointer rounded-2xl border-3 p-6 transition-all duration-300
                  hover:scale-105
                  ${currentChoice === currentPair.sphere1
                    ? 'border-primary bg-gradient-to-br from-primary/20 to-secondary/10 shadow-xl' 
                    : 'border-border bg-white hover:border-primary/50 hover:shadow-lg'
                  }
                `}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{currentPair.sphere1}</span>
                    {currentChoice === currentPair.sphere1 && (
                      <Icon name="CheckCircle2" size={24} className="text-primary animate-scale-in" />
                    )}
                  </div>
                  <p className="text-foreground font-medium leading-relaxed">
                    {sphere1?.name}
                  </p>
                </div>
              </div>

              <div
                onClick={() => handleComparisonChoice(currentPair.sphere2)}
                className={`
                  group cursor-pointer rounded-2xl border-3 p-6 transition-all duration-300
                  hover:scale-105
                  ${currentChoice === currentPair.sphere2
                    ? 'border-secondary bg-gradient-to-br from-secondary/20 to-accent/10 shadow-xl' 
                    : 'border-border bg-white hover:border-secondary/50 hover:shadow-lg'
                  }
                `}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-secondary">{currentPair.sphere2}</span>
                    {currentChoice === currentPair.sphere2 && (
                      <Icon name="CheckCircle2" size={24} className="text-secondary animate-scale-in" />
                    )}
                  </div>
                  <p className="text-foreground font-medium leading-relaxed">
                    {sphere2?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {currentComparisonIndex > 0 && (
            <div className="flex justify-center">
              <Button
                onClick={handleComparisonPrevious}
                variant="outline"
                className="px-8 h-12 font-semibold border-2 hover:scale-105 transition-all"
              >
                <Icon name="ChevronLeft" size={20} className="mr-2" />
                Назад
              </Button>
            </div>
          )}
        </Card>
      </div>
    );
  }

  const isValuePhase = rankingType === 'value';
  const usedRanks = new Set(Object.values(currentRankings));
  const availableRanks = Array.from({ length: 12 }, (_, i) => i + 1).filter(r => !usedRanks.has(r));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="max-w-5xl w-full p-6 md:p-10 animate-fade-in shadow-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button
              onClick={() => setCurrentView('start')}
              variant="ghost"
              size="icon"
              className="hover:scale-110 transition-transform"
            >
              <Icon name="Home" size={20} />
            </Button>
            <div className="flex-1 text-center">
              <h2 className={`text-xl md:text-2xl font-bold ${isValuePhase ? 'text-primary' : 'text-secondary'}`}>
                {isValuePhase ? 'Этап 1: Ранжирование по ЦЕННОСТИ' : 'Этап 2: Ранжирование по ДОСТУПНОСТИ'}
              </h2>
              <p className="text-sm text-foreground/60 mt-1">
                {isValuePhase ? 'Оцените важность каждой сферы для вас' : 'Оцените доступность каждой сферы в вашей жизни'}
              </p>
            </div>
            <Button
              onClick={() => setCurrentView('instructions')}
              variant="ghost"
              size="icon"
              className="hover:scale-110 transition-transform"
            >
              <Icon name="HelpCircle" size={20} />
            </Button>
          </div>
          
          <Progress value={(Object.keys(currentRankings).length / 12) * 100} className="h-2" />
          <p className="text-center text-sm text-foreground/60 mt-2">
            Заполнено: {Object.keys(currentRankings).length} из 12
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 md:p-6 mb-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-3 px-2 text-sm font-semibold">№</th>
                <th className="text-left py-3 px-2 text-sm font-semibold">Жизненная ценность</th>
                <th className="text-center py-3 px-2 text-sm font-semibold w-32">Ранг (1-12)</th>
              </tr>
            </thead>
            <tbody>
              {LIFE_SPHERES.map((sphere, index) => (
                <tr 
                  key={sphere.id} 
                  className="border-b border-border/30 hover:bg-muted/20 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <td className="py-3 px-2 text-foreground/60 font-medium">{sphere.id}</td>
                  <td className="py-3 px-2 text-foreground">{sphere.name}</td>
                  <td className="py-3 px-2">
                    <Select
                      value={currentRankings[sphere.id]?.toString() || ''}
                      onValueChange={(value) => handleRankingChange(sphere.id, value)}
                    >
                      <SelectTrigger className={`w-full ${currentRankings[sphere.id] ? 'border-primary' : ''}`}>
                        <SelectValue placeholder="—" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentRankings[sphere.id] && (
                          <SelectItem value={currentRankings[sphere.id].toString()}>
                            {currentRankings[sphere.id]}
                          </SelectItem>
                        )}
                        {availableRanks.map(rank => (
                          <SelectItem key={rank} value={rank.toString()}>
                            {rank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={handleContinue}
            disabled={!canProceed()}
            className={`flex-1 h-14 text-lg font-semibold transition-all ${
              canProceed()
                ? 'bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 hover:scale-105'
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            {isValuePhase ? 'Перейти к оценке доступности' : 'Перейти к сравнениям'}
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>

        {!canProceed() && (
          <p className="text-center text-sm text-foreground/50 mt-4">
            {Object.keys(currentRankings).length < 12 
              ? `Заполните все поля (осталось: ${12 - Object.keys(currentRankings).length})`
              : 'Проверьте, что все ранги от 1 до 12 использованы по одному разу'
            }
          </p>
        )}
      </Card>
    </div>
  );
}