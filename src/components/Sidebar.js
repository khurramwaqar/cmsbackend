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
      <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 ">
        <span class="sr-only">Open sidebar</span>
      </button>

      <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidenav">
        <div class="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-950 dark:border-gray-700">
          <div className="w-full flex justify-center items-center mb-5">
            <img src="https://aryzap.com/img/logonew.png" className="w-24" />
          </div>
          <ul class="space-y-2">
            <li>
              <a href="/" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                <HomeIcon width={20} />

                <span class="ml-3">Home</span>
              </a>
            </li>





            {lsCache.getItem('token') == null ? <></> : <>


              {xAccess.map((item) =>
                item == "AgeRatings" ? <li>
                  <a href="/ages" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group ">
                    <ChatBubbleLeftEllipsisIcon width={20} />

                    <span class="ml-3">Age Ratings</span>
                  </a>
                </li> :
                  item == "Genres" ? <li>
                    <a href="/genres" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                      <PhotoIcon width={20} />

                      <span class="ml-3">Genres</span>
                    </a>
                  </li> :
                    item == "Series" ? <li>
                      <a href="/series" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                        <InboxStackIcon width={20} />

                        <span class="ml-3">Series</span>
                      </a>
                    </li> :
                      item == "Categories" ? <li>
                        <a href="/categories" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                          <GlobeAltIcon width={20} />

                          <span class="ml-3">Categories</span>
                        </a>
                      </li> :
                        item == "Apps" ? <li>
                          <a href="/apps" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                            <DevicePhoneMobileIcon width={20} />

                            <span class="ml-3">Apps</span>
                          </a>
                        </li> : item == "GeoPolicy" ? <li>
                          <a href="/geopolicy" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                            <GlobeAsiaAustraliaIcon width={20} />

                            <span class="ml-3">Geo Policy</span>
                          </a>
                        </li> : item == "AdsManager" ? <li>
                          <a href="/ads" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                            <SparklesIcon width={20} />

                            <span class="ml-3">Ads Manager</span>
                          </a>
                        </li> : item == "Packages" ? <li>
                          <a href="/packages" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                            <DocumentTextIcon width={20} />

                            <span class="ml-3">Packages</span>
                          </a>
                        </li> : item == "Episodes" ? <li>
                          <a href="/episode" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                            <PhotoIcon width={20} />

                            <span class="ml-3">Episodes</span>
                          </a>
                        </li> : item == "YTEpisodes" ? <li>
                          <a href="/ytepisodes" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                            <PhotoIcon width={20} />

                            <span class="ml-3">YT Episode</span>
                          </a>
                        </li> : item == "Users" ? <><li>
                          <a href="/users" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                            <UserGroupIcon width={20} />

                            <span class="ml-3">Users Management</span>
                          </a>
                        </li><li>
                            <a href="/subscriptions" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                              <QueueListIcon width={20} />

                              <span class="ml-3">Subscriptions </span>
                            </a>
                          </li> <li>
                            <a href="/builder" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                              <QueueListIcon width={20} />

                              <span class="ml-3">Home Builder </span>
                            </a>
                          </li>
                          <li>
                            <a href="/sliders" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                              <QueueListIcon width={20} />

                              <span class="ml-3">Home Slider </span>
                            </a>
                          </li>
                        </> : "Not Found !")}

              {/* <li>
                <a href="/apps" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                  <DevicePhoneMobileIcon width={20} />

                  <span class="ml-3">Apps</span>
                </a>
              </li>
              <li>
                <a href="/genres" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                  <PhotoIcon width={20} />

                  <span class="ml-3">Genres</span>
                </a>
              </li>
              <li>
                <a href="/ages" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                  <ChatBubbleLeftEllipsisIcon width={20} />

                  <span class="ml-3">Age Ratings</span>
                </a>
              </li>
              <li>
                <a href="/geopolicy" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                  <GlobeAsiaAustraliaIcon width={20} />

                  <span class="ml-3">Geo Policy</span>
                </a>
              </li>
              <li>
                <a href="/categories" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                  <GlobeAltIcon width={20} />

                  <span class="ml-3">Categories</span>
                </a>
              </li>
              <li>
                <a href="/series" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                  <InboxStackIcon width={20} />

                  <span class="ml-3">Series</span>
                </a>
              </li>
              <li>
                <a href="/ads" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                  <DocumentTextIcon width={20} />

                  <span class="ml-3">Ads Manager</span>
                </a>
              </li>
              <li>
                <a href="/episode" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                  <DocumentTextIcon width={20} />

                  <span class="ml-3">Episodes</span>
                </a>
              </li>
              <li>
                <a href="/ytepisodes" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                  <DocumentTextIcon width={20} />

                  <span class="ml-3">YT Episode</span>
                </a>
              </li> */}
            </>}

          </ul>
          <ul class="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
            {!lsCache.getItem('token') ? <li>
              <a href="/login" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                <UserCircleIcon width={20} />

                <span class="ml-3">Sign In</span>
              </a>
            </li> : <li>
              <a href="/logout" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
                <ArrowRightOnRectangleIcon width={20} />

                <span class="ml-3">Log Out</span>
              </a>
            </li>}


            <li>
              <a href="/settings" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-700 group">
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