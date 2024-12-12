import axios from 'axios';
import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { useJwt } from "react-jwt";
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    // const handleSubmit = async (e) => {

    //     e.preventDefault();
    //     if (email != null || password != null) {
    //         const respp = axios.post('https://node.aryzap.com/api/users/signin', {
    //             email: email,
    //             password: password
    //         }).catch((error) => {
    //             console.log(error);


    //         }).then((response) => {
    //             console.log(response);

    //             if (response.status === 200) {
    //                 const token = localStorage.setItem('token', response.data.token);

    //             }
    //             return window.location.href = '/';
    //         });

    //         toast.promise(respp, {
    //             loading: 'Signing...',
    //             success: 'Siging successful...',
    //             error: 'Found some errors while signing...',
    //         });

    //     } else {
    //         return alert("Please check your fields");
    //     }
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email && password) {
            try {
                const respp = axios.post('https://node.aryzap.com/api/users/signin', {
                    email: email,
                    password: password,
                });

                // Display toast
                toast.promise(
                    respp,
                    {
                        loading: 'Signing in...',
                        success: 'Sign-in successful!',
                        error: 'Error signing in. Please check your details.',
                    }
                );

                // Wait for response
                const response = await respp;
                console.log(response);

                if (response.status === 200) {
                    localStorage.setItem('token', response.data.token);

                    window.location.href = '/';
                }
            } catch (error) {
                console.error('Error during sign-in:', error);
            }
        } else {
            alert("Please check your fields");
        }
    };

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />
            <div className="text-2xl font-bold pb-2 mb-5  border-b border-b-gray-500 ">
                Login
            </div>

            <div className='flex justify-center items-center'>
                <form className='w-96' action={'/login'} onSubmit={handleSubmit} method='POST'>
                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"

                            id="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="login@aryzap.com"
                            required />
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required />
                    </div>
                    <div class="flex items-start mb-6">
                        <div class="flex items-center h-5">
                            <input
                                id="remember"
                                type="checkbox"
                                value=""
                                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                            />
                        </div>
                        <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>


        </>
    )
}

export default Login;