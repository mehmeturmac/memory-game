import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const frameworks = ['angular2', 'vue', 'react', 'grunt', 'phantomjs', 'ember', 'babel', 'ionic', 'gulp', 'meteor', 'yeoman', 'yarn', 'nodejs', 'bower', 'browserify'];

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

const items = shuffle([...frameworks, ...frameworks]).map((framework, i) => ({ id: i, name: framework, close: true, complete: false, fail: false }));

export const frameworkAdaptor = createEntityAdapter({ selectId: (e) => e.id });
const initialState = frameworkAdaptor.upsertMany(frameworkAdaptor.getInitialState(), items);

export const frameworkSelectors = frameworkAdaptor.getSelectors((state) => state.frameworks);

export const frameworkSlice = createSlice({
  name: 'frameworks',
  initialState,
  reducers: {
    addFramework: frameworkAdaptor.addOne,
    updateFramework: frameworkAdaptor.updateOne,
    updateFrameworks: frameworkAdaptor.updateMany,
    updateScore: (state, action) => {
      state.diff = action.payload;
      state.score = state.score + state.diff;
    },
  },
});

export const { addFramework, updateFramework, updateFrameworks } = frameworkSlice.actions;
export default frameworkSlice.reducer;
