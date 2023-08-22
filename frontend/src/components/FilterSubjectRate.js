import { useEffect , useState} from "react"
import CourseDetails2 from "../components/CourseDetails2"

let text =''
const FilterSubjectRate = () =>{
    const [text , setText] = useState('')
    const [check , setcheck] = useState([])
    const [price, setPrice] = useState("")
    const [rate, setrate] = useState([])
    const [courses , setCourses] = useState(null)
    const[filteredcourses , setfilteredcourses] = useState([])
    useEffect(() =>{
        const fetchCourses = async () =>{
            const response = await fetch('/api/course')
            const json = await response.json()

            if(response.ok){
                setCourses(json)
            }
        }
        fetchCourses();
    },[])

    
    function filterSubject()
    {
       for (let i =0 ; i < check.length ;i ++){ 
        
        
        setfilteredcourses( (courses.filter(course =>{
            return (course.Course_subject === check[i])
          })))
        
        

     }

     
     
    }

    function filterRate()
    {
       for (let i =0 ; i < rate.length ;i ++){ 
        
        
        setfilteredcourses( (courses.filter(course =>{
            return (course.Course_overAllRate === parseInt(rate[i],10))
          })))
        
          console.log(rate[i])

     }
    }
    function priceRange(){
      setfilteredcourses( (courses.filter(course =>{
        return (course.Course_price < parseInt(price, 10))
      })))
    }
    function priceRangefree(){
      setfilteredcourses( (courses.filter(course =>{
        return (course.Course_price = 0)})))
      }
    
    function clicked()
    {
      setfilteredcourses(
        courses.filter(course =>{
          return (course.Course_subject === text || course.Course_title === text ||course.Course_instructor === text)
        })
      )
      
            
    }
    const handleckeckedrate = e =>{
      const currentChecked = e.target.value;
      const allCurrentChecked = [...rate];
      const indexFound = allCurrentChecked.indexOf(currentChecked);
  
      let updatedCourses 
      if (indexFound == -1){
        updatedCourses = [...rate,currentChecked ];
        setrate(updatedCourses)
      }
      else {
        updatedCourses = [...rate]
        updatedCourses.splice(indexFound, 1)
        setrate(updatedCourses)
  
      }
    }

   const handleckecked = e =>{
    console.log( "ckecked")
    const currentChecked = e.target.value;
    const allCurrentChecked = [...check];
    const indexFound = allCurrentChecked.indexOf(currentChecked);

    let updatedCourses 
    if (indexFound == -1){
      updatedCourses = [...check,currentChecked ];
      setcheck(updatedCourses)
    }
    else {
      updatedCourses = [...check]
      updatedCourses.splice(indexFound, 1)
      setcheck(updatedCourses)

    }
   }
   
    return(
        <div>
            <div>
        <nav>
            <form  className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" data-search value={text} onChange={(e)=>setText(e.target.value)}
/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={clicked} >Search</button>

    </form>
    </nav>    
    </div> 
        <div calssName= 'text-muted'>
       Filters <span className='fas fa-sliders-h'
       ></span>
    </div> 
    <div>
    {courses && courses.map((course) =>(
                   <div key={course.id} className="form-check">
                   <input className="form-check-input" type="checkbox" name="course" value={course.Course_subject} onChange={handleckecked}id="flexCheckChecked"  />
                   <label className="form-check-label" htmlFor="flexCheckChecked">
                     {course.Course_subject}
                   </label>
                 </div>
                ))}

<div>
      <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={filterSubject} >Filter</button>
</div>
                <div className="form-check" >
                   <input className="form-check-input" type="checkbox" value="0" id="flexCheckChecked"onChange={handleckeckedrate} />
                   <label className="form-check-label" htmlFor="flexCheckChecked">
                     0-1
                   </label>
                 </div>
                 <div className="form-check">
                   <input className="form-check-input" type="checkbox" value="1" id="flexCheckChecked"onChange={handleckeckedrate} />
                   <label className="form-check-label" htmlFor="flexCheckChecked">
                     1-2
                   </label>
                 </div>
                 <div className="form-check">
                   <input className="form-check-input" type="checkbox" value="2" id="flexCheckChecked" onChange={handleckeckedrate} />
                   <label className="form-check-label" htmlFor="flexCheckChecked">
                     2-3
                   </label>
                 </div>
                 <div className="form-check">
                   <input className="form-check-input" type="checkbox" value="3" id="flexCheckChecked" onChange={handleckeckedrate}/>
                   <label className="form-check-label" htmlFor="flexCheckChecked">
                     3-4
                   </label>
                 </div>
                 <div className="form-check">
                   <input className="form-check-input" type="checkbox" value="4" id="flexCheckChecked" onChange={handleckeckedrate}/>
                   <label className="form-check-label" htmlFor="flexCheckChecked">
                     4-5
                   </label>
                 </div>
                 <div>
      <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={filterRate} >Filter</button>
</div>
    </div>
    <div>
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" data-search value={price} onChange={(e)=>setPrice(e.target.value)}
/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={priceRange} >Price</button>
      <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={priceRangefree} >Free</button>

    </div>

    <div className="allcourses"> 
            <div className="courses">
            
            {filteredcourses && filteredcourses.map((course) =>(
                    
                    <CourseDetails2 key={course._id} course = {course} />
                ))}
              </div>

    </div>
    </div>

    )
}

export default FilterSubjectRate  
