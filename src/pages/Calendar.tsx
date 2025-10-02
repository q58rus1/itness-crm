import CalendarExportButtons from '../components/CalendarExportButtons';
import { useLocalStorageQuery } from '../hooks/useLocalStorageQuery';
import { LOCAL_STORAGE_KEYS } from '../localStorageKeys';

const Calendar: React.FC = () => {
  const { data: sessions = [] } = useLocalStorageQuery(LOCAL_STORAGE_KEYS.sessions, []);
  // Группировка по дате
  const grouped = sessions.reduce((acc: any, s: any) => {
    const date = s.date;
    acc[date] = acc[date] || [];
    acc[date].push(s);
    return acc;
  }, {});

  return (
    <main className="container" style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
      <h1 id="calendar-title" data-testid="calendar-title" style={{ fontSize: '2rem', marginBottom: 24, textAlign: 'center' }}>Календарь</h1>
      <section style={{ marginBottom: 24, display: 'flex', gap: 12, justifyContent: 'center' }}>
        <CalendarExportButtons data={sessions} />
        <button onClick={() => window.print()} style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid #ccc', background: '#f3f4f6', cursor: 'pointer' }} aria-label="Печать календаря" data-testid="print-calendar-btn">Печать</button>
      </section>
      <section aria-labelledby="calendar-title" data-testid="calendar-list">
        {Object.keys(grouped).length === 0 ? (
          <div data-testid="no-events" style={{ color: '#888', textAlign: 'center' }}>Нет событий</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Object.entries(grouped).map(([date, events]: any) => (
              <li key={date} style={{ background: '#e0e7ff', borderRadius: 8, marginBottom: 16, padding: 16 }} data-testid={`calendar-date-${date}`}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>{date}</div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {events.map((ev: any) => (
                    <li key={ev.id} role="listitem" aria-label={`Событие ${ev.type} в ${ev.time}`} data-testid={`calendar-event-${ev.id}`} style={{ marginBottom: 6, padding: 8, background: '#fff', borderRadius: 6, boxShadow: '0 1px 2px #0001' }}>
                      <span style={{ fontWeight: 500 }}>{ev.type}</span> — <span style={{ color: '#555' }}>{ev.time}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Calendar;
