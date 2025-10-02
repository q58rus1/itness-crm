import React from 'react';

interface Props {
  stats: any;
}

const StatisticsExportButtons: React.FC<Props> = ({ stats }) => {
  const exportCSV = () => {
    const rows = [
      ['Показатель', 'Значение'],
      ...Object.entries(stats).map(([k, v]) => [k, v])
    ];
    const csv = '\uFEFF' + rows.map(r => r.join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'statistics.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(stats, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'statistics.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ margin: '16px 0' }}>
      <button onClick={exportCSV}>Экспорт статистики CSV</button>
      <button onClick={exportJSON} style={{ marginLeft: 8 }}>Экспорт статистики JSON</button>
    </div>
  );
};

export default StatisticsExportButtons;
