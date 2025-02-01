import React, { useEffect, useState } from 'react'
import { useActionData, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { removeUser, } from '../currentUserSlice';
import { useSelector, useDispatch } from 'react-redux';
import { CgEnter, CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";

function Home() {

    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.currentUser)
    const [userList, setUserList] = useState([])
    const [limit, setLimit] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('')
    const [searchedObj, setSearchedObj] = useState({})
    let totalPage = Math.ceil(userList.length / limit)
    const lastIndex = (limit * currentPage)
    const startIndex = (lastIndex - limit)

    const style = { display: 'inline-block', marginLeft: '150px', padding: '20px', justifyContent: 'center' }
    const styleCard = { display: 'inline-block', marginLeft: '150px', padding: '20px', justifyContent: 'center', border: "2px solid white", borderRadius: "38px", backgroundColor: "#0f0c0c" }




    useEffect(() => {
        if (userData[0]) {
            setLoggedInUser(userData[0]?.name)
        }
        fetchUserList()
        totalPage = Math.ceil(userList.length / limit)
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

    const handleSelect = (e) => {
        userList?.forEach(item => delete item.flag)
        let tempList = [...userList]
        if (e.target.value === 'odd') {
            tempList.forEach(item => {
                if (item.id % 2 === 1) {
                    item['flag'] = true
                }
            })
        } if (e.target.value === 'even') {
            tempList.forEach(item => {
                if (item.id % 2 === 0) {
                    item['flag'] = true
                }
            })
        }
        setUserList(tempList)
    }

    const handlePrevious = () => {
        setCurrentPage(currentPage - 1)
    }

    const handleNext = () => {
        setCurrentPage(currentPage + 1)
    }

    const handleSearch = () => {
        let obj = userList.find(item => item.id == Number(search))
        if (!obj) {
            setSearch('')
            setSearchedObj({})
            return handleError("Not Found User")
        } else {
            setSearchedObj(obj)
            handleSuccess('User Found')
        }
    }


    let chunkList = userList.slice(startIndex, lastIndex)
    console.log("chunkList ", chunkList)

    return (<>
        <div style={{
            backgroundColor: "gray"
        }}>
            <span style={{ marginRight: '800px' }}> Photo Managment  </span>
            <span>
                <select onClick={handleSelect} defaultValue="select">
                    <option value="select">select</option>
                    <option value="odd">Odd</option>
                    <option value="even">Even</option>
                </select>
            </span>
            <span><CgProfile /> {loggedInUser}</span>
            <span><button onClick={handleLogout}>Logout</button></span>
        </div>
        <div className='home-div'>
            <div style={{ marginLeft: "37%", marginTop: "14px" }}>
                <input style={{ height: "40px", width: '30%', border: "2px solid white", borderRadius: '19px', padding: "8px" }} type="text"
                    onChange={(e) => setSearch(e.target.value)} value={search} />
                <button style={{ marginLeft: "5px" }} onClick={handleSearch}><FaSearch /></button>
            </div >

            {searchedObj?.name ?
                <div style={{ marginTop: "60px" }}>
                    <div style={styleCard} key={searchedObj.id}>
                        <img src='../../public/1.png' alt="Photo" />
                        <p>{searchedObj.name}</p>
                        <p style={{ backgroundColor: "gray", borderRadius: '6px', textAlign: 'center' }}>Album : {searchedObj.id}</p>
                    </div>
                </div >
                :

                <div style={{ marginTop: "60px" }}>
                    {
                        chunkList && chunkList?.map((item, index) => (
                            <div style={(item.flag) ? styleCard : style} key={index}>
                                <img src='../../public/1.png' alt="Photo" />
                                <p>{item.name}</p>
                                <p style={{ backgroundColor: "gray", borderRadius: '6px', textAlign: 'center' }}>Album : {item.id}</p>
                            </div>
                        ))
                    }
                </div>
            }

            <ToastContainer />
        </div>
        <div style={{ position: 'fixed', bottom: '0', right: '0' }}>
            {searchedObj.name ?
                <>
                <button  onClick={() => {setSearchedObj(), setSearch("")}}>Back </button>
                </>
                :
                <>
                    <button disabled={currentPage === 1} onClick={() => handlePrevious()}>Previous</button>
                    {Array.from({ length: totalPage }, (_, index) => (
                        <button key={index} style={(currentPage === index + 1) ? { border: "2px solid white", borderRadius: "5px" } : {}} onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                    ))}
                    <button disabled={currentPage === totalPage} onClick={() => handleNext()}>Next</button>
                </>
            }
        </div >
    </>

    )
}

export default Home
