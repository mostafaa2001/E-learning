import { useState, useEffect } from "react"
const Refund = () => {
    var [Refund_Requests, setRef] = useState([])
    var [show,setshow] = useState(true)
    var [w,setw] = useState(0);
    const [indiv, setindiv] = useState([])
    useEffect(() => {
        const fetchAdmin = async () => {
            const response = await fetch('/api/admin')
            const json = await response.json()
            setRef(json[0].Refund_Requests)
            // .filter(c => {return c.UserId != id && c.UserType === "Coorprate"})
            console.log(Refund_Requests)
        }
        const fetchindiv = async () => {
            const response = await fetch('/api/indiv')
            const json = await response.json()
            setindiv(json)
            console.log(json)
            // setRef(json[0].Refund_Requests)
        }           
        fetchAdmin();
        fetchindiv();

    }, [])
    
    // const fetchcoorp = async (id) => {
    //     alert(id)

    //     const response = await fetch('/api/coorp/'+id)
    //     console.log(response)
    //     const json = await response.json()
    //     console.log(json)
    //     setw(json.Wallet)
    //     console.log(w)
    // }
    const toWallet = async(id,type,amount)=>{
        alert(id +  " "+ type +" " + amount  )

        console.log(Refund_Requests)
        if(type === "Individual"){
           
          
            console.log(  indiv)
           
            await fetch('/api/indiv/' + id, {
                method: 'PATCH',
                body: JSON.stringify({ Wallet:(indiv.filter(c => { return c._id === id })[0].Wallet+amount) }),
                headers: {
                    'Content-Type': 'application/json'
                },
    
    
            })
            console.log(Refund_Requests)
           const Refund_Requests2 = [...Refund_Requests.filter(c => {return c.UserId !== id && c.UserType === "Individual"})]
           console.log(Refund_Requests2)
           await fetch('/api/admin/' , {
            method: 'PATCH',
            body: JSON.stringify({ Refund_Requests:Refund_Requests2}),
            headers: {
                'Content-Type': 'application/json'
            },


        })
        }
    }
    return (

        <main >
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Refunds</h1>
               
            </div>
            <div class="table-responsive">
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>

                            <th scope="col">User ID</th>
                            <th scope="col">User Type</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>
                            {/* <th scope="col">State</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {Refund_Requests.map((refund) => (
                         show === true?    <tr>

                              <td>{refund.UserId}</td>
                                <td>{refund.UserType}</td>
                                <td>{refund.Amount}</td>
                                <td><button onClick={()=>toWallet(refund.UserId,refund.UserType,refund.Amount)}type="button"  class="btn btn-dark">Accept</button></td>
                                

                            </tr>:<p></p>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </main>
    );
}
export default Refund