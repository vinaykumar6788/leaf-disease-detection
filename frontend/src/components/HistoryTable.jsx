import React, { useState, useMemo } from 'react';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  CalendarDays,
  FileText,
  AlertCircle
} from 'lucide-react';

const HistoryTable = ({ records = [], pageSize = 10, onDelete }) => {
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const sortedRecords = useMemo(() => {
    const list = [...records];
    return list.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === 'created_at') {
        aVal = new Date(aVal || 0).getTime();
        bVal = new Date(bVal || 0).getTime();
      } else if (sortField === 'confidence') {
        aVal = parseFloat(aVal) || 0;
        bVal = parseFloat(bVal) || 0;
      } else {
        aVal = String(aVal || '').toLowerCase();
        bVal = String(bVal || '').toLowerCase();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [records, sortField, sortDirection]);

  // Pagination calculation
  const totalPages = Math.ceil(sortedRecords.length / pageSize) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedRecords.slice(start, start + pageSize);
  }, [sortedRecords, currentPage, pageSize]);

  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 opacity-60" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-emerald-600" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-emerald-600" />
    );
  };

  const getRiskBadge = (level) => {
    switch (level?.toUpperCase()) {
      case 'HIGH':
      case 'SEVERE':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'MODERATE':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'NONE':
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!records || records.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400">
        <CalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h4 className="text-base font-bold text-slate-700">No Scan Records Available</h4>
        <p className="text-xs text-slate-500 mt-1">
          Perform a leaf disease diagnosis to see logs recorded in this table.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-emerald-100 bg-emerald-50/40 text-slate-700 text-xs font-bold uppercase tracking-wider select-none">
              {/* Date Column */}
              <th
                onClick={() => handleSort('created_at')}
                className="py-3.5 px-6 cursor-pointer hover:bg-emerald-100/50 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Date</span>
                  {renderSortIcon('created_at')}
                </div>
              </th>

              {/* Image File Column */}
              <th
                onClick={() => handleSort('filename')}
                className="py-3.5 px-6 cursor-pointer hover:bg-emerald-100/50 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Image File</span>
                  {renderSortIcon('filename')}
                </div>
              </th>

              {/* Disease Column */}
              <th
                onClick={() => handleSort('disease')}
                className="py-3.5 px-6 cursor-pointer hover:bg-emerald-100/50 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Disease</span>
                  {renderSortIcon('disease')}
                </div>
              </th>

              {/* Confidence Column */}
              <th
                onClick={() => handleSort('confidence')}
                className="py-3.5 px-6 cursor-pointer hover:bg-emerald-100/50 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Confidence</span>
                  {renderSortIcon('confidence')}
                </div>
              </th>

              {/* Risk Level Column */}
              <th
                onClick={() => handleSort('risk_level')}
                className="py-3.5 px-6 cursor-pointer hover:bg-emerald-100/50 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Risk Level</span>
                  {renderSortIcon('risk_level')}
                </div>
              </th>

              {onDelete && <th className="py-3.5 px-6 text-right">Actions</th>}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-slate-700">
            {paginatedRecords.map((item, idx) => {
              const recordId = item.id || item._id || idx;
              const isHealthy = item.disease?.toLowerCase().includes('healthy');

              return (
                <tr
                  key={recordId}
                  className="hover:bg-emerald-50/30 transition-colors"
                >
                  {/* Date */}
                  <td className="py-4 px-6 text-xs text-slate-500 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {item.created_at
                          ? new Date(item.created_at).toLocaleString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Recent'}
                      </span>
                    </div>
                  </td>

                  {/* Image File */}
                  <td className="py-4 px-6 text-xs text-slate-600 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span
                        className="font-medium text-[11px] text-slate-700 max-w-[150px] truncate block"
                        title={item.filename || 'leaf.jpg'}
                      >
                        {item.filename || 'leaf.jpg'}
                      </span>
                    </div>
                  </td>

                  {/* Disease */}
                  <td className="py-4 px-6 font-bold text-slate-900 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isHealthy ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                      <span>{item.disease || 'Unknown'}</span>
                    </div>
                  </td>

                  {/* Confidence */}
                  <td className="py-4 px-6 text-xs font-extrabold text-emerald-700 whitespace-nowrap">
                    {item.confidence !== undefined ? `${item.confidence}%` : '—'}
                  </td>

                  {/* Risk Level */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getRiskBadge(
                        item.risk_level
                      )}`}
                    >
                      {item.risk_level || 'NONE'}
                    </span>
                  </td>

                  {/* Actions */}
                  {onDelete && (
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onDelete(recordId)}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-800 hover:underline transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
        <div>
          Showing{' '}
          <span className="font-bold text-slate-900">
            {records.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}
          </span>{' '}
          to{' '}
          <span className="font-bold text-slate-900">
            {Math.min(currentPage * pageSize, records.length)}
          </span>{' '}
          of <span className="font-bold text-slate-900">{records.length}</span> records
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="font-bold text-slate-700 px-1">
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;
