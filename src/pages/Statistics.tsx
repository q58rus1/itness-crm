
import StatisticsExportButtons from '../components/StatisticsExportButtons';
import { LOCAL_STORAGE_KEYS } from '../localStorageKeys';
import { useLocalStorageQuery } from '../hooks/useLocalStorageQuery';

const Statistics: React.FC = () => {
  const { data: clients = [] } = useLocalStorageQuery(LOCAL_STORAGE_KEYS.clients, []);
  const { data: sessions = [] } = useLocalStorageQuery(LOCAL_STORAGE_KEYS.sessions, []);
  const { data: packages = [] } = useLocalStorageQuery(LOCAL_STORAGE_KEYS.packages, []);
  const { data: taxRate = 0 } = useLocalStorageQuery(LOCAL_STORAGE_KEYS.taxRate, 0);

  const totalClients = clients.length;
  const totalSessions = sessions.filter((s: any) => s.completed).length;
  const totalRevenue = sessions.filter((s: any) => s.completed).reduce((sum: number, s: any) => sum + (s.singlePrice || s.pricePerSession || 0), 0) * (1 - taxRate / 100);

  return (
    <div>
      <h1>Статистика</h1>
      <div>Всего клиентов: {totalClients}</div>
      <div>Всего завершенных тренировок: {totalSessions}</div>
      <div>Общий доход (нетто): {totalRevenue.toFixed(2)} ₽</div>
      {/* Дополнительные метрики, таблицы/карточки */}
    </div>
  );
};

export default Statistics;
