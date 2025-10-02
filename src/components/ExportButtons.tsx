import React from 'react';

interface Props {
  data: any;
}

const ExportButtons: React.FC<Props> = ({ data }) => {
  const exportCSV = () => {
    const rows = [
      ['Имя', 'Телефон', 'Email', 'Заметки'],
      ...data.map((c: any) => [c.name, c.phone, c.email || '', c.notes || ''])
    ];
    const csv = '\uFEFF' + rows.map(r => r.join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clients.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clients.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ margin: '16px 0' }}>
      <button onClick={exportCSV}>Экспорт CSV</button>
      <button onClick={exportJSON} style={{ marginLeft: 8 }}>Экспорт JSON</button>
    </div>
  );
};

export default ExportButtons;
