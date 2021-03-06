import React, { Component } from 'react';

class Signin extends Component {
  state = {
    signinEmail: '',
    signinPassword: ''
  };

  submitHandler = () => {
    fetch('https://lizzie-smart-brain-api.herokuapp.com/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.signinEmail,
        password: this.state.signinPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.routeChange('home');
        }
      });
  };

  render() {
    const { routeChange } = this.props;

    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={event =>
                    this.setState({ signinEmail: event.target.value })
                  }
                  value={this.state.email}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={event =>
                    this.setState({ signinPassword: event.target.value })
                  }
                  value={this.state.password}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={this.submitHandler}
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => routeChange('register')}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
