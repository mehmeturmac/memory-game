import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const difficulty = localStorage.getItem('difficulty') || 10;

const frameworks = ['angular2', 'vue', 'react', 'grunt', 'phantomjs', 'ember', 'babel', 'ionic', 'gulp', 'meteor', 'yeoman', 'yarn', 'nodejs', 'bower', 'browserify'];

const newFrameworks = frameworks.slice(0, difficulty);

const shuffle = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

const items = shuffle([...newFrameworks, ...newFrameworks]).map((framework, i) => ({ id: i, name: framework, close: true, complete: false }));

export const frameworkAdaptor = createEntityAdapter({ selectId: (e) => e.id });
const emptyState = frameworkAdaptor.getInitialState({ loading: false, opened: [], score: difficulty * 20 });
const initialState = frameworkAdaptor.upsertMany(emptyState, items);

export const frameworkSelectors = frameworkAdaptor.getSelectors((state) => state.frameworks);

export const frameworkSlice = createSlice({
  name: 'frameworks',
  initialState,
  reducers: {
    addFramework: frameworkAdaptor.addOne,
    updateFramework: frameworkAdaptor.updateOne,
    updateFrameworks: frameworkAdaptor.updateMany,
    addOpened: (state, action) => {
      state.opened.push(action.payload);
    },
    clearOpened: (state) => {
      state.opened = [];
    },
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
    updateScore: (state, action) => {
      state.score += action.payload;
    },
  },
});

export const { addFramework, updateFramework, updateFrameworks, addOpened, clearOpened, toggleLoading, updateScore } = frameworkSlice.actions;
export default frameworkSlice.reducer;
