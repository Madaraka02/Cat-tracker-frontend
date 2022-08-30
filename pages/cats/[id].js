import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineEdit, AiOutlineStop } from 'react-icons/ai';
import { BiCheck } from 'react-icons/bi';
import 'bootstrap/dist/css/bootstrap.css'
import { useRouter } from 'next/router';

function Cat({cat, zonnes}) {
    const router =useRouter()
    const [showMe, setShowMe] = useState(false);
    const [zone, setZone] = useState(false);
    const [submitted, setSubmitted] = useState(false)
    const [status, setStatus] = useState(undefined);

    const [catss, setCatss] = useState([])
    const [isLoading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
      fetch('http://127.0.0.1:8000/api/cats/${params.id}')
        .then((res) => res.json())
        .then((data) => {
          setCatss(data)
          setLoading(false)
        })
    }, [])

    function toggle(){
      setShowMe(!showMe);
    }
    let opts = {
        timeZone: cat.zone,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      },
      formatter = new Intl.DateTimeFormat([], opts);
      var tt =  formatter.format(new Date())


    const apiUrl = 'http://127.0.0.1:8000/api'
    const submitHand = async (e) =>{
        e.preventDefault();
        const options = {
            method: "PUT",
            body: JSON.stringify({
                name:cat.name,
                color:cat.color,
                zone
            }),
            headers:{
                'Content-Type':'application/json',
    
            }
    
        }
        fetch(`${apiUrl}/cats/${cat.id}/edit/`, options).
        then(res=>res.json()).then(response=> {
            
            setZone('')
            setStatus({ type: 'success' });
            router.push('/')
            setSubmitted(true)
            console.log('Cat added successfully')
            console.log(res)
            
        }).catch(error=>console.log(error))
    
    
      }
    
  return (
    <div className='container mt-2 mb-2'>
        <div className='row '>
            <div className='col-md-2'></div>
            <div className='col-md-8'>
            {status?.type === 'success' && 
          <p className="alert alert-success" role="alert" onClick={() => router.push('/')}>
          Cat updated successfully
        </p>}
      {status?.type === 'error' && (
        <p className="alert alert-danger" role="alert">
        Sorry an error occured
      </p>
      )}
                <div className='card shadow-lg'>
                    <div className='card-body '>
                        <h5 className='card-text'>{cat.name}</h5>
                        <p className='card-text'>{cat.color}</p>
                        <p className='card-text'>{cat.zone} ({tt})</p>
              
                    </div>
                </div>
                <div style={{float:'right'}}>
                <button onClick={toggle}  className='btn btn-md text-white' style={{float:'right', borderRadius:'15px', backgroundColor:'blue', outline:'blue', margin:'5px'}}> 
                    <AiOutlineEdit size={15} style={{margin:'5px'}} />
                    Edit</button>
                    </div>

            <div className='card shadow-lg mt-2 mb-2' style={{borderRadius:'15px',display: showMe?"block":"none"}}>
            <div className='card-body'>
              <form onSubmit={submitHand} className='pb-4'>
                
              <div className="form-group">
                <label>Time Zone</label>
                <select 
              onChange={e => setZone(e.target.value)} value={zone}
              style={{borderRadius:'15px', outline:'none'}} class="form-select shadow-lg" aria-label="Default select example">
                <option selected>Open this select menu</option>
                {zonnes.map((zonee) => (
              <option key={zonee} value={zonee}>{zonee}</option>

            ))}
               
              </select>
              </div>
              <div style={{float:'right'}} className="form-row pb-3">
              <button onClick={toggle} className=' btn btn-sm' style={{borderRadius:'15px', margin:'5px', backgroundColor:'#D3D3D3', outline:'#D3D3D3'}}>
                <AiOutlineStop size={15}/>
                cancel</button>
              <button className='btn btn-sm text-white'style={{borderRadius:'15px', backgroundColor:'green', outline:'green'}}  type='submit'>
                <BiCheck size={15}/>
                Save</button>
              </div>
              
            </form>

            </div>

            </div>
            </div>
            <div className='col-md-2'></div>
        </div>
    </div>
  )
}

export default Cat



export const getServerSideProps = async ({ params }) => {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/cats/${params.id}`);
    const ress = await fetch('http://worldtimeapi.org/api/timezone');
    const zonnes = await ress.json();
  
    if (!data) {
      return {
        notFound: true,
      };
    }
  
    const cat = data;
    console.log(cat)
    return {
      props: {
        cat,
        zonnes,

      },
    };
  };