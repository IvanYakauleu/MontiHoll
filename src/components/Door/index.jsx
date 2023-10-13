import './door.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveDoor } from '../../redux/slices/mainSlice';

export default function Door({ doorNumber, doorBack }) {
  const goatDoor = useSelector((state) => state.main.goatDoor);
  const activeDoor = useSelector((state) => state.main.activeDoor);
  const secondActiveDoor = useSelector((state) => state.main.secondActiveDoor);
  const isAcceptButton = useSelector((state) => state.main.isAcceptButton);
  const isButton = useSelector((state) => state.main.isButton);
  const dispatch = useDispatch();

  const click = () => {
    if (!isButton) {
      dispatch(setActiveDoor(doorNumber));
    }
  };

  return (
    <div>
      <div
        className={`card ${isButton && goatDoor + 1 === doorNumber ? 'flipped' : ''}${
          isAcceptButton && secondActiveDoor + 1 === doorNumber ? 'flipped' : ''
        }`}
        onClick={click}>
        <div className="card-inner">
          <div className="card-front">
            <p>{doorNumber}</p>
          </div>
          <div className="card-back">
            <p>{doorBack}</p>
          </div>
        </div>
        <div className={`circle ${activeDoor + 1 === doorNumber ? 'active' : ''}`}></div>
      </div>
    </div>
  );
}
