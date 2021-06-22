import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEmail: "",
      loginPassword: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({ loginEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ loginPassword: event.target.value });
  };

  checkLoginInfo = () => {
    console.log(this.state);
    const { loginEmail, loginPassword } = this.state;
    console.log("email ", loginEmail);
    console.log("pass ", loginPassword);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    };
    fetch("https://abbasihsn-facedetection-api.herokuapp.com/signin", requestOptions).then((response) => {
      if (response.status === 200) {
        this.props.onRouteChange("home", loginEmail);
      } else {
        console.log(response.json());
      }
    });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <div>
        <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
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
                    onChange={this.onEmailChange}
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
                    onChange={this.onPasswordChange}
                  />
                </div>
              </fieldset>
              <div className="">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign in"
                  onClick={() => this.checkLoginInfo()}
                />
              </div>
              <div className="lh-copy mt3">
                <p
                  onClick={() => onRouteChange("register")}
                  className="f6 link dim black db pointer"
                >
                  Register{" "}
                </p>
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default Login;
