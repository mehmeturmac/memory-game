import { useSelector } from 'react-redux';

function Header() {
  const score = useSelector((state) => state.frameworks.score);

  const handleClick = (num) => {
    localStorage.setItem('difficulty', num);
    window.location.reload();
  };

  return (
    <div className="header">
      <div>
        <h1>Memory Game</h1>
        <div className="btn-group">
          <button className="btn" onClick={() => handleClick(5)}>
            Easy
          </button>
          <button className="btn" onClick={() => handleClick(10)}>
            Medium
          </button>
          <button className="btn" onClick={() => handleClick(15)}>
            Hard
          </button>
        </div>
        <h3>Score: {score}</h3>
      </div>
    </div>
  );
}

export default Header;
