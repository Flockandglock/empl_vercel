import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    filters: [
        {
            name: "all",
            label: "Все сотрудники",
            className: "btn"
        },
        {
            name: "rise",
            label: "На повышение",
            className: "btn"
        },
        {
            name: "moreThen1000",
            label: "З/П больше 1000$",
            className: "btn"
        }
    ],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    query: '',
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        // теперь эти 3 редьюсера перешли в extraReducers. Удаляем их отсюда, потому что больше мы их нигде не используем
        activeFilterChanged: (state, actions) => {
            state.activeFilter = actions.payload;
        },
        getQuery: (state, actions) => {
            state.query = actions.payload;
        }
    }
    
});

const {actions, reducer} = filterSlice;

export default reducer;
export const {
    activeFilterChanged,
    getQuery
} = actions;