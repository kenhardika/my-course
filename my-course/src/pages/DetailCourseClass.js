// penggunaan componentDidUpdate jangan kaya gini dan ngga perlu sampe pake componentDidUpdate untuk ngubah link per chapter nya

// flow nya dibikin simple aja ada 2 state untuk track lesson nya
// chpaterIndex dan lessonIndex, setiap next atau prev button lihat lessonIndex sebelum atau sesudah nya berdasarkan chapterIndex kalo memang ada tinggal lanjut kalo sudah tidak ada maka update chapterIndexnya

// contoh klik next apabila ada chapter atau index selanjutnya.

// ketika klik next
// check indexLesson + 1, apakah msaih ada lesson di dengan indexLesson + 1 di chapterIndex nya
// klo masih ada update indexLesson + 1
// klo sudah tidak ada cek chapterIndex + 1 masih ada chapter atau tidak
// klo masih ada update chapterIndex + 1 dan kembalikan indexLesson jadi 0
// contoh kode sederhana


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
        // this.fetchTitle = this.fetchTitle.bind(this);
    }

    // fetchTitle(){
    //     const title = this.state.data.chapters[this.state.chapterIndex].lessons[this.state.lessonIndex].title;
    //     console.log(title);
    //     return <p> {title} </p>
    //     // console.log('fetch title')
    // }

    async fetchResponseAPI(course,user){
        try{
            const responseAPI = await fetchDetailCourse(course, user); // ToDo: async await
            const response = await responseAPI.data;
            // if(!response.length)return;
            this.setState({
                data: response
            });
            // console.log(response)
                // console.log(this.state.dataCourse)
        }

        catch{
            throw Error('Error API not loaded');
            // console.log('loading fetch api...')
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

        // if(this.state.data.length>0){
        //     // const {chapterIndex, lessonIndex} = this.state;
        //     console.log(this.state.data);
        // }
    }

    componentDidUpdate(prevProps, prevState){ // todo : ubah jadi tidak pakai componentdidupdate
        // console.log(prevState);
        // const {data:{chapters}} = prevState;
        // if(this.state.link.length){
        //     return
        // }
        // else if(!this.state.link.length){
        //     chapters.map((arr)=>
        //         arr.lessons.map((lesson)=>
        //         // prev = this.state previous, next = this.state kosong
        //         this.setState((prev)=>({
        //                 link: prev.link.concat(lesson.link),
        //                 title: prev.title.concat(lesson.title),
        //                 lesson_id: prev.lesson_id.concat(lesson.lesson_id),
        //             }
        //         ))
        //         )
        //     )
        //     return
        // }
    }
   
    handleNextButton(e){
        e.preventDefault();
        const {chapterIndex, lessonIndex} = this.state;
        // console.log(chapters);
        // console.log(lessons);
        if (this.state.data.chapters[chapterIndex].lessons[lessonIndex + 1]){ // check lessons 1
            // ketika ada chapter & lesson+1
            
            // console.log('change state lesson index + 1');
            this.setState({
                lessonIndex: lessonIndex + 1
            });
            // console.log('tampilkan index yang + 1');

            console.log(this.state.data.chapters[chapterIndex].lessons[lessonIndex].title)
            console.log(this.state.data.chapters[chapterIndex].lessons[lessonIndex + 1]);            
        }
        else if(!this.state.data.chapters[chapterIndex].lessons[lessonIndex + 1]){
        
            
            if(this.state.data.chapters[chapterIndex + 1]){ // ketika lesson 1 habis cek chapter+1
                // ketika ada chapter + 1
                this.setState({
                    chapterIndex: chapterIndex + 1
                });
                this.setState({
                    lessonIndex: 0
                });
                // console.log(lessonIndex);
                // console.log('changeState lesson index = 0');
                // console.log('change state chapter index jadi + 1');
                console.log(lessonIndex);
                console.log('next chapter 1+' + chapterIndex);

                console.log(this.state.data.chapters[chapterIndex + 1].lessons[0]);            
            }
            else if(!this.state.data.chapters[chapterIndex + 1]){
                this.setState({
                    chapterIndex: 0
                });
                this.setState({
                    lessonIndex: 0
                });
                console.log('change state chapter index jadi 0');
                console.log('change state lesson index jadi 0');
                console.log(this.state.data.chapters[0].lessons[0]);            
            }

        }
        
        // console.log(this.state.title[47]);
        // if(this.state.counter >= (this.state.title.length-1)){
        //     this.setState(prev=>({
        //         counter: (prev.counter+1) - (this.state.title.length) 
        //     }));
        // }
        // else{
        //     this.setState(prev=>({
        //         counter: prev.counter +1 
        //     }));
        // }
    }

    handlePreviousButton(e){
        e.preventDefault();
        // if(this.state.counter === 0){
        //     this.setState(prev=>({
        //         counter: prev.counter + (this.state.link.length-1) 
        //     }));
        // }
        // else{
        //     this.setState(prev=>({
        //         counter: prev.counter - 1 
        //     }));
        // }
     
    }
   

    render() {
        // console.log(this.state.data);
        // const fetchTitle = React.lazy(()=> this.fetchTitle);
        const {chapterIndex, lessonIndex} = this.state;
        // console.log(this.state.data.chapters[chapterIndex].lessons[lessonIndex]);
        
        
        // console.log(this.state.title);
        // console.log(this.state.counter);
        // const counter = this.state.counter;
        // const [...title] = this.state.title;
        // const [...link] = this.state.link;

        // console.log(this.state.link[this.state.counter])
        // if(!this.state.data){
        //     console.log('waiting for data');
        // }

        return (
            <div>
            <Header></Header>
            <main>
                
                {
                    this.state.data.length? 
                    <p>{this.state.data.chapters[chapterIndex].lessons[lessonIndex].title}</p> :
                    <p>{'default'}</p>
                }

                {/* <VideoCourse link={link[this.state.counter]}></VideoCourse> */}
                <iframe title='videoplayer' src={''} 
                        width={1300} height={500} >
                </iframe>
                <p>{'link[counter]'}</p>
                {/* {chapters.map((arr)=><li key={arr.chapter_id}> </li>)} */}

                <div className="buttonControls">
                    <button id='prevBtn' onClick={this.handlePreviousButton}>prev</button>
                    <button id='nextBtn' onClick={this.handleNextButton}>next</button>
                </div>
            </main>
            </div>
        );
    }

}

export default DetailCourseClass;