import Door from '../components/Door';
import Score from '../components/Score';
import { useEffect } from 'react';
import {
  setIsButton,
  setGoatDoor,
  setSecondActiveDoor,
  setIsAcceptButton,
  setActiveDoor,
  shuffleItems,
  reset,
} from '../redux/slices/mainSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Game.scss';

export default function Game() {
  const items = useSelector((state) => state.main.items);
  const isButton = useSelector((state) => state.main.isButton);
  const isAcceptButton = useSelector((state) => state.main.isAcceptButton);
  const activeDoor = useSelector((state) => state.main.activeDoor);
  const goatDoor = useSelector((state) => state.main.goatDoor);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(shuffleItems());
  }, []);

  const onClickButton = () => {
    if (activeDoor + 1) {
      items.forEach((item, i) => {
        if (item.name === 'коза' && i !== activeDoor) {
          dispatch(setGoatDoor(i));
        }
      });
      dispatch(setIsButton(goatDoor));
    }
  };

  const setSecondDoor = (i) => {
    if (i === 'no') {
      dispatch(setSecondActiveDoor(activeDoor));
    } else {
      items.forEach((item, i) => {
        if (i !== activeDoor && item.active !== true) {
          dispatch(setSecondActiveDoor(i));
          dispatch(setActiveDoor(i + 1));
        }
      });
    }
    dispatch(setIsAcceptButton());
  };

  return (
    <>
      <main>
        <div className="game__info">
          {!isButton
            ? 'Выберите одну из дверей'
            : isAcceptButton
            ? ''
            : 'Желаете изменить свой выбор?'}
        </div>
        <div className="wrapper">
          {items.map((item, i) => (
            <Door doorNumber={i + 1} doorBack={item.name} key={item.id} />
          ))}
        </div>
        {!isButton && <button onClick={onClickButton}>Подтвердить</button>}
        {isButton && !isAcceptButton && (
          <div className="btn__wrapper">
            <button className="btn_no" onClick={() => setSecondDoor('no')}>
              Нет
            </button>
            <button className="btn_yes" onClick={() => setSecondDoor('yes')}>
              Да
            </button>
          </div>
        )}
        {isAcceptButton && (
          <>
            <div className="game__info">
              {items[activeDoor].name === 'машина' ? 'Поздравляю' : 'Не повезло'}
            </div>
            <button onClick={() => dispatch(reset())}>Сброс</button>
          </>
        )}
      </main>
      <Score />
    </>
  );
}
