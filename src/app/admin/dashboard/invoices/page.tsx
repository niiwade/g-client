'use client';

import { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

type Invoice = {
  id: string;
  learner: string;
  email: string;
  amount: number;
  status: string;
  date: string;
  course?: string;
  dueDate?: string;
  notes?: string;
};

export default function InvoicesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    learner: '',
    email: '',
    course: '',
    amount: '',
    dueDate: '',
    notes: ''
  });
  const [editFormData, setEditFormData] = useState({
    learner: '',
    email: '',
    course: '',
    amount: '',
    dueDate: '',
    notes: ''
  });
  const invoices = [
    {
      id: 'INV-2025-001',
      learner: 'John Doe',
      email: 'john.doe@example.com',
      amount: 199.99,
      status: 'Paid',
      date: 'Jul 10, 2025',
      course: 'Introduction to React',
      dueDate: 'Jul 20, 2025',
      notes: 'Payment for React course enrollment',
    },
    {
      id: 'INV-2025-002',
      learner: 'Sarah Smith',
      email: 'sarah.smith@example.com',
      amount: 299.99,
      status: 'Paid',
      date: 'Jul 8, 2025',
      course: 'Advanced TypeScript',
      dueDate: 'Jul 18, 2025',
      notes: 'Payment for TypeScript course',
    },
    {
      id: 'INV-2025-003',
      learner: 'Michael Brown',
      email: 'michael.brown@example.com',
      amount: 149.99,
      status: 'Pending',
      date: 'Jul 12, 2025',
      course: 'Node.js Fundamentals',
      dueDate: 'Jul 22, 2025',
      notes: 'Awaiting payment confirmation',
    },
    {
      id: 'INV-2025-004',
      learner: 'Emily Johnson',
      email: 'emily.johnson@example.com',
      amount: 499.99,
      status: 'Paid',
      date: 'Jul 5, 2025',
    },
    {
      id: 'INV-2025-005',
      learner: 'David Wilson',
      email: 'david.wilson@example.com',
      amount: 99.99,
      status: 'Overdue',
      date: 'Jun 28, 2025',
    },
    {
      id: 'INV-2025-006',
      learner: 'Jessica Miller',
      email: 'jessica.miller@example.com',
      amount: 199.99,
      status: 'Pending',
      date: 'Jul 15, 2025',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">
            Manage billing and payment records
          </p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Create Invoice
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="relative max-w-xs">
            <input
              type="text"
              placeholder="Search invoices..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex space-x-2">
            <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option>All Status</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
              <option>Cancelled</option>
            </select>
            <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option>All Time</option>
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Learner
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{invoice.learner}</div>
                        <div className="text-sm text-gray-500">{invoice.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      invoice.status === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : invoice.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => {
                        setSelectedInvoice(invoice);
                        setEditFormData({
                          learner: invoice.learner,
                          email: invoice.email,
                          course: invoice.course || '',
                          amount: invoice.amount.toString(),
                          dueDate: invoice.dueDate || '',
                          notes: invoice.notes || ''
                        });
                        setIsEditMode(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </a>
            <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </a>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of{' '}
                <span className="font-medium">6</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  {/* Previous icon */}
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </a>
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  {/* Next icon */}
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Create New Invoice</h2>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Form */}
            <form className="space-y-4">
              {/* Learner Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Learner Name
                </label>
                <input
                  type="text"
                  value={createFormData.learner}
                  onChange={(e) => setCreateFormData({...createFormData, learner: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter learner name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={createFormData.email}
                  onChange={(e) => setCreateFormData({...createFormData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                />
              </div>

              {/* Course */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course
                </label>
                <select
                  value={createFormData.course}
                  onChange={(e) => setCreateFormData({...createFormData, course: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select course</option>
                  <option value="Introduction to React">Introduction to React</option>
                  <option value="Advanced TypeScript">Advanced TypeScript</option>
                  <option value="Node.js Fundamentals">Node.js Fundamentals</option>
                  <option value="Full Stack Development">Full Stack Development</option>
                  <option value="Database Design">Database Design</option>
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={createFormData.amount}
                  onChange={(e) => setCreateFormData({...createFormData, amount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={createFormData.dueDate}
                  onChange={(e) => setCreateFormData({...createFormData, dueDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={createFormData.notes}
                  onChange={(e) => setCreateFormData({...createFormData, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Enter additional notes"
                />
              </div>

              {/* Create Button */}
              <button
                type="button"
                onClick={() => {
                  console.log('Create invoice data:', createFormData);
                  setIsCreateModalOpen(false);
                  setCreateFormData({
                    learner: '',
                    email: '',
                    course: '',
                    amount: '',
                    dueDate: '',
                    notes: ''
                  });
                }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Create Invoice
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Update Invoice Modal */}
      {isEditMode && selectedInvoice && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Update Invoice</h2>
              <button 
                onClick={() => setIsEditMode(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Invoice ID Display */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Invoice ID: <span className="font-medium text-gray-900">{selectedInvoice.id}</span></p>
            </div>

            {/* Modal Form */}
            <form className="space-y-4">
              {/* Learner Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Learner Name
                </label>
                <input
                  type="text"
                  value={editFormData.learner}
                  onChange={(e) => setEditFormData({...editFormData, learner: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter learner name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                />
              </div>

              {/* Course */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course
                </label>
                <select
                  value={editFormData.course}
                  onChange={(e) => setEditFormData({...editFormData, course: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select course</option>
                  <option value="Introduction to React">Introduction to React</option>
                  <option value="Advanced TypeScript">Advanced TypeScript</option>
                  <option value="Node.js Fundamentals">Node.js Fundamentals</option>
                  <option value="Full Stack Development">Full Stack Development</option>
                  <option value="Database Design">Database Design</option>
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editFormData.amount}
                  onChange={(e) => setEditFormData({...editFormData, amount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={editFormData.dueDate}
                  onChange={(e) => setEditFormData({...editFormData, dueDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={editFormData.notes}
                  onChange={(e) => setEditFormData({...editFormData, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Enter additional notes"
                />
              </div>

              {/* Update Button */}
              <button
                type="button"
                onClick={() => {
                  console.log('Update invoice data:', editFormData);
                  setIsEditMode(false);
                  setSelectedInvoice(null);
                }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Update Invoice
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
