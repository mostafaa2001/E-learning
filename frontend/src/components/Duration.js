import axios from 'axios'
import { useState, useEffect } from 'react'

const Duration = () => {
    const [duration, setduration] = useState([])
    var [hours, sethours] = useState(0)
    var [minuets, setminutes] = useState(0)
    var [seconds, setseconds] = useState(0)

    useEffect(() => {
        const fetchduration = async () => {
            await axios.get("https://www.googleapis.com/youtube/v3/videos?id=9bZkp7q19f0&part=contentDetails&key=AIzaSyDyom8DRF3PS61BtoCs9wkolg7hSPx9fbE").then((response) => {
                setduration(response.data.items[0].contentDetails.duration.match(/\d+/g))
                console.log("--------------")
                setminutes(duration[0])
                setseconds(duration[1])
                console.log(minuets)
               
            })

        }
        
        fetchduration();
    }, [])
    
    return (
        <di>gg</di>
    );

}

export default Duration

