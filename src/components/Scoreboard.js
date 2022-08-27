import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState'

export const Scoreboard = () => {
  const { scores } = useContext(GlobalContext);

  return (
    <div className='scoreboard-container'>
        <span>X</span>
        <span>O</span>
        <div className='scoreboard'>
            <div className='score'>{ scores.x }</div>
            <div className='score'>{ scores.y }</div>
        </div>
    </div>
  )
}
