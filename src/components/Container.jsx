import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLoading, updateFramework, clearOpened, frameworkSelectors, updateScore } from '../redux/frameworks/frameworkSlice';
import Card from './Card';

function Container() {
  const [isComplete, setIsComplete] = useState(false);
  const items = useSelector(frameworkSelectors.selectAll);
  const opened = useSelector((state) => state.frameworks.opened);

  const dispatch = useDispatch();

  useEffect(() => {
    if (opened.length === 2) {
      dispatch(toggleLoading());
      setTimeout(() => {
        if (opened[0].name === opened[1].name) {
          opened.forEach(({ id }) => {
            dispatch(updateFramework({ id, changes: { complete: true } }));
          });
          dispatch(updateScore(+50));
        } else {
          opened.forEach(({ id }) => {
            dispatch(updateFramework({ id, changes: { close: true } }));
          });
          dispatch(updateScore(-10));
        }
        dispatch(clearOpened());
        dispatch(toggleLoading());
      }, 500);
    }
  }, [opened, dispatch]);

  useEffect(() => {
    const isComp = items.find((item) => item.complete === false);
    !isComp ? setIsComplete(true) : setIsComplete(false);
  }, [items]);

  return (
    <div className="playground">
      {isComplete && (
        <div className="congratz">
          <button onClick={() => window.location.reload()}>Play Again</button>
          <div className="flip-scale-up-ver">Congratz!</div>
        </div>
      )}

      {items.map((item, i) => (
        <Card key={i} item={item} />
      ))}
    </div>
  );
}

export default Container;
