import React, { useEffect, useState } from 'react'
import fs, { stat } from 'fs';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { CursorArrowRippleIcon } from '@heroicons/react/24/outline'
import Switch from "react-switch";
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
const PackagesEdit = (props) => {

    const [apps, setApps] = useState(null);
    const [appsLoad, setAppsLoad] = useState(true);
    const [colors, setColors] = useState(null);
    const [file, setFile] = useState(null);
    const [imagePath, setImgPath] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [genreTitle, setGenreTitle] = useState(false);
    const [genreDesc, setGenreDesc] = useState(false);
    const [appId, setAppId] = useState(false);

    const [packageName, setPackageName] = useState(null);
    const [packageLabel, setPackageLabel] = useState(null);
    const [packagePrice, setPackagePrice] = useState(null);
    const [packageDetails, setPackageDetails] = useState(null);
    const [packageAllowScreens, setPackageAllowScreens] = useState(null);
    const [currentData, setCurrentData] = useState(null);
    const [packageDays, setPackageDays] = useState(null);
    const [packageStripePriceId, setPackageStripePriceId] = useState(null);

    const [status, setStatus] = useState(false);

    const params = useParams(props);

    useEffect(() => {

        if (isLoading) {
            axios.get(`https://node.aryzap.com/api/packages/${params.id}`).catch(err => {
                console.log(err);
            }).then((res) => {
                console.log(res.data);
                setCurrentData(res.data);
                setPackageName(res.data.packageName);
                setPackageAllowScreens(res.data.packageAllowScreens);
                setPackageDetails(res.data.packageDetails);
                setPackageLabel(res.data.packageLabel);
                setPackagePrice(res.data.packagePrice);
                setStatus(parseBoolean(res.data.packageStatus));
                setPackageDays(res.data.packageDays);
                setPackageStripePriceId(res.data.packageStripePriceId);
            })
            setIsLoading(false);
        }
    });

    const handleChange = () => {
        setStatus(status);
    }

    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        setFile(file);
    };

    const parseBoolean = (str) => {
        if (str == "true") {
            return true;
        } else {
            return false;
        }
    };


    const handleImageUploading = async (e) => {
        e.preventDefault();

    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const respp = axios.put('https://node.aryzap.com/api/packages/' + params.id, {
            packageName: packageName,
            packagePrice: packagePrice,
            packageLabel: packageLabel,
            packageDetails: packageDetails,
            packageStatus: status,
            packageAllowScreens: packageAllowScreens,
            packageDays: packageDays,
            packageStripePriceId: packageStripePriceId
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
            return alert(JSON.stringify(error));

        }).then((response) => {
            console.log(response);

            if (response.status === 200) {
                setIsLoading(false);
            }
            // return window.location.reload();
        });

        toast.promise(respp, {
            loading: 'Package updating...',
            success: 'Package has been updated successfully',
            error: 'Found error while updating the package',
        });



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
                Packages <span className='font-extrabold'>{'>'}</span> Update Package
            </div>

            <section class="bg-white dark:bg-gray-600">
                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Package</h2>
                    <form action="#" onSubmit={handleSubmit} method='POST'>
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2">
                                <label for="packageName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Name</label>
                                <input
                                    onChange={(e) => setPackageName(e.target.value)}
                                    type="text"
                                    name="packageName"
                                    id="packageName"
                                    defaultValue={packageName ? packageName : null}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type app name"
                                    required="" />
                            </div>
                            <div class="w-full">
                                <label for="packagePrice" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Price</label>
                                {/* <input
                                    onChange={(e) => handleImageChange(e)}
                                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-600 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    aria-describedby="file_input_help"
                                    id="file_input"
                                    accept="image/*"
                                    type="file" /> */}
                                <input
                                    onChange={(e) => setPackagePrice(e.target.value)}
                                    type="text"
                                    name="packagePrice"
                                    id="packagePrice"
                                    class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-600 dark:text-white focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    placeholder="Package Price: 499"
                                    defaultValue={packagePrice ? packagePrice : null}
                                    required="" />

                            </div>
                            <div class="w-full">
                                <label for="packageLabel" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Label</label>
                                {/* <select onChange={(e) => setAppId(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {apps != null && apps.map((app, index) => {
                                        return <option value={app._id}> {app.title} </option>
                                    })}
                                </select> */}
                                <input
                                    onChange={(e) => setPackageLabel(e.target.value)}
                                    type="text"
                                    name="packageLabel"
                                    id="packageLabel"
                                    defaultValue={packageLabel ? packageLabel : null}
                                    class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-600 dark:text-white focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    placeholder="Package Label"
                                    required="" />



                            </div>
                            <div class="w-full">
                                <label for="packageScreens" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Allow Screens</label>
                                {/* <select onChange={(e) => setAppId(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {apps != null && apps.map((app, index) => {
                                        return <option value={app._id}> {app.title} </option>
                                    })}
                                </select> */}
                                <input
                                    onChange={(e) => setPackageAllowScreens(e.target.value)}
                                    type="text"
                                    name="packageScreens"
                                    id="packageScreens"
                                    defaultValue={packageAllowScreens ? packageAllowScreens : null}
                                    class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer dark:text-white bg-gray-600  focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    placeholder="EX: 4"
                                    required="" />



                            </div>
                            <div class="w-full">
                                <label for="packageDays" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Allow number of Days</label>
                                {/* <select onChange={(e) => setAppId(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {apps != null && apps.map((app, index) => {
                                        return <option value={app._id}> {app.title} </option>
                                    })}
                                </select> */}
                                <input
                                    onChange={(e) => setPackageDays(e.target.value)}
                                    type="text"
                                    name="packageDays"
                                    id="packageDays"
                                    defaultValue={packageDays ? packageDays : null}
                                    class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer dark:text-white bg-gray-600  focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    placeholder="EX: Number of days"
                                    required="" />



                            </div>
                            <div class="w-full">
                                <label for="packageStripePriceId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stripe Package Price ID</label>
                                {/* <select onChange={(e) => setAppId(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {apps != null && apps.map((app, index) => {
                                        return <option value={app._id}> {app.title} </option>
                                    })}
                                </select> */}
                                <input
                                    onChange={(e) => setPackageStripePriceId(e.target.value)}
                                    type="text"
                                    name="packageStripePriceId"
                                    id="packageStripePriceId"
                                    defaultValue={packageStripePriceId ? packageStripePriceId : null}
                                    class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer dark:text-white bg-gray-600  focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    placeholder="EX: Enter stripe price id"
                                    required="" />



                            </div>
                            <div class="w-full">
                                <label for="platform" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Status</label>
                                {/* <select onChange={(e) => setAppId(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {apps != null && apps.map((app, index) => {
                                        return <option value={app._id}> {app.title} </option>
                                    })}
                                </select> */}


                                <Switch onChange={(e) => setStatus(e)} checked={status} />
                                {status}

                            </div>

                            <div class="sm:col-span-2">
                                <label for="packageDetails" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Details</label>
                                <textarea
                                    onChange={(e) => setPackageDetails(e.target.value)}
                                    id="packageDetails"
                                    rows="8"
                                    defaultValue={packageDetails ? packageDetails : null}
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="App description here">

                                </textarea>
                            </div>
                        </div>
                        <button type="submit" onClick={() => { }} class="inline-flex items-center px-5 py-2.5 mt-4 bg-gray-950 hover:bg-gray-800 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Update
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default PackagesEdit