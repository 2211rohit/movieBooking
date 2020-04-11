import React from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      data: [],
      movie_id: "",
      name: "",
      genre: "",
      ticket_price: "",
      language: "",
      location: "",
      theatre: "",
      all_genre : ["Comedy", "Action", "Drama", "SciFi"],
      all_language : ["Hindi", "English", "Kannada"],
      rows: 5,
      total_pages: "",
      pages: 1,
      limit: ""
    };
  }

  apiCall = (currentPage = 1) => {
    axios
      .post("http://localhost:5000/paginationMovies?page=" + currentPage,
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          flag: true,
          data: response.data.data,
          total_pages: Math.ceil(response.data.total_movies / 10)
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  componentDidMount() {
    this.apiCall();
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };



  genre_filter(e) {
    let genre = e.target.value
    console.log(genre)
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/genre",
        { genre: genre }
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          flag: true,
          data: response.data.data,
        });
      })
  
      .catch(err => console.log(err));
  }

  language_filter(e) {
    let language = e.target.value
    console.log(language)
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/language",
        { language: language }
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          flag: true,
          data: response.data.data,
        });
      })
  
      .catch(err => console.log(err));
  }

  
  render() {

    if (this.state.flag) {
      return (
        <div>
          <div className=" m-5">
          <div className="row">
            <div className="col-2"></div>
            
            <div className="col-4">
              <p className="mt-5">Filter By Genre:</p>
              <form>
                <div className="form-row align-items-center">
                  <div className="col-auto my-1">
                    <select onChange={e => this.genre_filter(e)} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                    <option value="Select">Select</option>
                      {this.state.all_genre.map(a => (
                    <option key={a} value={a}>{a}</option>
                    ))}
                    </select>
                  </div>
                </div>
              </form>    
            </div>
            <div className="col-4">
              <p className="mt-5">Filter By Language:</p>
              <form>
                <div className="form-row align-items-center">
                  <div className="col-auto my-1">
                    <select onChange={e => this.language_filter(e)} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                    <option value="Select">Select</option>
                      {this.state.all_language.map(a => (
                    <option key={a} value={a}>{a}</option>
                    ))}
                    </select>
                  </div>
                </div>
              </form>    
            </div>
            <div className="col-2"></div>
          </div>
            <div className="row">
              <div className="col-2"></div>

              <div className="col-8">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Movie ID</th>
                    <th scope="col">Movie Name</th>
                    <th scope="col">Ticket Price</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Language</th>
                    <th scope="col">Location</th>
                    <th scope="col">Theatre</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.data.map(row => (
                  <tr key={row.movie_id}>
                    <th scope="row">{row.movie_id}</th>
                    <td><Link to={`seats/${row.movie_id}`}>{row.movie_name}</Link></td>
                    <td>{row.ticket_price}</td>
                    <td>{row.genre}</td>
                    <td>{row.language}</td>
                    <td>{row.location}</td>
                    <td>{row.theatre}</td>
                  </tr>
                      ))}

                </tbody>
              </table>
                <Pagination className="mt-5"
                  apiCall={this.apiCall}
                  total_pages={this.state.total_pages}
                />
              </div>
              <div className="col-2"></div>
            </div>

          </div>
        </div>
      );
    }
    else {
      return (
        <div>
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-warning" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
  }
}
