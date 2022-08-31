import Axios from 'axios';
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

function Cats() {

    return ( 
    <div> 
            <div >
            <p >name</p>
            {/* <button className='btn btn-danger' onClick={() => deleteCat(cat.id)}>Delete</button> */}
            </div>
    </div>
    )
    }

    export default Cats;


// export async function getServerSideProps() {
//     const apiUrl = 'http://127.0.0.1:8000/api'
//     const data  = await Axios.get(`${apiUrl}/cats`)

//     return {
//         props: {
//             catss: data.results

//         }, // will be passed to the page component as props
//     }
//     } 

// export async function getStaticProps(context) {
//     // fetch the blog posts from the mock API
//     const res = await fetch('http://127.0.0.1:8000/api/cats');
//     const catss = await res.json();
    
//     return {
//         props: { catss } // props will be passed to the page
//     };
//     } 