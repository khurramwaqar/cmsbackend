import React, { useEffect, useState } from 'react'
import fs from 'fs';
import axios from 'axios';
import { CursorArrowRippleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import { ShimmerCategoryItem } from 'react-shimmer-effects';
const PromotionalBanner = () => {

    const [colors, setColors] = useState(null);
    const [file, setFile] = useState(null);
    const [allApps, setAllApps] = useState(null);

    const [isLoad, setIsLoad] = useState(true);


    useEffect(() => {
        if (isLoad) {
            axios.get('https://node.aryzap.com/api/pb').then((resp) => {
                console.log(resp.data);
                setAllApps(resp.data);
            });
            setIsLoad(false);
        }
    });




    return (

        <>
            <div className="text-2xl font-bold pb-2 mb-5  border-b border-b-gray-500 ">
                Promotional Banner
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                <a href="/pb/create">
                    <div className={"rounded-md hover:bg-gray-950 bg-blue-950 animate-pulse"}>

                        <div className="p-6 ">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">


                                    <CursorArrowRippleIcon width={30} color='lightgreen' />

                                    <h2 className="text-sm font-bold mt-2">
                                        Add an Promotional Banner +
                                    </h2>
                                    <p className='text-xs font-light w-52'>
                                        Drama. Stories composed in verse or prose, usually for theatrical performance, where conflicts and emotion are expressed through dialogue and action.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                {allApps ? allApps.promotionalBanner.map((app, index) => {
                    return (
                        <div key={index} className={"rounded-md bg-gray-950"}>

                            <div className="p-6 ">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">


                                        <ArrowRightCircleIcon width={24} />
                                        <h2 className="text-sm font-bold mt-2">
                                            {app.title}
                                        </h2>
                                        <p className='text-xs font-light text-clip w-56'>
                                            {app.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
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

export default PromotionalBanner