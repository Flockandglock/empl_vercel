import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const initialState = {
    employees: [
        {
            id: 1,
            name: "ОЛОЛОШ из 11А",
            salary: 1000,
            increase: false,
            rise: false,
            moreThen1000: true
        },
        {
            id: 2,
            name: "НедоФронтендер после курсов",
            salary: 2500,
            increase: false,
            rise: false,
            moreThen1000: true
        },
        {
            id: 3,
            name: "Den",
            salary: 50,
            increase: false,
            rise: false,
            moreThen1000: false
        }
    ]
};

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        // теперь эти 3 редьюсера перешли в extraReducers. Удаляем их отсюда, потому что больше мы их нигде не используем
        addEmployees: (state, actions) => {
            state.employees.push(actions.payload);
        },
        employeesDeleted: (state, actions) => {
            state.employees = state.employees.filter(item => item.id !== actions.payload);
        },
        togglePropEmpl: (state, actions) => {
            state.employees = actions.payload
        }
    }
});

const {actions, reducer} = employeesSlice;

export default reducer;
export const {
    addEmployees,
    employeesDeleted,
    togglePropEmpl
} = actions;