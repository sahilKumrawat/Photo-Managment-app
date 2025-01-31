
import { createSlice } from '@reduxjs/toolkit';

export const currentUserSlice = createSlice({
  name: 'currentUser',  //............name of memory-slice in store
  initialState: [],
  reducers: {
    storeUser: (state, action) => {   //....reducer methods
      // const userInfo = {
      //   userData: action.payload,
      // };
      let all = {...action.payload}
      // state = all
      // console.log('state ..... ', state)
      return [...action.payload]
    },
    removeUser:(state)=>{
      return []
    }
  },
});

// this is for dispatch
export const { storeUser, removeUser } = currentUserSlice.actions;

// this is for configureStore
export default currentUserSlice.reducer;