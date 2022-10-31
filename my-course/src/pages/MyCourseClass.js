import React, { Component } from 'react';
import fetchCourses from '../utils/fetchCourseCards';
import Header from './Header';
import CardClass from '../components/CardClass';

class MyCourseClass extends Component {
    constructor(props) {
        super(props);
        this.state = {dataCourse:[]};
        this.navigateToDetailCourse = this.navigateToDetailCourse.bind(this);
        this.fetchCourseCard = this.fetchCourseCard.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    changeState(data){
        this.setState({
           dataCourse: data
        })
    }



    navigateToDetailCourse(e, courseid, userid){
        e.preventDefault();
        const {history} = this.props;
  
        history.push(`/detailcourse/${courseid}/${userid}`)
    }
    async fetchCourseCard(id){

        try{
            const responseAPI = await fetchCourses(id);
            const response = responseAPI.data;
            if(!response.length)return;
            this.setState({
                dataCourse: response
            });
        }

        catch{
            throw Error('Error API not loaded');
        }
    
    }


    componentDidMount() {
        const {match:{params:{id}}} = this.props;
        this.fetchCourseCard(id);
        const localStore = JSON.parse(localStorage.getItem('data_user_login'));
        localStore.user_id = this.props.match.params.id;
        localStorage.setItem("data_user_login", JSON.stringify(localStore));
    }

    componentWillUnmount() {

    }
    
    render() {
        const {dataCourse:courses} = this.state;
        return (
            <div>
                <Header></Header>
                <main>
                <p>Kelas</p> 
                <div className="content">
                <div className="cards">
                    {courses.map((item) => {return <CardClass key={item.course_id} data = {item} navigateToDetailCourse= {this.navigateToDetailCourse}/>}) }
                </div>
                </div>
      </main>
            </div>
        );
    }
}


export default MyCourseClass;