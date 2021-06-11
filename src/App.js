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
        dogObject: data
      })
    })
  }

  componentDidMount() {
    this.fetchDog();
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
    const imageElement = <img src={ dogObject.message }></img>
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
