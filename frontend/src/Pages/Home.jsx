import React, { useEffect, useState } from 'react'
import { useActionData, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { removeUser, } from '../currentUserSlice';
import { useSelector, useDispatch } from 'react-redux';
import { CgEnter, CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

function Home() {

    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.currentUser)
    const [userList, setUserList] = useState([])
    const [limit, setLimit] = useState(6)
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('')
    const [searchedObj, setSearchedObj] = useState({})
    let totalPage = Math.ceil(userList.length / limit)
    const lastIndex = (limit * currentPage)
    const startIndex = (lastIndex - limit)


    const style = { display: 'inline-block', padding: '20px', borderRadius: "38px", boxShadow: "5px 5px 5px 5px rgb(219, 221, 221)", width: "200px", margin: "20px" }
    const styleCard = { display: 'inline-block', padding: '20px', border: "2px solid white", borderRadius: "38px", backgroundColor: "#196c6c", width: "200px", margin: "10px" }




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
        } if (e.target.value === 'prime') {
            tempList.forEach(item => {
                for (let i = 2; i <= Math.sqrt(item.id); i++) {
                    if (item.id % i === 0) {
                        return
                    }
                }
                if (item.id !== 1) item['flag'] = true
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
        let obj = userList.find(item => item.name.toLowerCase() === search.toLowerCase())
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

    return (
        <>
            <div className='main-div'>
                <div className='first-fram-div'></div>
                <div className='second-fram-div'>
                    <div className='header-div'>
                        <span> <h2 className='custom-h2'>Photo Managment </h2>  </span>
                        <span className='header-profile'><CgProfile size={25} /> <label htmlFor="" className='user-label'>{loggedInUser}</label><button className='logout-button' onClick={handleLogout}><MdLogout size={25} /></button></span>
                    </div>
                    <div className='feature-div'>
                        <span >

                            <input className='search-input-custom' type="text"
                                onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Search by name' />
                            <button className='search-button' onClick={handleSearch}><FaSearch /></button>

                            <select className='custom-select' onClick={handleSelect} defaultValue="select">
                                <option value="select">select</option>
                                <option value="odd">Odd</option>
                                <option value="even">Even</option>
                                <option value="prime">Prime</option>
                            </select>
                        </span >
                    </div>


                    {searchedObj?.name ?
                        <div style={{ marginTop: "60px" }}>
                            <div style={styleCard} key={searchedObj?.id}>
                                <img className='profile-img' src='https://github.com/sahilKumrawat/Photo-Managment-app/blob/master/frontend/public/1.png?raw=true' alt="Photo" />
                                <p style={{ textAlign: 'center', fontSize: "large" }}>{searchedObj?.name}</p>
                                <p className='album-p'>Album : {searchedObj?.id}</p>
                                <p className='email-p'>{searchedObj?.email}</p>
                            </div>

                        </div >
                        :

                        <div style={{ marginTop: "60px" }}>
                            {
                                chunkList && chunkList?.map((item, index) => (
                                    <div style={(item.flag) ? styleCard : style} key={index}>
                                        <img className='profile-img' src='https://github.com/sahilKumrawat/Photo-Managment-app/blob/master/frontend/public/1.png?raw=true' alt="Photo" />
                                        <p style={{ textAlign: 'center', fontSize: "large" }}>{item.name}</p>
                                        <p className='album-p'>Album : {item.id}</p>
                                        <p className='email-p'>{item.email}</p>
                                    </div>
                                ))
                            }
                        </div>
                    }

                    <ToastContainer />

                    <div className='footer-div'>
                        {searchedObj.name ?
                            <>
                                <button onClick={() => { setSearchedObj({}), setSearch("") }}>Back </button>
                            </>
                            :
                            <>
                                <div className='page-div'>Showing {chunkList[0]?.id} to {chunkList[chunkList.length-1]?.id} of {userList.length} entries</div>
                                <div>
                                    <button className='pagination-button' disabled={currentPage === 1} onClick={() => handlePrevious()}><GrFormPrevious /></button>
                                    {Array.from({ length: totalPage }, (_, index) => (
                                        <button className='pagination-button' key={index} style={(currentPage === index + 1) ? { backgroundColor: " #196c6c", color: "white" } : {}} onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                                    ))}
                                    <button className='pagination-button' disabled={currentPage === totalPage} onClick={() => handleNext()}><MdNavigateNext /></button>
                                </div>
                            </>
                        }
                    </div >

                </div>

            </div>
        </>

    )
}

export default Home
