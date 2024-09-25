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
import { useParams } from 'react-router-dom';

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

const HomeBuilderEditV2 = (props) => {

    const params = useParams(props);
    const [apps, setApps] = useState(null);

    const [selectedApps, setSelectedApps] = useState(null);
    const [finalApps, setFinalApps] = useState(null);

    const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']);
    const [state, setState] = useState([
        { id: 1, name: "Slider:Square", type: "ImageSlider", items: null, data: null, ui: "v1" },
        { id: 2, name: "Slider:Desktop&TV", type: "ImageSlider", items: null, data: null, ui: "v2" },
        { id: 3, name: "Categories: Portrait", type: "Category", items: null, data: null, ui: "v1" },
        { id: 4, name: "Categories: LiveLongBanner", type: "Category", items: null, data: null, ui: "v2" },
        { id: 5, name: "Categories: Square", type: "Category", items: null, data: null, ui: "v3" },
        { id: 6, name: "Categories: FullBG", type: "Category", items: null, data: null, ui: "v4" },
        { id: 7, name: "Single Series: YTThumb", type: "SingleSeries", items: null, data: null, ui: "v5" },
        { id: 8, name: "Single Series: Portarit", type: "SingleSeries", items: null, data: null, ui: "v2" },
        { id: 9, name: "Single Series: FullBG", type: "SingleSeries", items: null, data: null, ui: "v4" },
        { id: 10, name: "Selective Series", type: "SelectiveSeries", items: null, data: null, ui: "v1" },
        { id: 11, name: "Selective Genres", type: "SelectiveGenres", items: null, data: null, ui: "v1" },
        { id: 12, name: "Series By Genres", type: "SeriesByGenres", items: null, data: null, ui: "v1" },
        { id: 13, name: "Promotional Banner", type: "PromotionalBanner", items: null, data: null, ui: "v1" }

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
    const clApps = [];

    const [categories, setCategories] = useState(null);
    const [singleSeries, setSingleSeries] = useState(null);
    const [genres, setGenres] = useState(null);
    const [currentData, setCurrentData] = useState(null);
    const [currentDataComplete, setCurrentDataComplete] = useState(null);
    const [currentApps, setCurrentApps] = useState(null);
    const [inputValues, setInputValues] = useState({
        homeAppId: Array(),
        homeTitle: '',
        homeData: ''
    });

    const [slider, setSlider] = useState(null);
    const [promotionalBanner, setPromotionalBanner] = useState(null);
    const removeElementAtIndex = (indexToRemove) => {
        // Using filter to create a new array without the element at the specified index
        const newArray = currentData.filter((item, index) => index !== indexToRemove);

        // Updating the state with the new array
        setCurrentData(newArray);
    };


    const updateItemAtIndex = (indexToUpdate, updatedItem) => {
        // Using map to create a new array with the updated item at the specified index
        const newArray = state.map((item, index) =>
            index === indexToUpdate ? updatedItem : item

        );
        //Updating the state with the new array
        alert(updatedItem.type);

        if (updatedItem.type == "ImageSlider") {
            const series = axios.get('https://node.aryzap.com/api/slider/' + updatedItem.items).catch(error => {
                alert(error.message);
            }).then(response => {
                console.log(response.data);
                //create a for loop for each app
                updateItemAtData(indexToUpdate, { ...state[indexToUpdate], data: response.data.slider["_id"] })
            });
        }
        else if (updatedItem.type == "SingleSeries") {

            const series = axios.get('https://node.aryzap.com/api/series/' + updatedItem.items).catch(error => {
                alert(error.message);
            }).then(response => {
                console.log(response.data);

                //create a for loop for each app
                updateItemAtData(indexToUpdate, { ...state[indexToUpdate], data: updatedItem.items, name: response.data.title })
            });
        }
        else if (updatedItem.type == "Category") {
            //const series = axios.get('https://node.aryzap.com/api/series/byCatID/LATEST%20FROM%20ARYZAP' + updatedItem.items).catch(error => {
            const series = axios.get('https://node.aryzap.com/api/series/byCatID/' + updatedItem.items).catch(error => {

                alert(error.message);
            }).then(response => {
                console.log(response.data);
                // create a for loop for each app
                updateItemAtData(indexToUpdate, { ...state[indexToUpdate], data: updatedItem.items, name: updatedItem.items })
            });
        }
        else if (updatedItem.type == "PromotionalBanner") {
            const series = axios.get('https://node.aryzap.com/api/pb/' + updatedItem.items).catch(error => {
                alert(error.message);
            }).then(response => {
                console.log(response.data.promotionalBanner);
                //create a for loop for each app
                updateItemAtData(indexToUpdate, { ...state[indexToUpdate], data: response.data.promotionalBanner._id })
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
        setCurrentApps(str);
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

    const searchValue = (id, array) => {
        let new_array = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i]._id === id) {
                new_array.push(array[i]);
            }
        }
        return new_array;
    };

    const appsHolder = [];
    const selectedAppsHolder = [];

    useEffect(() => {

        if (appsLoad) {

            const sliderRequest = axios.get('https://node.aryzap.com/api/slider').catch(error => {
                alert(error.message);
            }).then(response => {
                console.log(response.data);
                // create a for loop for each app
                setSlider(response.data);
            });

            const promotionalRequest = axios.get('https://node.aryzap.com/api/pb').catch(error => {
                alert(error.message);
            }).then(response => {
                console.log(response.data.promotionalBanner);
                // create a for loop for each app
                setPromotionalBanner(response.data.promotionalBanner);
            });

            const crData = axios.get(`https://node.aryzap.com/api/home/${params.id}`).catch(error => {
                alert(error.message);
            }).then(response => {
                console.log(response.data);
                // create a for loop for each app
                setCurrentData(response.data.home.homeData);
                setCurrentDataComplete(response.data.home);
                setInputValues({
                    ...inputValues,
                    homeAppId: response.data.home.homeAppId,
                    homeTitle: response.data.home.homeTitle,
                    homeData: response.data.home.homeData
                })


                const appsRep = axios.get('https://node.aryzap.com/api/apps').catch(error => {
                    alert(error.message);
                }).then(response1 => {
                    console.log(response1.data);
                    // create a for loop for each app
                    for (let i = 0; i < response1.data.length; i++) {
                        appsHolder.push({
                            value: response1.data[i]._id,
                            label: response1.data[i].title,
                        });
                    }
                    setApps(appsHolder);
                    console.log(response.data.home.homeAppId.length);

                    for (var i = 0; i < response.data.home.homeAppId.length; i++) {
                        appsHolder.filter(app => app.value === response.data.home.homeAppId[i]).map(nApp => clApps.push(nApp))
                    }

                    setCurrentApps(clApps);

                    for (let i = 0; i < clApps.length; i++) {
                        sfApps.push(clApps[i].value);
                    }
                    setFinalApps(sfApps);




                });



            });

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

        const resp = axios.put('https://node.aryzap.com/api/home/' + params.id, {
            homeTitle: inputValues.homeTitle,
            homeAppId: finalApps,
            homeData: currentData
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
            loading: 'Builder updating...',
            success: 'Builder has been update successfully',
            error: 'Found error while updating the builder',
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
                Builder <span className='font-extrabold'>{'>'}</span> Add and Home Builder
            </div>

            <section class="bg-white dark:bg-gray-600">
                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Builder</h2>
                    <form action="#" onSubmit={handleSubmit} method='POST' enctype="multipart/form-data">
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 ">
                            <div class="sm:col-span-2">
                                <label for="homeTitle" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Builder Title</label>
                                <input
                                    onChange={(e) => setHomeTitle(e.target.value)}
                                    type="text"
                                    name="homeTitle"
                                    defaultValue={inputValues?.homeTitle}
                                    id="homeTitle"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter the app name and platform name"
                                    required="" />
                                <br />
                                <label for="homeAppId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Builder App ID's</label>
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
                                    value={currentApps}
                                    onChange={handleChangeApps}
                                    options={apps}
                                />

                            </div>


                        </div>

                        <div class="grid gap-6 mb-6 grid-cols-2 ">
                            <div >
                                <label for="homeTitle" class="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white">Builder</label>
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
                                            {item.type == "ImageSlider" && categories != null && (
                                                <select onChange={(e) => updateItemAtIndex(key, { ...state[key], items: e.target.value, data: e.target.value, title: e.target.value, ui: state[key].ui })} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <option value="null">Not Selected</option>
                                                    {slider?.slider.map((sliders) => <option value={sliders._id}> {sliders.sliderTitle} </option>)}
                                                </select>
                                            )}
                                            {item.type == "Category" && categories != null && (
                                                <select onChange={(e) => updateItemAtIndex(key, { ...state[key], items: e.target.value, data: e.target.value, title: e.target.value, ui: state[key].ui })} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <option value="null">Not Selected</option>
                                                    {categories.map((category) => <option value={category.title}> {category.title} </option>)}
                                                </select>
                                            )}

                                            {item.type == "SingleSeries" && singleSeries != null && (
                                                <select onChange={(e) => updateItemAtIndex(key, { ...state[key], items: e.target.value, data: e.target.value, title: e.target.value, ui: state[key].ui })} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <option value="null">Not Selected</option>

                                                    {singleSeries.series.map((single) => <option value={single._id}> {single.title} </option>)}
                                                </select>
                                            )}

                                            {item.type == "SeriesByGenres" && genres != null && (
                                                <select onChange={(e) => updateItemAtIndex(key, { ...state[key], items: e.target.value, data: e.target.value, title: item.name, ui: state[key].ui })} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <option value="null">Not Selected</option>

                                                    {genres.map((genre) => <option value={genre._id}> {genre.title} </option>)}
                                                </select>
                                            )}
                                            {item.type == "PromotionalBanner" && categories != null && (
                                                <select onChange={(e) => updateItemAtIndex(key, { ...state[key], items: e.target.value, data: e.target.value, title: e.target.value, ui: state[key].ui })} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <option value="null">Not Selected</option>
                                                    {promotionalBanner?.map((sliders) => <option value={sliders._id}> {sliders.title} </option>)}
                                                </select>
                                            )}


                                        </div>
                                    ))}
                                </ReactSortable>
                            </div>
                            <div>
                                <label for="homeTitle" class="block mb-2 mt-5  text-sm font-medium text-gray-900 dark:text-white">Builder</label>
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
                                    list={currentData == null ? state2 : currentData}
                                    setList={setCurrentData}>
                                    {currentData == null ? state2 : currentData.map((item, key) => (
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
                                        }} key={item.id}>{item.name + JSON.stringify(item.items)} <button style={{ color: 'red', fontSize: 11, background: 'white', paddingLeft: 2, paddingRight: 2, borderRadius: 5, border: '1px solid grey' }} onClick={() => removeElementAtIndex(key)}>  X</button><br /><img src={'../../p-placeholder.png'} width={'100%'} /> </div>
                                    ))}
                                </ReactSortable>
                                {/* <button onClick={() => console.log(state2)}>Submit</button> */}
                            </div>
                            {/* {JSON.stringify(currentData)} */}
                            {JSON.stringify(currentData)}
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
                        <button type="submit" onClick={() => { }} class="inline-flex items-center px-5 py-2.5 mt-4 bg-gray-950 hover:bg-gray-800 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Update Builder
                        </button>
                    </form >
                </div >
            </section >
        </>
    )
}

export default HomeBuilderEditV2