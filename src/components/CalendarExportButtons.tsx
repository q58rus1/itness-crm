import React from 'react';

interface Props {
  data: any;
}

const CalendarExportButtons: React.FC<Props> = ({ data }) => {
  const exportCSV = () => {
    const rows = [
      ['ID', 'Клиент', 'Тип', 'Дата', 'Время', 'Длительность', 'Завершено'],
      ...data.map((s: any) => [s.id, s.clientId, s.type, s.date, s.time, s.duration, s.completed ? 'Да' : 'Нет'])
    ];
    const csv = '\uFEFF' + rows.map(r => r.join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calendar.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calendar.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportICS = () => {
    const events = data.map((s: any) => {
      const dtStart = s.date.replace(/-/g, '') + 'T' + s.time.replace(':', '') + '00Z';
      // Для dtEnd: прибавим длительность (минуты) к времени
      const [h, m] = s.time.split(':').map(Number);
      const endDate = new Date(`${s.date}T${s.time}`);
      endDate.setMinutes(endDate.getMinutes() + (s.duration || 60));
      const endH = String(endDate.getHours()).padStart(2, '0');
      const endM = String(endDate.getMinutes()).padStart(2, '0');
      const dtEnd = s.date.replace(/-/g, '') + 'T' + endH + endM + '00Z';
      return `BEGIN:VEVENT\nSUMMARY:${s.type === 'training' ? 'Тренировка' : 'Событие'}\nDTSTART:${dtStart}\nDTEND:${dtEnd}\nDESCRIPTION:${s.notes || ''}\nEND:VEVENT`;
    }).join('\n');
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\n${events}\nEND:VCALENDAR`;
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calendar.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ margin: '16px 0' }}>
      <button onClick={exportCSV}>Экспорт календаря CSV</button>
      <button onClick={exportJSON} style={{ marginLeft: 8 }}>Экспорт календаря JSON</button>
      <button onClick={exportICS} style={{ marginLeft: 8 }}>Экспорт календаря .ics</button>
    </div>
  );
};

export default CalendarExportButtons;
