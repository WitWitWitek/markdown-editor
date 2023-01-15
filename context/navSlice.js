import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
    name: 'nav',
    initialState: {
        menuIsOpen: false,
        previewIsOpen: false,
    },
    reducers: {
        openNav(state) {
            state.menuIsOpen = true;
        },
        closeNav(state) {
            state.menuIsOpen = false;
        },
        toggleNav(state) {
            state.menuIsOpen = !state.menuIsOpen;
        },
        togglePreview(state) {
            state.previewIsOpen = !state.previewIsOpen;
        }
    }
})

export const { openNav, closeNav, toggleNav, togglePreview } = navSlice.actions;
export const selectMenuState = (state) => state.navbar.menuIsOpen;
export const selectPreviewState = (state) => state.navbar.previewIsOpen;
export default navSlice.reducer;