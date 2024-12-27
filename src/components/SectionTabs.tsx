import React from 'react';
import { CsvSection } from '../types/csv';

interface SectionTabsProps {
  sections: CsvSection[];
  activeSection: number;
  onSectionChange: (index: number) => void;
}

export function SectionTabs({ sections, activeSection, onSectionChange }: SectionTabsProps) {
  return (
    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
      {sections.map((section, index) => (
        <button
          key={index}
          onClick={() => onSectionChange(index)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${
            activeSection === index
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          {section.name || `Section ${index + 1}`}
        </button>
      ))}
    </div>
  );
}