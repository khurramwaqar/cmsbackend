import React, { useEffect, useState } from 'react'


import fs from 'fs';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { TagsInput } from "react-tag-input-component";
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { Toaster, toast } from 'react-hot-toast';
import { Multiselect } from 'react-widgets';
import Toggle from 'react-toggle'
import { ArrowRightCircleIcon, ChevronDoubleUpIcon, ChevronUpIcon, CircleStackIcon, CloudArrowUpIcon, CodeBracketIcon, CursorArrowRippleIcon, DocumentIcon, InboxStackIcon, PencilSquareIcon, PlayCircleIcon, PlayIcon, ShieldCheckIcon, Square2StackIcon, TvIcon } from '@heroicons/react/24/outline';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const SeriesCreate = () => {


    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);
    const [image6, setImage6] = useState(null);
    const [singleGeop, setSingleGeop] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedApps, setSelectedApps] = useState(null);
    const [selectedGenres, setSelectedGenres] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [apps, setApps] = useState(null);
    const [finalApps, setFinalApps] = useState(null);


    const [ageRat, setAgeRat] = useState(null);

    const [finalAgeRatings, setFinalAgeRating] = useState(null);
    const [selectedAgeRatings, setSelectedAgeRatings] = useState(null);

    const [finalGenres, setFinalGenres] = useState(null);
    const [finalCategories, setFinalCategories] = useState(null);
    const [genres, setGenres] = useState(null);
    const [categories, setCategories] = useState(null);
    const [ages, setAges] = useState(null);
    const [ads, setAds] = useState(null);
    const [geoPolicy, setGeoPolicy] = useState(null);
    const [appsLoad, setAppsLoad] = useState(true);
    const [colors, setColors] = useState(null);
    const [file, setFile] = useState(null);
    const [imagePath, setImgPath] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [genreTitle, setGenreTitle] = useState(false);
    const [genreDesc, setGenreDesc] = useState(false);
    const [appId, setAppId] = useState(false);
    const [casts, setCasts] = useState(null);
    const [isVideoIs, setIsVideoIs] = useState(false);
    const [isLive, setIsLive] = useState(false);
    const [seriesEvent, setSeriesEvent] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

    const handleImg1 = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setImage1(file);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = axios.post('https://node.aryzap.com/api/media/pupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure proper content type for file upload
                },
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            }).then((resp) => {
                console.log(resp.data);
                setImage1(resp.data.imagePath);
                console.log(image1);
                setIsLoading(false);
            });
            console.log(response.data);
            if (response.status === 200) {
                console.log('File uploaded successfully');
            } else {
                console.error('File upload failed');
            }

            toast.promise(response, {
                loading: 'Poster Image Uploading...',
                success: 'Poster Image Uploaded Successfully',
                error: 'Found some errors while saving...',
            });

        } catch (error) {
            console.error('Error uploading file:', error);
            setIsLoading(false);
        }
    };

    const handleImg2 = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setImage2(file);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = axios.post('https://node.aryzap.com/api/media/mupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure proper content type for file upload
                },
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            }).then((resp) => {
                console.log(resp.data);
                setImage2(resp.data.imagePath);
                console.log(image2);
                setIsLoading(false);
            });
            console.log(response.data);
            if (response.status === 200) {
                console.log('File uploaded successfully');
            } else {
                console.error('File upload failed');
            }

            toast.promise(response, {
                loading: 'Image Uploading...',
                success: 'Mobile Image Uploaded Successfully',
                error: 'Mobile Found some errors while saving...',
            });

        } catch (error) {
            console.error('Error uploading file:', error);
            setIsLoading(false);
        }
    };

    const handleImg3 = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setImage3(file);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = axios.post('https://node.aryzap.com/api/media/dupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure proper content type for file upload
                },
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            }).then((resp) => {
                console.log(resp.data);
                setImage3(resp.data.imagePath);
                console.log(image3);
                setIsLoading(false);
            });
            console.log(response.data);
            if (response.status === 200) {
                console.log('File uploaded successfully');
            } else {
                console.error('File upload failed');
            }

            toast.promise(response, {
                loading: 'Desktop Image Uploading...',
                success: 'Desktop Image Uploaded Successfully',
                error: 'Found some errors while saving...',
            });

        } catch (error) {
            console.error('Error uploading file:', error);
            setIsLoading(false);
        }
    };
    const handleImg4 = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setImage4(file);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = axios.post('https://node.aryzap.com/api/media/lupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure proper content type for file upload
                },
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            }).then((resp) => {
                console.log(resp.data);
                setImage4(resp.data.imagePath);
                console.log(image4);
                setIsLoading(false);
            });
            console.log(response.data);
            if (response.status === 200) {
                console.log('File uploaded successfully');
            } else {
                console.error('File upload failed');
            }

            toast.promise(response, {
                loading: 'Logo Image Uploading...',
                success: 'Logo Image Uploaded Successfully',
                error: 'Found some errors while saving...',
            });

        } catch (error) {
            console.error('Error uploading file:', error);
            setIsLoading(false);
        }
    };
    const handleImg5 = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setImage5(file);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = axios.post('https://node.aryzap.com/api/media/bupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure proper content type for file upload
                },
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            }).then((resp) => {
                console.log(resp.data);
                setImage4(resp.data.imagePath);
                console.log(image5);
                setIsLoading(false);
            });
            console.log(response.data);
            if (response.status === 200) {
                console.log('File uploaded successfully');
            } else {
                console.error('File upload failed');
            }

            toast.promise(response, {
                loading: 'Logo Image Uploading...',
                success: 'Logo Image Uploaded Successfully',
                error: 'Found some errors while saving...',
            });

        } catch (error) {
            console.error('Error uploading file:', error);
            setIsLoading(false);
        }
    };
    const handleImg6 = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setImage5(file);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = axios.post('https://node.aryzap.com/api/media/eupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure proper content type for file upload
                },
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            }).then((resp) => {
                console.log(resp.data);
                setImage4(resp.data.imagePath);
                console.log(image6);
                setIsLoading(false);
            });
            console.log(response.data);
            if (response.status === 200) {
                console.log('File uploaded successfully');
            } else {
                console.error('File upload failed');
            }

            toast.promise(response, {
                loading: 'Logo Image Uploading...',
                success: 'Logo Image Uploaded Successfully',
                error: 'Found some errors while saving...',
            });

        } catch (error) {
            console.error('Error uploading file:', error);
            setIsLoading(false);
        }
    };



    const onSubmit = (data) => {
        console.log(data);
        console.log(finalApps);
        console.log(finalGenres);
        console.log(finalCategories);

        try {
            const respC = axios.post('https://node.aryzap.com/api/series', {
                title: data.seriesName,
                description: data.seriesDescription,
                cast: casts,
                seriesDM: data.seriesDM,
                seriesYT: data.seriesYT,
                seiresCDN: data.seriesCDNLink,
                imagePoster: `poster/${image1}`,
                imageCoverMobile: `mobile/${image2}`,
                imageCoverDesktop: `desktop/${image3}`,
                imageCoverBig: `big/${image5}`,
                imageCoverExtra: `extra/${image6}`,
                trailer: data.seriesTrailer,
                ost: data.seriesOST,
                logo: `logo/${image4}`,
                day: data.seriesAirDay,
                time: data.seriesAirTime,
                ageRatingId: finalAgeRatings,
                genreId: finalGenres,
                categoryId: finalCategories,
                appId: finalApps,
                status: "published",
                geoPolicy: singleGeop,
                adsManager: data.seriesAds,
                seriesType: data.seriesTypeR,
                isDM: true,
                seiresCDNWebLink: data.seiresCDNWebLink,
                seiresCDNWebKey: data.seiresCDNWebKey,
                seriesLayout: data.seriesLayout,
                isLive: isLive,
                optionalFieldOne: data.optFieldOne,
                optionalFieldTwo: data.optFieldTwo,
                releaseDate: data.releaseDate,
                cdnPlatform: data.cdnPlatform
            }).catch((error) => {

                return console.log(error);

            }).then((response) => {
                console.log(response);

                if (response.status === 200) {
                    return true;
                }
                // return window.location.reload();
            });
            toast.promise(respC, {
                loading: 'Loading...',
                success: 'Series has been added successfully',
                error: 'Found some errors while saving...',
            });
        } catch (e) {
            alert(e.message);
        }




    };
    const sfApps = [];
    const sfCatfegories = [];
    const sfGenres = [];
    const sfAgeRatings = [];
    const handleChangeApps = (str) => {
        setSelectedApps(str);
        // create a for loop to get only values in above results which belongs to str variable and set to setFinalApps
        for (let i = 0; i < str.length; i++) {
            sfApps.push(str[i].value);
        }
        setFinalApps(sfApps);
    }

    const handleChangeAgeRating = (str) => {
        setSelectedAgeRatings(str);
        // create a for loop to get only values in above results which belongs to str variable and set to setFinalApps
        // for (let i = 0; i < str.length; i++) {
        //     sfAgeRatings.push(str[i].value);
        // }

        setFinalAgeRating(str.value);
    }

    const handleChangeGenres = (str) => {
        setSelectedGenres(str);
        // create a for loop to get only values in above results which belongs to str variable and set to setFinalApps
        for (let i = 0; i < str.length; i++) {
            sfGenres.push(str[i].value);
        }
        setFinalGenres(sfGenres);
    }
    const handleChangeCategories = (str) => {
        setSelectedCategories(str);
        // create a for loop to get only values in above results which belongs to str variable and set to setFinalApps
        for (let i = 0; i < str.length; i++) {
            sfCatfegories.push(str[i].value);
        }
        setFinalCategories(sfCatfegories);
    }

    const appsHolder = [];
    const genresHolder = [];
    const categoriesHolder = [];
    const geoPolicyHolder = [];

    const ageRatingHolder = [];

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    useEffect(() => {
        if (appsLoad) {

            const appsRep = axios.get('https://node.aryzap.com/api/apps/').catch(error => {
                alert(error.message);
            }).then(response => {
                console.log(response.data);
                // create a for loop for each app
                for (let i = 0; i < response.data.length; i++) {
                    appsHolder.push({
                        value: response.data[i]._id,
                        label: response.data[i].title,
                    });
                }
                setApps(appsHolder);
            });

            const genresRep = axios.get('https://node.aryzap.com/api/genres').catch(error => {
                alert(error.message);
            }).then(response => {
                console.log(response.data);
                // create a for loop for each app
                for (let i = 0; i < response.data.length; i++) {
                    genresHolder.push({
                        value: response.data[i]._id,
                        label: response.data[i].title,
                    });
                }
                setGenres(genresHolder);
            });

            const categoriesRep = axios.get('https://node.aryzap.com/api/categories').catch(error => {
                alert(error.message);
            }).then(response => {
                console.log(response.data);
                // create a for loop for each app
                for (let i = 0; i < response.data.length; i++) {
                    categoriesHolder.push({
                        value: response.data[i]._id,
                        label: response.data[i].title,
                    });
                }
                setCategories(categoriesHolder);
            });

            const agesResp = axios.get('https://node.aryzap.com/api/ageratings').catch(error => {
                alert(error.message);
            }).then(response => {
                //setAges(response.data);
                for (let i = 0; i < response.data.length; i++) {
                    ageRatingHolder.push({
                        value: response.data[i]._id,
                        label: response.data[i].title,
                    });
                }
                setAgeRat(ageRatingHolder);
            });

            const adsResp = axios.get('https://node.aryzap.com/api/ads').catch(error => {
                alert(error.message);
            }).then(response => {
                setAds(response.data);
            });

            const geoPolicyResp = axios.get('https://node.aryzap.com/api/geo').catch(error => {
                alert(error.message);
            }).then(response => {
                setGeoPolicy(response.data);
                console.log(response.data);
            });


            setAppsLoad(false);
        }
    });

    const eventChangeFunc = (e) => {
        setSeriesEvent(e);
    }

    const handleImageUploading = async (e) => {
        e.preventDefault();
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
                Series <span className='font-extrabold'>{'>'}</span> Add and Series
            </div>

            <section class="bg-white dark:bg-gray-600">
                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Series</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-6'>
                            <div>
                                <label for="series_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series name</label>
                                <input
                                    type="text"
                                    required="true"
                                    id="s_name"
                                    {...register("seriesName")}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="The Shawshank Redemption"
                                />
                            </div>
                        </div>
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="s_ost" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CDN Platform</label>

                                <select required {...register("cdnPlatform")} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value={'yt'}> Youtube </option>
                                    <option value={'dm'}> Dailymotion </option>
                                    <option value={'cdn'}> CDN </option>

                                </select>

                            </div>
                            <div>
                                <label for="s_ost" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series Type</label>
                                {/* <input
                                    type="text"
                                    id="s_ost"
                                    {...register("seriesType")}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Series Type: show|live|singleVideo|webview"
                                    required /> */}
                                <select {...register("seriesTypeR")} onChange={(e) => eventChangeFunc(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value={'show'}> Show </option>
                                    <option value={'live-event'}> Live Event </option>
                                    <option value={'live'}> Live </option>
                                    <option value={'programs'}> Programs </option>
                                    <option value={'singleVideo'}> Single Video </option>
                                    <option value={'webview'}> WebView </option>

                                </select>

                            </div>
                        </div>

                        {seriesEvent == "live-event" || seriesEvent == "live" || seriesEvent == "singleVideo" ?
                            <>
                                <div className='grid gap-6 mb-6 md:grid-cols-3 border-x-2 border-y-2 border-gray-500 rounded-md py-2 px-2'>

                                    <div>
                                        <label for="s_cdn_link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series CDN  WEB Link</label>
                                        <input
                                            type="text"
                                            id="s_cdn_linkWeb"
                                            {...register("seiresCDNWebLink")}
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder=".m3u/.mp4/.mpd"
                                        />
                                    </div>
                                    <div>
                                        <label for="s_cdn_link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series CDN Web Key</label>
                                        <input
                                            type="text"
                                            id="s_cdn_linkWebKey"
                                            {...register("seiresCDNWebKey")}
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="nzvspakweb2024"
                                        />
                                    </div>
                                    <div>
                                        <label for="s_yt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Is Live</label>
                                        <Toggle
                                            defaultChecked={isLive}
                                            onChange={() => { if (isLive == true) { setIsLive(false); } else { setIsLive(true); } }} />


                                    </div>
                                </div>

                            </> : <div className='grid gap-6 mb-6 md:grid-cols-3 border-x-2 border-y-2 border-gray-400 rounded-md py-2 px-2'>
                                <div>
                                    <label for="s_yt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series YT</label>
                                    <input
                                        type="text"
                                        id="s_yt"
                                        {...register("seriesYT")}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="YT playlist"
                                    />
                                </div>
                                <div>
                                    <label for="s_dm" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series DM</label>
                                    <input
                                        type="text"
                                        id="s_dm"
                                        {...register("seriesDM")}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="DM playlist"
                                    />
                                </div>
                                <div>
                                    <label for="s_ost" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">DM or YT</label>
                                    <Toggle
                                        disabled
                                        defaultChecked={isVideoIs}
                                        onChange={() => { if (isVideoIs == true) { setIsVideoIs(false); } else { setIsVideoIs(true); } }} />

                                </div>



                            </div>

                        }



                        <div class="grid gap-6 mb-6 md:grid-cols-3">
                            <div>
                                <label for="s_trailer" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series Trailer</label>
                                <input
                                    type="text"
                                    id="s_trailer"
                                    {...register("seriesTrailer")}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="trailer.m3u/yout.be/trailer/link"
                                />
                            </div>
                            <div>
                                <label for="s_ost" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series Theme Song</label>
                                <input
                                    type="text"
                                    id="s_ost"
                                    {...register("seriesOST")}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Series Theme Song, Drama's OST"
                                />
                            </div>
                            <div>

                                <label for="s_cdn_link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series CDN Link</label>
                                <input
                                    type="text"
                                    id="s_cdn_link"
                                    {...register("seriesCDNLink")}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="App CDN Link: .m3u/.mp4/.mpd"
                                />

                            </div>
                            <div>
                                <label for="s_yt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series Layout</label>

                                <select {...register("seriesLayout")} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value={'v1'}> V1 </option>
                                    <option value={'v2'}> V2 </option>
                                    <option value={'v3'}> V3 </option>

                                </select>
                            </div>

                            <div>
                                <label for="s_yt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Optional Field One</label>
                                <input
                                    type="text"
                                    id="s_yt"
                                    {...register("optFieldOne")}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Extra Field One"
                                />
                            </div>

                            <div>
                                <label for="s_yt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Optional Field Two</label>
                                <input
                                    type="text"
                                    id="s_yt"
                                    {...register("optFieldTwo")}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Extra Field Two"
                                />
                            </div>



                        </div>
                        <div class="mb-6">
                            <label for="s_portraitImg" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series Cast</label>
                            <TagsInput
                                classNames={{ tag: "text-gray-950", input: "text-black" }}
                                value={casts}
                                onChange={setCasts}
                                name="casts"
                                placeHolder="Series Cast"
                            />
                        </div>
                        <div class="grid gap-6 mb-6 md:grid-cols-3">
                            <div class="mb-6">
                                <label for="s_airday" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Air Day</label>
                                <input
                                    type="text"
                                    id="s_airday"
                                    {...register("seriesAirDay")}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Mon-Fri"
                                />
                            </div>
                            <div class="mb-6">
                                <label for="s_time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                                <input
                                    type="text"
                                    id="s_time"
                                    {...register("seriesAirTime")}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="09:45 PM"
                                />
                            </div>
                            <div class="mb-6">
                                <label for="s_ages" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age Ratings</label>
                                {/* <select {...register("seriesAges")} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {ages != null && ages.map((age, index) => {
                                        return <option value={age._id}> {age.title} </option>
                                    })}
                                </select> */}
                                <Select
                                    required={true}
                                    className='text-black'
                                    value={selectedAgeRatings}
                                    onChange={handleChangeAgeRating}
                                    options={ageRat}
                                />
                            </div>

                            <div class="mb-6">
                                <label for="s_genres" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series Genres</label>
                                <Select
                                    required={true}
                                    isMulti
                                    className='text-black'
                                    value={selectedGenres}
                                    onChange={handleChangeGenres}
                                    options={genres}
                                />
                            </div>

                            <div class="mb-6">
                                <label for="s_categories" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categories ID</label>
                                <Select
                                    required={true}
                                    isMulti
                                    className='text-black'
                                    value={selectedCategories}
                                    onChange={handleChangeCategories}
                                    options={categories}
                                />
                            </div>

                            <div class="mb-6">
                                <label for="s_appId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">App ID</label>
                                {/* <select data-te-select-init {...register("seriesAppId")} multiple onChange={(e) => setAppId(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {apps != null && apps.map((app, index) => {
                                        return <option value={app._id}> {app.title} </option>
                                    })}
                                </select> */}
                                <Select
                                    isMulti
                                    required={true}
                                    className='text-black'
                                    value={selectedApps}
                                    onChange={handleChangeApps}
                                    options={apps}
                                />
                            </div>
                        </div>
                        <label for="s_portraitImg" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Geo Policy</label>

                        <div class="grid grid-cols-3 gap-2 w-full max-w-screen-sm mb-5">
                            {geoPolicy != null && geoPolicy.map((geop, index) =>


                                <div className="bg-gray-950">
                                    <input class="hidden" id={"radio_" + index} onChange={(e) => setSingleGeop(e.target.value)} value={geop._id} type="radio" name="geoPolicy" />
                                    <label class="flex flex-col p-4 border-2 border-gray-400 cursor-pointer" for={"radio_" + index}>
                                        <span class="text-xs font-semibold uppercase">{geop.title}</span>
                                        <span class="text-xl font-bold mt-2">{geop.condition}</span>
                                        <p className="text-xs ellip line-clamp-1">{geop.countries}</p>
                                    </label>
                                </div>

                            )}

                        </div>

                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div class="mb-6">
                                <label for="s_portraitImg" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ads Manager</label>
                                <select {...register("seriesAds")} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {ads != null && ads.map((ads, index) => {
                                        return <option value={ads._id}> {ads.title} </option>
                                    })}
                                </select>
                            </div>

                            <div class="mb-6">
                                <label for="s_portraitImg" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Released Date</label>
                                <input {...register("releaseDate")} className=' py-1 px-1 bg-gray-700 w-full' type="date" id="releaseDate" name="releaseDate" />
                            </div>
                        </div>

                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div class="mb-6">
                                <label for="s_portraitImg" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image: Portrait/Poster</label>
                                <input
                                    onChange={(e) => handleImg1(e)}
                                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-600 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    aria-describedby="file_input_help"
                                    id="file_input"
                                    accept="image/*"
                                    type="file" />
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 280x400px).</p>

                            </div>
                            <div class="mb-6">
                                <label for="s_mobileImg" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image: Mobile Cover</label>
                                <input
                                    onChange={(e) => handleImg2(e)}
                                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-600 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    aria-describedby="file_input_help"
                                    id="file_input"
                                    accept="image/*"
                                    type="file" />
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 600x400px).</p>

                            </div>
                            <div class="mb-6">
                                <label for="s_desktopImg" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image: Desktop</label>
                                <input
                                    onChange={(e) => handleImg3(e)}
                                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-600 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    aria-describedby="file_input_help"
                                    id="file_input"
                                    accept="image/*"
                                    type="file" />
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 1600x600px).</p>

                            </div>

                            <div class="mb-6">
                                <label for="s_logoimg" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image: Logo</label>
                                <input
                                    onChange={(e) => handleImg4(e)}
                                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-600 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    aria-describedby="file_input_help"
                                    id="file_input"
                                    accept="image/*"
                                    type="file" />
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 300x100px).</p>

                            </div>
                            <div class="mb-6">
                                <label for="s_logoimg" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image: Big</label>
                                <input
                                    onChange={(e) => handleImg5(e)}
                                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-600 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    aria-describedby="file_input_help"
                                    id="file_input"
                                    accept="image/*"
                                    type="file" />
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 1578x886px).</p>

                            </div>
                            <div class="mb-6">
                                <label for="s_logoimg" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image: Extra</label>
                                <input
                                    onChange={(e) => handleImg6(e)}
                                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-600 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    aria-describedby="file_input_help"
                                    id="file_input"
                                    accept="image/*"
                                    type="file" />
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (extra).</p>

                            </div>




                        </div>


                        <div className='mb-10'>
                            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea
                                onChange={(e) => setGenreDesc(e.target.value)}
                                id="description"
                                {...register("seriesDescription")}
                                rows="8"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="App description here">

                            </textarea>
                        </div>
                        <div class="flex items-start mb-6">
                            <div class="flex items-center h-5">
                                <input
                                    id="remember"
                                    type="checkbox" value=""
                                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                    required />
                            </div>
                            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                        </div>
                        <button
                            type="submit" class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>

                </div>
            </section >
        </>
    )
}

export default SeriesCreate