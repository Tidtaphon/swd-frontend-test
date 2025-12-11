"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface StorageItem {
//   id: string;
//   name: string;
//   gender: string;
//   mobile: string;
//   nationality: string;
// }

interface StorageState {
  items: any[];
}

const initialState: StorageState = {
  items: [],
};

const saveToLocalStorage = (items: any[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("storage_items", JSON.stringify(items));
  }
};

const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    loadFromLocal: (state) => {
      if (typeof window !== "undefined") {
        const data = localStorage.getItem("storage_items");
        state.items = data ? JSON.parse(data) : [];
      }
    },
    addItem: (state, action: PayloadAction<any>) => {
      state.items.push(action.payload);
      saveToLocalStorage(state.items);
    },
    updateItem: (state, action: PayloadAction<any>) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        saveToLocalStorage(state.items);
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveToLocalStorage(state.items);
    },
    deleteMany: (state, action: PayloadAction<string[]>) => {
      state.items = state.items.filter((i) => !action.payload.includes(i.id));
      saveToLocalStorage(state.items);
    },
  },
});

export const { addItem, updateItem, deleteItem, deleteMany, loadFromLocal } =
  storageSlice.actions;

export default storageSlice.reducer;
