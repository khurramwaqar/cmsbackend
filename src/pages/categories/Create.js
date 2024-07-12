import React, { useEffect, useState } from 'react'
import fs from 'fs';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';

const CategoriesCreate = () => {

    const [apps, setApps] = useState(null);
    const [appsLoad, setAppsLoad] = useState(true);
    const [colors, setColors] = useState(null);
    const [file, setFile] = useState(null);
    const [imagePath, setImgPath] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [genreTitle, setGenreTitle] = useState(false);
    const [genreDesc, setGenreDesc] = useState(false);
    const [appId, setAppId] = useState(false);

    useEffect(() => {
        if (appsLoad) {

            axios.get('https://node.aryzap.com/api/apps/').catch(error => {
                alert(error.message);
            }).then(response => {
                setApps(response.data);
            })

            setAppsLoad(false);
        }
    });


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

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('https://node.aryzap.com/api/media/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure proper content type for file upload
                },
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            }).then((resp) => {
                console.log(resp.data);
                setImgPath(resp.data.imagePath);
                setIsLoading(false);

                if (resp.data.imagePath != null) {
                    if (genreTitle != null) {
                        axios.post('https://node.aryzap.com/api/categories', {
                            title: genreTitle,
                            description: genreDesc,
                            image: resp.data.imagePath,
                            appId: appId
                        }).catch((error) => {
                            console.log(error);
                            return alert(JSON.stringify(error));

                        }).then((response) => {
                            console.log(response);

                            if (response.status === 200) {
                                alert("Your Category has been successfully added");
                            }
                            // return window.location.reload();
                        });

                    } else {
                        return alert("Please check your fields");
                    }
                }




            });
            console.log(response.data);
            if (response.status === 200) {
                console.log('File uploaded successfully');
            } else {
                console.error('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setIsLoading(false);
        }



    }

    const handleColorsExtracted = (colorPalette) => {
        setColors(colorPalette);
        alert(colors);
    };



    return (

        <>
            <div className="text-2xl font-bold pb-2 mb-5  border-b border-b-gray-500 ">
                Categories <span className='font-extrabold'>{'>'}</span> Add and Category
            </div>

            <section class="bg-white dark:bg-gray-600">
                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Category</h2>
                    <form action="#" onSubmit={handleSubmit} method='POST'>
                        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
                                <input
                                    onChange={(e) => setGenreTitle(e.target.value)}
                                    type="text"
                                    name="name"
                                    id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type app name"
                                    required="" />
                            </div>
                            <div class="w-full">
                                <label for="bundle" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Image</label>
                                <input
                                    onChange={(e) => handleImageChange(e)}
                                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-600 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    aria-describedby="file_input_help"
                                    id="file_input"
                                    accept="image/*"
                                    type="file" />
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                                {isLoading == true ? <InfinitySpin
                                    width='200'
                                    color="#FFFFFF"
                                /> : ""}
                            </div>
                            <div class="w-full">
                                <label for="platform" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">App ID</label>
                                <select onChange={(e) => setAppId(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {apps != null && apps.map((app, index) => {
                                        return <option value={app._id}> {app.title} </option>
                                    })}
                                </select>



                            </div>

                            <div class="sm:col-span-2">
                                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea
                                    onChange={(e) => setGenreDesc(e.target.value)}
                                    id="description"
                                    rows="8"
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="App description here">

                                </textarea>
                            </div>
                        </div>
                        <button type="submit" onClick={() => { }} class="inline-flex items-center px-5 py-2.5 mt-4 bg-gray-950 hover:bg-gray-800 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Add an Category
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default CategoriesCreate