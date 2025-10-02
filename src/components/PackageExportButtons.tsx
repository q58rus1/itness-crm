import React from 'react';

interface Props {
  data: any;
}

const PackageExportButtons: React.FC<Props> = ({ data }) => {
  const exportCSV = () => {
    const rows = [
      ['ID', 'Клиент', 'Кол-во', 'Использовано', 'Цена за занятие', 'Общая цена', 'Дата покупки', 'Дата окончания', 'Активен'],
      ...data.map((p: any) => [p.id, p.clientId, p.totalSessions, p.usedSessions, p.pricePerSession, p.totalPrice, p.purchaseDate, p.expiryDate, p.isActive ? 'Да' : 'Нет'])
    ];
    const csv = '\uFEFF' + rows.map(r => r.join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'packages.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'packages.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ margin: '16px 0' }}>
      <button onClick={exportCSV}>Экспорт пакетов CSV</button>
      <button onClick={exportJSON} style={{ marginLeft: 8 }}>Экспорт пакетов JSON</button>
    </div>
  );
};

export default PackageExportButtons;
