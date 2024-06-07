import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { IVideo, defaultValue } from 'app/shared/model/video.model';
import { IQueryParams, serializeAxiosError } from 'app/shared/reducers/reducer.utils';

const initialState = {
  loading: false,
  errorMessage: null,
  videos: [] as ReadonlyArray<IVideo>,
  authorities: [] as any[],
  video: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
};

const videoUrl = 'api/video';

// Async Actions
export const getVideos = createAsyncThunk('videoManagement/fetch_videos', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${videoUrl}/page${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return axios.get<IVideo[]>(requestUrl);
});

export const getRoles = createAsyncThunk('userManagement/fetch_roles', async () => {
  const response = await axios.get<any[]>(`api/authorities`);
  response.data = response?.data?.map(authority => authority.name);
  return response;
});

export const getVideo = createAsyncThunk(
  'videoManagement/fetch_video',
  async (id: string) => {
    const requestUrl = `${videoUrl}/query/${id}`;
    return axios.get<IVideo>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

export const createVideo = createAsyncThunk(
  'videoManagement/create_video',
  async (video: IVideo, thunkAPI) => {
    const result = await axios.post<IVideo>(videoUrl + '/add', video);
    thunkAPI.dispatch(getVideos({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const updateVideo = createAsyncThunk(
  'videoManagement/update_video',
  async (video: IVideo, thunkAPI) => {
    const result = await axios.put<IVideo>(videoUrl + '/update', video);
    thunkAPI.dispatch(getVideos({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const deleteVideo = createAsyncThunk(
  'videoManagement/delete_video',
  async (id: string, thunkAPI) => {
    const requestUrl = `${videoUrl}/${id}`;
    const result = await axios.delete<IVideo>(requestUrl);
    thunkAPI.dispatch(getVideos({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export type VideoManagementState = Readonly<typeof initialState>;

export const VideoManagementSlice = createSlice({
  name: 'videoManagement',
  initialState: initialState as VideoManagementState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRoles.fulfilled, (state, action) => {
        state.authorities = action.payload.data;
      })
      .addCase(getVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload.data;
      })
      .addCase(deleteVideo.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.video = defaultValue;
      })
      .addMatcher(isFulfilled(getVideos), (state, action) => {
        state.loading = false;
        state.videos = action.payload.data;
        state.totalItems = parseInt(action.payload.headers['x-total-count'], 10);
      })
      .addMatcher(isFulfilled(createVideo, updateVideo), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.video = action.payload.data;
      })
      .addMatcher(isPending(getVideos, getVideo), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createVideo, updateVideo, deleteVideo), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      })
      .addMatcher(isRejected(getVideos, getVideo, getRoles, createVideo, updateVideo, deleteVideo), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reset } = VideoManagementSlice.actions;

// Reducer
export default VideoManagementSlice.reducer;
