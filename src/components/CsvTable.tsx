import React from 'react';
import { Pencil, Save, X } from 'lucide-react';

interface CsvTableProps {
  headers: string[];
  rows: string[][];
  onUpdateCell: (rowIndex: number, colIndex: number, value: string) => void;
}

export function CsvTable({ headers, rows, onUpdateCell }: CsvTableProps) {
  const [editingCell, setEditingCell] = React.useState<{row: number; col: number} | null>(null);
  const [editValue, setEditValue] = React.useState('');

  const handleStartEdit = (row: number, col: number, value: string) => {
    setEditingCell({ row, col });
    setEditValue(value);
  };

  const handleSave = () => {
    if (editingCell) {
      onUpdateCell(editingCell.row, editingCell.col, editValue);
      setEditingCell(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th 
                key={index} 
                className="px-4 py-2 border whitespace-nowrap font-semibold text-gray-700"
                style={{ minWidth: '150px' }}
              >
                <span className="truncate">{header}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className={`${rowIndex % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50`}
            >
              {row.map((cell, colIndex) => (
                <td key={colIndex} className="px-4 py-2 border">
                  {editingCell?.row === rowIndex && editingCell.col === colIndex ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full p-1 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        autoFocus
                      />
                      <button 
                        onClick={handleSave} 
                        className="text-green-600 hover:text-green-700"
                        title="Save (Enter)"
                      >
                        <Save size={16} />
                      </button>
                      <button 
                        onClick={() => setEditingCell(null)} 
                        className="text-red-600 hover:text-red-700"
                        title="Cancel (Esc)"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between group">
                      <span className="truncate">{cell}</span>
                      <button
                        onClick={() => handleStartEdit(rowIndex, colIndex, cell)}
                        className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}