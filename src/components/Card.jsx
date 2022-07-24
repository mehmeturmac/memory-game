import { useSelector, useDispatch } from 'react-redux';
import { updateFramework, addOpened } from '../redux/frameworks/frameworkSlice';

function Card({ item }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.frameworks.loading);

  const handleClick = () => {
    if (!loading && item.close) {
      dispatch(updateFramework({ id: item.id, changes: { close: false } }));
      dispatch(addOpened({ id: item.id, name: item.name }));
    }
  };

  return (
    <div className={'card' + (!item.close ? ' opened' : '') + (item.complete ? ' matched' : '')} onClick={handleClick}>
      <div className="front">?</div>
      <div className="back">
        <img src={'https://raw.githubusercontent.com/samiheikki/javascript-guessing-game/master/static/logos/' + item.name + '.png'} alt={`$framework`} />
      </div>
    </div>
  );
}

export default Card;
