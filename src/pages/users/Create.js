import React, { useEffect, useState } from 'react'
import fs from 'fs';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { CursorArrowRippleIcon } from '@heroicons/react/24/outline'


import { Toaster, toast } from 'react-hot-toast';
import { Multiselect } from 'react-widgets';

const options = [
    { label: 'AgeRatings', value: 'AgeRatings' },
    { label: 'Genres', value: 'Genres' },
    { label: 'Categories', value: 'Categories' },
    { label: 'Series', value: 'Series' },
    { label: 'Apps', value: 'Apps' },
    { label: 'GeoPolicy', value: 'GeoPolicy' },
    { label: 'YTEpisodes', value: 'YTEpisodes' },
    { label: 'Episodes', value: 'Episodes' },
    { label: 'AdsManager', value: 'AdsManager' },
    { label: 'Users', value: 'Users' }
]
const UsersCreate = () => {



    const [apps, setApps] = useState(null);
    const [appsLoad, setAppsLoad] = useState(true);
    const [colors, setColors] = useState(null);
    const [file, setFile] = useState(null);
    const [imagePath, setImgPath] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userName, setUsername] = useState(false);
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [condition, setCondition] = useState(false);
    const [genreDesc, setGenreDesc] = useState(false);
    const [appId, setAppId] = useState(false);

    const [finalGeop, setFinalGeop] = useState(null);
    const [selectedGeop, setSelectedGeop] = useState(null);

    useEffect(() => {
        if (appsLoad) {

            axios.get('https://node.aryzap.com/api/apps/').catch(error => {
                alert(error.message);
            }).then(response => {
                setApps(response.data);
            })

            setAppsLoad(false);
        }
    });


    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        setFile(file);
    };
    const sfGeop = [];
    const handleChangeGeop = (str) => {

        setSelectedGeop(str);
        // create a for loop to get only values in above results which belongs to str variable and set to setFinalApps
        for (let i = 0; i < str.length; i++) {
            sfGeop.push(str[i].value);
        }
        setFinalGeop(sfGeop);
    }


    const handleImageUploading = async (e) => {
        e.preventDefault();

    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {

            const resp = axios.post('https://node.aryzap.com/api/users', {
                username: userName,
                email: email,
                password: password,
                role: condition,
                access: finalGeop,
                image: "",
                appId: ["64edf7e964f3dd6300bb5a0f"]
            }).catch((error) => {
                console.log(error);
                return alert(JSON.stringify(error));

            }).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    alert(`User ${userName} has been added successfully`);
                }
            });

            toast.promise(resp, {
                loading: `User Creating...`,
                success: `User ${userName} has been added Successfully`,
                error: `Found some errors while ceating Geo Policy...`,
            });

        } catch (error) {
            console.error('Error uploading file:', error);
            setIsLoading(false);
        }



    }

    const handleColorsExtracted = (colorPalette) => {
        setColors(colorPalette);
        alert(colors);
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
                Users Management <span className='font-extrabold'>{'>'}</span> Add a new User
            </div>

            <section class="bg-white dark:bg-gray-600">
                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new User</h2>
                    <form action="#" onSubmit={handleSubmit} method='POST'>
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
                                <input
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    name="name"
                                    id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Username required"
                                    required="" />
                            </div>
                            <div class="sm:col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="text"
                                    name="email"
                                    id="email"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Email required"
                                    required="" />
                            </div>
                            <div class="sm:col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    name="password"
                                    id="password"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Password required"
                                    required="" />
                            </div>
                            <div class="sm:col-span-2">
                                <label for="bundle" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                                <select onChange={(e) => setCondition(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Access</label>
                                <Multiselect className='text-black' styles={{
                                    color: 'black',
                                    placeholder: (baseStyles, state) => ({
                                        ...baseStyles,
                                        color: state.isFocused ? 'black' : 'black'
                                    }),
                                    label: (baseStyles, state) => ({
                                        ...baseStyles,
                                        color: state.isFocused ? 'black' : 'black'
                                    })
                                }} data={options} dataKey='value' textField='label' onChange={handleChangeGeop} />

                            </div>
                        </div>
                        <button type="submit" onClick={() => { }} class="inline-flex items-center px-5 py-2.5 mt-4 bg-gray-950 hover:bg-gray-800 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Create
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default UsersCreate