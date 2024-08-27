import { CursorArrowRippleIcon } from '@heroicons/react/24/outline';
import axios, { all } from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { ShimmerCategoryItem } from 'react-shimmer-effects';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Select from 'react-select';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const DMEpisode = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const notify = () => toast.loading('Waiting...');
    const [isLoading, setIsLoading] = useState(true);
    const [series, setSeries] = useState(null);
    const [allSeries, setAllSeries] = useState(null);
    const [finalSeries, setFinalSeries] = useState(null);
    const [selectedSeries, setSelectedSeries] = useState(null);
    const onSubmit = () => {

        console.log(finalSeries);
        const response = axios.get(`https://node.aryzap.com/api/dm/${finalSeries._id}/${finalSeries.seriesDM}/1/100`).then((response) => {
        });
        toast.promise(response, {
            loading: 'Loading...',
            success: 'Episodes fetched successfully',
            error: 'Found some errors while deleting...',
        });




    }

    const seriesHolder = [];
    const seriesGrabber = [];
    const handleChangeSeries = (e) => {
        e.preventDefault();
        setSelectedSeries(e.target.value);
        const responseSingle = axios.get(`https://node.aryzap.com/api/series/${e.target.value}`)
            .then(res => {

                setFinalSeries(res.data)

            });
        const response = axios.get(`https://node.aryzap.com/api/dm/${e.target.value}`)
            .then(res => {

                setSeries(res.data);
                setIsLoading(false);

            });
    }

    console.log(watch("example"));
    const options = {
        title: 'Title',
        message: 'Message',
        buttons: [
            {
                label: 'Yes',
                onClick: () => alert('Click Yes')
            },
            {
                label: 'No',
                onClick: () => alert('Click No')
            }
        ],
        childrenElement: () => <div />,
        customUI: ({ onClose }) => <div>Custom UI</div>,
        closeOnEscape: true,
        closeOnClickOutside: true,
        keyCodeForClose: [8, 32],
        willUnmount: () => { },
        afterClose: () => { },
        onClickOutside: () => { },
        onKeypressEscape: () => { },
        overlayClassName: "overlay-custom-class-name"
    };

    useEffect(() => {
        if (isLoading) {
            const genresRep = axios.get('https://node.aryzap.com/api/series').catch(error => {
                alert(error.message);
            }).then(response => {
                console.log(response.data);
                // create a for loop for each app
                setAllSeries(response.data.series);
                console.log(allSeries);
            });
            const response = axios.get('https://node.aryzap.com/api/dm/')
                .then(res => {
                    //console.log(res.data);
                    setSeries(res.data)
                });



            setIsLoading(false);
        }
    });

    const updateDelete = (id) => {
        // TODO: remove this entry from mongodb using axios.delete

        const response = axios.delete('https://node.aryzap.com/api/episodes/' + id).catch(err => {
            console.log(err.message);
            toast.promise(response, {
                loading: 'Loading...',
                success: 'Episode has been deleted successfully',
                error: 'Found some errors while deleting...',
            });
        }).then(res => {

            console.log(res.data);
            alert(JSON.stringify(res.data));
            toast.promise(response, {
                loading: 'Loading...',
                success: 'Episode has been deleted successfully',
                error: 'Found some errors while deleting...',
            });
            setTimeout(() => {
                window.location.reload();
            }, 3000)
        });




    }

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
                Episodes

            </div>
            <div className="mt-2 mb-12 flex space-x-6">
                <label for="s_genres" class="block mb-2 text-lg font-bold text-gray-900 dark:text-white mt-2 ">Series</label>
                {allSeries != null ? <select className='rounded-md text-black w-full' onChange={handleChangeSeries}>
                    {allSeries.map((srs) =>
                        <option value={srs._id}>{srs.title}</option>
                    )}

                </select> : "Loading..."}
                <button className='bg-red-700 p-2 rounded-md' onClick={onSubmit}>Fetch</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                <a href="/episode/create">
                    <div className={"rounded-md h-40 hover:bg-gray-950 bg-blue-950 animate-pulse"}>

                        <div className="p-6 ">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">


                                    <CursorArrowRippleIcon width={30} color='orange' />

                                    <h2 className="text-sm font-bold mt-2">
                                        Add an Episode +
                                    </h2>
                                    <p className='text-xs font-light w-52'>
                                        Add a new Episode, type your episode meta data info
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a >



                {series ? series?.episodes?.map((app, index) => {
                    return (
                        <div
                            className={`rounded-md h-40 relative overflow-hidden block z-10 before:content-[''] before:absolute before:inset-0 before:block before:bg-gradient-to-r before:from-black before:to-transparent before:opacity-30 before:z-[-5]  bg-cover `}
                            style={{
                                backgroundImage: `url(${app.imagePath})`
                            }}>
                            <div className="absolute inset-0 z-10 text-center flex flex-row  opacity-0 hover:opacity-100  duration-300">
                                <a href={`ytepisode/edit/${app._id}`} class="bg-opacity-70 hover:bg-opacity-60 w-1/2 hover:bg-green-600 bg-green-950 h-40 ">
                                    <div className='h-12'></div>
                                    <center><PencilSquareIcon width={30} /></center>
                                    <p className='text-white font-bold'>Edit</p>
                                </a>
                                <a onClick={() => confirmAlert({
                                    title: 'Are you sure  you want to delete this',
                                    message: 'Are you sure to do this.',
                                    buttons: [
                                        {
                                            label: 'Yes',
                                            onClick: () => updateDelete(app._id)
                                        },
                                        {
                                            label: 'No',
                                            onClick: () => {

                                            }
                                        }
                                    ]
                                })} class="w-1/2 bg-opacity-70 hover:bg-opacity-60 hover:bg-red-600 bg-red-950 h-40 justify-center mx-auto items-center text-center ">
                                    <div className='h-12'></div>
                                    <center><TrashIcon width={30} /></center>
                                    <p className='text-white font-bold'>Delete</p>
                                </a>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">

                                        <div className='h-12'>

                                        </div>



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


            </div >


        </>
    )
}

export default DMEpisode;