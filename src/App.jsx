import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Features from './Components/Features/Features';
import Footer from './Components/Footer/Footer';
import FetchData from './Service/FetchData';
import Calendar from './Components/Calendar/Calendar';
import Details from './Components/Details/Details';
import './style.css';

class App extends React.Component {

  fetchData = new FetchData();

  state = {
    rocket: 'Falcon 1',
    rocketFeatures: null,
    rockets: [],
    company: null,
  };

  componentDidMount() {
    this.updateRocket();
    this.updateCompany();
  }

  updateRocket() {
    this.fetchData.getRocket().then(data => {
      this.setState({ rockets: data.map(item => item.name) });
      return data;
    })
      .then(data => data.find(item => item.name === this.state.rocket))
      .then(rocketFeatures => this.setState({ rocketFeatures }));
  }

  changeRocket = rocket => {
    this.setState({ rocket }, this.updateRocket());
  };

  updateCompany = () => {
    this.fetchData.getCompany().then(data => this.setState({ company: data }));
  };

  render() {
    return (
      <BrowserRouter>
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket} />
        <Route exact path='/' render={() => this.state.company && <Home company={this.state.company} />} />
        <Route path='/rocket/:rocket'
          render={() => this.state.rocketFeatures && <Features {...this.state.rocketFeatures} />} />
        <Route path='/calendar' component={Calendar} />
        <Route path='/details/:id' component={Details} />
        {this.state.company && <Footer {...this.state.company} />}
      </BrowserRouter>
    );
  }
}

export default App;
