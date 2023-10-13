import { useSelector } from 'react-redux/es/hooks/useSelector';

import './score.scss';

export default function Score() {
  const win = useSelector((state) => state.main.win);
  const lose = useSelector((state) => state.main.lose);

  const precentWins = win ? (win * 100) / (win + lose) : 0;
  return (
    <div className="score">
      <div className="score__win">
        <span>Побед:</span> {win}
      </div>
      <div className="score__lose">
        <span>Поражений:</span> {lose}
      </div>
      <div className="score__percent">
        <span>Процент побед:</span> {win ? precentWins.toFixed(1) : 0}%
      </div>
    </div>
  );
}
