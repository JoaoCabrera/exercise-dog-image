import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super()

    this.fetchDog = this.fetchDog.bind(this);
    this.nextImage = this.nextImage.bind(this);

    this.state = {
      dogObject: '',
      loading: true,
      storedDogs: [],
    }
  }

  fetchDog() {
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => {
      this.setState({
        dogObject: data.message
      })
    })
  }

  componentDidMount() {
    this.fetchDog();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.dogObject.includes("terrier")) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    localStorage.setItem("dogURL", this.state.dogObject);
    const breed = this.state.dogObject.split("/")[4];
    alert(breed);
  }

  nextImage() {
    this.setState(({ dogObject }) => ({
      dogObject: ''
    }))

    this.fetchDog();
  }

  render() {
    const { dogObject } = this.state;
    const loadingElement = <h3>Carregando...</h3>
    const imageElement = <img src={ dogObject }></img>
    return (
      <div>
        <h1>Doguinhos</h1>
        <button onClick={ this.nextImage }>Próxima</button>
        <br />
        <div>{ dogObject ? imageElement : loadingElement }</div>
      </div>
    )
  }
}

export default App;
