
import { LOCAL_STORAGE_KEYS } from '../localStorageKeys';
import { useLocalStorageQuery } from '../hooks/useLocalStorageQuery';
import StatCard from '../components/StatCard';

const Home: React.FC = () => {
  const { data: clients = [] } = useLocalStorageQuery(LOCAL_STORAGE_KEYS.clients, []);
  const { data: sessions = [] } = useLocalStorageQuery(LOCAL_STORAGE_KEYS.sessions, []);
  const activeClients = clients.filter((c: any) => c.packages?.some((p: any) => p.isActive && new Date(p.expiryDate) > new Date() && p.usedSessions < p.totalSessions)).length;
  const todaySessions = sessions.filter((s: any) => s.date === new Date().toISOString().slice(0, 10) && s.completed).length;

  const handleAddClient = () => {
    window.location.href = '/clients';
  };
  const handlePlanSession = () => {
    window.location.href = '/sessions';
  };
  const handleMarkSession = () => {
    window.location.href = '/sessions'; // Можно реализовать диалог выбора клиента и автоматическое списание
  };

  return (
    <div>
      <h1>Добро пожаловать!</h1>
      <div style={{ display: 'flex', gap: 16 }}>
        <StatCard title="Всего клиентов" value={clients.length} color="#4F46E5" />
        <StatCard title="Активных клиентов" value={activeClients} color="#10B981" />
        <StatCard title="Завершено сегодня" value={todaySessions} color="#F59E0B" />
      </div>
      <div style={{ margin: '24px 0', display: 'flex', gap: 12 }}>
        <button onClick={handleAddClient}>Добавить клиента</button>
        <button onClick={handlePlanSession}>Запланировать тренировку</button>
        <button onClick={handleMarkSession}>Списание тренировки</button>
      </div>
      {/* Список "Сегодня" */}
    </div>
  );
};

export default Home;
