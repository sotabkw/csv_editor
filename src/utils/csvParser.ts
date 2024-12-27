import { CsvSection } from '../types/csv';

export function parseCsv(content: string): CsvSection[] {
  // 空行で分割してセクションを特定
  const lines = content.split('\n').map(line => line.trim());
  const sections: CsvSection[] = [];
  let currentSection: string[][] = [];
  let currentSectionName = '';

  lines.forEach(line => {
    if (line === '') {
      if (currentSection.length > 0) {
        sections.push({
          name: currentSectionName,
          headers: currentSection[0],
          rows: currentSection.slice(1)
        });
        currentSection = [];
        currentSectionName = '';
      }
    } else {
      // セクション名として使用できそうな行（データ行でない）かチェック
      if (currentSection.length === 0 && !line.includes(',')) {
        currentSectionName = line;
      } else {
        currentSection.push(line.split(',').map(cell => cell.trim()));
      }
    }
  });

  // 最後のセクションを追加
  if (currentSection.length > 0) {
    sections.push({
      name: currentSectionName,
      headers: currentSection[0],
      rows: currentSection.slice(1)
    });
  }

  return sections;
}

export function generateCsv(sections: CsvSection[]): string {
  return sections.map(section => {
    const sectionContent = [
      section.name,
      [section.headers.join(',')],
      ...section.rows.map(row => row.join(','))
    ].filter(Boolean).join('\n');
    return sectionContent + '\n';
  }).join('\n');
}

export function validateCsvSection(section: CsvSection): boolean {
  if (!section.headers || section.headers.length === 0) return false;
  const columnCount = section.headers.length;
  return section.rows.every(row => row.length === columnCount);
}