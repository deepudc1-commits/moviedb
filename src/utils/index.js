import axios from "axios";
import { actionIcn, adventureIcn, animationIcn, comedyIcn, crimeIcn, documentaryIcn, dramaIcn, familyIcn, fantasyIcn, historyIcn, horrorIcn, musicIcn, mysteryIcn, romanceIcn, scienceIcn, thrillerIcn, tvIcn, warIcn, westernIcn } from "../assets";


const url = 'https://api.themoviedb.org/3'
const apiKey = import.meta.env.VITE_API_KEY

export const customFetch = axios.create({
    baseURL: url,
    headers: {
        Authorization: `Bearer ${apiKey}`
    }
})

export const formatPrice = (price) => {
  const newPrice = Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'USD'
  }).format(price);
  return newPrice
}

export const formatDate = (dateStr) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', options)
}

export const formatTime = (min) => {
  const toNum = Number(min) 
  const getHours = (toNum / 60).toFixed(0)
  const getMinutes = toNum % 60  
  return `${getHours}h ${getMinutes}m`
}

export const fetchWithErrorHandling = async (url) => {
  try {
    // 1. Await here: This means this specific function will pause execution
    //    until the customFetch (Axios) promise for *this particular URL* settles.
    const response = await customFetch(url);
    return response; // If successful, returns the Axios response
  } catch (error) {
    // If customFetch rejects, this catch block runs.
    const errorData = {
      message: error.message,
      statusCode: error.response ? error.response.status : null,
      data: error.response ? error.response.data : null,
    };
    throw errorData; // Re-throws a *new* rejected promise with structured error data
  }
};

export const sortList = ['first_air_date.asc', 'first_air_date.desc', 'name.asc', 'name.desc', 'popularity.asc', 'popularity.desc', 'vote_average.asc', 'vote_average.desc']
export const genresList = [
    {
      "id": 28,
      "name": "Action",
      "icon": actionIcn
    },
    {
      "id": 12,
      "name": "Adventure",
      "icon": adventureIcn
    },
    {
      "id": 16,
      "name": "Animation",
      "icon": animationIcn
    },
    {
      "id": 35,
      "name": "Comedy",
      "icon": comedyIcn
    },
    {
      "id": 80,
      "name": "Crime",
      "icon": crimeIcn
    },
    {
      "id": 99,
      "name": "Documentary",
      "icon": documentaryIcn
    },
    {
      "id": 18,
      "name": "Drama",
      "icon": dramaIcn
    },
    {
      "id": 10751,
      "name": "Family",
      "icon": familyIcn
    },
    {
      "id": 14,
      "name": "Fantasy",
      "icon": fantasyIcn
    },
    {
      "id": 36,
      "name": "History",
      "icon": historyIcn
    },
    {
      "id": 27,
      "name": "Horror",
      "icon": horrorIcn
    },
    {
      "id": 10402,
      "name": "Music",
      "icon": musicIcn
    },
    {
      "id": 9648,
      "name": "Mystery",
      "icon": mysteryIcn
    },
    {
      "id": 10749,
      "name": "Romance",
      "icon": romanceIcn
    },
    {
      "id": 878,
      "name": "Science Fiction",
      "icon": scienceIcn
    },
    {
      "id": 10770,
      "name": "TV Movie",
      "icon": tvIcn
    },
    {
      "id": 53,
      "name": "Thriller",
      "icon": thrillerIcn
    },
    {
      "id": 10752,
      "name": "War",
      "icon": warIcn
    },
    {
      "id": 37,
      "name": "Western",
      "icon": westernIcn
    }
  ];

export const tvGenresList = [
    {
      "id": 10759,
      "name": "Action & Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 10762,
      "name": "Kids"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10763,
      "name": "News"
    },
    {
      "id": 10764,
      "name": "Reality"
    },
    {
      "id": 10765,
      "name": "Sci-Fi & Fantasy"
    },
    {
      "id": 10766,
      "name": "Soap"
    },
    {
      "id": 10767,
      "name": "Talk"
    },
    {
      "id": 10768,
      "name": "War & Politics"
    },
    {
      "id": 37,
      "name": "Western"
    }
]

export const networksList = [
  {
    "id": 213,
    "logo_path": "/wwemzKWzjKYJFfCeiB57q3r4Bcm.png",
    "name": "Netflix",
  },
  {
    "id": 1024,
    "logo_path": "/w7HfLNm9CWwRmAMU58udl2L7We7.png",
    "name": "Prime Video",
  },
  {
    "id": 3919,
    "logo_path": "/eBa3TplonEHlR6S2wjJ616KnwIh.png",
    "name": "Disney+ Hotstar"
  },
  {
    "id": 2552,
    "logo_path": "/4KAy34EHvRM25Ih8wb82AuGU7zJ.png",
    "name": "Apple TV+"
  },
  {
     "id": 2590,
    "logo_path": "/ghj0DV5ckj0Qm9w5cTeEeaDTDWT.png",
    "name": "ZEE5"
  },
  {
    "id": 3186,
    "logo_path": "/nmU0UMDJB3dRRQSTUqawzF2Od1a.png",
    "name": "HBO Max"
  },
  {
    "id": 3353,
    "logo_path": "/gIAcGTjKKr0KOHL5s4O36roJ8p7.png",
    "name": "Peacock"
  },
  {
    "id": 6631,
    "logo_path": "/zFEsDBjBEj5OiM0FDRYY1NnG7a9.png",
    "name": "Paramount+ with Showtime"
  },
  {
    "id": 4353,
    "logo_path": "/1D1bS3Dyw4ScYnFWTlBOvJXC3nb.png",
    "name": "discovery+"
  },
  {
    "id": 1025,
    "logo_path": "/fNkVI38NJKpnWKMmEkSxxinuyAe.png",
    "name": "WWE Network"
  },
  {
    "id": 6,
    "logo_path": "/cm111bsDVlYaC1foL0itvEI4yLG.png",
    "name": "NBC"
  },
  {
    "id": 2964,
    "logo_path": "/xKMlXKggJ1mTsfC5OSnlBKuFccO.png",
    "name": "MX Player"
  },
  {
    "id": 2,
    "logo_path": "/2uy2ZWcplrSObIyt4x0Y9rkG6qO.png",
    "name": "ABC"
  }
]