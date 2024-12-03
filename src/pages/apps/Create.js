import React, { useEffect, useState } from 'react'
import fs from 'fs';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { CursorArrowRippleIcon } from '@heroicons/react/24/outline'
import toast, { Toaster } from 'react-hot-toast';
import ReactJson from 'react-json-view'
const AppsCreate = () => {

    const [colors, setColors] = useState(null);
    const [file, setFile] = useState(null);
    const [imagePath, setImgPath] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [appTitle, setAppTitle] = useState(false);
    const [appDesc, setAppDesc] = useState(false);
    const [appBundle, setAppBundle] = useState(false);
    const [appPlatform, setAppPlatform] = useState(false);

    const [appConfigs, setAppConfigs] = useState({
        "appName": appTitle,
        "appDesc": appDesc,
        "appBundle": appBundle,
        "appPlatform": appPlatform,
        "authToken": "your-web-secret-token",
        "appHomeAds": false,
        "appApiMainEndpoint": "https://cdn.aryzap.com/api/fetcher.php?budleId=" + appBundle,
        "appApiHomeEndpoint": "https://node.aryzap.com",

    });

    const appConfig = {
        "appName": appTitle,
        "appDesc": appDesc,
        "appBundle": appBundle,
        "appPlatform": appPlatform,
        "authToken": "your-web-secret-token",
        "appHomeAds": false,
        "appApiMainEndpoint": "https://cdn.aryzap.com/api/fetcher.php?budleId=" + appBundle,
        "appApiHomeEndpoint": "https://node.aryzap.com",

    }

    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        setFile(file);
    };

    const notify = (str, type) => {
        if (type == null) {
            toast(str);
        } else if (type == true) {
            toast.loading(str);
        }
    };


    const handleImageUploading = async (e) => {
        e.preventDefault();

    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('https://node.aryzap.com/api/media/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure proper content type for file upload
                },
            }).catch((err) => {
                toast.error(err.message);
                setIsLoading(false);
            }).then((resp) => {
                console.log(resp.data);
                setImgPath(resp.data.imagePath);
                setIsLoading(false);

                if (resp.data.imagePath != null) {
                    if (appTitle != null || appPlatform != null || appBundle != null) {
                        const respp = axios.post('http://127.0.0.1:8080/api/apps', {
                            title: appTitle,
                            description: appDesc,
                            image: resp.data.imagePath,
                            bundleId: appBundle,
                            platform: appPlatform,
                            appsConfig: appConfig
                        }).catch((error) => {
                            console.log(error);
                            return true;

                        }).then((response) => {
                            console.log(response);

                            if (response.status === 200) {

                            }
                            // return window.location.reload();
                        });

                        toast.promise(respp, {
                            loading: 'Saving...',
                            success: 'Successfully Added',
                            error: 'Found some errors while saving...',
                        });



                    } else {
                        return alert("Please check your fields");

                    }
                }




            });
            console.log(response.data);
            if (response.status === 200) {
                console.log('File uploaded successfully');
            } else {
                console.error('File upload failed');
            }
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
            <div className="text-2xl font-bold pb-2 mb-5  border-b border-b-gray-500 ">
                Apps <span className='font-extrabold'>{'>'}</span> Add and App
            </div>

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

            <section class="bg-gray-600">
                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 class="mb-4 text-xl font-bold text-white">Add a new App</h2>
                    <form action="#" onSubmit={handleSubmit} method='POST'>
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-white">App Name</label>
                                <input
                                    onChange={(e) => setAppTitle(e.target.value)}
                                    type="text"
                                    name="name"
                                    id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type app name"
                                    required="" />
                            </div>
                            <div class="w-full">
                                <label for="bundle" class="block mb-2 text-sm font-medium text-white">Bundle Id</label>
                                <input
                                    onChange={(e) => setAppBundle(e.target.value)}
                                    type="text"
                                    name="bundle"
                                    id="bundle"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter Bundle Id"
                                    required="" />
                            </div>
                            <div class="w-full">
                                <label for="platform" class="block mb-2 text-sm font-medium text-white">Platform Name</label>
                                <input
                                    onChange={(e) => setAppPlatform(e.target.value)}
                                    type="text"
                                    name="platform"
                                    id="platform"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter Platform Android|iOS|TV|tvOS|WEB"
                                    required="" />
                            </div>
                            <div className='sm:col-span-2'>
                                <label for="item-weight" class="block mb-2 text-sm font-medium text-white">App Image Upload</label>
                                <input
                                    onChange={(e) => handleImageChange(e)}
                                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-600 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    aria-describedby="file_input_help"
                                    id="file_input"
                                    accept="image/*"
                                    type="file" />
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                                {isLoading == true ? <InfinitySpin
                                    width='200'
                                    color="#FFFFFF"
                                /> : ""}
                            </div>
                            <div class="sm:col-span-2">
                                <label for="description" class="block mb-2 text-sm font-medium text-white">Description</label>
                                <textarea
                                    onChange={(e) => setAppDesc(e.target.value)}
                                    id="description"
                                    rows="8"
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="App description here">

                                </textarea>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="AppsConfig" class="block mb-2 text-sm font-medium text-white">Apps Config</label>
                                <br />
                                <ReactJson src={appConfig} theme="monokai" onAdd={(r) => console.log("onAdd Event runnung")} onEdit={(r) => { console.log("onEdit Event runnung") }} onDelete={(r) => console.log("onDelete Event runnung")} />
                            </div>
                        </div>
                        <button type="submit" onClick={() => { }} class="inline-flex items-center px-5 py-2.5 mt-4 bg-gray-950 hover:bg-gray-800 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Add an App
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default AppsCreate