import React from 'react';
import { Link } from 'react-router-dom';

type ProgressBarProps = {
  percentage: number;
  colorClass: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  colorClass,
}) => (
  <div className="progress progress-xs mb-0 mb-10">
    <div
      className={`progress-bar ${colorClass}`}
      role="progressbar"
      style={{ width: `${percentage}%` }}
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  </div>
);

type ItemSalesComponentProps = {
  totalRevenue: string;
  salesPercentage: number;
  productPercentage: number;
  communityPercentage: number;
  salesLabel: string;
  productLabel: string;
  communityLabel: string;
};

const ItemSalesComponent: React.FC<ItemSalesComponentProps> = ({
  totalRevenue,
  salesPercentage,
  productPercentage,
  communityPercentage,
  salesLabel,
  productLabel,
  communityLabel,
}) => {
  return (
    <div className="col-12 col-xl-4">
      <div className="box">
        <div className="box-header with-border">
          <h4 className="box-title">
            Item Sales{' '}
            <span className="font-size-12 text-fade">Total Sales By item</span>
          </h4>
          <ul className="box-controls pull-right">
            <li className="dropdown">
              <Link data-toggle="dropdown" to="#">
                <i className="ti-more-alt" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <Link className="dropdown-item" to="#">
                  <i className="iconsmind-Flash-2" /> Activity
                </Link>
                <Link className="dropdown-item" to="#">
                  <i className="iconsmind-Email" /> Messages
                </Link>
                <Link className="dropdown-item" to="#">
                  <i className="iconsmind-File-Edit" /> FAQ
                </Link>
                <div className="dropdown-divider" />
                <Link className="dropdown-item" to="#">
                  <i className="consmind-Gear-2" /> Support
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <div className="box-body bb-1 bbr-0">
          <span className="font-size-50 text-primary">{totalRevenue}</span>
          <span className="text-fade">Total Revenue This Month</span>
        </div>
        <div className="box-body">
          <div className="row justify-content-between pb-25">
            <div className="col-4">
              <h2 className="mb-0">{salesPercentage}%</h2>
              <ProgressBar
                percentage={salesPercentage}
                colorClass="bg-warning"
              />
              <span className="font-size-16 text-fade">{salesLabel}</span>
            </div>
            <div className="col-4">
              <h2 className="mb-0">{productPercentage}%</h2>
              <ProgressBar
                percentage={productPercentage}
                colorClass="bg-danger"
              />
              <span className="font-size-16 text-fade">{productLabel}</span>
            </div>
            <div className="col-4">
              <h2 className="mb-0">{communityPercentage}%</h2>
              <ProgressBar
                percentage={communityPercentage}
                colorClass="bg-info"
              />
              <span className="font-size-16 text-fade">{communityLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemSalesComponent;
