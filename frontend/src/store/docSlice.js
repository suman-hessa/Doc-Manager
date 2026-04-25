import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    documents: []
}

const docSlice = createSlice({
    name: 'docs',
    initialState,
    reducers: {
        loadDocuments: (state, action)=>{
            state.documents = action.payload;
            },
        deleteDocument: (state, action)=>{
            state.documents = state.documents.filter(doc=>doc._id !== action.payload);
        }, 
        addSingleDocument: (state, action)=>{
            const {data} = action.payload;
            state.documents.push(data);
        }, 
        updateDocument: (state, action)=>{
            const {data} = action.payload;
            state.documents = state.documents.map(doc=>doc._id == data._id? {...doc, ...data}:doc)
        }
    }
})

export const {loadDocuments, deleteDocument, addSingleDocument, updateDocument} = docSlice.actions;

export default docSlice.reducer;