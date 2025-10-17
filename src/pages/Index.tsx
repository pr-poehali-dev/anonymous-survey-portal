import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const PAIRS = [
  {
    id: 1,
    question: 'Что вам больше нравится?',
    optionA: { label: 'Работать в команде', icon: 'Users' },
    optionB: { label: 'Работать самостоятельно', icon: 'User' }
  },
  {
    id: 2,
    question: 'Какой подход вы предпочитаете?',
    optionA: { label: 'Планирование заранее', icon: 'Calendar' },
    optionB: { label: 'Спонтанность', icon: 'Zap' }
  },
  {
    id: 3,
    question: 'Что для вас важнее?',
    optionA: { label: 'Логика и анализ', icon: 'Brain' },
    optionB: { label: 'Интуиция и чувства', icon: 'Heart' }
  },
  {
    id: 4,
    question: 'Как вы предпочитаете отдыхать?',
    optionA: { label: 'Активный отдых', icon: 'Mountain' },
    optionB: { label: 'Спокойный отдых', icon: 'Coffee' }
  },
  {
    id: 5,
    question: 'Что вам ближе?',
    optionA: { label: 'Стабильность', icon: 'Shield' },
    optionB: { label: 'Изменения и новизна', icon: 'Sparkles' }
  },
  {
    id: 6,
    question: 'Какой формат общения вы предпочитаете?',
    optionA: { label: 'Личные встречи', icon: 'MessageCircle' },
    optionB: { label: 'Переписка', icon: 'Mail' }
  }
];

type Answer = 'A' | 'B';

