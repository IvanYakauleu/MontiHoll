import './header.scss';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <header className="header">
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/game">Игра</Link>
          </li>
          <li>
            <Link to="/">Описание</Link>
          </li>
        </ul>
      </header>
    </>
  );
}
