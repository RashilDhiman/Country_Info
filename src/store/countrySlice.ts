import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchCountries, getCountryDetail } from '../api/countryApi';

export const fetchCountries = createAsyncThunk(
  'country/fetchCountries',
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await searchCountries(name);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch countries');
    }
  }
);

export const fetchCountryDetail = createAsyncThunk(
  'country/fetchCountryDetail',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await getCountryDetail(code);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch country details');
    }
  }
);

const initialState = {
  searchResults: [],
  countryDetail: null,
  loading: false,
  error: null as string | null,
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    clearCountryDetail(state) {
      state.countryDetail = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search countries
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Country detail
      .addCase(fetchCountryDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountryDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.countryDetail = action.payload;
      })
      .addCase(fetchCountryDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCountryDetail, clearError } = countrySlice.actions;
export default countrySlice.reducer; 