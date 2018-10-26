import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = { term: ""};
  }

  onInput(term) {
    this.props.searchVideo(term);
    this.setState({ term });
  }

  render() {
    return (
      <div>
        <input
          value={this.state.term}
          onChange={ event => this.onInput( event.target.value ) } /> 
      </div>
    );
  }
}

export default SearchBar;