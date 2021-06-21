import React from 'react';


const Register = ({onRouteChange})=>{

    var email;
    var password;
    var name;

    const register = ()=>{
        console.log("emaile ", email);
        console.log("pass ", password);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password:password, name:name})
        };
        fetch('http://localhost:3000/signup', requestOptions)
            .then(response => {
                if(response.status===200){
                    console.log("done");
                    onRouteChange('home')
                } else {
                    console.log(response.json())
                }
            });
        
    }

    return (
        <div>
            <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" onChange={
                                (event)=>{
                                    name = event.target.value;
                                }
                            }/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={
                                (event)=>{
                                    email = event.target.value;
                                }
                            }/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={
                                (event)=>{
                                    password = event.target.value;
                                }
                            }/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={register}/>
                        </div>
                    </div>
                </main>
            </article>
        </div>
    );
}


export default Register;