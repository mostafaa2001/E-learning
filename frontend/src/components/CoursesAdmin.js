import { refType } from "@mui/utils";
import { useState, useEffect } from "react";
import { Button } from "react-admin";
import Admin from "../pages/Admin";
const Courses = () => {
    const [courses, setCourses] = useState([])
    var [selected, setselected] = useState([])
    var [checked, setchecked] = useState([])
    var [showbutt, setshowbutt] = useState(false)
    const [discount, setdiscount] = useState(0)
    var [minus, setminus] = useState(0)
    var [Course_price, setprice] = useState(0)
    var [toggle,setToggle] = useState(false)
    // const [pricei, setpricei] = useState()

    useEffect(() => {

        const fetchCourses = async () => {

            const response = await fetch('/api/course')



            const json = await response.json()



            if (response.ok) {

                setCourses(json)




            }

        }

        fetchCourses();

    }, [toggle])



    function handleDisc(cid, price, i) {

        checked[i] = !checked[i];

        if (checked[i]) {
            const abc = [...selected, { cid: cid, oldprice: price }]
            setselected(abc)


        }
        else {

            setselected(selected.filter(el => { return cid !== el.cid }));


        }


    }
    console.log(selected);


    const courseDiscount = async () => {
        for (let i = 0; i < selected.length; i++) {
            if (discount > 100) {
                alert("Enter valid number ")
            }
            else {
                const beforedicount = selected[i].oldprice

                minus = beforedicount * (discount / 100)



                Course_price = beforedicount - minus
                console.log(beforedicount)
                console.log(Course_price)
                const p = { Course_price }

                await fetch('/api/course/' + selected[i].cid, {
                    method: 'PATCH',
                    body: JSON.stringify(p),
                    headers: {
                        'Content-Type': 'application/json'
                    },


                })

                



                // window.location.reload()
            }
        }
        setToggle(!toggle)
    }

   

    console.log(selected.length)


    return (
        <main >
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Courses</h1>

                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group me-2">
                        {selected.length !== 0 && <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#disc"> Add Discount </button>}

                    </div>

                </div>
            </div>
            <div class="table-responsive">
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Course Name </th>
                            <th scope="col">Coursev ID</th>
                            <th scope="col">Course price</th>
                            <th scope="col">Select</th>

                        </tr>
                    </thead>
                    <tbody>

                        {courses.map((course, i) => (

                            <tr>

                                <td>{course.Course_subject}</td>
                                <td>{course._id}</td>
                                <td>{course.Course_price}</td>
                                <td> <input onChange={() => handleDisc(course._id, course.Course_price, i)} class="form-check-input" type="checkbox" value="" id="defaultCheck1" /></td>

                            </tr>
                        ))}

                    </tbody>
                </table>



            </div>

            <div class="modal fade" id="disc" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true" >

                <div class="modal-dialog modal-xl" >

                    <div class="modal-content">

                        <div class="modal-header">

                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add Discount</h1>

                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        <div class="modal-body">

                            <input placeholder="Enter Percentage" type="number" min="0" max="100" value={discount} onChange={(e) => setdiscount(e.target.value)}></input>


                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => courseDiscount()} >Save</button>

                        </div>


                    </div>

                </div>

            </div>


        </main>
    );
}
export default Courses
