import React, { useEffect, useState } from 'react'
import fs, { rename, stat } from 'fs';
import axios, { all } from 'axios';
import { CursorArrowRippleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import { ShimmerCategoryItem } from 'react-shimmer-effects';
import { useParams } from 'react-router-dom';
import { ReactSortable } from "react-sortablejs";
import { Toaster, toast } from 'react-hot-toast';



const PositioningCards = (props) => {


    const [state, setState] = useState([
        { id: 1, name: "shrek" },
        { id: 2, name: "fiona" },
    ]);
    const [colors, setColors] = useState(null);
    const [file, setFile] = useState(null);
    const [allApps, setAllApps] = useState(null);
    const [newData, setNewData] = useState(null);

    const [isLoad, setIsLoad] = useState(true);
    const [isLoadData, setIsLoadData] = useState(false);
    const [seriesCount, setSeriesCount] = useState(null);

    const allCats = [];

    const params = useParams(props);

    useEffect(() => {

        if (isLoad) {
            axios.get('https://node.aryzap.com/api/series/byCatID/' + params.id + '/PK').then((resp) => {

                // Array to store promises for axios requests
                const promises = [];

                setAllApps(resp.data);

                setState(resp.data.series);
                setIsLoad(false);
            }).catch((error) => {
                console.error('Error fetching categories:', error);
            });
        }
        if (isLoadData) {
            handleSort(state);
            setIsLoadData(false);
        }
    }, [isLoad, state, isLoadData]);

    const handleSort = async (newOrder) => {
        console.log(newOrder);
        const updatedSeries = newOrder.map((item, index) => ({
            _id: item._id,
            position: index
        }));

        setNewData(updatedSeries);

        const response = axios.put('https://node.aryzap.com/api/series/positions/24', { series: updatedSeries })
            .then(response => {

                console.log('Positions updated:', response.data);
                //toast.success('Series Position Successfully Changed');
            })
            .catch(error => {
                console.error('Error updating positions:', error);
                //toast.error('Found some errors while positioning...');
            });

        toast.promise(response, {
            loading: 'Series Position Updating...',
            success: 'Series Position Successfully Changed',
            error: 'Found some errors while positioning..',
        });



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
                Categories
            </div>
            <div className="">
                <ReactSortable
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'
                    list={state}
                    group={{ name: 'groupName' }}
                    animation={200}
                    easing='ease-in'
                    dragoverBubble
                    setList={setState}
                    onEnd={() => {
                        setIsLoadData(true); // Set the flag to indicate sorting is done
                    }}
                >
                    {state ? state.map((app, index) => {
                        return (
                            <>
                                <div key={index} className={"rounded-md bg-gray-950"} onChange={(e) => alert("Hello")} >
                                    <img src={"https://node.aryzap.com/public/" + app.imagePoster} className='rounded-sm' />
                                    <div className='flex-1 bg-red-700 text-center text-sm'> {app.title}</div>
                                </div>
                            </>
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

                </ReactSortable>

                <div className='w-24'>
                    {newData ? JSON.stringify(newData) : "LOADING...."}
                </div>


            </div>


        </>
    )
}

export default PositioningCards