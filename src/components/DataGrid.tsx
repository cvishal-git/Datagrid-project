import { useState, useMemo } from 'react';
import { GridItem } from '../types';
import { Checkbox } from './Checkbox';
import './DataGrid.css';

interface DataGridProps {
  data: GridItem[];
}

export const DataGrid = ({ data }: DataGridProps) => {
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Calculate various states
  const allSelected = useMemo(
    () => selectedIds.size === data.length,
    [selectedIds.size, data.length],
  );
  const someSelected = useMemo(
    () => selectedIds.size > 0 && !allSelected,
    [selectedIds.size, allSelected],
  );
  const selectedItems = useMemo(
    () => data.filter((item) => selectedIds.has(item.id)),
    [data, selectedIds],
  );

  // Check if all selected items are available
  const allSelectedAvailable = useMemo(
    () => selectedItems.every((item) => item.status === 'available'),
    [selectedItems],
  );

  // Handle row selection
  const toggleRow = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // Handle select all
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(data.map((item) => item.id)));
    }
  };

  // Handle download
  const handleDownload = () => {
    const selectedData = data.filter((item) => selectedIds.has(item.id));
    const message = `localhost:4200 says\n\nDownloaded Items\n${selectedData
      .map(
        (item) =>
          `Name: ${item.name} Device: ${item.device} Path: ${item.path}`,
      )
      .join('\n')}`;
    alert(message);
  };

  return (
    <div className="data-grid">
      <div className="grid-header">
        <div className="header-left">
          <Checkbox
            checked={allSelected}
            intermediate={someSelected}
            onChange={toggleSelectAll}
          />
          <span className="selection-text">
            {selectedIds.size === 0
              ? 'None Selected'
              : `${selectedIds.size} Selected`}
          </span>
        </div>
        <button
          className="download-button"
          disabled={!selectedIds.size || !allSelectedAvailable}
          onClick={handleDownload}
        >
          Download Selected
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <Checkbox
                  checked={selectedIds.has(item.id)}
                  onChange={() => toggleRow(item.id)}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.device}</td>
              <td>{item.path}</td>
              <td>
                {item.status === 'available' && (
                  <span className="status-dot"></span>
                )}
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
