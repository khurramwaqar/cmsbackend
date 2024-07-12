import React, { useEffect, useState } from 'react'
import fs from 'fs';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { CursorArrowRippleIcon } from '@heroicons/react/24/outline'
import toast, { Toaster } from 'react-hot-toast';

const AdsCreate = () => {

    const [colors, setColors] = useState(null);
    const [file, setFile] = useState(null);
    const [imagePath, setImgPath] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [adsTitle, setAdsTitle] = useState(false);
    const [adsType, setAdsType] = useState(false);
    const [adsTag, setAdsTag] = useState(false);



    const handleImageUploading = async (e) => {
        e.preventDefault();

    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            if (adsTitle != null || adsType != null || adsTag != null) {
                const respp = axios.post('https://node.aryzap.com/api/ads', {
                    title: adsTitle,
                    type: adsType,
                    tag: adsTag,
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
                Ads <span className='font-extrabold'>{'>'}</span> Add and Ads
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

            <section class="bg-white dark:bg-gray-600">
                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Ads</h2>
                    <form action="#" onSubmit={handleSubmit} method='POST'>
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ads Title</label>
                                <input
                                    onChange={(e) => setAdsTitle(e.target.value)}
                                    type="text"
                                    name="name"
                                    id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type app name"
                                    required="" />
                            </div>
                            <div class="w-full sm:col-span-2">
                                <label for="bundle" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ads Type</label>
                                <input
                                    onChange={(e) => setAdsType(e.target.value)}
                                    type="text"
                                    name="bundle"
                                    id="bundle"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter Bundle Id"
                                    required="" />
                            </div>


                            <div class="sm:col-span-2">
                                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ads Tag Url/AD-Uint</label>
                                <textarea
                                    onChange={(e) => setAdsTag(e.target.value)}
                                    id="description"
                                    rows="8"
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="App description here">

                                </textarea>
                            </div>
                        </div>
                        <button type="submit" onClick={() => { }} class="inline-flex items-center px-5 py-2.5 mt-4 bg-gray-950 hover:bg-gray-800 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Add an Ads
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default AdsCreate