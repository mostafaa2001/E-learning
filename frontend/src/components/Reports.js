import { useState, useEffect } from "react";
const Reports = () => {
    var [Reports, setRep] = useState([])
    var [My_Reports, setMyRep] = useState([])
    var [show, setshow] = useState(true)
    var [w, setw] = useState([]);
    const [coorp, setcoorp] = useState([])
    const [indiv, setindiv] = useState([])
    var [isResolved , setisResolved] = useState(false)
    const [idiii , setidiii] = useState('')
    const [typeiii , settypeiii] = useState('')
    const [contentiii , setcontentiii] = useState('')
    const [titleiii , settitleiii] = useState('')
    var [toggle,setToggle] = useState(false)
    useEffect(() => {
        const fetchAdmin = async () => {
            const response = await fetch('/api/admin')
            const json = await response.json()
            setRep(json[0].Reports)
            // .filter(c => {return c.UserId != id && c.UserType === "Coorprate"})
            // console.log(Refund_Requests)
        }
        const fetchcoorp = async () => {
            const response = await fetch('/api/coorp')
            const json = await response.json()
            setcoorp(json)
            console.log(json)

            // setRef(json[0].Refund_Requests)
        }
        const fetchindiv = async () => {
            const response = await fetch('/api/indiv')
            const json = await response.json()
            setindiv(json)
            console.log(json)

            // setRef(json[0].Refund_Requests)
        }
        fetchAdmin();
        fetchcoorp();
        fetchindiv();

    }, [toggle])
    const handleResolved = async(id , type, title,content)=>{

        if(type === "Coorprate"){
           const Myrep =  coorp.filter(c => { return c._id === id })[0].My_Reports
           console.log("BEFOREEEEE      " + Myrep)
           const myfinalrep =  Myrep.findIndex(c => { return c.Report_title === title })
           console.log(title)
           console.log(myfinalrep)
             Myrep[myfinalrep].Report_status = "Resolved"
             console.log("BEFOREEEEE      " + Myrep)
            // const repo = [...My]
            
            await fetch('/api/coorp/' + id, {

                method: 'PATCH',
                body: JSON.stringify({ My_Reports : Myrep }),
                headers: {
                    'Content-Type': 'application/json'
                },
    
    
            })
        }
        else{
            const Myrep =  indiv.filter(c => { return c._id === id })[0].My_Reports
            console.log("BEFOREEEEE      " + Myrep)
            const myfinalrep =  Myrep.findIndex(c => { return c.Report_title === title })
            console.log(title)
            console.log(myfinalrep)
              Myrep[myfinalrep].Report_status = "Resolved"
              console.log("BEFOREEEEE      " + Myrep)
             // const repo = [...My]
             
             await fetch('/api/indiv/' + id, {
 
                 method: 'PATCH',
                 body: JSON.stringify({ My_Reports : Myrep }),
                 headers: {
                     'Content-Type': 'application/json'
                 },
     
     
             })
        }
        
        
        
    }
    const handlePending = async(id , type, title,content)=>{

        if(type === "Coorprate"){
           const Myrep =  coorp.filter(c => { return c._id === id })[0].My_Reports
           console.log("BEFOREEEEE      " + Myrep)
           const myfinalrep =  Myrep.findIndex(c => { return c.Report_title === title })
           console.log(title)
           console.log(myfinalrep)
             Myrep[myfinalrep].Report_status = "Pending"
             console.log("BEFOREEEEE      " + Myrep)
            // const repo = [...My]
            
            await fetch('/api/coorp/' + id, {

                method: 'PATCH',
                body: JSON.stringify({ My_Reports : Myrep }),
                headers: {
                    'Content-Type': 'application/json'
                },
    
    
            })
        }
        else{
            
                const Myrep =  indiv.filter(c => { return c._id === id })[0].My_Reports
                console.log("BEFOREEEEE      " + Myrep)
                const myfinalrep =  Myrep.findIndex(c => { return c.Report_title === title })
                console.log(title)
                console.log(myfinalrep)
                  Myrep[myfinalrep].Report_status = "Pending"
                  console.log("BEFOREEEEE      " + Myrep)
                 // const repo = [...My]
                 
                 await fetch('/api/indiv/' + id, {
     
                     method: 'PATCH',
                     body: JSON.stringify({ My_Reports : Myrep }),
                     headers: {
                         'Content-Type': 'application/json'
                     },
         
         
                 })
        
        }
        
        
        
    }

    const resolvedtrue = () =>{
        setisResolved(true);
    }
    const setattributes= async(id , type , title , content,i)=>{
        setidiii(id);
        settypeiii(type);
        settitleiii(title);
        setcontentiii(content);

        if(Reports[i]){
            Reports[i].IsSeen = "Seen"
        }
        
       console.log(Reports[i])
        await fetch('/api/admin/', {

            method: 'PATCH',
            body: JSON.stringify({ Reports }),
            headers: {
                'Content-Type': 'application/json'
            },


        })
        setToggle(!toggle)
    }
        
    


    return (
        <main >
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Reports</h1>
                
            </div>
            <div class="table-responsive">
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">UserId </th>
                            <th scope="col">User type</th>
                            <th scope="col">Report title</th>
                            <th scope="col">View</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Reports.map((report , i) => (
                            show === true ? <tr>

                                <td>{report.UserId}</td>
                                <td>{report.UserType}</td>
                                <td>{report.Report_title}</td>
                                <td><button onClick={()=>setattributes(report.UserId,report.UserType,report.Report_title,report.Report_content,i)}data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" class="btn btn-dark">View</button></td> 
                                {report.IsSeen === "Unseen"?<td>🔵</td>:<td></td>}
                                <div class="modal fade  modal-lg" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Rate Course</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="sasadiv">
                                                    <strong> You are viewing Report of {report.UserId}</strong>
                                                </div>
                                                <br /> <br />
                                                <div class="course-details">
                                                    {contentiii}
                                                    {/* handleResolved(report.UserId,report.UserType,report.Report_title,report.Report_content) */}
                                                </div>
                                                <button onClick={()=>handleResolved(idiii , typeiii , titleiii , contentiii )}type="button" class="btn btn-success" data-bs-dismiss="modal">Resolved</button><br /> <br />
                                                <button onClick={()=>handlePending(idiii , typeiii , titleiii , contentiii )}type="button" class="btn btn-warning" data-bs-dismiss="modal">Pending</button>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </tr> : <p></p>
                        ))}

                    </tbody>
                </table>
            </div>


        </main>
    );
}
export default Reports
