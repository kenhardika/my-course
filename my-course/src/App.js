import './App_sas.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/Login';
import MyCourseClass from './pages/MyCourseClass';
import DetailCourseClass from './pages/DetailCourseClass';
import ErrorClass from './pages/ErrorClass';


function App() {
  return (
    <Router>
      {/* outside this Routes, (nav & footer) will stay, page wont changing. only inside Routes could change */}
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path="/mycourse/:id" component={MyCourseClass} />
        <Route exact path="/detailcourse/:course_id/:user_id" component={DetailCourseClass} />
        {/* <Route path='/profile/:username' element={<Profile/>}></Route> */}
        <Route exact path='*' component={ErrorClass}/>
      </Switch>
    </Router>
  );
}

export default App;
