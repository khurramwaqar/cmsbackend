import { CursorArrowRippleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { ShimmerCategoryItem } from 'react-shimmer-effects';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Select } from 'react-select';

const Series = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const notify = () => toast.loading('Waiting...');
  const [isLoading, setIsLoading] = useState(true);
  const [series, setSeries] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredSeries, setFilteredSeries] = useState([]);
  const categories = ["live", "live-event", "show", "programs", "single-series",]
  const onSubmit = data => {
    console.log(data);
    notify();
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

  // useEffect(() => {
  //   if (isLoading) {
  //     const response = axios.get('https://node.aryzap.com/api/series')
  //       .then(res => {
  //         console.log(res.data);
  //         const sortedSeries = res.data.series.sort((a, b) => a.seriesType.localeCompare(b.seriesType));
  //         setSeries(sortedSeries);
  //         // setSeries(res.data.series)
  //       });

  //     setIsLoading(false);
  //   }
  // });

  useEffect(() => {
    if (isLoading) {
      axios.get('https://node.aryzap.com/api/series')
        .then(res => {
          console.log(res.data);

          // Check if series data exists
          if (res.data && res.data.series && res.data.series.length > 0) {
            const sortedSeries = res.data.series.sort((a, b) => a.seriesType.localeCompare(b.seriesType));
            setSeries(sortedSeries);
          } else {
            // Handle case where there is no series
            console.log("No series data available");
            setSeries([]); // Or set some default data to show
          }
        })
        .catch(error => {
          console.error("Error fetching series data: ", error);
          // Handle any other errors, like network or API issues
          setSeries([]); // Or set some default data
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  const updateDelete = async (id) => {
    const promise = axios.delete(`https://node.aryzap.com/api/series/${id}`);

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Series has been deleted successfully',
      error: 'Found some errors while deleting...',
    });

    try {
      const res = await promise;
      console.log("Success Response: " + JSON.stringify(res.data));
      // Uncomment below if you want to reload after a successful operation
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.error("Error Response: " + err);
    }
  };

  // Filter series based on search term
  useEffect(() => {
    if (series) {
      setFilteredSeries(series.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }
  }, [searchTerm, series]);
  useEffect(() => {
    if (series) {
      if (selectedCategory === "") {
        // When no category is selected, display all series
        setFilteredSeries(series);
      } else {
        // When a category is selected, filter series by category
        const filtered = series.filter((item) => item.seriesType === selectedCategory);
        setFilteredSeries(filtered);
      }
    }
  }, [selectedCategory, series]);


  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle category select change
  const handleSelectChange = (event) => {
    setSelectedCategory(event.target.value);
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
        Series
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Series by Name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-50 p-2 border border-gray-300 rounded-md bg-black text-white"
        />
        <select
          placeholder="Select By Category"
          onChange={handleSelectChange}
          className="w-50 p-2 border border-gray-300 rounded-md bg-black text-white"
          value={selectedCategory}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>




      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">

        <a href="/series/create">
          <div className={"rounded-md h-36 hover:bg-gray-950 bg-blue-950 animate-pulse"}>

            <div className="p-6 ">
              <div className="flex items-center">
                <div className="flex-shrink-0">


                  <CursorArrowRippleIcon width={30} color='orange' />

                  <h2 className="text-sm font-bold mt-2">
                    Add an Series +
                  </h2>
                  <p className='text-xs font-light w-52'>
                    Add a new Seires, type your series name with apps, categories description and cast and streaming details
                  </p>
                </div>
              </div>
            </div>
          </div>
        </a >

        {/* {series ? series.map((app, index) => { */}
        {filteredSeries.length > 0 ? filteredSeries.map((app, index) => {

          return (
            <div
              className={`rounded-md h-36 relative overflow-hidden block z-auto before:content-[''] before:absolute before:inset-0 before:block before:bg-gradient-to-r before:from-black before:to-transparent before:opacity-90 before:z-[-5]  bg-cover `}

              style={{
                backgroundImage: `url(${!app.imageCoverDesktop ||
                  app.imageCoverDesktop.toLowerCase().includes('black') ||
                  app.imageCoverDesktop.toLowerCase().includes('null') ||
                  app.imageCoverDesktop.toLowerCase().includes('desktop/desktop') ||
                  app.imageCoverDesktop.toLowerCase().includes(' ')
                  ? '/images/digital-banner.webp'
                  : 'https://node.aryzap.com/public/' + app.imageCoverDesktop
                  })`
              }}




            >
              <div className="p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {/* <div className='h-12'>
                      {app.logo == "" ? "" : <img src={'https://node.aryzap.com/public/' + app.logo} width="60px" />}

                    </div> */}


                    <div className="h-12">
                      {!app.logo ||
                        app.imageCoverDesktop.toLowerCase().includes('null') ||
                        app.imageCoverDesktop.toLowerCase().includes('logo/null') ||
                        app.imageCoverDesktop.toLowerCase().includes('bg-black')
                        ? (
                          <img src={'/images/logo-bg.png'} width="60px" alt="" />
                        ) : (
                          <img src={'https://node.aryzap.com/public/' + app.logo.trim()} width="60px" alt="" />
                        )}
                    </div>







                    <h2 className="text-sm font-bold mt-2">
                      {app.title}
                    </h2>
                  </div>
                </div>
              </div>
              <div className='container h-10 bg-black bg-opacity-50 flex justify-around'>
                <a href={`series/edit/${app._id}`} className='hover:bg-green-500 w-full py-2 text-center'><div>
                  <span className='text-white'>Edit</span>
                </div></a>
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
                })} className='hover:bg-red-500 w-full py-2 text-center'><div  >
                    <span className='text-white'>Delete</span>
                  </div></a>
              </div>
              {/* <div className=" z-10 text-center flex flex-row   opacity-0 hover:opacity-100  duration-300">
                <a href={`series/edit/${app._id}`} class="bg-opacity-70 hover:bg-opacity-60 w-1/2 hover:bg-green-600 bg-green-950 h-40 ">
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
              </div> */}

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

export default Series;