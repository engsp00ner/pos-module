/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

type Invoice = {
  id: string;
  description: string;
  amount: string;
  status: 'Paid' | 'Unpaid';
  issueDate: string;
};

const invoices: Invoice[] = [
  {
    id: '#5010',
    description: 'Lorem Ipsum',
    amount: '$548',
    status: 'Unpaid',
    issueDate: '15-Jan',
  },
  {
    id: '#5011',
    description: 'Lorem Ipsum',
    amount: '$548',
    status: 'Paid',
    issueDate: '15-Sep',
  },
  {
    id: '#5012',
    description: 'Lorem Ipsum',
    amount: '$9658',
    status: 'Unpaid',
    issueDate: '15-Jun',
  },
  {
    id: '#5013',
    description: 'Lorem Ipsum',
    amount: '$4587',
    status: 'Paid',
    issueDate: '15-May',
  },
  {
    id: '#5014',
    description: 'Lorem Ipsum',
    amount: '$856',
    status: 'Unpaid',
    issueDate: '15-Mar',
  },
  {
    id: '#5015',
    description: 'Lorem Ipsum',
    amount: '$956',
    status: 'Unpaid',
    issueDate: '15-Aug',
  },
  {
    id: '#5016',
    description: 'Lorem Ipsum',
    amount: '$745',
    status: 'Paid',
    issueDate: '15-Aug',
  },
  {
    id: '#5010',
    description: 'Lorem Ipsum',
    amount: '$548',
    status: 'Unpaid',
    issueDate: '15-Jan',
  },
  {
    id: '#5011',
    description: 'Lorem Ipsum',
    amount: '$548',
    status: 'Paid',
    issueDate: '15-Sep',
  },
  {
    id: '#5012',
    description: 'Lorem Ipsum',
    amount: '$9658',
    status: 'Unpaid',
    issueDate: '15-Jun',
  },
  {
    id: '#5013',
    description: 'Lorem Ipsum',
    amount: '$4587',
    status: 'Paid',
    issueDate: '15-May',
  },
];

const InvoiceList: React.FC = () => {
  return (
    <div className="col-xl-8 col-12">
      <div className="box">
        <div className="box-header with-border">
          <h4 className="box-title">Invoice List</h4>
        </div>
        <div className="box-body">
          <div className="table-responsive">
            <table id="invoice-list" className="table table-hover no-wrap">
              <thead>
                <tr>
                  <th>#Invoice</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Issue</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.id}</td>
                    <td>{invoice.description}</td>
                    <td>{invoice.amount}</td>
                    <td>
                      <span
                        className={`label label-${invoice.status === 'Paid' ? 'success' : 'danger'}`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td>{invoice.issueDate}</td>
                    <td>
                      <Link to="#">
                        <i className="fa fa-file-text-o" aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
