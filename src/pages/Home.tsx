
import { LOCAL_STORAGE_KEYS } from '../localStorageKeys';
import { useLocalStorageQuery } from '../hooks/useLocalStorageQuery';
import StatCard from '../components/StatCard';
import { useNavigate } from 'react-router-dom';
import { Client } from '../types';

const Home: React.FC = () => {
  const { data: clients = [] } = useLocalStorageQuery<Client[]>(LOCAL_STORAGE_KEYS.clients, []);
  const { data: sessions = [] } = useLocalStorageQuery(LOCAL_STORAGE_KEYS.sessions, []);
  const activeClients = clients.filter((c: any) => c.packages?.some((p: any) => p.isActive && new Date(p.expiryDate) > new Date() && p.usedSessions < p.totalSessions)).length;
  const todaySessions = sessions.filter((s: any) => s.date === new Date().toISOString().slice(0, 10) && s.completed).length;

  const navigate = useNavigate();
  const handleAddClient = () => {
    navigate('/clients');
  };
  const handlePlanSession = () => {
    navigate('/sessions');
  };
  const handleMarkSession = () => {
    navigate('/sessions'); // Можно реализовать диалог выбора клиента и автоматическое списание
  };

  return (
    <main className="container" style={{ maxWidth: 480, margin: '0 auto', padding: 16 }}>
      <h1 style={{ fontSize: '2rem', marginBottom: 24, textAlign: 'center' }}>Fitness CRM</h1>
      <section style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 24 }}>
          <StatCard title="Всего клиентов" value={clients.length} color="#4F46E5" />
          <StatCard title="Активных клиентов" value={activeClients} color="#10B981" />
          <StatCard title="Завершено сегодня" value={todaySessions} color="#F59E0B" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button style={{ fontSize: '1.1rem', padding: '16px 0', fontWeight: 500 }} onClick={handleAddClient}>➕ Добавить клиента</button>
          <button style={{ fontSize: '1.1rem', padding: '16px 0', fontWeight: 500 }} onClick={handlePlanSession}>📅 Запланировать тренировку</button>
          <button style={{ fontSize: '1.1rem', padding: '16px 0', fontWeight: 500 }} onClick={handleMarkSession}>✔️ Списание тренировки</button>
        </div>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: 12 }}>Сегодня</h2>
        {todaySessions === 0 ? (
          <div style={{ color: '#888', textAlign: 'center' }}>Нет завершённых тренировок сегодня</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {sessions.filter((s: any) => s.date === new Date().toISOString().slice(0, 10) && s.completed).map((s: any) => {
              const client = clients.find((c: any) => c.id === s.clientId);
              return (
                <li key={s.id} style={{ background: '#f3f4f6', borderRadius: 8, marginBottom: 8, padding: 12 }}>
                  <strong>{client?.name || 'Клиент'}</strong><br />
                  Телефон: {client?.phone || '-'}<br />
                  Время: {s.time}<br />
                  Тип: {s.type}<br />
                  Пакет: {s.packageId}<br />
                  Заметки: {s.notes || '-'}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Home;
