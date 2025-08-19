import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { AllReviews, Error, HomeLayout, Landing, Movies, PageFallback, People, Search, Shows, SingleMovie, SinglePerson, SingleShow } from './pages'
import {loader as landingLoader} from './pages/Landing'
import {loader as singleMovieLoader} from './pages/SingleMovie'
import { loader as singleShowLoader } from './pages/SingleShow'
import { loader as singlePersonLoader } from './pages/SinglePerson'
import { loader as searchLoader } from './pages/Search'
import { loader as moviesLoader } from './pages/Movies'
import { loader as showsLoader } from './pages/Shows'
import { loader as peopleLoader } from './pages/People'
import { loader as showsReviewsLoader } from './pages/AllReviews'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes cache stale time
      gcTime: 1000 * 60 * 60 * 24, // Keep cached data for 24 hours
    }
  }
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    hydrateFallbackElement: <PageFallback />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader(queryClient)
      },
      {
        path: '/movie/:movieID',
        element: <SingleMovie />,
        loader: singleMovieLoader(queryClient)
      },
      {
        path: '/tv/:tvID',
        element: <SingleShow />,
        loader: singleShowLoader(queryClient)
      },
      {
        path: '/tv/:tvID/reviews',
        element: <AllReviews /> ,
        loader: showsReviewsLoader(queryClient)
      },
      {
        path: '/search',
        element: <Search />,
        loader: searchLoader(queryClient)
      },
      {
        path: '/movies',
        element: <Movies />,
        loader: moviesLoader(queryClient)
      },
      {
        path: '/shows',
        element: <Shows />,
        loader: showsLoader(queryClient)
      },
      {
        path: '/people',
        element: <People />,
        loader: peopleLoader(queryClient)
      },
      {
        path: '/person/:personID',
        element: <SinglePerson />,
        loader: singlePersonLoader(queryClient)
      }
    ]
  }
])

const App = () => {
  return  <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
}

export default App
