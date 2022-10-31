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

   async fetchTitle(){
        const title = await this.state.data.chapters[this.state.chapterIndex].lessons[this.state.lessonIndex].title;
        // console.log(title);
        return <p> {title} </p>
    }

    async fetchResponseAPI(course,user){
        try{
            const responseAPI = await fetchDetailCourse(course, user); // ToDo: async await
            const response = responseAPI.data;
            // console.log(response);
            this.setState({
                data: response
            })
            // if(!response.length)return;
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
        const {chapterIndex, lessonIndex} = this.state;
        if (this.state.data.chapters[chapterIndex].lessons[lessonIndex + 1]){ // check lessons 1
            // ketika ada chapter & lesson+1
            this.setState({
                lessonIndex: lessonIndex + 1
            });
            console.log(this.state.data.chapters[chapterIndex].lessons[lessonIndex+1].title)
            return
        }
        else if(!this.state.data.chapters[chapterIndex].lessons[lessonIndex + 1]){
            if(this.state.data.chapters[chapterIndex + 1]){ // ketika lesson 1 habis cek chapter+1
                // ketika ada chapter + 1
                this.setState({
                    chapterIndex: chapterIndex + 1,
                    lessonIndex: 0
                });
                console.log(this.state.data.chapters[chapterIndex+1].lessons[0].title)
                return
            }
            else if(!this.state.data.chapters[chapterIndex + 1]){
                this.setState({
                    chapterIndex: 0,
                    lessonIndex: 0
                });
                console.log(this.state.data.chapters[0].lessons[0].title)
                return
            }
        }
    }

    handlePreviousButton(e){
        e.preventDefault();
        const {chapterIndex, lessonIndex} = this.state;
        if (this.state.data.chapters[chapterIndex].lessons[lessonIndex - 1]){ // check lessons - 1
            // ketika ada chapter & lesson-1
            this.setState({
                lessonIndex: lessonIndex - 1
            });
            return
        }
        else if(!this.state.data.chapters[chapterIndex].lessons[lessonIndex - 1]){
        
            if(this.state.data.chapters[chapterIndex - 1]){ // ketika lesson 1 habis cek chapter+1
                // ketika ada chapter + 1
                console.log('hit chapter - 1');
                this.setState({
                    chapterIndex: chapterIndex - 1,
                    lessonIndex: this.state.data.chapters[chapterIndex - 1].lessons.length-1
                });
                return
            }
            else if(!this.state.data.chapters[chapterIndex - 1]){ 
                this.setState({
                    chapterIndex: this.state.data.chapters.length-1,
                    lessonIndex: this.state.data.chapters[this.state.data.chapters.length-1].lessons.length-1
                });
                console.log('deadend')
                return
                // console.log(this.state.data.chapters[0].lessons[0].title)
            }
        }    
    }

    render() {
        const {chapterIndex, lessonIndex} = this.state;
        // console.log(this.state.data.chapters)
        return (
            <div>
            <Header></Header>
            <main>
                {
                    Object.keys(this.state.data).length? 
                    <p>{this.state.data.chapters[chapterIndex].lessons[lessonIndex].title}</p> :
                    <p>{'loading'}</p>
                }

                {
                    Object.keys(this.state.data).length?
                    <iframe title='videoplayer' src={this.state.data.chapters[chapterIndex].lessons[lessonIndex].link} 
                        width={1300} height={500}>
                    </iframe> :
                    <iframe title='videoplayer' src={''} 
                        width={1300} height={500}>
                    </iframe>
                }
                
                <p>{
                    Object.keys(this.state.data).length?
                    this.state.data.chapters[chapterIndex].lessons[lessonIndex].link:'loading'
                }</p>

                <div className="buttonControls">
                    {
                        Object.keys(this.state.data).length? 
                        <button id='prevBtn' onClick={this.handlePreviousButton}>prev</button>:
                        <button id='prevBtn' >loading</button>
                    }
                    {   
                        Object.keys(this.state.data).length? 
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