import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { removeUser, } from '../currentUserSlice';
import { useSelector, useDispatch } from 'react-redux';
//..............................
import Navbar from "../components/Navbar";
import { CgEnter, CgProfile } from "react-icons/cg";
import { MdFace3 } from "react-icons/md";

function Home() {

    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.currentUser)
    const [userList, setUserList] = useState([])
    const [limit, setLimit] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)
    let totalPage =  Math.ceil(userList.length/limit)
    const lastIndex = (limit*currentPage)
    const startIndex  = (lastIndex - limit)


    useEffect(() => {
        if (userData[0]) {
            setLoggedInUser(userData[0]?.name)
        }
        fetchUserList()
        totalPage = Math.ceil(userList.length/limit)
    }, [])

    const handleLogout = (e) => {
        dispatch(removeUser({}))
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchUserList = async () => {
        try { 
            const url = "https://jsonplaceholder.typicode.com/users";
            const response = await fetch(url);
            const result = await response.json();
            console.log(result);
            setUserList(result);
        } catch (err) {
            return err
        }
    }

    const handleSelect =(e)=>{
       if(e.target.value === 'odd'){
       }else{
       }
    }

    const handlePrevious =()=>{
        setCurrentPage(currentPage - 1)
    }

    const handleNext =()=>{
        setCurrentPage(currentPage + 1)
    }
   

  let chunkList = userList.slice(startIndex, lastIndex)

    return (<>
        <div style={{
            backgroundColor : "gray"
        }}>
           <span style={{marginRight: '800px'}}> Photo Managment  </span>
           <span><select onClick={handleSelect}>
            <option value="">select</option>
            <option value="odd">Odd</option>
            <option value="even">Even</option>
            </select></span>
           <span><CgProfile /> {loggedInUser}</span>
           <span><button onClick={handleLogout}>Logout</button></span>
        </div>
        <div className='home-div'>
            
            <div>
                {
                    chunkList && chunkList?.map((item, index) => (
                        <div style={{display: 'inline-block', marginLeft: '150px',padding: '20px', justifyContent: 'center'}} key={index}>
                            <img src= '../../public/1.png' alt="Photo" />
                            <p>{item.name}</p>
                            <p style={{backgroundColor: "gray" , borderRadius : '6px', textAlign: 'center'}}>Album : {item.id}</p>
                        </div>
                    ))
                }
            </div>

            <ToastContainer />
        </div>
        <div style={{position: 'fixed', bottom : '0', right : '0'}}>
        <button disabled={currentPage===1}onClick={()=>handlePrevious()}>Previous</button>
            {Array.from({length: totalPage}, (_, index)=>(
                <button key={index} onClick={()=>setCurrentPage(index+1)}>{index+1}</button>
            ))}
            <button disabled={currentPage===totalPage} onClick={()=>handleNext()}>Next</button>

        </div>
    </>

    )
}

export default Home