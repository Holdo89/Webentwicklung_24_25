import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'date', headerName: 'Datum', width: 150 },
  { field: 'title', headerName: 'Buchungstitel', width: 200 },
  { field: 'status', headerName: 'Status', width: 150 },
];

const rows = [
  { id: 1, date: '2025-04-22', title: 'Lesesaal buchen', status: 'Bestätigt' },
  { id: 2, date: '2025-04-23', title: 'Buch reservieren', status: 'Ausstehend' },
];

export default function BookingTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
