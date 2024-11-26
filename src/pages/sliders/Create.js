import React, { useEffect, useState } from 'react'
import fs, { stat } from 'fs';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { CursorArrowRippleIcon } from '@heroicons/react/24/outline'
import Switch from "react-switch";
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import Select from 'react-select';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { ReactSortable } from "react-sortablejs";

import arrayMove from 'array-move';

const SortableItem = SortableElement(({ value }) => <li>{value}</li>);

const SortableList = SortableContainer(({ items }) => {
    return (
        <ul>
            {items.map((value, index) => (
                <SortableItem key={`item-${value}`} index={index} value={value} />
            ))}
        </ul>
    );
});

const SlidersCreate = () => {

    const [apps, setApps] = useState(null);

    const [selectedApps, setSelectedApps] = useState(null);
    const [finalApps, setFinalApps] = useState(null);

    const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']);
    const [state, setState] = useState([
        { id: 1, name: "Slide", type: "SingleImage", items: null, data: null, imagePath: null },
        { id: 2, name: "Categories", type: "Category", items: null, data: null },
        { id: 3, name: "Single Series", type: "SingleSeries", items: null, data: null },
        { id: 4, name: "Selective Series", type: "SelectiveSeries", items: null, data: null },
        { id: 5, name: "Selective Genres", type: "SelectiveGenres", items: null, data: null },
        { id: 6, name: "Series By Genres", type: "SeriesByGenres", items: null, data: null }
    ]);

    const [state2, setState2] = useState([]);
    const [appsLoad, setAppsLoad] = useState(true);
    const [colors, setColors] = useState(null);
    const [file, setFile] = useState(null);
    const [imagePath, setImgPath] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [genreTitle, setGenreTitle] = useState(false);
    const [genreDesc, setGenreDesc] = useState(false);
    const [appId, setAppId] = useState(false);

    const [packageName, setPackageName] = useState(null);
    const [packageLabel, setPackageLabel] = useState(null);
    const [packageScreens, setPackageScreens] = useState(null);
    const [packagePrice, setPackagePrice] = useState(null);
    const [packageDetails, setPackageDetails] = useState(null);
    const [packageAllowScreens, setPackageAllowScreens] = useState(null);

    const [homeTitle, setHomeTitle] = useState(null);
    const [homeAppId, setHomeAppId] = useState(null);
    const [homeData, setHomeData] = useState(null);

    const [status, setStatus] = useState(false);
    const sfApps = [];

    const [categories, setCategories] = useState(null);
    const [singleSeries, setSingleSeries] = useState(null);
    const [genres, setGenres] = useState(null);
    const [sliderImage, setSliderImage] = useState(null);

    const handleImg1 = (e, key) => {
        e.preventDefault();
        const file = e.target.files[0];
        setSliderImage(file);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = axios.post('https://node.aryzap.com/api/media/slupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure proper content type for file upload
                },
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            }).then((resp) => {
                console.log(resp.data);
                setSliderImage(resp.data.imagePath);
                console.log(sliderImage);
                setIsLoading(false);
                updateItemAtIndexForImage(key, { ...state[key], items: resp.data.imagePath, data: resp.data.imagePath, title: resp.data.imagePath, imagePath: resp.data.imagePath });
                alert(sliderImage);
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


    const removeElementAtIndex = (indexToRemove) => {
        // Using filter to create a new array without the element at the specified index
        const newArray = state2.filter((item, index) => index !== indexToRemove);

        // Updating the state with the new array
        setState2(newArray);
    };

    const updateItemAtIndex = (indexToUpdate, updatedItem) => {
        // Using map to create a new array with the updated item at the specified index
        const newArray = state.map((item, index) =>
            index === indexToUpdate ? updatedItem : item

        );
        //Updating the state with the new array
        alert(updatedItem.type);
        if (updatedItem.type == "SingleImage") {
            const series = axios.get('https://node.aryzap.com/api/series/' + updatedItem.items).catch(error => {
                alert(error.message);
            }).then(response => {
                console.log(response.data);
                //create a for loop for each app
                updateItemAtData(indexToUpdate, { ...state[indexToUpdate], data: response.data, name: response.data.title })
            });
        }
        else if (updatedItem.type == "SingleSeries") {
            const series = axios.get('https://node.aryzap.com/api/yt/' + updatedItem.items).catch(error => {
                alert(error.message);
            }).then(response => {
                console.log(response.data);
                //create a for loop for each app
                updateItemAtData(indexToUpdate, { ...state[indexToUpdate], data: response.data })
            });
        }
        else if (updatedItem.type == "Category") {
            //const series = axios.get('https://node.aryzap.com/api/series/byCatID/LATEST%20FROM%20ARYZAP' + updatedItem.items).catch(error => {
            const series = axios.get('https://node.aryzap.com/api/series/byCatID/' + updatedItem.items).catch(error => {

                alert(error.message);
            }).then(response => {
                console.log(response.data);
                // create a for loop for each app
                updateItemAtData(indexToUpdate, { ...state[indexToUpdate], data: response.data, name: updatedItem.items })
            });
        }

        setState(newArray);
    };

    const updateItemAtIndexForImage = (indexToUpdate, updatedItem) => {
        // Using map to create a new array with the updated item at the specified index
        const newArray = state.map((item, index) =>
            index === indexToUpdate ? updatedItem : item

        );
        //Updating the state with the new array
        alert(updatedItem.type);
        // if (updatedItem.type == "SingleImage") {
        //     const series = axios.get('https://node.aryzap.com/api/series/' + updatedItem.items).catch(error => {
        //         alert(error.message);
        //     }).then(response => {
        //         console.log(response.data);
        //         //create a for loop for each app
        //         updateItemAtData(indexToUpdate, { ...state[indexToUpdate], data: response.data })
        //     });
        // }
        if (updatedItem.type == "SingleSeries") {
            const series = axios.get('https://node.aryzap.com/api/yt/' + updatedItem.items).catch(error => {
                alert(error.message);
            }).then(response => {
                console.log(response.data);
                //create a for loop for each app
                updateItemAtData(indexToUpdate, { ...state[indexToUpdate], data: response.data })
            });
        }
        else if (updatedItem.type == "Category") {
            //const series = axios.get('https://node.aryzap.com/api/series/byCatID/LATEST%20FROM%20ARYZAP' + updatedItem.items).catch(error => {
            const series = axios.get('https://node.aryzap.com/api/series/byCatID/' + updatedItem.items).catch(error => {

                alert(error.message);
            }).then(response => {
                console.log(response.data);
                // create a for loop for each app
                updateItemAtData(indexToUpdate, { ...state[indexToUpdate], data: response.data, name: updatedItem.items })
            });
        }

        setState(newArray);
    };

    const updateItemAtData = (indexToUpdate, updatedItem) => {
        // Using map to create a new array with the updated item at the specified index
        const newArray = state.map((item, index) =>
            index === indexToUpdate ? updatedItem : item

        );
        // Updating the state with the new array
        setState(newArray);
    };

    const handleChangeApps = (str) => {
        setSelectedApps(str);
        // create a for loop to get only values in above results which belongs to str variable and set to setFinalApps
        for (let i = 0; i < str.length; i++) {
            sfApps.push(str[i].value);
        }
        setFinalApps(sfApps);
    }

    const onSortEnd = ({ oldIndex, newIndex }) => {
        // this.setState(({ items }) => ({
        //     items: arrayMove(items, oldIndex, newIndex),
        // }));
        setItems((items) => {
            const newItems = [...items];
            const movedItem = newItems.splice(oldIndex, 1)[0];
            newItems.splice(newIndex, 0, movedItem);
            return newItems;
        });
    };

    const appsHolder = [];

    useEffect(() => {

        if (appsLoad) {

            const categories = axios.get('https://node.aryzap.com/api/categories').catch(error => {
                alert(error.message);
            }).then(response => {
                console.log(response.data);
                // create a for loop for each app
                setCategories(response.data);
            });

            const series = axios.get('https://node.aryzap.com/api/series').catch(error => {
                alert(error.message);
            }).then(response => {
                console.log(response.data);
                // create a for loop for each app
                setSingleSeries(response.data);

            });

            const genres = axios.get('https://node.aryzap.com/api/genres').catch(error => {
                alert(error.message);
            }).then(response => {
                console.log(response.data);
                // create a for loop for each app
                setGenres(response.data);

            });

            const appsRep = axios.get('https://node.aryzap.com/api/apps').catch(error => {
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
            setAppsLoad(false)

        }

    });

    const handleChange = () => {
        setStatus(status);
    }

    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        setFile(file);
    };


    const handleImageUploading = async (e) => {
        e.preventDefault();

    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const resp = axios.post('https://node.aryzap.com/api/slider', {
            sliderTitle: homeTitle,
            sliderAppId: finalApps,
            sliderData: state2
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
            console.log(error);
            return console.log("Error:" + error);

        }).then((response) => {
            console.log(response);

            if (response.status === 200) {
                setIsLoading(false);
            }
            // return window.location.reload();
        });

        toast.promise(resp, {
            loading: 'Builder saving...',
            success: 'Builder has been successfully added',
            error: 'Found error while saving the builder',
        });



    }

    const handleColorsExtracted = (colorPalette) => {
        setColors(colorPalette);
        alert(colors);
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
                Slider <span className='font-extrabold'>{'>'}</span> Add and Slider
            </div>

            <section class="bg-white dark:bg-gray-600">
                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Slider</h2>
                    <form action="#" onSubmit={handleSubmit} method='POST' enctype="multipart/form-data">
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2">
                                <label for="sliderTitle" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slider Title</label>
                                <input
                                    onChange={(e) => setHomeTitle(e.target.value)}
                                    type="text"
                                    name="sliderTitle"
                                    id="sliderTitle"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter the app name and platform name"
                                    required="" />
                                <br />
                                <label for="homeAppId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slider App ID's</label>
                                {/* <input
                                    onChange={(e) => handleImageChange(e)}
                                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-600 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    aria-describedby="file_input_help"
                                    id="file_input"
                                    accept="image/*"
                                    type="file" /> */}
                                <Select
                                    isMulti
                                    className='text-black'
                                    value={selectedApps}
                                    onChange={handleChangeApps}
                                    options={apps}
                                />

                            </div>
                            <div class="w-full">
                                {/* <label for="packageLabel" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package Label</label> */}
                                {/* <select onChange={(e) => setAppId(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {apps != null && apps.map((app, index) => {
                                        return <option value={app._id}> {app.title} </option>
                                    })}
                                </select> */}
                                {/* <input
                                    onChange={(e) => setPackageLabel(e.target.value)}
                                    type="text"
                                    name="packageLabel"
                                    id="packageLabel"
                                    class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-600 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    placeholder="Package Label"
                                    required="" /> */}



                            </div>
                            <div class="w-full">
                                {/* <label for="packageScreens" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Allow Screens</label> */}
                                {/* <select onChange={(e) => setAppId(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {apps != null && apps.map((app, index) => {
                                        return <option value={app._id}> {app.title} </option>
                                    })}
                                </select> */}
                                {/* <input
                                    onChange={(e) => setPackageAllowScreens(e.target.value)}
                                    type="text"
                                    name="packageScreens"
                                    id="packageScreens"
                                    class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-600 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    placeholder="EX: 4"
                                    required="" /> */}



                            </div>


                            <div class="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-2">
                                <div>
                                    <label for="homeTitle" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Builder</label>
                                    <ReactSortable
                                        style={{
                                            backgroundColor: "rgba(255,255,255)",
                                            padding: 5,
                                            borderRadius: 5,

                                        }}

                                        group={{ name: 'groupName', pull: 'clone' }}
                                        animation={200}
                                        delayOnTouchStart={true}
                                        delay={2}
                                        list={state}
                                        setList={setState}>
                                        {state.map((item, key) => (
                                            <div style={{
                                                borderRadius: 5,
                                                background: '#e3e3e3',
                                                padding: 8,
                                                textAlign: 'center',
                                                border: '1px dashed grey',
                                                margin: 10,
                                                fontSize: 12,
                                                color: 'black',
                                                fontWeight: "bold"
                                            }} key={item.id}>{item.name}
                                                <br />
                                                {item.type == 'SingleImage' && singleSeries != null && (
                                                    <>
                                                        <label for="s_portraitImg" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Image: Portrait/Poster</label>
                                                        <input
                                                            onChange={(e) => handleImg1(e, key)}
                                                            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-600 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                                            aria-describedby="file_input_help"
                                                            id="file_input"
                                                            accept="image/*"
                                                            type="file" />
                                                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-900" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 280x400px).</p>
                                                        <select onChange={(e) => updateItemAtIndex(key, { ...state[key], items: e.target.value, data: e.target.value, title: item.name })} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                            <option value="null">Not Selected</option>

                                                            {singleSeries.series.map((single) => <option value={single._id}> {single.title} </option>)}
                                                        </select>
                                                    </>

                                                )}
                                                {item.type == "Category" && categories != null && (


                                                    <select onChange={(e) => updateItemAtIndex(key, { ...state[key], items: e.target.value, data: e.target.value, title: e.target.value })} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                        <option value="null">Not Selected</option>
                                                        {categories.map((category) => <option value={category.title}> {category.title} </option>)}
                                                    </select>
                                                )}

                                                {item.type == "SingleSeries" && singleSeries != null && (
                                                    <select onChange={(e) => updateItemAtIndex(key, { ...state[key], items: e.target.value, data: e.target.value, title: item.name })} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                        <option value="null">Not Selected</option>

                                                        {singleSeries.series.map((single) => <option value={single._id}> {single.title} </option>)}
                                                    </select>
                                                )}

                                                {item.type == "SeriesByGenres" && genres != null && (
                                                    <select onChange={(e) => updateItemAtIndex(key, { ...state[key], items: e.target.value, data: e.target.value, title: item.name })} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                        <option value="null">Not Selected</option>

                                                        {genres.map((genre) => <option value={genre._id}> {genre.title} </option>)}
                                                    </select>
                                                )}


                                            </div>
                                        ))}
                                    </ReactSortable>
                                </div>
                                <div className=''>
                                    <label for="homeTitle" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Builder</label>
                                    <ReactSortable
                                        style={{
                                            backgroundColor: "rgba(255,255,255)",
                                            padding: 10,
                                            borderRadius: 5,
                                        }}
                                        group={{ name: 'groupName' }}
                                        animation={200}
                                        delayOnTouchStart={true}
                                        delay={2}
                                        list={state2}
                                        setList={setState2}>
                                        {state2.map((item, key) => (
                                            <div style={{
                                                width: '100%',
                                                borderRadius: 5,
                                                background: '#e3e3e3',
                                                padding: 8,
                                                textAlign: 'center',
                                                border: '1px dashed grey',
                                                fontSize: 12,
                                                color: 'black',
                                                marginBottom: 10,
                                                fontWeight: "bold"
                                            }} key={item.id}>
                                                {item.type == 'Category' && (
                                                    <>
                                                        {item.name + JSON.stringify(item.items)} <button style={{ color: 'red', fontSize: 11, background: 'white', paddingLeft: 2, paddingRight: 2, borderRadius: 5, border: '1px solid grey' }} onClick={() => removeElementAtIndex(key)}>  X</button><br /><img src={'../../p-placeholder.png'} width={'100%'} />
                                                    </>
                                                )}
                                                {item.type == 'SingleImage' && (
                                                    <>
                                                        {item.name + ' # ' + key} <button style={{ color: 'red', fontSize: 11, background: 'white', paddingLeft: 2, paddingRight: 2, borderRadius: 5, border: '1px solid grey' }} onClick={() => removeElementAtIndex(key)}>  X</button><br /><img src={'https://node.aryzap.com/public/slider/' + item.imagePath} width={'100%'} />
                                                    </>
                                                )}

                                            </div>
                                        ))}
                                    </ReactSortable>
                                    <button onClick={() => console.log(state2)}>Submit</button>
                                </div>
                                {JSON.stringify(state2)}
                            </div>

                            <div class="sm:col-span-2">
                                <label for="builderData" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Builder Data</label>
                                <textarea
                                    onChange={(e) => setPackageDetails(e.target.value)}
                                    id="builderData"
                                    rows="8"
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="App description here">

                                </textarea>
                            </div>
                        </div>
                        <button type="submit" onClick={() => { }} class="inline-flex items-center px-5 py-2.5 mt-4 bg-gray-950 hover:bg-gray-800 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Add an Builder
                        </button>
                    </form >
                </div >
            </section >
        </>
    )
}

export default SlidersCreate