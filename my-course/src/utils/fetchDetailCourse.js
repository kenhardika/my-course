async function fetchDetailCourse(course_id, user_id){
    try{
        const getCourse = await fetch(`https://staging.komunitasmea.com/api/course?course_id=${course_id}&user_id=${user_id}`, {
            method:'GET', 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            mode: 'cors', 
            credentials: 'include',
        });
        const responseCourses = await getCourse.json();
        return responseCourses
    }
    catch{
        throw new Error('Fetch API Failed');
    }    
}
export default fetchDetailCourse