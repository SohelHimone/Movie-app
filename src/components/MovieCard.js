import React from "react"
import { addFavourite ,removeFavourite} from "../actions";
// import { connect } from "../index";

class MovieCard extends React.Component{
   
   handlefavouriteClick=()=>{
     const {movie}=this.props;
     this.props.dispatch(addFavourite(movie))
  }
  handleunfavouriteClick=()=>{
    const {movie}=this.props;
    this.props.dispatch(removeFavourite(movie))
  }

    render(){
        const {movie,isfavourite}=this.props
        return(
            <div className="movie-card">
                <div className="left">
                  <img src={movie.Poster} alt="movie-img"/>
                </div>
                <div className="right">
                      <div className="title">{movie.Title}</div>
                      <div className="plot">{movie.Plot}</div>
                
               
                <div className="footer">
                  {/* <div className="rating">{movie.Ratings}</div> */}
                  {isfavourite ?
                  <button className="favourite-btn"  onClick={this.handleunfavouriteClick}>Unfavourite</button>
                 :(
                  <button className="favourite-btn"  onClick={this.handlefavouriteClick}>Favourite</button>
                  )}
                  
                </div>
                </div>
                
            </div>
            
        )
    }
}


// function callback(state){
//   return{
//     movies:state.movies,
//     search:state.search
//   }
// }

// const connectedComponent =connect(callback)(MovieCard)

// export default connectedComponent;

export default MovieCard;