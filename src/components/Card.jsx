import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFramework, frameworkSelectors } from '../redux/frameworks/frameworkSlice';

function Card({ item }) {
  const dispatch = useDispatch();

  const data = useSelector((state) => frameworkSelectors.selectById(state, item.id));

  const handleClick = () => {
    dispatch(
      updateFramework({
        id: item.id,
        changes: {
          close: !data.close,
        },
      })
    );
  };

  return (
    <div className={`card ${item.close ? '' : 'opened'} ${item.complete ? 'matched' : ''}`} onClick={handleClick}>
      <div className="front">?</div>
      <div className="back">
        <img src={'https://raw.githubusercontent.com/samiheikki/javascript-guessing-game/master/static/logos/' + item.name + '.png'} alt={`$framework`} />
      </div>
    </div>
  );
}

export default Card;
