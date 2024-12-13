import React, { useEffect, useState } from 'react'
import fs from 'fs';
import axios from 'axios';
import { TagsInput } from "react-tag-input-component";
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { Toaster, toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { Multiselect } from 'react-widgets';
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';
import Toggle from 'react-toggle'

const SeriesEdit = (props) => {

    const sfApps = [];
    const sfCatfegories = [];
    const sfGenres = [];
    const sfAppsX = [];
    const sfCatfegoriesX = [];
    const sfGenresX = [];

    const params = useParams(props);
    const seriesTypesMeta = ['show', 'live-event', 'live', 'programs', 'singleVideo', 'webview'];

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    const [image5, setImage5] = useState(null);
    const [image6, setImage6] = useState(null);

    const [geoPolicy, setGeoPolicy] = useState(null);
    const [singleGeop, setSingleGeop] = useState(null);
    const [singleAd, setSingleAd] = useState(null);
    const [seriesName, setSeriesName] = useState(null)
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resetOptions: {
            keepDirtyValues: true,
            keepErrors: true,
        }
    });
    const [selectedApps, setSelectedApps] = useState(null);
    const [selectedGenres, setSelectedGenres] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState(null);

    const [finalApps, setFinalApps] = useState(null);
    const [finalGenres, setFinalGenres] = useState(null);
    const [finalGenres2, setFinalGenres2] = useState(null);
    const [finalCategories, setFinalCategories] = useState(null);
    const [apps, setApps] = useState(null);
    const [genres, setGenres] = useState(null);
    const [categories, setCategories] = useState(null);

    ///

    const [eAppsX, setEAppsX] = useState(null);
    const [eGenresX, setEGenresX] = useState(null);
    const [eCategoriesX, setECategoriesX] = useState(null);

    ///

    ///Edit Update Const


    const [eGeoPolicy, setEGeoPolicy] = useState(null);
    const [eApps, setEApps] = useState(null);
    const [eGenres, setEGenres] = useState(null);
    const [eCategories, setECategories] = useState(null);

    // Final state for db

    const [XApps, setXApps] = useState(null);
    const [XGenres, setXGenres] = useState(null);
    const [XCategories, setXCategories] = useState(null);


    ///Edit Update Consts

    const [ages, setAges] = useState(null);
    const [ads, setAds] = useState(null);
    const [appsLoad, setAppsLoad] = useState(true);
    const [colors, setColors] = useState(null);
    const [file, setFile] = useState(null);
    const [imagePath, setImgPath] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [genreTitle, setGenreTitle] = useState(false);
    const [genreDesc, setGenreDesc] = useState(false);
    const [appId, setAppId] = useState(false);
    const [casts, setCasts] = useState(null);
    const [editData, setEditData] = useState(null);
    const [isVideoIs, setIsVideoIs] = useState(null);


    const eAppsHolder = [];
    const eCategoriesHolder = [];
    const eGenresHolder = [];


    const appsHolder = [];
    const genresHolder = [];
    const categoriesHolder = [];

    const [isLive, setIsLive] = useState(false);
    const [seriesEvent, setSeriesEvent] = useState(null);
    const [inputValues, setInputValues] = useState({
        cast: Array(),
        title: '',
        description: '',
        age: Array(),
        seriesDM: '',
        seriesYT: '',
        seiresCDN: '',
        seiresCDNWebLink: '',
        seiresCDNWebKey: '',
        imagePoster: '',
        imageCoverMobile: '',
        imageCoverDesktop: '',
        imageCoverBig: '',
        imageCoverExtra: '',
        trailer: '',
        ost: '',
        logo: '',
        day: '',
        time: '',
        ageRatingId: '',
        genreId: Array(),
        categoryId: Array(),
        appId: Array(),
        adsManager: '',
        seriesType: '',
        geoPolicy: Array(),
        optFieldOne: '',
        optFieldTwo: '',
        isLive: Boolean,
        seriesLayout: '',
        cdnPlatform: '',
        releaseDate: ''

    });


    useEffect(() => {
        if (isLoading) {







            axios.get(`https://node.aryzap.com/api/series/${params.id}`).catch(err => {
                console.log(err);
            }).then((res) => {
                console.log(res.data);
                setImage1(res.data.imagePoster);
                setImage2(res.data.imageCoverMobile);
                setImage3(res.data.imageCoverDesktop);
                setImage4(res.data.logo);
                setIsVideoIs(res.data.isDM);
                setIsLive(res?.data?.isLive);

                for (let i = 0; i < res.data.genreId?.length; i++) {
                    eGenresHolder.push({
                        value: res.data.genreId[i]._id,
                        label: res.data.genreId[i].title,
                    });
                }
                setEGenres(eGenresHolder);
                for (let i = 0; i < eGenresHolder.length; i++) {
                    sfGenresX.push(eGenresHolder[i].value);
                }
                setEGenresX(sfGenresX);

                for (let i = 0; i < res.data.appId?.length; i++) {
                    eAppsHolder.push({
                        value: res.data.appId[i]._id,
                        label: res.data.appId[i].title,
                    });
                }
                setEApps(eAppsHolder);
                for (let i = 0; i < eAppsHolder.length; i++) {
                    sfAppsX.push(eAppsHolder[i].value);
                }
                setEAppsX(sfAppsX);

                for (let i = 0; i < res.data.categoryId?.length; i++) {
                    eCategoriesHolder.push({
                        value: res.data.categoryId[i]._id,
                        label: res.data.categoryId[i].title,
                    });
                }
                setECategories(eCategoriesHolder);
                for (let i = 0; i < eCategoriesHolder.length; i++) {
                    sfCatfegoriesX.push(eCategoriesHolder[i].value);
                }
                setECategoriesX(sfCatfegoriesX);
                setEditData(res.data);
                setInputValues({
                    ...inputValues,
                    cast: res.data.cast,
                    title: res.data.title,
                    description: res.data.description,
                    age: res.data.age,
                    seriesDM: res.data.seriesDM,
                    seriesYT: res.data.seriesYT,
                    seiresCDN: res.data.seiresCDN,
                    seiresCDNWebKey: res.data.seiresCDNWebKey,
                    seiresCDNWebLink: res.data.seiresCDNWebLink,
                    imagePoster: res.data.imagePoster,
                    imageCoverMobile: res.data.imageCoverMobile,
                    imageCoverDesktop: res.data.imageCoverDesktop,
                    imageCoverBig: res.data.imageCoverBig,
                    imageCoverExtra: res.data.imageCoverExtra,
                    trailer: res.data.trailer,
                    ost: res.data.ost,
                    logo: res.data.logo,
                    day: res.data.day,
                    time: res.data.time,
                    ageRatingId: res.data.ageRatingId,
                    seriesType: res.data.seriesType,
                    geoPolicy: res.data.geoPolicy,
                    adsManager: res.data.adsManager,
                    optFieldOne: res.data.optionalFieldOne,
                    optFieldTwo: res.data.optionalFieldTwo,
                    seriesLayout: res.data.seriesLayout,
                    releaseDate: res.data.releaseDate,
                    isLive: res.data.isLive,
                    cdnPlatform: res.data.cdnPlatform,
                });
                eventChangeFunc(res.data.seriesType)



                setSingleAd(res.data.adsManager);
                setSingleGeop(res.data.geoPolicy._id);
                setCasts(res.data.cast)


            })
            setIsLoading(false);

        }
    });

    const eventChangeFunc = (e) => {
        setSeriesEvent(e);
    }

    const handleOnSubmitGenres = () => {
        // handleOnSubmitGenres(eGenres);

        for (let i = 0; i < eGenres.length; i++) {
            sfGenres.push(eGenres[i].value);
            sfGenresX.push(eGenres[i].value);
        }
        setEGenres(sfGenres);
        setEGenresX(sfGenresX);


        for (let i = 0; i < eCategories.length; i++) {
            sfCatfegories.push(eCategories[i].value);
            sfCatfegoriesX.push(eCategories[i].value);
        }
        setECategories(sfCatfegories);
        setECategoriesX(sfCatfegoriesX);

        for (let i = 0; i < eApps.length; i++) {
            sfApps.push(eApps[i].value);
            sfAppsX.push(eApps[i].value);
        }
        setEApps(sfApps);
        setEAppsX(sfAppsX);

    };

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
                setImage1('poster/' + resp.data.imagePath);
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
                setImage2('mobile/' + resp.data.imagePath);
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
                setImage3('desktop/' + resp.data.imagePath);
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
                setImage4('logo/' + resp.data.imagePath);
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
                setImage5('big/' + resp.data.imagePath);
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
                loading: 'Big Image Uploading...',
                success: 'Big Image Uploaded Successfully',
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
        setImage6(file);
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
                setImage6('extra/' + resp.data.imagePath);
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
                loading: 'Extra Image Uploading...',
                success: 'Extra Image Uploaded Successfully',
                error: 'Found some errors while saving...',
            });

        } catch (error) {
            console.error('Error uploading file:', error);
            setIsLoading(false);
        }
    };


    const onSubmit = (e) => {

        e.preventDefault();
        console.log(inputValues.title);

        console.log(finalApps);
        console.log(finalGenres);
        console.log(finalCategories);
        handleOnSubmitGenres();

        try {
            const respC = axios.put('https://node.aryzap.com/api/series/' + params.id, {
                title: inputValues.title,
                description: inputValues.description,
                cast: casts,
                seriesDM: inputValues.seriesDM,
                seriesYT: inputValues.seriesYT,
                seiresCDN: inputValues.seiresCDN,
                imagePoster: `${image1}`,
                imageCoverMobile: `${image2}`,
                imageCoverDesktop: `${image3}`,
                imageCoverBig: `${image5}`,
                imageCoverExtra: `${image6}`,
                trailer: inputValues.trailer,
                ost: inputValues.ost,
                logo: `${image4}`,
                day: inputValues.day,
                time: inputValues.time,
                ageRatingId: inputValues.ageRatingId,
                genreId: eGenresX,
                categoryId: eCategoriesX,
                appId: eAppsX,
                status: "published",
                geoPolicy: singleGeop,
                adsManager: singleAd,
                seriesType: seriesEvent,
                isDM: true,
                seiresCDNWebLink: inputValues.seiresCDNWebLink,
                seiresCDNWebKey: inputValues.seiresCDNWebKey,
                optionalFieldOne: inputValues.optFieldOne,
                optionalFieldTwo: inputValues.optFieldTwo,
                seriesLayout: inputValues.seriesLayout,
                isLive: isLive,
                releaseDate: inputValues.releaseDate,
                cdnPlatform: inputValues.cdnPlatform

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
                success: 'Series has been updated successfully',
                error: 'Found some errors while saving...',
            });
        } catch (e) {
            alert(e.message);
        }




    };

    const onWindowInit = () => {

        alert(apps);
    }

    const handleChangeGenres = (genres) => {
        for (let i = 0; i < genres.length; i++) {
            sfGenresX.push(genres[i].value);
        }
        setEGenresX(sfGenresX);
    }
    const handleChangeApps = (apps) => {
        for (let i = 0; i < apps.length; i++) {
            sfAppsX.push(apps[i].value);
        }
        setEAppsX(sfAppsX);
    }
    const handleChangeCategories = (categories) => {
        for (let i = 0; i < categories.length; i++) {
            sfCatfegoriesX.push(categories[i].value);
        }
        setECategoriesX(sfCatfegoriesX);
    }




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
                setAges(response.data);
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
            });

            setAppsLoad(false);
        }
    });



    const handleImageUploading = async (e) => {
        e.preventDefault();
        alert(inputValues.title);
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
            <div onClick={() => alert(seriesEvent)} className="text-2xl font-bold pb-2 mb-5  border-b border-b-gray-500 ">
                Series <span className='font-extrabold'>{'>'}</span> Edit Series
            </div>

            <section class="bg-white dark:bg-gray-600">
                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit Series</h2>

                    <form onSubmit={onSubmit}>
                        <div class="mb-6">
                            <div>
                                <label for="series_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series Name</label>
                                <input
                                    type="text"
                                    id="s_name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="The Shawshank Redemption"
                                    value={inputValues.title}
                                    onChange={(e) => {
                                        console.log('Input value changed:', e.target.value);
                                        setInputValues({ ...inputValues, title: e.target.value })
                                    }}
                                />
                            </div>
                        </div>
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="s_ost" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CDN Platform</label>
                                <select
                                    value={inputValues?.cdnPlatform || 'Select CDN Platform'} // default to 'v1' if inputValues?.seriesLayout is undefined
                                    onChange={(e) => setInputValues({ ...inputValues, cdnPlatform: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option value={'yt'}> Youtube </option>
                                    <option value={'dm'}> Dailymotion </option>
                                    <option value={'cdn'}> CDN </option>
                                </select>

                            </div>
                            <div>

                                <label for="s_ost" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series Type</label>




                                <select onChange={(e) => eventChangeFunc(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value={inputValues?.seriesType}>{inputValues?.seriesType || 'Select a type'}</option>
                                    {seriesTypesMeta
                                        .filter(type => type !== inputValues?.seriesType) // Exclude the current seriesType
                                        .map(type => (
                                            <option key={type} value={type}>
                                                {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')} {/* Capitalize and format */}
                                            </option>
                                        ))}

                                </select>



                            </div>


                        </div>

                        {seriesEvent == "live-event" || seriesEvent == "live" || seriesEvent == "singleVideo" ?
                            <>
                                <div className='grid gap-6 mb-6 md:grid-cols-3 border-x-2 border-y-2 border-gray-500 rounded-md py-2 px-2'>

                                    <div>
                                        <label for="s_cdn_link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series CDN Web Link</label>
                                        <input
                                            type="text"
                                            id="s_cdn_link_web"
                                            value={inputValues?.seiresCDNWebLink}
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder=".m3u/.mp4/.mpd"
                                            onChange={(e) => setInputValues({ ...inputValues, seiresCDNWebLink: e.target.value })}
                                        />
                                    </div>
                                    <div>

                                        <label for="s_cdn_link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series CDN Web Key</label>
                                        <input
                                            type="text"
                                            id="s_cdn_link_web_key"
                                            value={inputValues?.seiresCDNWebKey}
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="nzvspak2024"
                                            onChange={(e) => setInputValues({ ...inputValues, seiresCDNWebKey: e.target.value })}
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
                                        value={inputValues?.seriesYT}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="YT playlist"
                                        onChange={(e) => setInputValues({ ...inputValues, seriesYT: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label for="s_dm" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series DM</label>
                                    <input
                                        type="text"
                                        id="s_dm"
                                        value={inputValues?.seriesDM}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="DM playlist"
                                        onChange={(e) => setInputValues({ ...inputValues, seriesDM: e.target.value })}
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

                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="trailer.m3u/yout.be/trailer/link"
                                    value={inputValues?.trailer}
                                    onChange={(e) => setInputValues({ ...inputValues, trailer: e.target.value })}
                                />
                            </div>
                            <div>
                                <label for="s_ost" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series Theme Song</label>
                                <input
                                    type="text"
                                    id="s_ost"
                                    value={inputValues?.ost}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Series Theme Song, Drama's OST"
                                    onChange={(e) => setInputValues({ ...inputValues, ost: e.target.value })}
                                />
                            </div>
                            <div>
                                <label for="s_cdn_link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series CDN Link</label>
                                <input
                                    type="text"
                                    id="s_cdn_link"
                                    value={inputValues?.seiresCDN}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=".m3u/.mp4/.mpd"
                                    onChange={(e) => setInputValues({ ...inputValues, seiresCDN: e.target.value })}
                                />
                            </div>


                            <div>
                                <label for="s_yt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series Layout</label>

                                <select
                                    value={inputValues?.seriesLayout || 'Select Layout'} // default to 'v1' if inputValues?.seriesLayout is undefined
                                    onChange={(e) => setInputValues({ ...inputValues, seriesLayout: e.target.value })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option value={'v1'}>V1</option>
                                    <option value={'v2'}>V2</option>
                                    <option value={'v3'}>V3</option>
                                </select>
                            </div>

                            <div>
                                <label for="s_yt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Optional Field One</label>
                                <input
                                    type="text"
                                    id="s_yt"
                                    value={inputValues?.optFieldOne}
                                    onChange={(e) => setInputValues({ ...inputValues, optFieldOne: e.target.value })}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Extra Field One"
                                />
                            </div>

                            <div>
                                <label for="s_yt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Optional Field Two</label>
                                <input
                                    type="text"
                                    id="s_yt"
                                    value={inputValues?.optFieldTwo}
                                    onChange={(e) => setInputValues({ ...inputValues, optFieldTwo: e.target.value })}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Extra Field Two"
                                />
                            </div>



                        </div>
                        <div class="mb-6">
                            <label for="s_portraitImg" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series Cast</label>
                            <TagsInput
                                classNames={{ tag: "text-gray-950", input: "text-black" }}
                                value={inputValues.cast}
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
                                    defaultValue={inputValues?.day}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Mon-Fri"
                                    onChange={(e) => setInputValues({ ...inputValues, day: e.target.value })}

                                />
                            </div>
                            <div class="mb-6">
                                <label for="s_time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                                <input
                                    type="text"
                                    id="s_time"

                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="09:45 PM"
                                    defaultValue={inputValues?.time}
                                    onChange={(e) => setInputValues({ ...inputValues, time: e.target.value })}

                                />
                            </div>
                            <div class="mb-6">
                                <label for="s_ages" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age Ratings</label>
                                <select onChange={(e) => setInputValues({ ...inputValues, ageRatingId: e.target.value })} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option defaultValue={inputValues?.ageRatingId._id}> {inputValues?.ageRatingId.title} </option>
                                    {ages != null && ages.map((age, index) => {
                                        return <option value={age._id}> {age.title} </option>
                                    })}
                                </select>
                            </div>

                            <div class="mb-6">
                                <label for="s_genres" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Series Genres</label>



                                {eGenres && genres && (
                                    <>
                                        {/* {JSON.stringify(eGenres)} */}
                                        <Multiselect className='text-black'
                                            defaultValue={eGenres}
                                            data={genres}
                                            dataKey='value'
                                            textField='label'
                                            onChange={handleChangeGenres}
                                        />
                                    </>
                                )}
                            </div>

                            <div class="mb-6">
                                <label for="s_categories" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categories ID</label>

                                {eCategories && categories && (
                                    <>
                                        {/* {JSON.stringify(eCategories)} */}
                                        <Multiselect className='text-black'
                                            defaultValue={eCategories}
                                            data={categories}
                                            dataKey='value'
                                            textField='label'
                                            onChange={handleChangeCategories} />
                                    </>
                                )}
                            </div>

                            <div class="mb-6">
                                <label for="s_appId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">App ID</label>
                                {/* <select data-te-select-init {...register("seriesAppId")} multiple onChange={(e) => setAppId(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {apps != null && apps.map((app, index) => {
                                        return <option value={app._id}> {app.title} </option>
                                    })}
                                </select> */}


                                {eApps && apps && (
                                    <>
                                        {/* {JSON.stringify(eApps)} */}
                                        <Multiselect className='text-black'
                                            defaultValue={eApps}
                                            data={apps}
                                            dataKey='value'
                                            textField='label'
                                            onChange={handleChangeApps} />
                                    </>
                                )}
                            </div>
                        </div>
                        <label for="s_portraitImg" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Geo Policy</label>
                        {/* <div class="grid grid-cols-3 gap-2 w-full max-w-screen-sm mb-5">
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

                        </div> */}

                        <div className="grid gap-6 mb-6 md:grid-cols-1">
                            <div class="mb-6">

                                <select name="geoPolicy" id="geoPolicy" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={(e) => setSingleGeop(e.target.value)}>
                                    {!geoPolicy && (
                                        <option defaultChecked>Loading..</option>
                                    )}
                                    {geoPolicy && geoPolicy.map((geop, index) => (
                                        <option key={geop._id} value={geop._id} selected={geop._id === inputValues.geoPolicy?._id}>
                                            {geop.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>



                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div class="mb-6">
                                <label for="s_portraitImg" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ads Manager</label>

                                <select onChange={(e) => setSingleAd(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {/* <option defaultValue={inputValues?.adsManager}> {inputValues?.adsManager.title} </option> */}
                                    {inputValues.adsManager == null && (
                                        <option defaultChecked>Loading..</option>
                                    )}
                                    {ads != null && ads.map((ad, index) => {
                                        return <option value={ad._id} key={ad._id} selected={ad._id === inputValues.adsManager}> {ad.title}  </option>
                                    })}
                                </select>
                                {/* <select name="geoPolicy" id="geoPolicy" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={(e) => setSingleGeop(e.target.value)}>
                                    {!geoPolicy && (
                                        <option defaultChecked>Loading..</option>
                                    )}
                                    {geoPolicy && geoPolicy.map((geop, index) => (
                                        <option key={geop._id} value={geop._id} selected={geop._id === inputValues.geoPolicy?._id}>
                                            {geop.title}
                                        </option>
                                    ))}
                                </select> */}
                            </div>

                            <div class="mb-6">
                                <label for="s_portraitImg" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Released Date</label>
                                <input
                                    defaultValue={inputValues?.releaseDate ? new Date(inputValues.releaseDate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => setInputValues({ ...inputValues, releaseDate: e.target.value })}
                                    className=' py-1 px-1 bg-gray-700 w-full' type="date" id="releaseDate" name="releaseDate" />
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
                                <div className="justify-center self-center" >
                                    {inputValues?.imagePoster ? <img className="rounded-lg w-32 relative shadow-lg mx-auto" src={'https://node.aryzap.com/public/' + inputValues?.imagePoster} /> : ""}
                                </div>
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
                                <div className="justify-center self-center" >
                                    {inputValues?.imageCoverMobile ? <img className="rounded-lg w-32 relative shadow-lg mx-auto" src={'https://node.aryzap.com/public/' + inputValues?.imageCoverMobile} /> : ""}
                                </div>
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
                                <div className="justify-center self-center" >
                                    {inputValues?.imageCoverDesktop ? <img className="rounded-lg w-32 relative shadow-lg mx-auto" src={'https://node.aryzap.com/public/' + inputValues?.imageCoverDesktop} /> : ""}
                                </div>
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
                                <div className="justify-center self-center" >
                                    {editData?.logo ? <img className="rounded-lg w-32 relative shadow-lg mx-auto" src={'https://node.aryzap.com/public/' + editData?.logo} /> : ""}
                                </div>
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
                                <div className="justify-center self-center" >
                                    {editData?.imageCoverBig ? <img className="rounded-lg w-32 relative shadow-lg mx-auto" src={'https://node.aryzap.com/public/' + editData?.imageCoverBig} /> : ""}
                                </div>
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
                                <div className="justify-center self-center" >
                                    {editData?.imageCoverExtra ? <img className="rounded-lg w-32 relative shadow-lg mx-auto" src={'https://node.aryzap.com/public/' + editData?.imageCoverExtra} /> : ""}
                                </div>
                            </div>

                        </div>


                        <div className='mb-10'>
                            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea
                                onChange={(e) => setInputValues({ ...inputValues, description: e.target.value })}
                                id="description"
                                rows="8"
                                defaultValue={inputValues?.description}
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="App description here">
                            </textarea>
                        </div>
                        <div class="flex items-start mb-6">
                            <div class="flex items-center h-5">
                                <input
                                    id="remember"
                                    checked
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
export default SeriesEdit