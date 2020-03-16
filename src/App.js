import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './pageSections/Home'
import NavigationBar from './pageSections/NavigationBar'
import Footer from './pageSections/Footer'

class App extends React.Component{
  render(){
    return(
      <>
      <style dangerouslySetInnerHTML={{__html: `
      input:invalid{
        border: 20px dashed green !important;
      }
    `}}/>


      <BrowserRouter>
        <NavigationBar/>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
        <Footer/>
      </BrowserRouter>
      </>
    );
  }
}
//NOTE: exact will make sure slash shows home but doesn't come up for /about and /contact aswell

export default App;
