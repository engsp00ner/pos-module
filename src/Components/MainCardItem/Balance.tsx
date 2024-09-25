import { useEffect } from 'react';

interface Props {
  openingBalance: number;
  CurrentBalance: number;
}

const Balance: React.FC<Props> = ({ openingBalance, CurrentBalance }) => {
  useEffect(() => {
    // Re-render when CurrentBalance changes
    console.log('Current balance changed:', CurrentBalance);
  }, [CurrentBalance]); // Runs whenever CurrentBalance or newOrder changes
  return (
    //  opening  balance

    <div className="d-flex mt-10 justify-content-end col-lg-6 col-md-3">
      <div className="d-lg-flex mr-20 ml-10 d-none">
        <div className="chart-text mr-10">
          <h3 className="mb-0" style={{ paddingBlock: 0 }}>
            الرصيد الأفتتاحي
          </h3>
          <h4 className=" text-primary text-center">{openingBalance}</h4>
        </div>
      </div>
      {/* current balance */}
      <div className="d-lg-flex mr-20 ml-10 d-none">
        <div className="chart-text mr-10">
          <h3 className="mb-0" style={{ paddingBlock: 0 }}>
            الرصيد الحالي
          </h3>
          <h4 className=" text-danger text-center">{CurrentBalance}</h4>
        </div>
      </div>
    </div>
  );
};
export default Balance;
