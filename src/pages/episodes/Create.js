import React, { useEffect, useState } from 'react'
import fs from 'fs';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { TagsInput } from "react-tag-input-component";
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { Toaster, toast } from 'react-hot-toast';
import { Multiselect } from 'react-widgets';
import Toggle from 'react-toggle';
const EpisodeCreate = () => {


    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedApps, setSelectedApps] = useState(null);
    const [selectedGenres, setSelectedGenres] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [apps, setApps] = useState(null);
    const [finalApps, setFinalApps] = useState(null);
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

    const [isPublished, setIsPublished] = useState(null);

    const handleImg1 = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setImage1(file);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = axios.post('https://node.aryzap.com/api/media/cdnv1', formData, {
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
            const response = axios.post('https://node.aryzap.com/api/media/cdnv2', formData, {
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





    const onSubmit = (data) => {
        console.log(data);
        console.log(finalApps);
        console.log(finalGenres);
        console.log(finalCategories);

        try {
            const respC = axios.post('https://node.aryzap.com/api/cdn', {
                title: data.epVideoName,
                description: data.epVideoDescription,
                seriesId: finalCategories,
                videoEpNumber: data.epVideoNumber,
                videoSource: data.epVideoSource,
                imagePath: `cdnv1/${image1}`,
                imagePathV2: `cdnv2/${image2}`,
                published: isPublished,
                videoViews: data.epVideoViews,
                videoLength: data.epVideoLength,
                videoType: data.epVideoTypes
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
                success: 'Video has been added successfully',
                error: 'Found some errors while saving...',
            });
        } catch (e) {
            alert(e.message);
        }




    };
    const sfApps = [];
    const sfCatfegories = [];
    const sfGenres = [];

    const handleChangeApps = (str) => {
        setSelectedApps(str);
        // create a for loop to get only values in above results which belongs to str variable and set to setFinalApps
        for (let i = 0; i < str.length; i++) {
            sfApps.push(str[i].value);
        }
        setFinalApps(sfApps);
    }
    const handleChangeGenres = (str) => {
        setSelectedGenres(str);
        // create a for loop to get only values in above results which belongs to str variable and set to setFinalApps
        for (let i = 0; i < str.length; i++) {
            sfGenres.push(str[i].value);
        }
        setFinalGenres(sfGenres);
    }
    const handleChangeCategories = (selectedOption) => {
        setSelectedCategories(selectedOption); // Update selected option
        setFinalCategories(selectedOption.value); // Extract and set the value
    }

    const appsHolder = [];
    const genresHolder = [];
    const categoriesHolder = [];


    useEffect(() => {
        if (appsLoad) {
            const categoriesRep = axios.get('https://node.aryzap.com/api/series').catch(error => {
                alert(error.message);
            }).then(response => {
                console.log(response.data);
                // create a for loop for each app
                for (let i = 0; i < response.data.series.length; i++) {
                    categoriesHolder.push({
                        value: response.data.series[i]._id,
                        label: response.data.series[i].title,
                    });
                }
                setCategories(categoriesHolder);
            });

            setAppsLoad(false);
        }
    });



    const handleImageUploading = async (e) => {
        e.preventDefault();
    };

    const videoTypes = [
        { "title": "episode" },
        { "title": "ost" },
        { "title": "trailer" },
        { "title": "promo" },
        { "title": "other" },
    ]



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
                Series <span className='font-extrabold'>{'>'}</span> Add and Episode
            </div>

            <section class="bg-white dark:bg-gray-600">
                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Episode</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="series_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Video Name</label>
                                <input
                                    type="text"
                                    id="s_name"
                                    {...register("epVideoName")}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Video Name"
                                />
                            </div>
                            <div>
                                <label for="s_cdn_link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Episode CDN Link</label>
                                <input
                                    type="text"
                                    id="s_cdn_link"
                                    {...register("epVideoSource")}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=".m3u/.mp4/.mpd"
                                    required />
                            </div>

                        </div>



                        <div class="grid gap-6 mb-6 md:grid-cols-3">
                            <div class="mb-6">
                                <label for="s_airday" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Episode Number</label>
                                <input
                                    type="text"
                                    id="s_airday"
                                    {...register("epVideoNumber")}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="01"
                                />
                            </div>
                            <div class="mb-6">
                                <label for="s_time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Video Views</label>
                                <input
                                    type="text"
                                    id="s_time"
                                    {...register("epVideoViews")}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="1024"
                                />
                            </div>
                            <div class="mb-6">
                                <label for="s_time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Video Length</label>
                                <input
                                    type="text"
                                    id="s_time"
                                    {...register("epVideoLength")}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="52 Minutes"
                                />
                            </div>
                            <div class="mb-6">
                                <label for="s_ages" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Video Types</label>
                                <select {...register("epVideoTypes")} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {videoTypes != null && videoTypes.map((type, index) => {
                                        return <option value={type.title}> {type.title} </option>
                                    })}
                                </select>
                            </div>

                            <div class="mb-6">
                                <label for="s_categories" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series ID</label>
                                <Select

                                    className='text-black'
                                    value={selectedCategories}
                                    onChange={handleChangeCategories}
                                    options={categories}
                                />
                            </div>


                        </div>




                        <div class="grid gap-6 mb-6 md:grid-cols-3">
                            <div class="mb-6">
                                <label for="s_ost" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">If you want to publish this video on devices please toggle the below button</label>
                                <Toggle
                                    defaultChecked={isPublished}
                                    onChange={() => { if (isPublished == true) { setIsPublished(false); } else { setIsPublished(true); } }} />
                            </div>
                            <div class="mb-6">
                                <label for="s_portraitImg" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ImagePath: </label>
                                <input
                                    onChange={(e) => handleImg1(e)}
                                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-600 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    aria-describedby="file_input_help"
                                    id="file_input"
                                    accept="image/*"
                                    type="file" />
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 1080x720px).</p>

                            </div>
                            <div class="mb-6">
                                <label for="s_mobileImg" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ImagePathv2: </label>
                                <input
                                    onChange={(e) => handleImg2(e)}
                                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-600 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    aria-describedby="file_input_help"
                                    id="file_input"
                                    accept="image/*"
                                    type="file" />
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 280x400px).</p>

                            </div>


                        </div>


                        <div className='mb-10'>
                            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Episode Description</label>
                            <textarea
                                onChange={(e) => setGenreDesc(e.target.value)}
                                id="description"
                                {...register("epVideoDescription")}
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
            </section>
        </>
    )
}

export default EpisodeCreate;