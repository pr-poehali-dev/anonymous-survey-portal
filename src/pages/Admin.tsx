import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface AnalyticsData {
  stats: {
    total_tests: number;
    avg_satisfaction: number;
    avg_difference: number;
    min_difference: number;
    max_difference: number;
  };
  distribution: Array<{
    level: string;
    count: number;
  }>;
  recent: Array<{
    id: number;
    total_difference: number;
    satisfaction_index: number;
    created_at: string;
  }>;
}

export default function Admin() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/fb88aae9-c5de-46d1-a1ff-dbd56ce9ca5e');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <Card className="p-8">
          <div className="flex items-center gap-3">
            <div className="animate-spin">
              <Icon name="Loader2" size={24} className="text-primary" />
            </div>
            <span className="text-lg">Загрузка аналитики...</span>
          </div>
        </Card>
      </div>
    );
  }

  const lowCount = data.distribution.find(d => d.level === 'low')?.count || 0;
  const mediumCount = data.distribution.find(d => d.level === 'medium')?.count || 0;
  const highCount = data.distribution.find(d => d.level === 'high')?.count || 0;
  const total = data.stats.total_tests || 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Панель аналитики
            </h1>
            <p className="text-foreground/60">Статистика по всем пройденным тестам</p>
          </div>
          <Button onClick={loadData} variant="outline" size="icon">
            <Icon name="RefreshCw" size={20} />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground/80">Всего тестов</h3>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Users" size={24} className="text-primary" />
              </div>
            </div>
            <div className="text-4xl font-bold text-primary">{data.stats.total_tests}</div>
          </Card>

          <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground/80">Средний индекс</h3>
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Icon name="TrendingUp" size={24} className="text-secondary" />
              </div>
            </div>
            <div className="text-4xl font-bold text-secondary">
              {data.stats.avg_satisfaction.toFixed(1)}%
            </div>
          </Card>

          <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground/80">Среднее расхождение</h3>
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Icon name="BarChart3" size={24} className="text-accent" />
              </div>
            </div>
            <div className="text-4xl font-bold text-accent">
              {data.stats.avg_difference.toFixed(1)}
            </div>
          </Card>
        </div>

        <Card className="p-8 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-2xl font-bold mb-6">Распределение по уровням дезинтеграции</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="font-semibold">Низкий (0-33)</span>
                </div>
                <span className="text-2xl font-bold text-green-600">{lowCount}</span>
              </div>
              <Progress value={(lowCount / total) * 100} className="h-3 bg-green-100" />
              <p className="text-sm text-foreground/60 mt-1">
                {((lowCount / total) * 100).toFixed(1)}% от всех тестов
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <span className="font-semibold">Средний (34-50)</span>
                </div>
                <span className="text-2xl font-bold text-yellow-600">{mediumCount}</span>
              </div>
              <Progress value={(mediumCount / total) * 100} className="h-3 bg-yellow-100" />
              <p className="text-sm text-foreground/60 mt-1">
                {((mediumCount / total) * 100).toFixed(1)}% от всех тестов
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span className="font-semibold">Высокий (51-72)</span>
                </div>
                <span className="text-2xl font-bold text-red-600">{highCount}</span>
              </div>
              <Progress value={(highCount / total) * 100} className="h-3 bg-red-100" />
              <p className="text-sm text-foreground/60 mt-1">
                {((highCount / total) * 100).toFixed(1)}% от всех тестов
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-purple-100/50 to-pink-100/50 rounded-xl">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-foreground/60">Минимальное расхождение:</span>
                <span className="ml-2 font-bold text-green-600">{data.stats.min_difference}</span>
              </div>
              <div>
                <span className="text-foreground/60">Максимальное расхождение:</span>
                <span className="ml-2 font-bold text-red-600">{data.stats.max_difference}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl font-bold mb-6">Последние 20 результатов</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-2">ID</th>
                  <th className="text-center py-3 px-2">Расхождение</th>
                  <th className="text-center py-3 px-2">Индекс</th>
                  <th className="text-center py-3 px-2">Уровень</th>
                  <th className="text-left py-3 px-2">Дата</th>
                </tr>
              </thead>
              <tbody>
                {data.recent.map((test, index) => {
                  const level = 
                    test.total_difference <= 33 ? 'low' :
                    test.total_difference <= 50 ? 'medium' : 'high';
                  
                  return (
                    <tr 
                      key={test.id} 
                      className="border-b border-border/30 hover:bg-muted/20 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 0.02}s` }}
                    >
                      <td className="py-3 px-2 font-mono text-foreground/60">#{test.id}</td>
                      <td className="text-center py-3 px-2 font-semibold">{test.total_difference}</td>
                      <td className="text-center py-3 px-2 font-semibold text-primary">
                        {test.satisfaction_index.toFixed(1)}%
                      </td>
                      <td className="text-center py-3 px-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          level === 'low' ? 'bg-green-100 text-green-700' :
                          level === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {level === 'low' ? 'Низкий' : level === 'medium' ? 'Средний' : 'Высокий'}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-foreground/60">
                        {new Date(test.created_at).toLocaleString('ru-RU')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
