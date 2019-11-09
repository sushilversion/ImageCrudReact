import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input.jsx";
class DisplayItems extends Component {
  constructor() {
    super();
    this.state = {
      seo_title: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  render() {
    const { seo_title } = this.state;
    return (
      <form id="article-form">
      <p>Display Item List</p>
      </form>
    );
  }
}
export default DisplayItems;
const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<DisplayItems />, wrapper) : false;
