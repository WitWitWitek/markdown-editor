import { configureStore } from "@reduxjs/toolkit";
import filesListSlice from "./filesListSlice";
import fileDataSlice from "./fileDataSlice";
import navSlice from "./navSlice";

export const store = configureStore({
    reducer: {
        navbar: navSlice,
        filesList: filesListSlice,
        fileData: fileDataSlice,
    }
})