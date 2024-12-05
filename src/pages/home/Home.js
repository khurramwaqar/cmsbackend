
import React, { useEffect, useState } from 'react'

import { useJwt } from "react-jwt";
import axios from 'axios';
import { ShimmerCategoryItem } from 'react-shimmer-effects';
import { ArrowRightCircleIcon, ChevronDoubleUpIcon, ChevronUpIcon, CircleStackIcon, CloudArrowUpIcon, CodeBracketIcon, CursorArrowRippleIcon, DocumentIcon, InboxStackIcon, PencilSquareIcon, ShieldCheckIcon, Square2StackIcon } from '@heroicons/react/24/outline';
import { FcDatabase } from 'react-icons/fc';
import { db, app, analytics, auth } from '../../firebase'
import gsap from 'gsap';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
//import { findAll } from '../../users'




const Home = () => {
    const token = "zapkodernomad_931807_102";
    const { decodedToken, isExpired } = useJwt(token);
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);
    const [isLoad, setIsLoad] = useState(true);
    const [posts, setPosts] = useState();
    const [items, setItems] = useState([1, 2, 3]);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    // const fetchData = async () => {
    //     setIsLoad(true)

    //     const res = await findAll()

    //     setPosts([...res])
    //     setIsLoad(false)
    // }
    useEffect(() => {


        if (isLoad) {
            axios.get('https://node.aryzap.com/api/v1/stats').then((resp) => {
                //alert(resp.data);
                setStats(resp.data);

            });
            setIsLoad(false);


        }
    });

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }
    return (

        <>
            <div className="text-2xl font-bold pb-2 mb-5  border-b border-b-gray-500">
                Home
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {/* {stats != null ? stats.status.db : stats} */}
                {posts}
                {stats != null ?
                    <>
                        <div className={" rounded-md hover:bg-gray-950 bg-gray-950"} onMouseEnter={() => gsap.to(".circle", { x: 40, fill: 'green' })} onMouseLeave={() => gsap.from(".circle", { fill: 'red' })} >

                            <div className="p-6 ">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">


                                        <CircleStackIcon width={30} color='#a6ff00' className='hover:animate-bounce w-6 h-6' />

                                        <h2 className="text-sm font-bold mt-2">
                                            Connected Database: {stats?.status.db == "test" ? "ARYDB_PRD" : stats?.status.db}
                                        </h2>
                                        <p className='text-xs font-light w-52 flex'>
                                            Service Status: &nbsp; <ChevronDoubleUpIcon width={15} color='#a6ff00' className='animate-pulse' />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"rounded-md hover:bg-gray-950 bg-gray-950"}>

                            <div className="p-6 ">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">


                                        <InboxStackIcon width={30} color='#a6ff00' />

                                        <h2 className="text-sm font-bold mt-2">
                                            DB Collections: {stats?.status.collections}
                                        </h2>
                                        <p className='text-xs font-light w-52 flex'>
                                            Service Status: &nbsp; <ChevronDoubleUpIcon width={15} color='#a6ff00' className='animate-pulse' />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"rounded-md hover:bg-gray-950 bg-gray-950"}>

                            <div className="p-6 ">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">


                                        <DocumentIcon width={30} color='#a6ff00' />

                                        <h2 className="text-sm font-bold mt-2">
                                            Objects: {stats?.status.objects}
                                        </h2>
                                        <p className='text-xs font-light w-52 flex'>
                                            Service Status: &nbsp; <ChevronDoubleUpIcon width={15} color='#a6ff00' className='animate-pulse' />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"rounded-md hover:bg-gray-950 bg-gray-950"}>
                            <div className="p-6 ">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">


                                        <CodeBracketIcon width={30} color='#a6ff00' />

                                        <h2 className="text-sm font-bold mt-2">
                                            Data Size: {stats?.status.dataSize / 1000 + ' KB'}
                                        </h2>
                                        <p className='text-xs font-light w-52 flex'>
                                            Service Status: &nbsp; <ChevronDoubleUpIcon width={15} color='#a6ff00' className='animate-pulse' />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"rounded-md hover:bg-gray-950 bg-gray-950"}>
                            <div className="p-6 ">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">


                                        <CloudArrowUpIcon width={30} color='#a6ff00' />

                                        <h2 className="text-sm font-bold mt-2">
                                            Storage Size: {stats?.status.storageSize / 1000 + ' KB'}
                                        </h2>
                                        <p className='text-xs font-light w-52 flex'>
                                            Service Status: &nbsp; <ChevronDoubleUpIcon width={15} color='#a6ff00' className='animate-pulse' />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"rounded-md hover:bg-gray-950 bg-gray-950"}>
                            <div className="p-6 ">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">


                                        <PencilSquareIcon width={30} color='#a6ff00' />

                                        <h2 className="text-sm font-bold mt-2">
                                            Total Size: {stats?.status.totalSize / 1000 + ' KB'}
                                        </h2>
                                        <p className='text-xs font-light w-52 flex'>
                                            Service Status: &nbsp; <ChevronDoubleUpIcon width={15} color='#a6ff00' className='animate-pulse' />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"rounded-md hover:bg-gray-950 bg-gray-950"}>
                            <div className="p-6 ">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">


                                        <Square2StackIcon width={30} color='#a6ff00' />

                                        <h2 className="text-sm font-bold mt-2">
                                            Scale Factor: {stats?.status.scaleFactor}
                                        </h2>
                                        <p className='text-xs font-light w-52 flex'>
                                            Service Status: &nbsp; <ChevronDoubleUpIcon width={15} color='#a6ff00' className='animate-pulse' />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"rounded-md hover:bg-gray-950 bg-gray-950"}>
                            <div className="p-6 ">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">


                                        <ShieldCheckIcon width={30} color='#a6ff00' />

                                        <h2 className="text-sm font-bold mt-2">
                                            Mongo Status: {stats?.status.ok}
                                        </h2>
                                        <p className='text-xs font-light w-52 flex'>
                                            Service Status: &nbsp; <ChevronDoubleUpIcon width={15} color='#a6ff00' className='animate-pulse' />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : "Loading..."}





            </div >

        </>
    )
}

export default Home;