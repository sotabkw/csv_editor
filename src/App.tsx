import React from 'react';
import { CsvTable } from './components/CsvTable';
import { FileControls } from './components/FileControls';
import { parseCsv, generateCsv, validateCsvSection } from './utils/csvParser';
import { FileText } from 'lucide-react';
import { CsvSection } from './types/csv';

function App() {
  const [sections, setSections] = React.useState<CsvSection[]>([{
    name: 'Default Section',
    headers: ['Column 1', 'Column 2', 'Column 3'],
    rows: [
      ['Data 1', 'Data 2', 'Data 3'],
      ['Data 4', 'Data 5', 'Data 6'],
    ]
  }]);

  const handleImport = async (file: File) => {
    try {
      const content = await file.text();
      const parsedSections = parseCsv(content);
      if (parsedSections.length > 0 && parsedSections.every(validateCsvSection)) {
        setSections(parsedSections);
      } else {
        alert('Invalid CSV format: Some sections contain inconsistent data');
      }
    } catch (error) {
      console.error('Error parsing CSV:', error);
      alert('Error parsing CSV file');
    }
  };

  const handleExport = () => {
    const csvContent = generateCsv(sections);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'export.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleUpdateCell = (sectionIndex: number, rowIndex: number, colIndex: number, value: string) => {
    setSections(prev => prev.map((section, idx) => 
      idx === sectionIndex
        ? {
            ...section,
            rows: section.rows.map((row, i) =>
              i === rowIndex
                ? row.map((cell, j) => j === colIndex ? value : cell)
                : row
            )
          }
        : section
    ));
  };

  const handleAddRow = (sectionIndex: number) => {
    setSections(prev => prev.map((section, idx) =>
      idx === sectionIndex
        ? {
            ...section,
            rows: [...section.rows, new Array(section.headers.length).fill('')]
          }
        : section
    ));
  };

  const handleAddColumn = (sectionIndex: number) => {
    setSections(prev => prev.map((section, idx) =>
      idx === sectionIndex
        ? {
            ...section,
            headers: [...section.headers, `Column ${section.headers.length + 1}`],
            rows: section.rows.map(row => [...row, ''])
          }
        : section
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-[95vw] mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <FileText className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-800">CSV Editor</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <FileControls
            onImport={handleImport}
            onExport={handleExport}
          />
          
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {section.name || `Section ${index + 1}`}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddRow(index)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                    >
                      Add Row
                    </button>
                    <button
                      onClick={() => handleAddColumn(index)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                    >
                      Add Column
                    </button>
                  </div>
                </div>
                <CsvTable
                  headers={section.headers}
                  rows={section.rows}
                  onUpdateCell={(rowIndex, colIndex, value) => 
                    handleUpdateCell(index, rowIndex, colIndex, value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;