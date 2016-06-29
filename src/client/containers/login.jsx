import React, { PropTypes } from 'react';

class LoginBox extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="twelve columns">Login Please</div>
        <div className="six columns">
          <form>
            <input type="textarea" value={this.props.txtvalue} onChange={this.props.textType} />
            <button onClick={this.props.login}>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

LoginBox.propTypes = {
  txtvalue: PropTypes.string,
  textType: PropTypes.func,
  login: PropTypes.func,
  username: PropTypes.string,
};

export default LoginBox;
