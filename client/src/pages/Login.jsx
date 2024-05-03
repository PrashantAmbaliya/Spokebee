// import React, { useEffect, useState } from 'react'
// import {toast} from 'react-hot-toast';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios'

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();


//     // useEffect(() => {
//     //     const token = localStorage.getItem('token');
//     //     const user = localStorage.getItem('userData')
//     //     if (token && user) {
//     //         return navigate('/dashboard');
//     //     }
//     // }, []);

//     async function handleLogin(e) {
//         e.preventDefault();
//         try {
//             const Resp = await axios.post('http://localhost:8080/user/login', { email , password})
//             localStorage.setItem('token', Resp.data?.token)
//             localStorage.setItem('userData', JSON.stringify(Resp.data?.userData))
//             toast.success(Resp?.data?.message);
//             return navigate('/dashboard');
//         } catch (error) {
//             toast.error(error.response?.data?.message);
//             console.error('Login failed:', error);
//         }
//     }

//     return (
//         <>
//             <section className="bg-gray-50">
//                 <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                     <Link to="/" className="flex items-center mb-6 text-2xl font-bold text-gray-900">
//                         <img className="w-16 h-16 mr-2 mix-blend-multiply" src="https://media.istockphoto.com/id/871461336/vector/icon-for-business-management-recruitment-of-employees-team-work.jpg?s=612x612&w=0&k=20&c=FRna_epaMZsMGJN8ubve0pvEStVWQNzIyMy0lla91Ow=" alt="logo" />
//                         HRMS
//                     </Link>
//                     <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
//                         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
//                                 Log in to your account
//                             </h1>
//                             <form onSubmit={handleLogin} className="space-y-4 md:space-y-6" action="#">
//                                 <div>
//                                     <label  htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
//                                     <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
//                                     <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
//                                 </div>
//                                 <button type="submit" className="flex w-full items-center justify-center px-3 py-3 text-xs font-medium text-center text-white bg-[#007AFF] rounded-md hover:bg-[#005effee] focus:ring-1 focus:outline-none focus:ring-blue-800">Login</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default Login