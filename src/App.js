import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import Rank from './components/rank/rank'
import 'tachyons';
import Particles from 'react-particles-js'
import React, { Component } from 'react';
import Clarifai from 'clarifai'
import FaceRecognitionResult from './components/faceRecognition/faceRecognition'
import Login from './components/loginPage/login'
import Register from './components/register/register'



const app = new Clarifai.App({
  apiKey:'385932e4b8af411fa593fb2c1c051e26'
});
const parameters = {
  "particles": {
    "number": {
        "value": 10,
        "density": {
            "enable": false
        }
    },
    "size": {
        "value": 10,
        "random": true
    },
    "move": {
        "direction": "bottom",
        "out_mode": "out"
    },
    "line_linked": {
        "enable": false
    }
},
"interactivity": {
    "events": {
        "onclick": {
            "enable": true,
            "mode": "remove"
        }
    },
    "modes": {
        "remove": {
            "particles_nb": 10
        }
    }
}
};

class App extends Component{

  constructor(){
    super();
    this.state = {
      input:"", 
      box:{},
      route:'signIn',
      userInfo:{}
    }
  }

  onInputChange=(event)=>{
    this.setState({input:event.target.value});
    console.log(event.target.value);
  }

  calculateFaceLocation =(response)=>{
    const data = response.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(data);
    const image = document.getElementById('inputImage');
    const width = image.width;
    const height = image.height;
    console.log(width, height);
    return {
      leftCol: data.left_col * width,
      topRow: data.top_row * height,
      rightCol: width - (data.right_col * width),
      bottomRow: height - (data.bottom_row * height)
    };
  }

  displayBox = (box)=>{
    console.log('box', box);
    this.setState({box:box});
  }

  onButtonSubmit = ()=>{
    console.log('click');
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, {
      url: this.state.input
    }).then(res =>{
      console.log("id: ",this.state.userInfo.id)
      this.displayBox(this.calculateFaceLocation(res))
      const requestOptions = {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: this.state.userInfo.id})
    };
    fetch('http://localhost:3000/postImage', requestOptions)
        .then(response => response.json())
        .then(res=>{
          console.log("here: ",res)
          this.setState({
            userInfo:res
          });
        });
    })
    .catch(err=>console.log(err))
  }

  onUserSignUp = (user)=>{
    this.setState({userInfo:user});
    this.onRouteChange('home');
      console.log("yessss")
  }

  onRouteChange = (route, email)=>{
    if(route==="home"){
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email})
      };
      console.log("user: ", JSON.stringify({ email: email}))
      fetch('http://localhost:3000/user', requestOptions)
            .then(response => response.json())
            .then(res=>{
                    this.setState({
                      userInfo:res
                    });
            });
    } else if(route==="signIn"){
      this.setState({input:""})
    }
    this.setState({route:route}); 
    
  }


  render(){

    const { input, route, box, userInfo} = this.state;

    
    return (
      <div className="App">
        <Particles className="particles"
          params={parameters}
        />
        <Navigation onRouteChange={this.onRouteChange}  isSignedIn={route==='home'}/>
        {route==="signIn"?<Login onRouteChange = {this.onRouteChange}/>:
          (route==='register'?<Register onRouteChange={this.onRouteChange} updateUser={this.onUserSignUp}/>:
          <div>
            <Logo />
            <Rank score={userInfo.entries} name={userInfo.name}/>
            <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognitionResult box={box} imageUrl={input}/>
          </div>
          )
        }
      </div>
    );
  }
}

export default App;
