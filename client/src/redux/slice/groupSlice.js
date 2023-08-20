import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    groups: [], 
};

const groupSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {
        setGroups: (state, action) => {
            state.groups = action.payload;
        },
        addGroup: (state, action) => {
            state.groups.push(action.payload);
        },
        updateGroup: (state, action) => {
            const { id, name, description, background } = action.payload;
            const existingGroup = state.groups.find((group) => group.id === id);
            if (existingGroup) {
                existingGroup.name = name;
                existingGroup.description = description;
                existingGroup.background = background;
            }
            else {
                state.groups.push(action.payload);
            }
        },
        deleteGroup: (state, action) => {
            const id = action.payload;
            state.groups = state.groups.filter((group) => group._id !== id);
        }

    }
});

export const { setGroups, addGroup, updateGroup, deleteGroup } = groupSlice.actions;
export default groupSlice.reducer;
