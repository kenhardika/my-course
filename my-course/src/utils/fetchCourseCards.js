async function fetchCourses(user_id){
    try{
        const getCourse = await fetch(`https://staging.komunitasmea.com/api/user/${user_id}/courses/active`, {
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
export default fetchCourses