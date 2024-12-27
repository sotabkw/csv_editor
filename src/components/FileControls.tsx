import React from 'react';
import { Upload, Download, Plus, Trash2 } from 'lucide-react';

interface FileControlsProps {
  onImport: (file: File) => void;
  onExport: () => void;
  onAddRow: () => void;
  onAddColumn: () => void;
}

export function FileControls({ onImport, onExport, onAddRow, onAddColumn }: FileControlsProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex gap-4 mb-4">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <Upload size={16} />
        Import CSV
      </button>
      <button
        onClick={onExport}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        <Download size={16} />
        Export CSV
      </button>
      <button
        onClick={onAddRow}
        className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        <Plus size={16} />
        Add Row
      </button>
      <button
        onClick={onAddColumn}
        className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        <Plus size={16} />
        Add Column
      </button>
    </div>
  );
}