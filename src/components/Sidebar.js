import React, { useEffect, useState } from 'react'
import { GlobeAsiaAustraliaIcon, HomeIcon, DocumentTextIcon, PhotoIcon, ChatBubbleLeftEllipsisIcon, InboxStackIcon, DevicePhoneMobileIcon, CogIcon, SignalIcon, UserCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, GlobeAltIcon, UserIcon, UserGroupIcon, QueueListIcon, SparklesIcon } from '@heroicons/react/24/outline'

const Sidebar = () => {

  const lsCache = window.localStorage;
  const [loading, setLoading] = useState(true);
  var xAccessFinal = lsCache.getItem('xAccess');
  //alert(xAccessFinal);
  if (xAccessFinal == null) {
    xAccessFinal = "";
  }
  //alert(xAccessFinal);
  const xAccess = xAccessFinal.split(",");
  //alert(xAccess);
  return (
    <div className="lg:w-1/5 md:w-full p-5" >
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 ">
        <span class="sr-only">Open sidebar</span>
      </button>

      <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidenav">
        <div class="overflow-y-auto py-5 px-3 h-full border-r border-gray-200 bg-gray-950 dark:border-gray-700">
          <div className="w-full flex justify-center items-center mb-5">
            <img src="https://aryzap.com/img/logonew.png" className="w-24" />
          </div>
          <ul class="space-y-2">
            <li className='bg-gray-900 rounded-md hover:bg-red-700 group'>
              <a href="/" class="flex items-center p-2 text-base font-normal rounded-lg text-white">
                <HomeIcon width={20} />

                <span class="ml-3 font-medium">Home</span>
              </a>
            </li>





            {lsCache.getItem('token') == null ? <></> : <>


              {xAccess.map((item) =>
                item == "AgeRatings" ? <li className='bg-gray-900 rounded-lg hover:bg-red-700 group'>
                  <a href="/ages" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                    <ChatBubbleLeftEllipsisIcon width={20} />

                    <span class="ml-3 font-medium">Age Ratings</span>
                  </a>
                </li> :
                  item == "Genres" ? <li className='bg-gray-900 rounded-md dark:hover:bg-red-700 group'>
                    <a href="/genres" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                      <PhotoIcon width={20} />

                      <span class="ml-3 font-medium">Genres</span>
                    </a>
                  </li> :
                    item == "Series" ? <li className='bg-gray-900 rounded-md dark:hover:bg-red-700 group'>
                      <a href="/series" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                        <InboxStackIcon width={20} />

                        <span class="ml-3 font-medium">Series</span>
                      </a>
                    </li> :
                      item == "Categories" ? <li className='bg-gray-900 rounded-md dark:hover:bg-red-700 group'>
                        <a href="/categories" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                          <GlobeAltIcon width={20} />

                          <span class="ml-3 font-medium">Categories</span>
                        </a>
                      </li> :
                        item == "Apps" ? <li className='bg-gray-900 rounded-md dark:hover:bg-red-700 group'>
                          <a href="/apps" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                            <DevicePhoneMobileIcon width={20} />

                            <span class="ml-3 font-medium">Apps</span>
                          </a>
                        </li> : item == "GeoPolicy" ? <li className='bg-gray-900 rounded-md dark:hover:bg-red-700 group'>
                          <a href="/geopolicy" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                            <GlobeAsiaAustraliaIcon width={20} />

                            <span class="ml-3 font-medium">Geo Policy</span>
                          </a>
                        </li> : item == "AdsManager" ? <li className='bg-gray-900 rounded-md dark:hover:bg-red-700 group'>
                          <a href="/ads" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                            <SparklesIcon width={20} />

                            <span class="ml-3 font-medium">Ads Manager</span>
                          </a>
                        </li> : item == "Packages" ? <li className='bg-gray-900 rounded-md dark:hover:bg-red-700 group'>
                          <a href="/packages" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                            <DocumentTextIcon width={20} />

                            <span class="ml-3 font-medium">Packages</span>
                          </a>
                        </li> : item == "Episodes" ? <li className='bg-gray-900 rounded-md dark:hover:bg-red-700 group'>
                          <a href="/episode" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                            <PhotoIcon width={20} />

                            <span class="ml-3 font-medium">Episodes</span>
                          </a>
                        </li> : item == "YTEpisodes" ? <li className='bg-gray-900 rounded-md dark:hover:bg-red-700 group'>
                          <a href="/ytepisodes" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                            <PhotoIcon width={20} />

                            <span class="ml-3 font-medium">YT Episode</span>
                          </a>
                        </li> : item == "Users" ? <><li className='bg-gray-900 rounded-md dark:hover:bg-red-700 group'>
                          <a href="/users" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                            <UserGroupIcon width={20} />

                            <span class="ml-3 font-medium">Users Management</span>
                          </a>
                        </li><li className='bg-gray-900 rounded-md dark:hover:bg-red-700 group'>
                            <a href="/subscriptions" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                              <QueueListIcon width={20} />

                              <span class="ml-3 font-medium">Subscriptions </span>
                            </a>
                          </li> <li className='bg-gray-900 rounded-md dark:hover:bg-red-700 group'>
                            <a href="/builder" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                              <QueueListIcon width={20} />

                              <span class="ml-3 font-medium">Home Builder </span>
                            </a>
                          </li>
                          <li className='bg-gray-900 rounded-md dark:hover:bg-red-700 group'>
                            <a href="/sliders" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                              <QueueListIcon width={20} />

                              <span class="ml-3 font-medium">Home Slider </span>
                            </a>
                          </li>
                          <li className='bg-gray-900 rounded-md dark:hover:bg-red-700 group'>
                            <a href="/pb" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                              <QueueListIcon width={20} />

                              <span class="ml-3 font-medium">Promotional Banners </span>
                            </a>
                          </li>
                          <li className='bg-gray-900 rounded-md dark:hover:bg-red-700 group'>
                            <a href="/dmepisodes" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                              <QueueListIcon width={20} />

                              <span class="ml-3 font-medium">DM Episodes </span>
                            </a>
                          </li>
                        </> : "Not Found !")}

              {/* <li className='bg-gray-800 rounded-sm dark:hover:bg-red-700 group'>
                <a href="/apps" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                  <DevicePhoneMobileIcon width={20} />

                  <span class="ml-3">Apps</span>
                </a>
              </li>
              <li className='bg-gray-800 rounded-sm dark:hover:bg-red-700 group'>
                <a href="/genres" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                  <PhotoIcon width={20} />

                  <span class="ml-3">Genres</span>
                </a>
              </li>
              <li className='bg-gray-800 rounded-sm dark:hover:bg-red-700 group'>
                <a href="/ages" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                  <ChatBubbleLeftEllipsisIcon width={20} />

                  <span class="ml-3">Age Ratings</span>
                </a>
              </li>
              <li className='bg-gray-800 rounded-sm dark:hover:bg-red-700 group'>
                <a href="/geopolicy" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                  <GlobeAsiaAustraliaIcon width={20} />

                  <span class="ml-3">Geo Policy</span>
                </a>
              </li>
              <li className='bg-gray-800 rounded-sm dark:hover:bg-red-700 group'>
                <a href="/categories" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                  <GlobeAltIcon width={20} />

                  <span class="ml-3">Categories</span>
                </a>
              </li>
              <li className='bg-gray-800 rounded-sm dark:hover:bg-red-700 group'>
                <a href="/series" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                  <InboxStackIcon width={20} />

                  <span class="ml-3">Series</span>
                </a>
              </li>
              <li className='bg-gray-800 rounded-sm dark:hover:bg-red-700 group'>
                <a href="/ads" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                  <DocumentTextIcon width={20} />

                  <span class="ml-3">Ads Manager</span>
                </a>
              </li>
              <li className='bg-gray-800 rounded-sm dark:hover:bg-red-700 group'>
                <a href="/episode" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                  <DocumentTextIcon width={20} />

                  <span class="ml-3">Episodes</span>
                </a>
              </li>
              <li className='bg-gray-800 rounded-sm dark:hover:bg-red-700 group'>
                <a href="/ytepisodes" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                  <DocumentTextIcon width={20} />

                  <span class="ml-3">YT Episode</span>
                </a>
              </li> */}
            </>}

          </ul>
          <ul class="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
            {!lsCache.getItem('token') ? <li className='bg-gray-900 rounded-md dark:hover:bg-red-700 group'>
              <a href="/login" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                <UserCircleIcon width={20} />

                <span class="ml-3">Sign In</span>
              </a>
            </li> : <li className='bg-gray-900 rounded-md dark:hover:bg-red-700 group'>
              <a href="/logout" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                <ArrowRightOnRectangleIcon width={20} />

                <span class="ml-3">Log Out</span>
              </a>
            </li>}


            <li className='bg-gray-900 rounded-md dark:hover:bg-red-700 group'>
              <a href="/settings" class="flex items-center p-2 text-base font-normal hover:text-white rounded-lg text-white hover:bg-red-700 group ">
                <Cog6ToothIcon width={20} />

                <span class="ml-3">Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar