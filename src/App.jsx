import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Features from './Components/Features/Features';
import Footer from './Components/Footer/Footer';
import FetchData from './Service/FetchData';
import Calendar from './Components/Calendar/Calendar';
import Details from './Components/Details/Details';
import './style.css';

const fetchData = new FetchData();

const App = () => {

  const [rocket, setRocket] = useState('Falcon 1');
  const [rocketFeatures, setRocketFeatures] = useState(null);
  const [rockets, setRockets] = useState([]);
  const [company, setCompany] = useState(null);

  useEffect(() => {

    fetchData.getRocket().then(data => {
      setRockets(data.map(item => item.name));
      return data;
    })
      .then(data => data.find(item => item.name === rocket))
      .then(rocketFeatures => setRocketFeatures(rocketFeatures));

    fetchData.getCompany().then(company => setCompany(company));

  }, [rocket]);

  const changeRocket = rocket => {
    setRocket(rocket);
  };

  return (
    <BrowserRouter>
      <Header rockets={rockets} changeRocket={changeRocket} />
      <Route exact path='/' render={() => company && <Home company={company} />} />
      <Route path='/rocket/:rocket'
        render={() => rocketFeatures && <Features {...rocketFeatures} />} />
      <Route path='/calendar' component={Calendar} />
      <Route path='/details/:id' component={Details} />
      {company && <Footer {...company} />}
    </BrowserRouter>
  );
};

export default App;

// const App = () => {

//   const [rocket, setRocket] = useState('Falcon 1');
//   const [rocketFeatures, setRocketFeatures] = useState(null);
//   const [rockets, setRockets] = useState([]);
//   const [company, setCompany] = useState(null);

//   const fetchData = React.useMemo(() => new FetchData(), []);

//   const updateRocket = React.useCallback(() => {
//     fetchData.getRocket().then(data => {
//       setRockets(data.map(item => item.name));
//       return data;
//     })
//       .then(data => data.find(item => item.name === rocket))
//       .then(rocketFeatures => setRocketFeatures(rocketFeatures));
//   }, [fetchData, rocket]
//   );

//   const changeRocket = rocket => {
//     setRocket(rocket);
//   };

//   const updateCompany = React.useCallback(() => {
//     fetchData.getCompany().then(company => setCompany(company));
//   }, [fetchData]);

//   useEffect(() => {
//     updateRocket();
//     updateCompany();
//   }, [updateCompany, updateRocket]);

//   return (
//     <BrowserRouter>
//       <Header rockets={rockets} changeRocket={changeRocket} />
//       <Route exact path='/' render={() => company && <Home company={company} />} />
//       <Route path='/rocket/:rocket'
//         render={() => rocketFeatures && <Features {...rocketFeatures} />} />
//       <Route path='/calendar' component={Calendar} />
//       <Route path='/details/:id' component={Details} />
//       {company && <Footer {...company} />}
//     </BrowserRouter>
//   );
// };

// export default App;
