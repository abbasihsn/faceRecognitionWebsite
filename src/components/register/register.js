import React, { Component} from 'react';


class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
          loginEmail: "",
          loginPassword: "",
          loginName:""
        };
      }
    
      onEmailChange = (event) => {
        this.setState({ loginEmail: event.target.value });
      };
    
      onPasswordChange = (event) => {
        this.setState({ loginPassword: event.target.value });
      };

      onNameChange = (event) => {
        this.setState({ loginName: event.target.value });
      };

    register = ()=>{
        console.log(this.state);
        const { loginEmail, loginPassword, loginName} = this.state;
        const { updateUser} = this.props;
        console.log("email ", loginEmail);
        console.log("pass ", loginPassword);
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: loginEmail, password:loginPassword, name:loginName})
        };
        fetch('https://abbasihsn-facedetection-api.herokuapp.com/signup', requestOptions)
            .then(response => response.json())
            .then(data=>{
                if(data){
                    updateUser(data);
                } else {
                    console.log(data)
                }
            });
        
    }

    render(){
        return (
            <div>
                <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" onChange={this.onNameChange}/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
                            </div>
                            </fieldset>
                            <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={this.register}/>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}


export default Register;