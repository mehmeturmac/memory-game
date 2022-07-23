import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFramework, updateFrameworks, frameworkSelectors } from '../redux/frameworks/frameworkSlice';
import Card from './Card';

function Container() {
  const data = useSelector(frameworkSelectors.selectAll);
  const opened = data.filter((item) => !item.close);
  const dispatch = useDispatch();

  useEffect(() => {
    if (opened.length == 2) {
      setTimeout(() => {
        dispatch(
          updateFrameworks(
            data.map((item) => {
              return { id: item.id, changes: { close: true } };
            })
          )
        );
      }, 1000);
    }
  }, [opened]);

  return (
    <div className="playground">
      {data.map((item, i) => (
        <Card key={i} item={item} />
      ))}
    </div>
  );
}

export default Container;
