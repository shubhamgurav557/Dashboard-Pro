import { createSlice } from "@reduxjs/toolkit";
import { decodeToken, getCookies } from "./functions";


let cookies = getCookies();
let tokenData;
if(cookies.token){
    tokenData = decodeToken(cookies.token);   
}

const initialState = {
    mode: "dark",
    userId: tokenData ? tokenData.userId : ''
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        }
    }
})

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;