import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { Toaster, toast } from 'react-hot-toast';
import ReactJson from 'react-json-view';
import { useParams } from 'react-router-dom';

const AppsEdit = (props) => {
    const [colors, setColors] = useState(null);
    const [file, setFile] = useState(null);
    const [imagePath, setImgPath] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [appTitle, setAppTitle] = useState('');
    const [appDesc, setAppDesc] = useState('');
    const [appBundle, setAppBundle] = useState('');
    const [appPlatform, setAppPlatform] = useState('');
    const [existingData, setExistingData] = useState(null);
    const [appConfigs, setAppConfigs] = useState(null);

    const { id } = useParams(props);

    useEffect(() => {
        const fetchAppData = async () => {
            try {
                const response = await axios.get(`https://node.aryzap.com/api/apps/${id}`);
                const data = response.data;
                setAppTitle(data.title);
                setAppDesc(data.description);
                setAppBundle(data.bundleId);
                setAppPlatform(data.platform);
                setImgPath(data.image);
                setExistingData(data);
                setAppConfigs(data.appsConfig);
            } catch (error) {
                console.error('Error fetching app data:', error);
                toast.error('Failed to load app data.');
            }
        };

        fetchAppData();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const handleConfigUpdate = (update) => {
        setAppConfigs(update.updated_src);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        let uploadedImagePath = imagePath;

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const uploadResponse = await axios.post('https://node.aryzap.com/api/media/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                uploadedImagePath = uploadResponse.data.imagePath;
                setImgPath(uploadedImagePath);
            } catch (error) {
                console.error('Error uploading file:', error);
                toast.error('Image upload failed.');
                setIsLoading(false);
                return;
            }
        }

        try {
            const updateResponse = await axios.put(`http://127.0.0.1:8080/api/apps/${id}`, {
                title: appTitle,
                description: appDesc,
                image: uploadedImagePath,
                bundleId: appBundle,
                platform: appPlatform,
                appsConfig: appConfigs,
            });

            if (updateResponse.status === 200) {
                toast.success('App updated successfully.');
            }
        } catch (error) {
            console.error('Error updating app:', error);
            toast.error('Failed to update app.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="text-2xl font-bold pb-2 mb-5 border-b border-b-gray-500">
                Apps <span className="font-extrabold">{'>'}</span> Edit App
            </div>

            <Toaster position="top-center" reverseOrder={false} />

            <section className="bg-gray-600">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-white">Edit App</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
                                    App Name
                                </label>
                                <input
                                    value={appTitle}
                                    onChange={(e) => setAppTitle(e.target.value)}
                                    type="text"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="bundle" className="block mb-2 text-sm font-medium text-white">
                                    Bundle Id
                                </label>
                                <input
                                    value={appBundle}
                                    onChange={(e) => setAppBundle(e.target.value)}
                                    type="text"
                                    id="bundle"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="platform" className="block mb-2 text-sm font-medium text-white">
                                    Platform Name
                                </label>
                                <input
                                    value={appPlatform}
                                    onChange={(e) => setAppPlatform(e.target.value)}
                                    type="text"
                                    id="platform"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="file_input" className="block mb-2 text-sm font-medium text-white">
                                    App Image Upload
                                </label>
                                <input
                                    onChange={handleImageChange}
                                    className="block w-full p-2 text-sm border rounded-lg cursor-pointer bg-gray-600"
                                    id="file_input"
                                    accept="image/*"
                                    type="file"
                                />
                                {isLoading && <InfinitySpin width="200" color="#FFFFFF" />}
                                {imagePath && (
                                    <img
                                        src={`https://node.aryzap.com/public/${imagePath}`}
                                        alt="App Thumbnail"
                                        className="mt-2 rounded-lg w-32 h-32"
                                    />
                                )}
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">
                                    Description
                                </label>
                                <textarea
                                    value={appDesc}
                                    onChange={(e) => setAppDesc(e.target.value)}
                                    id="description"
                                    rows="8"
                                    className="block w-full text-sm p-2.5 rounded-lg border bg-gray-600"
                                    required
                                ></textarea>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="AppsConfig" className="block mb-2 text-sm font-medium text-white">
                                    Apps Config
                                </label>
                                <ReactJson
                                    src={appConfigs}
                                    theme="monokai"
                                    onEdit={handleConfigUpdate}
                                    onAdd={handleConfigUpdate}
                                    onDelete={handleConfigUpdate}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center px-5 py-2.5 mt-4 bg-gray-950 hover:bg-gray-800 text-sm font-medium text-white rounded-lg"
                        >
                            Update App
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default AppsEdit;
