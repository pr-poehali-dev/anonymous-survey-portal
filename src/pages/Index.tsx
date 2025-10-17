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

export default function Index() {
  const [currentView, setCurrentView] = useState<'start' | 'instructions' | 'ranking' | 'results'>('start');
  const [rankingType, setRankingType] = useState<RankingType>('value');
  const [valueRankings, setValueRankings] = useState<Record<number, number>>({});
  const [accessibilityRankings, setAccessibilityRankings] = useState<Record<number, number>>({});

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
      setCurrentView('results');
    }
  };

  const calculateResults = () => {
    const results = LIFE_SPHERES.map(sphere => {
      const value = valueRankings[sphere.id] || 0;
      const accessibility = accessibilityRankings[sphere.id] || 0;
      const difference = Math.abs(value - accessibility);
      return {
        sphere: sphere.name,
        value,
        accessibility,
        difference
      };
    });

    const totalDifference = results.reduce((sum, r) => sum + r.difference, 0);
    
    return { results, totalDifference };
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
              onClick={() => setCurrentView('instructions')} 
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
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Icon name="Lightbulb" size={20} className="text-accent" />
              Интерпретация результатов
            </h3>
            <div className="space-y-2 text-sm text-foreground/80">
              <p><span className="font-semibold">Индекс {satisfactionIndex >= 70 ? 'высокий' : satisfactionIndex >= 40 ? 'средний' : 'низкий'}:</span> {
                satisfactionIndex >= 70 ? 'Ваши ценности и возможности хорошо согласованы. Вы реализуете то, что для вас важно.' :
                satisfactionIndex >= 40 ? 'Есть определенное расхождение между желаемым и доступным. Рекомендуется работа над приоритетами.' :
                'Значительное расхождение между ценностями и возможностями может вызывать внутренний дискомфорт.'
              }</p>
              <p className="text-xs text-foreground/60 mt-4">
                <span className="font-semibold">Примечание:</span> Расхождение 0-2 балла — норма; 3-5 баллов — зона внимания; 6+ баллов — проблемная зона.
              </p>
            </div>
          </div>

          <Button 
            onClick={() => {
              setValueRankings({});
              setAccessibilityRankings({});
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
            {isValuePhase ? 'Перейти к оценке доступности' : 'Показать результаты'}
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
