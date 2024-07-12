import React, { useEffect, useState } from 'react'
import fs from 'fs';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { CursorArrowRippleIcon } from '@heroicons/react/24/outline'
import { ShimmerButton, ShimmerSectionHeader, ShimmerPostItem, ShimmerCircularImage, ShimmerCategoryItem } from 'react-shimmer-effects';
const Apps = () => {

    const [colors, setColors] = useState(null);
    const [file, setFile] = useState(null);
    const [allApps, setAllApps] = useState(null);

    const [isLoad, setIsLoad] = useState(true);


    useEffect(() => {
        if (isLoad) {
            axios.get('https://node.aryzap.com/api/apps').then((resp) => {
                console.log(resp.data);
                setAllApps(resp.data);
            });
            setIsLoad(false);
        }
    });




    return (

        <>
            <div className="text-2xl font-bold pb-2 mb-5  border-b border-b-gray-500 ">
                Apps
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                <a href="/apps/create">
                    <div className={"rounded-md hover:bg-gray-950 bg-blue-950 animate-pulse"}>

                        <div className="p-6 ">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">


                                    <CursorArrowRippleIcon width={30} color='orange' />

                                    <h2 className="text-sm font-bold mt-2">
                                        Add an App +
                                    </h2>
                                    <p className='text-xs font-light w-52'>
                                        Add a new app, type your bundle identifier and platforms details
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                {allApps ? allApps.map((app, index) => {
                    return (
                        <div key={index} className="rounded-md bg-gray-950 shadow-md">

                            <div className="p-6 ">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">


                                        <img src={"https://node.aryzap.com/public/" + app.image} className="w-5 h-5" />

                                        <h2 className="text-sm font-bold mt-2">
                                            {app.title}
                                        </h2>
                                        <p className='text-xs font-light'>
                                            <span>Bundle: {app.bundleId}</span><br />
                                            <span>Platform: {app.platform}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
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


                    </>}


            </div>


        </>
    )
}

export default Apps