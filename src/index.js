import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import rootReducer from './reducers';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

//function logger taken (obj,next ,action)
//so by currying we write functin as logger(obj)(next)(action)
// const logger=function({dispatch,getState}){
//   return function(next){
//     return function(action){
//       console.log('ACTION_TYPE',action.type);
//       next(action);//this next argumment call the next middleware in case no middleware it will call dispatch
//     }
//   }
  
// }

//another implicit method to write above curried function

const logger=({dispatch,getState})=>(next)=>(action)=>{
  console.log('ACTION_TYPE',action.type);
  next(action);//this next argumment call the next middleware in case no middleware it will call dispatch
}


// const thunk = store => next => action => {
//   if (typeof action === 'function') {
//     return action(store.dispatch);
//   }

//   next(action);
// };

const store= createStore(rootReducer,applyMiddleware(logger,thunk));
// console.log('state',store);
// console.log('before state',store.getState());

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{name:"superman"}]
// })
// console.log('after state',store.getState());
export const StoreContext=createContext();//created storecontext so that it can be use for gobally by any of childeren which will wrapper inside it

//created provider class and used storecontext to use by other children by using contextname.Provider,
//now here whichever value we will change the it will reflect in all children which are wrapped inside it and this refer to re-render our app
// class Provider extends React.Component{
//   render(){
//     const {store}=this.props;
//     return(
//       <StoreContext.Provider value={store}>
//         {this.props.children}
//       </StoreContext.Provider>
//     )
//   }
// }

//no need of connect and provide function to create custom bcoz react-redux property gives inbuilt us

//creating a connect function which will connect the component to redux store(so the components can access the state,dispatch and suscibe propertys)
// export function connect(callback){//the gives the callback function which will return the state to component
//   return function(Component){//here the actually component will get the state 
//       class ConnectedComponent extends React.Component{//so here class component is created to access all the props (store)
//           constructor(props){
//             super(props);
//             this.unsubscribe=this.props.store.subscribe(()=>{this.forceUpdate()})
//           }

//           componentWillUnmount(){
//             this.unsubscribe();
//           }
//           render(){
//             const {store}=this.props;
//             const state=store.getState();//getting state (lists,favourtie,results for getState property)
//             const dataTobepassasprops=callback(state);//here we pass the callback fun with state

//             return(
//               <Component dispatch={store.dispatch} {...dataTobepassasprops}/>//here we pass the dispatch as props to all components and destructer the state(state.movie,search,users,etc)
//             )
//           }
//         }
//         //created wrapper class so that all the above component can get acces to props(store)
//         class ConnectedComponentWrapper extends React.Component{
//           render(){
//             return(
//               <StoreContext.Consumer>
//                 {
//                   (store)=>{
//                     return <ConnectedComponent store={store}/>
//                   }
//                 }
//               </StoreContext.Consumer>
//             );
             
            
//           }
//         }
//         return ConnectedComponentWrapper;
      
//   }
// }


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
    
  </React.StrictMode>
);


