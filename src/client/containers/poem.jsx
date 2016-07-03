import React from 'react';

class Poem extends React.Component {
  render() {
    if (this.props.poemUserList.length === 0) {
      return null;
    }
    return (
      <div className="row">
        <div className="six columns">
          <h3>Edit the poem here</h3>
          <form>
            <input type="textarea" value={this.props.poem} onKeyPress={this.props.editPoem}></input>
          </form>
        </div>
      </div>
    );
  }
}

export default Poem;

Poem.propTypes = {
  poemUserList: React.PropTypes.array,
  poem: React.PropTypes.string,
  editPoem: React.PropTypes.func,
};
