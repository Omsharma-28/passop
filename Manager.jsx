import React from 'react'
import { useRef, useState, useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords")

        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])
    const copyText=(text)=>{
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
           
           
            });
            navigator.clipboard.writeText(text)
    }
    const showpassword = () => {
        passwordref.current.type = "text"

        if (ref.current.src.includes("icons/closeeye.png")) {
            ref.current.src = 'icons/eye.png'
            passwordref.current.type = "password"

        } else {
            ref.current.src = "icons/closeeye.png"
            passwordref.current.type = "text"
        }
    }
    const savepassword = () => {
        if(form.site.length>3 &&form.username.length>3&& form.password.length>3){
        const newPassword = { ...form, id: uuidv4() };
        const newArray = [...passwordArray, newPassword];
        setPasswordArray(newArray);
        localStorage.setItem("passwords", JSON.stringify(newArray));
        setForm({ site: "", username: "", password: "" });
        toast('Password saved', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
           
           
            });}
            else{
                toast('Error : Password not saved')
            }
       
    };
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const deletepassword = (id) => {
        let c = confirm("do you reallywant to delete password")
        if(c){
        const newArray = passwordArray.filter(item => item.id !== id);
        setPasswordArray(newArray);
        localStorage.setItem("passwords", JSON.stringify(newArray));}
        toast('Password deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
           
           
            });
    };
    
    const editpassword = (id) => {

       
        setForm(passwordArray.filter(i=>i.id===id)[0]);
        setpasswordArray( passwordArray.filter(item => item.id !== id));
    }

    return (
        <>
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={true}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition="Bounce"
/>
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-800 opacity-20 blur-[100px]"></div></div>

            <div className="px-2 md-p-0 min-h-[88.5vh] md:mycontainer">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/ &gt;</span>

                </h1>
                <p className='text-green-900 text-lg text-center' >Your own password Manager</p>
                <div className="text-white flex flex-col p-4  items-center text-black gap-8">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='text-black rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row  w-full gap-8 justify-between">
                        <input value={form.username} onChange={handleChange} placeholder='Enter username' className='text-black rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="username" />
                        <div className="relative">
                            <input ref={passwordref} value={form.password} onChange={handleChange} placeholder='Enter Password' className='text-black rounded-full border border-green-500 w-full p-4 py-1' type="password" name="password" id="password" />
                            <span className="absolute right-[1px] top-[4px] cursor-pointer"
                                onClick={showpassword}
                            >
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savepassword} className='flex justify-center items-center bg-green-500 rounded-full
                    px-6 py-2 w-fit hover:bg-green-800 gap-2  border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save 
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10 ">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2' >Site</th>
                                <th className='py-2'>Userame</th>
                                <th className='py-2py-2 border-white ' >Passwords</th>
                                <th className='py-2 '>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='  py-2 border-white text-center  '>
                                    <div className='flex item-center justify-center'><a href={item.site} target='_blank'></a>{item.site}

                                      <div className='lordiconcopy size-7 cursor-pointer' onClick={()=>copyText(item.site)}>  <lord-icon    style={{"width":"25px","height":"25px"
                                      ,"paddingTop":"3px","paddingLeft":"3px"}}
                                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                                            trigger="hover"
                                        >
                                        </lord-icon>
                                        </div>
                                    </div>
                                    </td>
                                    <td className=' py-2 border-white text-center '>
                                    <div className='flex item-center justify-center'>
                                    <span>{item.username} </span>  <div className='  lordiconcopy size-7 cursor-pointer' onClick={()=>copyText(item.username)}>  
                                    
                                    <lord-icon    style={{"width":"25px","height":"25px"
                                      ,"paddingTop":"3px","paddingLeft":"3px"}}
                                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                                            trigger="hover"
                                        >
                                        </lord-icon>
                                        </div>
                                    </div></td>
                                    <td className=' py-2 border-white text-center '>
                                    <div className='flex item-center justify-center'><span>{item.password} </span>  <div className='lordiconcopy size-7 cursor-pointer' onClick={()=>copyText(item.password)}>  <lord-icon    style={{"width":"25px","height":"25px"
                                      ,"paddingTop":"3px","paddingLeft":"3px"}}
                                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                                            trigger="hover"
                                        >
                                        </lord-icon>
                                        </div>
                                    </div></td>
                                    <td className=' py-2 border-white text-center '>
                                        <span className='cursor-pointer mx-1 gap-2' onClick={()=>{editpassword(item.id)}}><script src="https://cdn.lordicon.com/lordicon.js"></script>
<lord-icon
    src="https://cdn.lordicon.com/ogkflacg.json"
    trigger="hover"
    style={{"width":"25px","height":"25px"}}>
</lord-icon>
<script src="https://cdn.lordicon.com/lordicon.js"></script></span>
<span className='cursor-pointer mx-1 gap-2'onClick={()=>{deletepassword(item.id)}}>
<lord-icon
    src="https://cdn.lordicon.com/skkahier.json"
    trigger="hover"
    style={{"width":"25px","height":"25px"}}>
</lord-icon></span>
                                    </td>

                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>

            </div>
        </>
    )
}

export default Manager
