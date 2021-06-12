import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import Rank from './components/rank/rank'
import 'tachyons';
import Particles from 'react-particles-js'
import { Component } from 'react';
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
      route:'signIn'
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
    }).then(res =>this.displayBox(this.calculateFaceLocation(res)))
    .catch(err=>console.log(err))
  }

  onRouteChange = (route)=>{
    this.setState({route:route}); 
  }

  render(){

    const { input, route, box } = this.state;

    
    return (
      <div className="App">
        <Particles className="particles"
          params={parameters}
        />
        <Navigation onRouteChange={this.onRouteChange}  isSignedIn={route==='home'}/>
        {route==="signIn"?<Login onRouteChange = {this.onRouteChange}/>:
          (route==='register'?<Register onRouteChange={this.onRouteChange}/>:
          <div>
            <Logo />
            <Rank />
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
