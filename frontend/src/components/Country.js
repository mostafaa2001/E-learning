import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
const Country = () => {
    const [info, setInfo] = useState([]);
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0);
    const [courses, setCourses] = useState([])
    const [from2, setFrom2] = useState("");
    var [Course_price, setCourse_price] = useState(0)
    var [Currency, setCurrency] = useState("")
    // var [cid , setcid] = useState("")
    var cid = ""
    useEffect(() => {

        const fetchCourses = async () => {

            const response = await fetch('/api/course')



            const json = await response.json()



            if (response.ok) {

                setFrom2(json[12].Currency)
                setCourses(json)



            }


        }

        fetchCourses();

    }, [])



    const handleSubmit = async (e) => {

        const pp = { Course_price }
        const cc = { Currency }
        await fetch('/api/course/' , {
            method: 'PATCH',

            body: JSON.stringify(pp , cc),
            headers: {
                'Content-Type': 'application/json'
            },


        })


    }
    const handleSubmit2 = async (e) => {

        const pp = { Course_price }
        const cc = { Currency }
        await fetch('/api/course/' , {
            method: 'PATCH',

            body: JSON.stringify(cc),
            headers: {
                'Content-Type': 'application/json'
            },


        })


    }




    // Calling the api whenever the dependency changes
    useEffect(() => {
        Axios.get(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
            .then((res) => {
                setInfo(res.data[from]);
            })
    }, [from]);

    // Calling the convert function whenever
    // a user switches the currency
    useEffect(() => {
        setOptions(Object.keys(info));
        convert();
    }, [info])

    // Function to convert the currency
    function convert(ppss,llk) {
         var rate = info[to];
    //    console.log(llk)
         cid=llk
         console.log("hhh")
        // console.log(ppss)
         Course_price = ppss * rate;
        // console.log(Course_price)
        Currency=to
        
         handleSubmit()
         handleSubmit2()
        console.log(to)
        console.log(Course_price)
         console.log(Currency)
        console.log(llk)
    }
    console.log(to)
    function convert2(cur){
        console.log("gg")
        console.log(info[to]*cur)
    }
    
    
    


    return (
        
        <div>

            select currency <br />
            <Dropdown options={options}
                onChange={(e) => { setTo(e.value) }}
                value={from} placeholder="From" />


            {courses && courses.map((course) => (

                    convert2(course.Course_price)

            ))}


            {/* <button onClick={()=>convert(300 , "637e600628fa46e31d2c4f87")}>click me</button> */}

        </div>


    )
}

export default Country
