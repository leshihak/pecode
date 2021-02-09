import { createSlice } from "@reduxjs/toolkit";

export interface Location {
  id: number;
  name: string;
  type: string;
  residents: string[];
  dimension: string;
  url: string;
  created: string;
}

export interface LocationInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

type LocationState = {
  locations: Location[];
  locationInfo: LocationInfo | null;
  isLoading: boolean;
  error: any;
};

const initialState: LocationState = {
  locations: [],
  locationInfo: null,
  isLoading: false,
  error: null,
};

const { actions, reducer } = createSlice({
  name: "location",
  initialState,
  reducers: {
    getLocationsRequest(state) {
      state.isLoading = true;
    },

    setLocations(state, action) {
      state.locations = action.payload;
      state.isLoading = false;
    },

    setLocationInfo(state, action) {
      state.locationInfo = action.payload;
      state.isLoading = false;
    },

    getLocationsFailed(state) {
      state.isLoading = false;
    },

    getLocationsSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setLocations,
  getLocationsRequest,
  getLocationsFailed,
  getLocationsSuccess,
  setLocationInfo,
} = actions;

export const getLocations = (page: number) => async (dispatch: any) => {
  try {
    dispatch(getLocationsRequest());
    const url = `https://rickandmortyapi.com/api/location?page=${page}`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (response) {
      const data = await response.json();
      dispatch(setLocations(data.results));
      dispatch(setLocationInfo(data.info));
    }

    dispatch(getLocationsSuccess());
  } catch (error) {
    dispatch(getLocationsFailed());
  }
};

export const filterLocations = (
  name: string,
  type: string,
  dimension: string
) => async (dispatch: any) => {
  try {
    const url = `https://rickandmortyapi.com/api/location${
      name !== ""
        ? `?name=${name}`
        : type !== ""
        ? `?type=${type}`
        : dimension !== ""
        ? `?dimension=${dimension}`
        : ""
    }`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (response) {
      const data = await response.json();
      
      dispatch(setLocations(data.results));
    }
  } catch (error) {
    dispatch(getLocationsFailed());
  }
};

export default reducer;
