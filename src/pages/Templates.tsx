import React, { useState } from 'react';
import { PackageTemplate } from '../types';
import TemplateEditForm from '../components/TemplateEditForm';

// TODO: Replace with useLocalStorageQuery for templates
const initialTemplates: PackageTemplate[] = [
  {
    id: 'tpl-1',
    name: 'Стандарт',
    sessionsCount: 8,
    pricePerSession: 500,
    totalPrice: 4000,
    validityDays: 30,
    description: 'Стандартный пакет',
    isActive: true,
  createdAt: String(Date.now()),
  },
];

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<PackageTemplate[]>(initialTemplates);
  const [editTpl, setEditTpl] = useState<PackageTemplate | null>(null);

  const handleEdit = (tpl: PackageTemplate) => setEditTpl(tpl);
  const handleSave = (tpl: PackageTemplate) => {
    setTemplates(templates.map(t => t.id === tpl.id ? tpl : t));
    setEditTpl(null);
  };
  const handleCancel = () => setEditTpl(null);

  return (
    <div>
      <h2>Шаблоны пакетов</h2>
      <ul>
        {templates.map(tpl => (
          <li key={tpl.id}>
            <span>{tpl.name}</span>
            <button onClick={() => handleEdit(tpl)}>Редактировать</button>
          </li>
        ))}
      </ul>
      {editTpl && (
        <div className="modal">
          <TemplateEditForm tpl={editTpl} onSave={handleSave} onCancel={handleCancel} />
        </div>
      )}
    </div>
  );
};

export default Templates;
