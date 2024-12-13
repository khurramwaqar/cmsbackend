import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './pages/home/Home';
import Apps from './pages/apps/Apps';
import Genres from './pages/genres/Genres';
import Ages from './pages/ages/Ages';
import Series from './pages/series/Series';
import Episode from './pages/episodes/Episode';
import Settings from './pages/settings/Settings';
import Feedbacks from './pages/feedbacks/Feedbacks';
import Sidebar from './components/Sidebar';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import AppsCreate from './pages/apps/Create';
import GenresCreate from './pages/genres/Create';
import AgesCreate from './pages/ages/Create';
import Categories from './pages/categories/Categories';
import CategoriesCreate from './pages/categories/Create';
import SeriesCreate from './pages/series/Create';
import SeriesEdit from './pages/series/Edit';
import EpisodeCreate from './pages/episodes/Create';
import YTEpisode from './pages/ytepisodes/Episode';
import axios from 'axios';
import GeoPolicy from './pages/geop/Geop';
import GeoPolicyCreate from './pages/geop/Create';
import "react-widgets/styles.css";
import Ads from './pages/ads/Ads';
import AdsCreate from './pages/ads/Create';
import Users from './pages/users/Users';
import UsersCreate from './pages/users/Create';


import Packages from './pages/core/packages/Packages';
import PackagesCreate from './pages/core/packages/Create';
import PackagesEdit from './pages/core/packages/Edit';
import HomeBuilder from './pages/builder/HomeBuilder';
import HomeBuilderCreate from './pages/builder/Create';
import HomeBuilderCreateV2 from './pages/builder/CreateV2';
import HomeBuilderCreateV3 from './pages/builder/CreateV3';
import HomeBuilderEdit from './pages/builder/Edit';
import SlidersCreate from './pages/sliders/Create';
import HomeSliders from './pages/sliders/home';
import Subscriptions from './pages/core/subscriptions/Subscriptions';
import HomeBuilderEditV2 from './pages/builder/EditV2';
import PositioningCards from './pages/categories/PositioningSeries';
import SlidersEdit from './pages/sliders/Edit';
import PromotionalBanner from './pages/promotional/PromotionalHome';
import PromotionalCreate from './pages/promotional/PromotionalCreate';
import DMEpisode from './pages/dmepisode/Episode';
import CategoriesEdit from './pages/categories/Edit';
import EpisodeEdit from './pages/episodes/Edit';
import AppsEdit from './pages/apps/AppsEdit';


const lsCache = localStorage;


const routerWithoutLogin = createBrowserRouter([
  {
    path: "/",
    element: <Home />,

  },
  {
    path: "/login",
    element: <Login />
  }
]);
const homeRouter = [
  { path: '/', element: <Home /> }
];
const adsRouter = [
  { path: '/ads', element: <Ads /> },
  { path: '/ads/create', element: <AdsCreate /> }
];
const appsRouter = [
  { path: '/apps', element: <Apps /> },
  { path: '/apps/create', element: <AppsCreate /> }
];
const gernesRouter = [
  { path: '/genres', element: <Genres /> },
  { path: '/genres/create', element: <GenresCreate /> }
];
const categoriesRouter = [{
  path: "/categories",
  element: <Categories />
},
{
  path: "/categories/create",
  element: <CategoriesCreate />
}];

const ageRatingRouter = [{
  path: "/ages",
  element: <Ages />
},
{
  path: "/ages/create",
  element: <AgesCreate />
}];

