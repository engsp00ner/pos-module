export const EditOrderLayOut: React.FC = () => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="box">
          <div className="box-header with-border">
            <h4 className="box-title">About Product</h4>
          </div>
          <div className="box-body">
            <form action="ecommerce_products_edit.html#">
              <div className="form-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <span>Product Name</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Product Name"
                      />
                    </div>
                  </div>
                  {/* span */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Lorem Ipsum Text..."
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <span>Category</span>
                      <select
                        className="form-control"
                        data-placeholder="Choose a Category"
                      >
                        <option value="Category 1">Category 1</option>
                        <option value="Category 2">Category 2</option>
                        <option value="Category 3">Category 5</option>
                        <option value="Category 4">Category 4</option>
                      </select>
                    </div>
                  </div>
                  {/* span */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <span>Status</span>
                      <div className="radio-list">
                        <div className="radio radio-info">
                          <input
                            type="radio"
                            name="radio"
                            id="radio1"
                            value="option1"
                          />
                          <span>Published</span>
                        </div>
                        <div className="radio radio-info">
                          <input
                            type="radio"
                            name="radio"
                            id="radio2"
                            value="option2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /span */}
                </div>
                {/* /row */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <span>Price</span>
                      <div className="input-group">
                        <div className="input-group-addon">
                          <i className="ti-money" />
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="270"
                        />{' '}
                      </div>
                    </div>
                  </div>
                  {/* <!--/span--> */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <span>Discount</span>
                      <div className="input-group">
                        <div className="input-group-addon">
                          <i className="ti-cut" />
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="50%"
                        />{' '}
                      </div>
                    </div>
                  </div>
                  {/* /span */}
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <span> Product Description</span>
                      <textarea className="form-control p-20 col-4">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour, or randomised words which
                        text. All the Lorem Ipsum generators on the Internet
                        tend to repeat predefined chunks as necessary, making
                        this the first true generator on the Internet. It uses a
                        dictionary of over 200 Latin words, combined with a
                        handful of model sentence structures, to generate Lorem
                        Ipsum which looks reasonable.
                      </textarea>
                    </div>
                  </div>
                </div>
                {/* row */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <span>Meta Title</span>
                      <input type="text" className="form-control" />{' '}
                    </div>
                  </div>
                  {/* span */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <span> Meta Keyword</span>
                      <input type="text" className="form-control" />{' '}
                    </div>
                  </div>
                  {/* span */}
                  <div className="col-md-3">
                    <h4 className="box-title mt-20">Upload Image</h4>
                    <div className="product-img text-left">
                      <img src="../images/product/product-9.png" alt="" />
                      <div className="btn btn-info mb-20">
                        <span>Upload Anonther Image</span>
                        <input type="file" className="upload" />
                      </div>
                      <button className="btn btn-success" type="button">
                        Edit
                      </button>
                      <button className="btn btn-danger" type="button">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h4 className="box-title mt-40">General Info</h4>
                    <div className="table-responsive">
                      <table className="table no-border td-padding">
                        <tbody>
                          <tr>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Brand"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Sellar"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Delivery Condition"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Knock Down"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Color"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Gift Pack"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-actions mt-10">
                <button type="submit" className="btn btn-primary">
                  {' '}
                  <i className="fa fa-check" /> Save
                </button>
                <button type="button" className="btn btn-danger">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
