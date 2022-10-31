import React, { Component } from 'react';
import Header from './Header';
import fetchDetailCourse from '../utils/fetchDetailCourse'
class DetailCourseClass extends Component {
    constructor(props) {
        super(props);
        this.state = {  data:{},
                        chapterIndex: 0,
                        lessonIndex: 0,
                        };
        this.handleNextButton = this.handleNextButton.bind(this);
        this.handlePreviousButton = this.handlePreviousButton.bind(this);
        this.fetchResponseAPI = this.fetchResponseAPI.bind(this);
    }
    async fetchResponseAPI(course,user){
        try{
            const responseAPI = await fetchDetailCourse(course, user); 
            const response = responseAPI.data;
            this.setState({
                data: response
            })
        }
        catch{
            throw Error('Error API not loaded');
        }
    }

    componentDidMount() {
        const {match:{
            params:{
                course_id,
                user_id
            }
        }} = this.props;
        this.fetchResponseAPI(course_id,user_id);
    }
   
    handleNextButton(e){
        e.preventDefault();
        const {chapterIndex, lessonIndex, data} = this.state;
        if (data.chapters[chapterIndex].lessons[lessonIndex + 1]){ 
            this.setState({
                lessonIndex: lessonIndex + 1
            });
            return
        }
        else if(!data.chapters[chapterIndex].lessons[lessonIndex + 1]){
            if(data.chapters[chapterIndex + 1]){
                this.setState({
                    chapterIndex: chapterIndex + 1,
                    lessonIndex: 0
                });
                return
            }
            else if(!data.chapters[chapterIndex + 1]){
                this.setState({
                    chapterIndex: 0,
                    lessonIndex: 0
                });
                return
            }
        }
    }

    handlePreviousButton(e){
        e.preventDefault();
        const {chapterIndex, lessonIndex, data} = this.state;
        if (data.chapters[chapterIndex].lessons[lessonIndex - 1]){ 
            this.setState({
                lessonIndex: lessonIndex - 1
            });
            return
        }
        else if(!data.chapters[chapterIndex].lessons[lessonIndex - 1]){
            if(data.chapters[chapterIndex - 1]){ 
                this.setState({
                    chapterIndex: chapterIndex - 1,
                    lessonIndex: data.chapters[chapterIndex - 1].lessons.length-1
                });
                return
            }
            else if(!data.chapters[chapterIndex - 1]){ 
                this.setState({
                    chapterIndex: data.chapters.length-1,
                    lessonIndex: data.chapters[data.chapters.length-1].lessons.length-1
                });
                return
            }
        }    
    }
    render() {
        const {chapterIndex, lessonIndex,data} = this.state;
        return (
            <div className='detailCourse'>
            <Header></Header>
            <main className='iframeMain'>
                {
                    Object.keys(data).length? 
                    <p>{data.chapters[chapterIndex].lessons[lessonIndex].title}</p> :
                    <p>{'loading'}</p>
                }

                {
                    Object.keys(data).length?
                    <iframe title='videoplayer' src={data.chapters[chapterIndex].lessons[lessonIndex].link} 
                        width={1300} height={500}>
                    </iframe> :
                    <iframe title='videoplayer' src={''} 
                        width={1300} height={500}>
                    </iframe>
                }
                
                <p>{
                    Object.keys(data).length?
                    data.chapters[chapterIndex].lessons[lessonIndex].link:'loading'
                    }
                </p>

                <div className="buttonControls">
                    {
                        Object.keys(data).length? 
                        <button id='prevBtn' onClick={this.handlePreviousButton}>prev</button>:
                        <button id='prevBtn' >loading</button>
                    }
                    {   
                        Object.keys(data).length? 
                        <button id='nextBtn' onClick={this.handleNextButton}>next</button>:
                        <button id='nextBtn' >loading</button>
                    }
                </div>
            </main>
            </div>
        );
    }

}

export default DetailCourseClass;