const AddOrder: React.FC = () => {
  return (
    <div>
      <div style={{ width: '70px', height: '70px' }}>
        <img src="/assets/itemImages/logo1.png" alt="not found" />
      </div>
      <form className="row">
        <div style={{ fontWeight: '2em' }}>
          <label htmlFor="productName">
            اسم المنتج
            <input
              id="productName"
              className="input col-12"
              type="text"
              placeholder="أسم المنتج"
              style={{ width: '350px', height: '40px', fontSize: '1em' }}
            />{' '}
          </label>
        </div>
        <div>
          <label htmlFor="productamount">
            الكـميه
            <input
              id="productamount"
              className="input"
              type="number"
              placeholder=" 0"
              style={{ width: '100px', height: '40px', fontSize: '1em' }}
            />{' '}
          </label>
        </div>
      </form>
    </div>
  );
};
export default AddOrder;
