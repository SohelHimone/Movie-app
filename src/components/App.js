import {data} from './data';
// import {StoreContext} from '../index';
import Navabar from './Navbar';
import MovieCard from './MovieCard';
import React from 'react';
import { addMovie, setShowFavourite } from '../actions';
// import { connect } from '../index';
import {connect} from 'react-redux';


class  App extends React.Component {
  componentDidMount(){
    // const {store}=this.props;//destructing the props
    //subscribe the store data means after updating the data will be merge with new one
    // store.subscribe(()=>{
    //   console.log('updated');
    //   this.forceUpdate();
    // })
   //make a api call
   //dispatch the action
  //  store.dispatch({
  //     type:'ADD_MOVIES',
  //     movies:data
  //  })

  //just using function for dispatching
  // store.dispatch(addMovie(data));
  //  console.log('didmount')

  //dispatching by using props and(props contain store bcz of connect function)
   this.props.dispatch(addMovie(data))

  }




  isMoviefavourite=(movie)=>{
    // const {movies}=this.props.store.getState();
    //  const {favourite}=movies;
  
    //getting props from connect function 
     const {movies}=this.props;
     const index= movies.favourite.indexOf(movie);

     if(index!==-1){
      return true;
     }
      return false;
     
  }

  onChangetab=(val)=>{
    // this.props.store.dispatch(setShowFavourite(val))

    this.props.dispatch(setShowFavourite(val))//by using connect function
  }

  render(){
     //getting the state or data from store by using getState function
    // const movies=this.props.store.getState();//this destructing was good at single array list persent but we change it in ibject now
  
    
    // const {movies,search}=this.props.store.getState();//so destructed lists in object {movies,search...etch}
     
    //destructing 
    const {movies,search}=this.props;
    
    const {lists,favourite,showMovie}=movies ; //so destructed lists in object {lists,favourite...etch}
    // console.log('render',this.props.store.getState());

    const displayMovie=showMovie ?favourite:lists;

    return (
      <div className="App">
        <Navabar search={search}/>
        <div className='main'>
          <div className='tabs'>
            <div className={`tab ${showMovie?'':'active-tab'}`} onClick={()=>this.onChangetab(false)}>Movies</div>
            <div className={`tab ${showMovie?'active-tab':''}`} onClick={()=>this.onChangetab(true)}>Favourite</div>
           
          </div>
          <div className='moviecard'>
               {displayMovie.map((movie,index)=>(
                <MovieCard movie={movie} key={`movies-${index}`} dispatch={this.props.dispatch} isfavourite={this.isMoviefavourite(movie)}/>
               ))}
          </div>
          {displayMovie.length===0 ? <div><h3>No Favourite Movie Added Yet ...Go and add the movie ..hurry up!!</h3></div>:null}
        </div>
      </div>
    );
  }
 
}


//now here we create a AppWrapper to use all the props which we are passing to App 
//by using Consumer property this give us ability to access the props of Provider which we declared in index.js as CreateContext

// class AppWrapper extends React.Component{
//   render(){
//     return(
//       <StoreContext.Consumer>
//         {(store)=><App store={store}/>}
//       </StoreContext.Consumer>
//     )
//   }
// }

//create a connect function which will return the callbck to component

function callback(state){
  return{
    movies:state.movies,
    search:state.search
  }
}

const connectedComponent =connect(callback)(App)

export default connectedComponent;