export default function Index() {
  const [currentView, setCurrentView] = useState<'start' | 'quiz' | 'results' | 'instructions'>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});

  const progress = ((currentQuestion + 1) / PAIRS.length) * 100;

  const handleAnswer = (answer: Answer) => {
    const questionId = PAIRS[currentQuestion].id;
    setAnswers({
      ...answers,
      [questionId]: answer
    });

    setTimeout(() => {
      if (currentQuestion < PAIRS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCurrentView('results');
      }
    }, 300);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setCurrentView('start');
  };

  const getResultStats = () => {
    let aCount = 0;
    let bCount = 0;
    Object.values(answers).forEach(answer => {
      if (answer === 'A') aCount++;
      else bCount++;
    });
    return { aCount, bCount };
  };

  if (currentView === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-3xl w-full p-8 md:p-12 animate-scale-in shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
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

          <div className="space-y-6 text-foreground/80">
            <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Info" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">О тесте</h3>
                <p>Этот попарный тест поможет определить ваши предпочтения и особенности личности через выбор между двумя вариантами.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Icon name="MousePointerClick" size={20} className="text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Как проходить</h3>
                <p>На каждый вопрос вам будет предложено два варианта. Выберите тот, который вам ближе. Отвечайте интуитивно, не задумываясь долго.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Icon name="Lock" size={20} className="text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Анонимность</h3>
                <p>Ваши ответы полностью анонимны. Результаты видны только вам.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Clock" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Время прохождения</h3>
                <p>Тест займет всего 1-2 минуты. Можно вернуться к предыдущему вопросу.</p>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => setCurrentView('start')} 
            className="w-full mt-8 h-14 text-lg font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all hover:scale-105"
          >
            Понятно
          </Button>
        </Card>
      </div>
    );
  }

  if (currentView === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 md:p-12 text-center animate-scale-in shadow-2xl">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-6 animate-pulse">
              <Icon name="Scale" size={40} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Попарный тест
            </h1>
            <p className="text-lg text-foreground/70">
              Узнайте больше о себе через простые выборы
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={() => setCurrentView('quiz')} 
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all hover:scale-105"
            >
              Начать тест
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            
            <Button 
              onClick={() => setCurrentView('instructions')} 
              variant="outline"
              className="w-full h-14 text-lg font-semibold border-2 hover:border-primary/50 hover:scale-105 transition-all"
            >
              <Icon name="BookOpen" size={20} className="mr-2" />
              Инструкция
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex items-center justify-center gap-6 text-sm text-foreground/60">
              <div className="flex items-center gap-2">
                <Icon name="Lock" size={16} />
                <span>Анонимно</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} />
                <span>1-2 минуты</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="List" size={16} />
                <span>{PAIRS.length} вопросов</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (currentView === 'results') {
    const { aCount, bCount } = getResultStats();
    const total = aCount + bCount;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-3xl w-full p-8 md:p-12 animate-scale-in shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-6 animate-pulse">
              <Icon name="Award" size={40} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Ваши результаты
            </h1>
            <p className="text-lg text-foreground/70">
              Спасибо за прохождение теста!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Тип А</h3>
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} className="text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-primary mb-2">{aCount}</div>
              <div className="text-sm text-foreground/60">
                {total > 0 ? Math.round((aCount / total) * 100) : 0}% ответов
              </div>
              <Progress value={total > 0 ? (aCount / total) * 100 : 0} className="mt-4 h-2" />
            </div>

            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Тип Б</h3>
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <Icon name="Sparkles" size={24} className="text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-secondary mb-2">{bCount}</div>
              <div className="text-sm text-foreground/60">
                {total > 0 ? Math.round((bCount / total) * 100) : 0}% ответов
              </div>
              <Progress value={total > 0 ? (bCount / total) * 100 : 0} className="mt-4 h-2" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="List" size={24} className="text-primary" />
              Ваши выборы
            </h2>
            <div className="space-y-3">
              {PAIRS.map((pair, index) => {
                const answer = answers[pair.id];
                const selectedOption = answer === 'A' ? pair.optionA : pair.optionB;
                return (
                  <div key={pair.id} className="flex items-center justify-between py-2 animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <span className="text-sm text-foreground/70">{pair.question}</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary rounded-full text-sm font-medium">
                      {selectedOption.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <Button 
            onClick={handleRestart} 
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all hover:scale-105"
          >
            <Icon name="RotateCcw" size={20} className="mr-2" />
            Пройти тест заново
          </Button>
        </Card>
      </div>
    );
  }

  const pair = PAIRS[currentQuestion];
  const currentAnswer = answers[pair.id];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full p-6 md:p-10 animate-fade-in shadow-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setCurrentView('start')}
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-transform"
              >
                <Icon name="Home" size={20} />
              </Button>
              <span className="text-sm font-medium text-foreground/60">
                Вопрос {currentQuestion + 1} из {PAIRS.length}
              </span>
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
          <Progress value={progress} className="h-2 mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-2">
            {pair.question}
          </h2>
          <p className="text-center text-foreground/60">Выберите один из вариантов</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div
            onClick={() => handleAnswer('A')}
            className={`
              group cursor-pointer rounded-2xl border-3 p-8 transition-all duration-300
              animate-slide-in-left hover:scale-105
              ${currentAnswer === 'A' 
                ? 'border-primary bg-gradient-to-br from-primary/20 to-secondary/10 shadow-xl' 
                : 'border-border bg-white hover:border-primary/50 hover:shadow-lg'
              }
            `}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className={`
                w-20 h-20 rounded-full flex items-center justify-center transition-all
                ${currentAnswer === 'A' 
                  ? 'bg-gradient-to-br from-primary to-secondary' 
                  : 'bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30'
                }
              `}>
                <Icon 
                  name={pair.optionA.icon as any} 
                  size={40} 
                  className={currentAnswer === 'A' ? 'text-white' : 'text-primary'} 
                />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {pair.optionA.label}
              </h3>
              {currentAnswer === 'A' && (
                <div className="mt-2 animate-scale-in">
                  <Icon name="CheckCircle2" size={24} className="text-primary" />
                </div>
              )}
            </div>
          </div>

          <div
            onClick={() => handleAnswer('B')}
            className={`
              group cursor-pointer rounded-2xl border-3 p-8 transition-all duration-300
              animate-slide-in-right hover:scale-105
              ${currentAnswer === 'B' 
                ? 'border-secondary bg-gradient-to-br from-secondary/20 to-accent/10 shadow-xl' 
                : 'border-border bg-white hover:border-secondary/50 hover:shadow-lg'
              }
            `}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className={`
                w-20 h-20 rounded-full flex items-center justify-center transition-all
                ${currentAnswer === 'B' 
                  ? 'bg-gradient-to-br from-secondary to-accent' 
                  : 'bg-gradient-to-br from-secondary/20 to-accent/20 group-hover:from-secondary/30 group-hover:to-accent/30'
                }
              `}>
                <Icon 
                  name={pair.optionB.icon as any} 
                  size={40} 
                  className={currentAnswer === 'B' ? 'text-white' : 'text-secondary'} 
                />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {pair.optionB.label}
              </h3>
              {currentAnswer === 'B' && (
                <div className="mt-2 animate-scale-in">
                  <Icon name="CheckCircle2" size={24} className="text-secondary" />
                </div>
              )}
            </div>
          </div>
        </div>

        {currentQuestion > 0 && (
          <div className="flex justify-center">
            <Button
              onClick={handlePrevious}
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
