import React, { Component, Fragment } from 'react';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  state = initialState;

  loadUser = user => {
    const { id, name, email, entries, joined } = user;
    this.setState({
      user: {
        id,
        name,
        email,
        entries,
        joined
      }
    });
  };

  handleInputChange = event => {
    this.setState({ input: event.target.value });
  };

  handleRouteChange = route => {
    if (route === 'home') {
      this.setState({ isSignedIn: true });
    } else if (route === 'signout') {
      this.setState(initialState);
    }

    this.setState({ route: route });
  };

  handleSubmit = event => {
    // "https://samples.clarifai.com/face-det.jpg"
    this.setState((prevState, props) => ({
      imageUrl: prevState.input,
      boxes: []
    }));

    fetch('https://lizzie-smart-brain-api.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: this.state.input })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://lizzie-smart-brain-api.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.state.user.id })
          })
            .then(response => response.json())
            .then(data => {
              this.setState({
                user: {
                  ...this.state.user,
                  entries: data.entries
                }
              });
            });
        }
        const boundingBoxes = response.outputs[0].data.regions.map(region => ({
          ...region.region_info.bounding_box
        }));

        for (let box of boundingBoxes) {
          this.addFaceBox(this.calculateFaceLocation(box));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  calculateFaceLocation = data => {
    const image = document.getElementById('inputimage');
    const width = parseInt(image.width, 10);
    const height = parseInt(image.height, 10);

    return {
      leftCol: data.left_col * width,
      topRow: data.top_row * height,
      rightCol: width - data.right_col * width,
      bottomRow: height - data.bottom_row * height
    };
  };

  addFaceBox = box => {
    // make copy of boxes state
    const boxes = [...this.state.boxes];
    boxes.push(box);
    this.setState({ boxes });
  };

  render() {
    const params = {
      particles: {
        number: {
          value: 30,
          density: {
            enable: true,
            value_area: 800
          }
        }
      }
    };

    return (
      <div className="App">
        <Particles className="particles" params={params} />
        <Navigation
          routeChange={this.handleRouteChange}
          signedIn={this.state.isSignedIn}
        />
        {this.state.route === 'home' ? (
          <Fragment>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              changed={this.handleInputChange}
              submitted={this.handleSubmit}
            />
            <FaceRecognition
              imageUrl={this.state.imageUrl}
              boxes={this.state.boxes}
            />
          </Fragment>
        ) : this.state.route === 'signin' || this.state.route === 'signout' ? (
          <Signin
            routeChange={this.handleRouteChange}
            loadUser={this.loadUser}
          />
        ) : (
          <Register
            routeChange={this.handleRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
