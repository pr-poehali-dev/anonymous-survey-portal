import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

const QUESTIONS = [
  {
    id: 1,
    question: 'Какие из следующих языков программирования вы используете?',
    options: ['JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust']
  },
  {
    id: 2,
    question: 'Какие фреймворки для фронтенда вам знакомы?',
    options: ['React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt']
  },
  {
    id: 3,
    question: 'Какие инструменты для работы с базами данных вы используете?',
    options: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch', 'Firebase']
  },
  {
    id: 4,
    question: 'Какие облачные сервисы вы применяете в своей работе?',
    options: ['AWS', 'Google Cloud', 'Azure', 'DigitalOcean', 'Heroku', 'Vercel']
  }
];

export default function Index() {
  const [currentView, setCurrentView] = useState<'start' | 'quiz' | 'results' | 'instructions'>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  const handleAnswerToggle = (option: string) => {
    const questionId = QUESTIONS[currentQuestion].id;
    const currentAnswers = answers[questionId] || [];
    
    if (currentAnswers.includes(option)) {
      setAnswers({
        ...answers,
        [questionId]: currentAnswers.filter(a => a !== option)
      });
    } else {
      setAnswers({
        ...answers,
        [questionId]: [...currentAnswers, option]
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentView('results');
    }
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

  const getTotalAnswers = () => {
    return Object.values(answers).reduce((sum, arr) => sum + arr.length, 0);
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
                <h3 className="font-semibold text-lg mb-2">О опросе</h3>
                <p>Этот опросник предназначен для сбора анонимной информации о ваших технических навыках и предпочтениях.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Icon name="CheckSquare" size={20} className="text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Как отвечать</h3>
                <p>Каждый вопрос предполагает множественный выбор. Вы можете выбрать несколько вариантов ответа, которые вам подходят.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Icon name="Lock" size={20} className="text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Анонимность</h3>
                <p>Ваши ответы полностью анонимны. Мы не собираем персональные данные и не отслеживаем участников опроса.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Clock" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Время прохождения</h3>
                <p>Опрос занимает примерно 2-3 минуты. Вы можете вернуться к предыдущим вопросам и изменить ответы.</p>
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
              <Icon name="ClipboardList" size={40} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Анонимный опросник
            </h1>
            <p className="text-lg text-foreground/70">
              Помогите нам лучше понять ваши технические навыки и предпочтения
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={() => setCurrentView('quiz')} 
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all hover:scale-105"
            >
              Начать опрос
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
                <span>2-3 минуты</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={16} />
                <span>{QUESTIONS.length} вопроса</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (currentView === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-3xl w-full p-8 md:p-12 animate-scale-in shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-6 animate-pulse">
              <Icon name="CheckCircle" size={40} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Спасибо за участие!
            </h1>
            <p className="text-lg text-foreground/70">
              Ваши ответы успешно записаны
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="BarChart3" size={24} className="text-primary" />
              Ваши результаты
            </h2>
            <div className="space-y-4">
              {QUESTIONS.map((question, index) => {
                const questionAnswers = answers[question.id] || [];
                return (
                  <div key={question.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <p className="font-medium mb-2 text-sm text-foreground/80">
                      {question.question}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {questionAnswers.length > 0 ? (
                        questionAnswers.map((answer) => (
                          <span
                            key={answer}
                            className="px-3 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary rounded-full text-sm font-medium"
                          >
                            {answer}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-foreground/50 italic">Не выбрано</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-r from-accent/10 to-secondary/10 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/70 mb-1">Всего выбрано вариантов</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {getTotalAnswers()}
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="TrendingUp" size={32} className="text-white" />
              </div>
            </div>
          </div>

          <Button 
            onClick={handleRestart} 
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all hover:scale-105"
          >
            <Icon name="RotateCcw" size={20} className="mr-2" />
            Пройти опрос заново
          </Button>
        </Card>
      </div>
    );
  }

  const question = QUESTIONS[currentQuestion];
  const currentAnswers = answers[question.id] || [];
  const canProceed = currentAnswers.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full p-6 md:p-10 animate-fade-in shadow-2xl">
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
                Вопрос {currentQuestion + 1} из {QUESTIONS.length}
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
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {question.question}
          </h2>
        </div>

        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => {
            const isSelected = currentAnswers.includes(option);
            return (
              <div
                key={option}
                onClick={() => handleAnswerToggle(option)}
                className={`
                  flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                  animate-fade-in hover:scale-[1.02]
                  ${isSelected 
                    ? 'border-primary bg-gradient-to-r from-primary/10 to-secondary/10 shadow-md' 
                    : 'border-border hover:border-primary/30 bg-white'
                  }
                `}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Checkbox 
                  checked={isSelected}
                  className="pointer-events-none"
                />
                <label className="flex-1 cursor-pointer font-medium text-foreground">
                  {option}
                </label>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          {currentQuestion > 0 && (
            <Button
              onClick={handlePrevious}
              variant="outline"
              className="flex-1 h-12 font-semibold border-2 hover:scale-105 transition-all"
            >
              <Icon name="ChevronLeft" size={20} className="mr-2" />
              Назад
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className={`flex-1 h-12 font-semibold transition-all ${
              currentQuestion === 0 ? 'w-full' : ''
            } ${
              canProceed 
                ? 'bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 hover:scale-105' 
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            {currentQuestion === QUESTIONS.length - 1 ? 'Завершить' : 'Далее'}
            <Icon name="ChevronRight" size={20} className="ml-2" />
          </Button>
        </div>

        {!canProceed && (
          <p className="text-center text-sm text-foreground/50 mt-4 animate-fade-in">
            Выберите хотя бы один вариант для продолжения
          </p>
        )}
      </Card>
    </div>
  );
}
