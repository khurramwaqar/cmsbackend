import React, { useEffect, useState } from 'react'
import fs, { rename } from 'fs';
import axios from 'axios';
import { CursorArrowRippleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import { ShimmerCategoryItem } from 'react-shimmer-effects';
import { Link } from 'react-router-dom';
const Categories = () => {

    const [colors, setColors] = useState(null);
    const [file, setFile] = useState(null);
    const [allApps, setAllApps] = useState(null);

    const [isLoad, setIsLoad] = useState(true);
    const [seriesCount, setSeriesCount] = useState(null);

    const allCats = [];

    useEffect(() => {
        if (isLoad) {
            axios.get('https://node.aryzap.com/api/categories/bkend').then(async (resp) => {

                // Array to store promises for axios requests
                const promises = [];

                // Loop through each item in resp.data
                resp.data.forEach(item => {
                    // Make a request to the second API for each item
                    const promise = axios.get(`https://node.aryzap.com/api/series/getCount/${item._id}`)
                        .then((response) => {
                            // Update the resp.data with count received from the second API
                            item.count = response.data.count;
                        })
                        .catch((error) => {
                            console.error(`Error fetching count for item with id ${item._id}:`, error);
                        });

                    promises.push(promise);
                });

                // Wait for all promises to resolve
                await Promise.all(promises);

                // Set state with the updated resp.data
                setAllApps(resp.data);

                setIsLoad(false);
            }).catch((error) => {
                console.error('Error fetching categories:', error);
            });
        }
    }, [isLoad]);

    return (

        <>
            <div className="text-2xl font-bold pb-2 mb-5  border-b border-b-gray-500 ">
                Categories
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                <a href="/categories/create">
                    <div className={"rounded-md hover:bg-gray-950 bg-blue-950 animate-pulse"}>

                        <div className="p-6 ">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">


                                    <CursorArrowRippleIcon width={30} color='lightpink' />

                                    <h2 className="text-sm font-bold mt-2">
                                        Add an Ages Category +
                                    </h2>
                                    <p className='text-xs font-light w-52'>
                                        Movie ratings provide parents with advance information about the content of movies to help them determine what movies are appropriate for their children at any ag
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                {allApps ? allApps.map((app, index) => {
                    return (
                        <div key={index} className={"rounded-md bg-gray-950"}>

                            <div className="p-6 ">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">

                                        <Link to={`edit/${app._id}`}>


                                            <ArrowRightCircleIcon width={24} />
                                            <h2 className="text-sm font-bold mt-2">
                                                {app.title}
                                            </h2>
                                            <p className='text-xs font-light text-clip w-56'>
                                                {app._id}
                                            </p>

                                        </Link>

                                    </div>
                                </div>
                            </div>
                            <div className='flex-1 bg-red-700 text-center text-sm'>Document Count: {app.count} <a href={`${'categories/positioning/' + app.title}`}> View All </a> </div>
                        </div>
                    )
                }) :

                    <>

                        <div className="bg-gray-800 rounded-md pl-5 pt-5">

                            <ShimmerCategoryItem title={false} />
                        </div>
                        <div className="bg-gray-800 rounded-md pl-5 pt-5">

                            <ShimmerCategoryItem title={false} />
                        </div>
                        <div className="bg-gray-800 rounded-md pl-5 pt-5">

                            <ShimmerCategoryItem title={false} />
                        </div>
                        <div className="bg-gray-800 rounded-md pl-5 pt-5">

                            <ShimmerCategoryItem title={false} />
                        </div>
                        <div className="bg-gray-800 rounded-md pl-5 pt-5">

                            <ShimmerCategoryItem title={false} />
                        </div>
                        <div className="bg-gray-800 rounded-md pl-5 pt-5">

                            <ShimmerCategoryItem title={false} />
                        </div>
                        <div className="bg-gray-800 rounded-md pl-5 pt-5">

                            <ShimmerCategoryItem title={false} />
                        </div>


                    </>}


            </div>


        </>
    )
}

export default Categories