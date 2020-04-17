import React, { Component } from "react";

class Main extends Component {
  render() {
    return (
      <div id="content">
        <h1>New Medicine</h1>
        <form
          onSubmit={event => {
            event.preventDefault();
            const mfg_owner = this.i1_owner.value;
            const med_name = this.i2_name.value;
            const mfg_month = this.i3_mfg.value;
            const exp_month = this.i4_exp.value;
            const batch_no = this.i5_batch.value;
            const med_location = this.i6_loc.value;
            const med_price = this.i7_price.value;
            const med_amount = this.i8_amt.value;

            this.props.createProduct(
              mfg_owner,
              med_name,
              mfg_month,
              exp_month,
              batch_no,
              med_location,
              med_price,
              med_amount
            );
          }}
        >
          <div className="form-group mr-sm-2">
            <input
              id="i1_owner"
              type="text"
              ref={input => {
                this.i1_owner = input;
              }}
              className="form-control"
              placeholder="Owner address"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="i2_name"
              type="text"
              ref={input => {
                this.i2_name = input;
              }}
              className="form-control"
              placeholder="Medicine name"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="i3_mfg"
              type="text"
              ref={input => {
                this.i3_mfg = input;
              }}
              className="form-control"
              placeholder="mfg month"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="i4_exp"
              type="text"
              ref={input => {
                this.i4_exp = input;
              }}
              className="form-control"
              placeholder="expiry month"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="i5_batch"
              type="text"
              ref={input => {
                this.i5_batch = input;
              }}
              className="form-control"
              placeholder="Batch no"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="i6_loc"
              type="text"
              ref={input => {
                this.i6_loc = input;
              }}
              className="form-control"
              placeholder="Location"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="i7_price"
              type="text"
              ref={input => {
                this.i7_price = input;
              }}
              className="form-control"
              placeholder="Price"
              required
            />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="i8_amt"
              type="text"
              ref={input => {
                this.i8_amt = input;
              }}
              className="form-control"
              placeholder="Amount"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-space">
            Add Medicine
          </button>
        </form>

        <p>&nbsp;</p>
        <h2>List of medicines in the supply</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.props.products.map((product, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{product._id.toString()}</th>
                  <td>{product.med_name.toString()}</td>
                  <td>{product.med_price.toString()}</td>
                  <td>{product.mfg_owner.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
