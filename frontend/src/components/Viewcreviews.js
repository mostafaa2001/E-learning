import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"



const Viewcreviews = () => {
    const params = useParams()
    const cid = params.id
    const [Reviews, setReviews] = useState([])
    const [Course_subject, setcourse] = useState("")
    const [discount, setdiscount] = useState(0)
    const [beforedicount, setbeforediscount] = useState(0)
    var [minus, setminus] = useState(0)
    var [Course_price, setprice] = useState(0)
    const [show, setshow] = useState(false)
    const [duration, setduarion] = useState(0)
    const [OverallRate, setOverallRate] = useState(0)
    

    useEffect(() => {

        console.log(cid)

        const fetchcourses = async () => {

            const response = await fetch('/api/course')

            const json = await response.json()

            if (response.ok) {
                setcourse(json.filter(c => { return c._id === cid })[0].Course_subject)
                setReviews(json.filter(c => { return c._id === cid })[0].Reviews)
                setbeforediscount(json.filter(c => { return c._id === cid })[0].Course_price)
                //Course_overAllRate
                setOverallRate(json.filter(c => { return c._id === cid })[0].Course_overAllRate)
                console.log(json.filter(c => { return c._id === cid })[0])
            }




        }



        fetchcourses();




    }, [])




    const courseDiscount = async () => {
        if (duration > 365 || discount > 100) {
            alert("Enter valid number ")
        }
        else {
          

            minus = beforedicount * (discount / 100)
           

            console.log(minus)
            Course_price = beforedicount - minus

            console.log(beforedicount)
            console.log(Course_price)
            const p = { Course_price }
            await fetch('/api/course/' + cid, {
                method: 'PATCH',
                body: JSON.stringify(p),
                headers: {
                    'Content-Type': 'application/json'
                },


            })
            setshow(false)
            window.location.reload()
        }
    }

    console.log(discount)
    console.log(beforedicount)
    console.log(Course_price)

   


    return (
        <body class="bg-light">
            <nav class="navbar bg-body-tertiary  navbar-expand-lg bg-dark navbar-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/instructor">E-Learning <i class="bi bi-book-half"></i></a>
                </div>
            </nav>
            <main class="container">
                <div class="d-flex align-items-center p-3 my-3 text-white bg-dark rounded shadow-sm">
                    <div class="lh-1">
                        <h1 class="h6 mb-0 text-white lh-1">{Course_subject}</h1>
                        <br></br>
                        <small>Rating: {OverallRate} <i class="bi bi-star"></i> </small>
                        <br></br>
                        <small>price: {beforedicount} </small>
                        <br></br>
                        <br></br>
                        <button class="btn btn-light" data-bs-toggle="modal" data-bs-target="#disc"> Add Discount</button>
                    </div>
                </div>
                <div class="my-3 p-3 bg-body rounded shadow-sm">
                    <h6 class="border-bottom pb-2 mb-0">Reviews</h6>
                    {Reviews.length === 0 && <h4>No Reviews Availabe</h4>}

                    {Reviews && Reviews.map((Reviewss) => (<div class="d-flex text-muted pt-3">
                        <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#e83e8c" /><text x="50%" y="50%" fill="#e83e8c" dy=".3em">32x32</text></svg>

                        <p class="pb-3 mb-0 small lh-sm border-bottom">
                            <strong class="d-block text-gray-dark">@{Reviewss.ReviewerName}</strong>
                            {Reviewss.ReviewerReview}
                        </p>
                    </div>))}


                </div>


            </main>
            <div class="modal fade" id="disc" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true" >

                <div class="modal-dialog modal-xl" >

                    <div class="modal-content">

                        <div class="modal-header">

                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add Discount</h1>

                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        <div class="modal-body">
                                                    <p>Enter number of days for discount</p>
                            <input placeholder="Enter Number of days for discount" type="number" min="0" max="365" value={duration} onChange={(e) => setduarion(e.target.value)}></input>
                            <p>Enter the amount of discount "Not exceding 100"</p>
                            <input placeholder="Enter Percentage" type="number" min="0" max="100" value={discount} onChange={(e) => setdiscount(e.target.value)}></input>


                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" onClick={() => courseDiscount()} >Save</button>

                        </div>


                    </div>

                </div>

            </div>
        </body>

        // <div>
        //     <nav class="navbar bg-body-tertiary  navbar-expand-lg bg-dark navbar-dark">
        //         <div class="container-fluid">
        //             <a class="navbar-brand" href="/instructor">E-Learning <i class="bi bi-book-half"></i></a>
        //         </div>
        //     </nav>
        //     <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: "300px", height: "650px" }}>
        //         <ul class="nav nav-pills flex-column mb-auto">
        //             <li class="nav-item">
        //                 <a href="#" data-bs-toggle="modal" data-bs-target="#disc" class="nav-link active" aria-current="page">

        //                     Add Discount
        //                 </a>
        //             </li>
        //             <li>
        //                 <a href="#" class="nav-link link-dark">

        //                     Course Reviews
        //                 </a>
        //             </li>
        //             <li>
        //                 <a href="#" class="nav-link link-dark">

        //                     Orders
        //                 </a>
        //             </li>
        //             <li>
        //                 <a href="#" class="nav-link link-dark">

        //                     Products
        //                 </a>
        //             </li>
        //             <li>
        //                 <a href="#" class="nav-link link-dark">

        //                     Customers
        //                 </a>
        //             </li>
        //         </ul>
        //     </div>





        //     {Reviews&&Reviews.map((Reviewss) => (

        //         Reviews? <div class='course-details ReviewInst  '>
        //             sdfgdfewd
        //             <h4>{Reviewss.ReviewerName}</h4>
        //             <p>Review: <strong>{Reviewss.ReviewerReview}</strong></p>
        //         </div>:<h1>No Review</h1>
        //     ))}

        //     {/* <a onClick={() => setshow(true)} class="btn btn-primary" key={cid}>Add Discount</a> */}

        //     {/* {show === true ? <input onChange={(e) => setdiscount(e.target.value)} value={discount} type="number" placeholder="discount" /> : <p></p>}

        //     {show === true ? <button onClick={() => courseDetails()} type="button" class="btn btn-danger">SAVE</button>
        //         : <p></p>}

        //     */}
        // </div>
    );
}
export default Viewcreviews