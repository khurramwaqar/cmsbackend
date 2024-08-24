import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import Toggle from 'react-toggle';
import { useParams } from 'react-router-dom';

const CategoriesEdit = (props) => {
    const { categoryId } = useParams(props);
    const [category, setCategory] = useState(null);
    const [apps, setApps] = useState([]);
    const [file, setFile] = useState(null);
    const [imagePath, setImgPath] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [genreTitle, setGenreTitle] = useState('');
    const [genreDesc, setGenreDesc] = useState('');
    const [appId, setAppId] = useState('');
    const [isPublished, setIsPublished] = useState(null);

    useEffect(() => {
        // Fetch existing category details
        axios.get(`https://node.aryzap.com/api/categories/${categoryId}`)
            .then(response => {
                const data = response.data;
                setCategory(data);
                setGenreTitle(data.title);
                setGenreDesc(data.description);
                setImgPath(data.image);
                setAppId(data.appId);
                setIsPublished(data.published);
            })
            .catch(error => alert(error.message));

        // Fetch apps for dropdown
        axios.get('https://node.aryzap.com/api/apps/')
            .then(response => setApps(response.data))
            .catch(error => alert(error.message));
    }, [categoryId]);

    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const formData = new FormData();
        if (file) {
            formData.append('file', file);

            try {
                const response = await axios.post('https://node.aryzap.com/api/media/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                setImgPath(response.data.imagePath);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }

        try {
            const response = await axios.put(`https://node.aryzap.com/api/categories/${categoryId}`, {
                title: genreTitle,
                description: genreDesc,
                image: imagePath || category?.image, // Use existing image if no new image uploaded
                appId: appId,
                published: isPublished
            });

            if (response.status === 200) {
                alert("Category updated successfully");
            }
        } catch (error) {
            console.error('Error updating category:', error);
            alert("Error updating category");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="text-2xl font-bold pb-2 mb-5 border-b border-b-gray-500">
                Categories <span className='font-extrabold'>{'>'}</span> Edit Category {categoryId}
            </div>

            <section className="bg-white dark:bg-gray-600">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Edit Category</h2>
                    <form action="#" onSubmit={handleSubmit} method='POST'>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
                                <input
                                    onChange={(e) => setGenreTitle(e.target.value)}
                                    value={genreTitle}
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type category name"
                                    required=""
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="file_input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Image</label>
                                <input
                                    onChange={handleImageChange}
                                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-600 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                                    aria-describedby="file_input_help"
                                    id="file_input"
                                    accept="image/*"
                                    type="file"
                                />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                                {isLoading && <InfinitySpin width='200' color="#FFFFFF" />}
                            </div>
                            <div className="w-full">
                                <label htmlFor="platform" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">App ID</label>
                                <select onChange={(e) => setAppId(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {apps.map((app, index) => (
                                        <option key={app._id} value={app._id} selected={app._id === appId}>
                                            {app.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {isPublished != null && (
                                <div>
                                    <label htmlFor="s_ost" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Publish on devices</label>
                                    <Toggle
                                        defaultChecked={isPublished}
                                        onChange={() => setIsPublished(!isPublished)}
                                    />
                                </div>
                            )}
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea
                                    onChange={(e) => setGenreDesc(e.target.value)}
                                    value={genreDesc}
                                    id="description"
                                    rows="8"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Category description here"
                                />
                            </div>
                        </div>
                        <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 bg-gray-950 hover:bg-gray-800 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Update Category
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default CategoriesEdit;
