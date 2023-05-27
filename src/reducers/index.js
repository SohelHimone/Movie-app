import { combineReducers } from "redux";

import { ADD_MOVIES,ADD_FAVOURITE,REMOVE_FAVOURITE,SHOW_FAVOURITE,ADD_MOVIE_TO_LIST ,ADD_SEARCH_RESULT} from "../actions";

//adding more data so we use object bcz it is feasible
const initalMovieState={
   lists:[],
   favourite:[],
   showMovie:false,
}
export function movies (state=initalMovieState,action){
   //   if(action.type===ADD_MOVIES){
   //      return {
   //       ...state,
   //       lists: action.movies
   //      }
   //   }
   //   return state;
   //using switch case 
   switch(action.type){
      case ADD_MOVIES:
         return{
            ...state,
            lists:action.movies
         }
      case ADD_FAVOURITE:
            return {
               ...state,
               favourite:[action.movie,...state.favourite]
            }

      case REMOVE_FAVOURITE:
         const filterarray= state.favourite.filter(movie=>movie.Title!==action.movie.Title)
         return{
            ...state,
            favourite:filterarray,
         }
      case SHOW_FAVOURITE:
         return{
            ...state,
            showMovie:action.val

         }
         case ADD_MOVIE_TO_LIST:
            return {
              ...state,
              lists: [action.movie, ...state.lists],
            };
      default:
        return state;
   }

}


//created serach reducer
const initalSearchState={
   results:{},
   showSearchResults:false
}
export  function search (state=initalSearchState,action){
   switch(action.type){
      case ADD_MOVIE_TO_LIST:
      return {
        ...state,
        showSearchResults:false
      };
         case ADD_SEARCH_RESULT:
         return{
            ...state,
            results: action.movie,
            showSearchResults:true
         }
      default :
      return state
}
}

//creating rootReducers so that all reducer as combing in it and use it as default reducer

//the initial of root reducer will get the initial for other reducers like movies ,serach ,...etc
// const initialRootState={
//   movies:initalMovieState,
//   search:initalSearchState
// }

// export default function rootReducer(state=initialRootState,action){
//    return{
//       movies:movies(state.movies,action),
//       search:search(state.search,action),
//    }
// }

//we dont need to create a custom rootreducer fun because redux give us combinereducer method so we can use it 

export default  combineReducers({
   movies,
   search
})