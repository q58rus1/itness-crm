
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
    <main className="container" style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
      <h1 style={{ fontSize: '2rem', marginBottom: 24, textAlign: 'center' }}>Статистика</h1>
      <section style={{ marginBottom: 24, display: 'flex', gap: 12, justifyContent: 'center' }}>
  <StatisticsExportButtons stats={{ clients, sessions, packages, totalClients, totalSessions, totalRevenue }} />
      </section>
      <section style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#e0e7ff', borderRadius: 8, padding: 16, fontWeight: 500, fontSize: '1.1rem' }}>
            Всего клиентов: <span style={{ fontWeight: 700 }}>{totalClients}</span>
          </div>
          <div style={{ background: '#f3f4f6', borderRadius: 8, padding: 16, fontWeight: 500, fontSize: '1.1rem' }}>
            Завершенных тренировок: <span style={{ fontWeight: 700 }}>{totalSessions}</span>
          </div>
          <div style={{ background: '#d1fae5', borderRadius: 8, padding: 16, fontWeight: 500, fontSize: '1.1rem' }}>
            Доход (нетто): <span style={{ fontWeight: 700 }}>{totalRevenue.toFixed(2)} ₽</span>
          </div>
        </div>
      </section>
      {/* Дополнительные метрики, таблицы/карточки */}
    </main>
  );
};

export default Statistics;
