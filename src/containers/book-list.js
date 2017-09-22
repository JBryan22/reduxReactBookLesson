import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index'; //returns a value
import { bindActionCreators } from 'redux'; //this makes sure the return from our action actually flows through all of our reducers

class BookList extends Component {
renderList() {
  return this.props.books.map((book) => {
    return (
      <li
      key={book.title}
      onClick={() => this.props.selectBook(book)}
      className="list-group-item">{book.title}</li>
    );
  });
}

  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
  }
}

//Anything returned from this function will end up as props on the booklist container similar to mapstatetoprops
function mapDispatchToProps(dispatch) {
  // whenever selectBook is called, the result should be passed to all of our reducers
  // bindActionCreatorsis what is doing that. dispatch takes the return value of selectBook and dispatches it out to all the different reducers
  return bindActionCreators({ selectBook: selectBook }, dispatch);
}

function mapStateToProps(state) {
  //Whatever is returned will show up as props inside of booklist
  //if return: {asdf: '123'} -- this.props.asdf -> '123' if called in render
  //this function re-renders every time state is changed
  return {
    books: state.books //this gets assigned to the props object in the component every time state changes
  };
}

//promote booklist from a component to a container - it needs to know about this new dispatch method, selectbook. make it available as a prop.
//dont want to export the class - we want to export the container aka the thing that contains the state/props
export default connect(mapStateToProps, mapDispatchToProps)(BookList); //creates a container that holds the value of state that redux holds
