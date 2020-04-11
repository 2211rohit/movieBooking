import React from "react";
import axios from "axios";
// import {Link} from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      seat_id: "",
      movie_id: "",
      booked: "",
      seat_number: "",
      seat_selected: ""
      };
  }
  fetchUser = () => {
    axios
      .post("http://localhost:5000/seats", {
        movie_id: this.props.match.params.id
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          data : response.data.data
        });
      })
      .catch(err => console.log(err));
  };
  componentDidMount() {
    this.fetchUser();
  }


handleChange(e) {
  e.preventDefault();
  this.setState({
    seat_selected: e.target.value
  });
    console.log(this.state.seat_selected)
    console.log(e.target.value)
}

handleClick(e) {
  let seat_id = this.state.seat_selected
  console.log(seat_id)
  axios
    .post(
      "http://localhost:5000/book",
      {
        seat_id: seat_id,
        booked : 1
      }
    )
    .then(response => {
      console.log(response.data);
      // alert(response.data.Message)
      this.props.history.push("/");
    })

    .catch(err => {
      console.log(err);
      alert("There is some error in the request")
    }
      );
}

  render() {
    console.log(this.state)
      return (
        <div>

          <div className="row">
            <div className="col-3"></div>

            <div className="col-3">
            </div>
            <div className="col-3"></div>
          </div>
          <div className=" m-5">
            <div className="row">
              <div className="col-2"></div>

              <div className="col-8">
              <div className="form-check">
              {this.state.data.map(row => (
                <div key={row.seat_id}>
                <input className="form-check-input" onChange={e => this.handleChange(e)} type="radio" name={row.seat_number} id={row.seat_id} value={row.seat_id} disabled={row.booked? 1:0}/>
                <label className="form-check-label" htmlFor={row.seat_id}>
                  {row.seat_number}
                </label>
                </div>
                      ))}
            <button type="button" data-toggle="modal" data-target="#exampleModal" className="btn btn-primary">Buy</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Congratulations! Ticekts Booked</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button onClick={e => this.handleClick(e)} type="button" className="btn btn-primary">Okay</button>
                  </div>
                </div>
              </div>
            </div>
              </div>
              </div>
              <div className="col-2"></div>
            </div>
            <div className="row">
              <div className="col-3"></div>
              <div className="col-3">
            </div>
            <div className="col-3"></div>

            </div>
          </div>
        </div>
      );
    }
  }
