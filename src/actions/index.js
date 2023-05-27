// {
//     type: 'ADD_Movies',
// }

//creatig action type variable to export it use it for better comparsion
export const ADD_MOVIES="ADD_MOVIES";

export const ADD_FAVOURITE="ADD_FAVOURITE";

export const REMOVE_FAVOURITE="REMOVE_FAVOURITE";

export const SHOW_FAVOURITE="SHOW_FAVOURITE";

export const ADD_MOVIE_TO_LIST="ADD_MOVIE_TO_LIST";

export const ADD_SEARCH_RESULT="ADD_SEARCH_RESULT";


//creating action creater(basically this is a function only which will addmovie just for easy convenction we use it)

export function addMovie(movies){
    return {
        type: ADD_MOVIES,
        movies
    }
}

//action for adding favourite movies
export function addFavourite(movie){
    return {
        type: ADD_FAVOURITE,
        movie,
    }
}

//action for removing favourite movie from favourite array
export function removeFavourite(movie){
    return {
        type: REMOVE_FAVOURITE,
        movie,
    }
}

//creating action for showing movies or favaourite tab accordingly
//action for removing favourite movie from favourite array
export function setShowFavourite(val){
    return {
        type: SHOW_FAVOURITE,
        val,
    }
}

//action for when we serach movie in search section then the displayed movie should be added to movies tab
export function addMovieToList(movie){
    return {
        type: ADD_MOVIE_TO_LIST,
        movie,
    }
}

export function addMovieSearchResult(movie){
    return {
        type: ADD_SEARCH_RESULT,
        movie,
    }
}

//action wirtten for movie to search in serach section which will fetch by url(api) then it will apper in list 
//actually this a thunk which return  us function instead of object so we can directly acttch it to dispatch
export function handleMovieSearch(searchText) {
    return function (dispatch) {
      const url = `http://www.omdbapi.com/?apikey=3ca5df7&t=${searchText}`;
      fetch(url)
        .then((response) => response.json())
        .then((movie) => {
          console.log('movie', movie);
          // dispatch action to save search results in store
          dispatch(addMovieSearchResult(movie));
        });
    };
  }
