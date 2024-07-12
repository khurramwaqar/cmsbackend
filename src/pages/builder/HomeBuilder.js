import React, { useEffect, useState } from 'react'
import fs from 'fs';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { CursorArrowRippleIcon } from '@heroicons/react/24/outline'
import { ShimmerButton, ShimmerSectionHeader, ShimmerPostItem, ShimmerCircularImage, ShimmerCategoryItem } from 'react-shimmer-effects';
const HomeBuilder = () => {

    const [colors, setColors] = useState(null);
    const [file, setFile] = useState(null);
    const [allApps, setAllApps] = useState(null);

    const [isLoad, setIsLoad] = useState(true);

    useEffect(() => {
        if (isLoad) {
            axios.get('https://node.aryzap.com/api/home/v2').then((resp) => {
                console.log(resp.data);
                setAllApps(resp.data);
            });
            setIsLoad(false);
        }
    });




    return (

        <>
            <div className="text-2xl font-bold pb-2 mb-5  border-b border-b-gray-500 ">
                Home Builder
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                <a href="/builder/createv2">
                    <div className={"rounded-md hover:bg-gray-950 bg-blue-950 animate-pulse"}>

                        <div className="p-6 ">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">


                                    <CursorArrowRippleIcon width={30} color='orange' />

                                    <h2 className="text-sm font-bold mt-2">
                                        Add an Home Builder V2
                                    </h2>
                                    <p className='text-xs font-light w-52'>
                                        Add a new Home Section
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                <a href="/builder/create">
                    <div className={"rounded-md hover:bg-gray-950 bg-blue-950 animate-pulse"}>

                        <div className="p-6 ">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">


                                    <CursorArrowRippleIcon width={30} color='orange' />

                                    <h2 className="text-sm font-bold mt-2">
                                        Add an Home Builder
                                    </h2>
                                    <p className='text-xs font-light w-52'>
                                        Add a new Home Section
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                {allApps ? allApps.map((app, index) => {
                    return (
                        <a href={'/builder/editv2/' + app._id}>
                            <div key={index} className="rounded-md bg-gray-950 shadow-md">

                                <div className="p-6 ">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">

                                            <img src={'./icons8-bundle-32.png'} className="w-5 h-5" />

                                            <h2 className="text-sm font-bold mt-2">
                                                {app.homeTitle}
                                            </h2>
                                            <h3 className="text-xs font-bold text-ellipsis line-clamp-1 marg">
                                                {app._id}
                                            </h3>

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


                    </>}


            </div>


        </>
    )
}

export default HomeBuilder