import React from 'react';

interface Props {
  data: any;
}

const TemplateExportButtons: React.FC<Props> = ({ data }) => {
  const exportCSV = () => {
    const rows = [
      ['ID', 'Название', 'Кол-во', 'Цена за занятие', 'Общая цена', 'Срок действия', 'Описание', 'Активен', 'Дата создания'],
      ...data.map((t: any) => [t.id, t.name, t.sessionsCount, t.pricePerSession, t.totalPrice, t.validityDays, t.description || '', t.isActive ? 'Да' : 'Нет', t.createdAt])
    ];
    const csv = '\uFEFF' + rows.map(r => r.join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'templates.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'templates.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ margin: '16px 0' }}>
      <button onClick={exportCSV}>Экспорт шаблонов CSV</button>
      <button onClick={exportJSON} style={{ marginLeft: 8 }}>Экспорт шаблонов JSON</button>
    </div>
  );
};

export default TemplateExportButtons;
