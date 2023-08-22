import { useState } from "react"

import PriceResult from "./PriceResults"

import { cu } from "../components/instructorViewTitle"

import Select from 'react-select';

import { useEffect } from "react";

import { useParams, useSearchParams } from 'react-router-dom';

import CourseDetails from "./CourseDetails";

import NavbarInstructor from "./NavbarInstructor";

const PriceFilter = () => {

        const [Price, setPrice] = useState(0)

        const [error, setError] = useState(null)

        const [showfiltered, setShowFiltered] = useState(false)

        const [courses, setCourses] = useState(null)

        var [coursesF, setCoursesF] = useState(null)

        const [actionselected, setactionselected] = useState('')
        const params = useParams();
        const insid = params.id
        console.log(insid)


        useEffect(() => {

                const fetchCourses = async () => {

                        const response = await fetch('/api/course')

                        const json = await response.json()

                        if (response.ok) {

                                setCourses(json.filter(c => { return c.Course_instructor === insid }))
                                setCoursesF(json.filter(c => { return c.Course_instructor === insid }))

                        }
                }

                fetchCourses();

        }, [])


        function clicked() {
                let low = 0;
                let high = 0;

                console.log(actionselected)

                if (actionselected === "0 -> 200") {
                        low = 0;
                        high = 200;

                        setCoursesF(courses.filter(c => { return c.Course_price >= low && c.Course_price <= high }))
                        console.log("kk")
                }
                else if (actionselected === "200 -> 400") {
                        low = 200;
                        high = 400;

                        setCoursesF(courses.filter(c => { return c.Course_price >= low && c.Course_price <= high }))
                }
                else if (actionselected === "400 -> 600") {
                        low = 400;
                        high = 600;

                        setCoursesF(courses.filter(c => { return c.Course_price >= low && c.Course_price <= high }))
                }
                else {
                        low = 600;

                        setCoursesF(courses.filter(c => { return c.Course_price >= low }))
                        console.log("hhh")
                }

                console.log("HIGH : " + high)
                console.log("LOW : " + low)
                console.log(courses)


        }

        const actions = [
                { label: "0 -> 200" },
                { label: "200 -> 400" },
                { label: "400 -> 600" },
                { label: "> 600" }

        ]

        console.log("FFFF" + coursesF)

        return (



                <div className="subjectF">


                        price:<Select options={actions}

                                id="drpdwn"

                                onChange={(e) => setactionselected(e.label)} />





                        <button onClick={clicked}>Search</button>

                        <h4>Your Courses: </h4>

                        {coursesF && coursesF.map((course) => (

                                <CourseDetails key={course._id} course={course} />
                        ))}



                </div>

        )





}

export let thePrice = -1

export default PriceFilter