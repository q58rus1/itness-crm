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
    <div>
  <h1 id="calendar-title" data-testid="calendar-title">Календарь</h1>
  <CalendarExportButtons data={sessions} />
  <button onClick={() => window.print()} style={{ marginBottom: 16 }} aria-label="Печать календаря" data-testid="print-calendar-btn">Печать календаря</button>
  <div role="list" aria-labelledby="calendar-title" data-testid="calendar-list">
        {Object.keys(grouped).length === 0 ? (
          <div data-testid="no-events">Нет событий</div>
        ) : (
          Object.entries(grouped).map(([date, events]: any) => (
            <div key={date} data-testid={`calendar-date-${date}`}>
              <strong>{date}</strong>
              <ul>
                {events.map((ev: any) => (
                  <li key={ev.id} role="listitem" aria-label={`Событие ${ev.type} в ${ev.time}`} data-testid={`calendar-event-${ev.id}`}>{ev.type} — {ev.time}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Calendar;
