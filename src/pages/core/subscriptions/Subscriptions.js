import React, { useEffect, useState } from 'react'
import fs from 'fs';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { CursorArrowRippleIcon } from '@heroicons/react/24/outline'
import { ShimmerButton, ShimmerSectionHeader, ShimmerPostItem, ShimmerCircularImage, ShimmerCategoryItem } from 'react-shimmer-effects';
import { getDb } from '../../../firebase';
import { getDoc, collection } from 'firebase/firestore';
const Subscriptions = () => {

    const [colors, setColors] = useState(null);
    const [file, setFile] = useState(null);
    const [subscriptions, setSubscriptions] = useState(null);

    const [isLoad, setIsLoad] = useState(true);

    useEffect(() => {
        if (isLoad) {
            axios.get('https://node.aryzap.com/api/subscriptions').then((resp) => {
                console.log(resp.data);
                setSubscriptions(resp.data);
            });
            setIsLoad(false);
        }
    });




    return (

        <>
            <div className="text-2xl font-bold pb-2 mb-5  border-b border-b-gray-500 ">
                Subscriptions
            </div>


            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Customer ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Transaction ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Expiry Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Captured
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <>
                            {subscriptions ? subscriptions.map((app, index) => {
                                return (
                                    <>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {app.customer_id}
                                            </th>
                                            <td class="px-6 py-4">
                                                {app.transaction_id}
                                            </td>
                                            <td class="px-6 py-4">
                                                {app.subscription_expiry}
                                            </td>
                                            <td class="px-6 py-4">
                                                {app.captured ? <span className='bg-green-600 text-white p-1 text-xs font-bold'>TRUE</span> : <span className='bg-red-600 text-white p-1 text-xs font-bold'>FALSE</span>}
                                            </td>
                                        </tr>
                                    </>

                                )
                            }) : "Loading..."}
                        </>

                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {/* <a href="/packages/create">
                    <div className={"rounded-md hover:bg-gray-950 bg-blue-950 animate-pulse"}>

                        <div className="p-6 ">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">


                                    <CursorArrowRippleIcon width={30} color='orange' />

                                    <h2 className="text-sm font-bold mt-2">
                                        Add an Package
                                    </h2>
                                    <p className='text-xs font-light w-52'>
                                        Add a new package, type your package pricing and package details
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>

                {subscriptions ? subscriptions.map((app, index) => {
                    return (
                        <a href={'/packages/edit/' + app._id}>
                            <div key={index} className="rounded-md bg-gray-950 shadow-md">

                                <div className="p-6 ">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">

                                            <img src={'./icons8-bundle-32.png'} className="w-5 h-5" />

                                            <h2 className="text-sm font-bold mt-2">
                                                {app.customer_id}
                                            </h2>
                                            <h3 className="text-xs font-bold text-ellipsis line-clamp-1 marg">
                                                {app.transaction_id}
                                            </h3>
                                            <p className='text-xs font-light'>
                                                <span>Captured : {app.captured}</span><br />
                                                <span>Expiry : {app.subscription_expiry}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    )
                }) :

                    <>

                        <div className="bg-gray-800 rounded-md pl-5 pt-5 shadow-md">

                            <ShimmerCategoryItem title={false} />
                        </div>
                        <div className="bg-gray-800 rounded-md pl-5 pt-5 shadow-md">

                            <ShimmerCategoryItem title={false} />
                        </div>
                        <div className="bg-gray-800 rounded-md pl-5 pt-5 shadow-md">

                            <ShimmerCategoryItem title={false} />
                        </div>
                        <div className="bg-gray-800 rounded-md pl-5 pt-5 shadow-md">

                            <ShimmerCategoryItem title={false} />
                        </div>
                        <div className="bg-gray-800 rounded-md pl-5 pt-5 shadow-md">

                            <ShimmerCategoryItem title={false} />
                        </div>
                        <div className="bg-gray-800 rounded-md pl-5 pt-5 shadow-md">

                            <ShimmerCategoryItem title={false} />
                        </div>
                        <div className="bg-gray-800 rounded-md pl-5 pt-5 shadow-md">

                            <ShimmerCategoryItem title={false} />
                        </div>


                    </>} */}


            </div>


        </>
    )
}

export default Subscriptions