const seriesRouter = [
  { path: '/', element: <Home /> },
  {
    path: "/series",
    element: <Series />
  },
  {
    path: "/series/create",
    element: <SeriesCreate />
  },
  {
    path: "/series/edit/:id",
    element: <SeriesEdit />
  },
];
const routerDef = [{
  path: "/",
  element: <Home />
},
{
  path: "/ads",
  element: <Ads />,
},
{
  path: "/ads/create",
  element: <AdsCreate />
},
{
  path: "/builder",
  element: <HomeBuilder />
},
{
  path: "/builder/create",
  element: <HomeBuilderCreate />
},
{
  path: "/builder/createv2",
  element: <HomeBuilderCreateV2 />
},
{
  path: "/builder/createv3",
  element: <HomeBuilderCreateV3 />
},
{
  path: "/sliders",
  element: <HomeSliders />
},
{
  path: "/slider/create",
  element: <SlidersCreate />
},
{
  path: "/slider/edit/:sliderId",
  element: <SlidersEdit />
},
{
  path: "/builder/edit/:id",
  element: <HomeBuilderEdit />
},
{
  path: "/builder/editv2/:id",
  element: <HomeBuilderEditV2 />
},
{
  path: "/packages",
  element: <Packages />
},
{
  path: "/subscriptions",
  element: <Subscriptions />
},
{
  path: "/packages/create",
  element: <PackagesCreate />
},
{
  path: "/packages/edit/:id",
  element: <PackagesEdit />
},
{
  path: "/apps",
  element: <Apps />
},
{
  path: "/apps/edit/:id",
  element: <AppsEdit />
},
{
  path: "/apps/create",
  element: <AppsCreate />
},
{
  path: "/genres",
  element: <Genres />
},
{
  path: "/genres/create",
  element: <GenresCreate />
},
{
  path: "/pb",
  element: <PromotionalBanner />
},
{
  path: "/pb/create",
  element: <PromotionalCreate />
},
{
  path: "/ages",
  element: <Ages />
},
{
  path: "/ages/create",
  element: <AgesCreate />
},
{
  path: "/geopolicy",
  element: <GeoPolicy />
},
{
  path: "/geopolicy/create",
  element: <GeoPolicyCreate />
},
{
  path: "/categories",
  element: <Categories />
},
{
  path: "/categories/positioning/:id",
  element: <PositioningCards />
},
{
  path: "/categories/create",
  element: <CategoriesCreate />
},
{
  path: "/categories/edit/:categoryId",
  element: <CategoriesEdit />
},
{
  path: "/series",
  element: <Series />
},
{
  path: "/series/create",
  element: <SeriesCreate />
},
{
  path: "/series/edit/:id",
  element: <SeriesEdit />
},
{
  path: "/episode",
  element: <Episode />
},
{
  path: "/episode/create",
  element: <EpisodeCreate />
},
{
  path: "/episode/edit/:id",
  element: <EpisodeEdit />
},
{
  path: "/ytepisodes",
  element: <YTEpisode />
},
{
  path: "/dmepisodes",
  element: <DMEpisode />
},
{
  path: "/feedbacks",
  element: <Feedbacks />
},
{
  path: "/settings",
  element: <Settings />
},
{
  path: "/users",
  element: <Users />
},
{
  path: "/users/create",
  element: <UsersCreate />
},
{
  path: "/login",
  element: <Login />
},
{
  path: "/logout",
  element: <Logout />
}];

const App = () => {

  const [loading, setLoading] = useState(true);
  const [xAccess, setXAccess] = useState(null);
  const [xAccessFinal, setXAccessFinal] = useState(null);
  const [routerLoading, setRouterLoading] = useState(true);
  const [routesManager, setRoutesManager] = useState([{
    path: "/",
    element: <Home />
  }]);

  const routesCreator = (xAccessOne) => {


    for (let i = 0; i < xAccessOne.length; i++) {
      if (xAccessOne[i] == "Series") {

        setRoutesManager(seriesRouter);
      } else if (xAccessOne[i] == "AgeRatings") {
        setRoutesManager(routesManager => [...routesManager, ageRatingRouter]);
      } else if (xAccessOne[i] == "Genres") {
        setRoutesManager(routesManager => [...routesManager, gernesRouter]);
      } else if (xAccessOne[i] == "Categories") {
        setRoutesManager(routesManager => [...routesManager, categoriesRouter]);
      }
    }

    console.log(routesManager);
    setRouterLoading(false);



  };

  useEffect(() => {
    if (loading == true) {

      axios.post('https://node.aryzap.com/api/users/verify', { "verifytok": lsCache.getItem('token') }).catch((error) => {

        alert(error);

        return lsCache.removeItem('token');

      }).then((response) => {
        if (response.data.error) {

          return lsCache.removeItem('token');

        } else if (response.data.data) {

          setXAccess(response.data.data);
          routesCreator(response.data.data.xAccess);
          setXAccessFinal(response.data.data);
          lsCache.setItem('xAccess', response.data.data.xAccess);



        }

        if (response.status === 200) {

          return true;

        }

      });
      setLoading(false);
    }
  });

  const router = createBrowserRouter(routerDef);
  return (
    <div className="">

      <RouterProvider router={!lsCache.getItem('token') ? routerWithoutLogin : router} />

      {/* 
        <form>
          <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
          </div>
          <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
            </div>
            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
          </div>
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form> */}

    </div>

  );
}

export default App;
