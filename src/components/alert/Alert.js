import React, { useEffect } from 'react'
import './Alert.css';

export const Alert = ({winner, end, reset}) => {
  useEffect(() => {
    const div = document.getElementById('alert');
    div.classList.add('pop-up');
  }, [end])

  useEffect(() => {
    const div = document.getElementById('alert');
    div.classList.remove('pop-up');
  }, [reset])

  return (
    <div id='alert' className='alert'>
      {winner === 'X' || winner === 'O' ? (
        <span>Game over. {winner} won!</span>
      ) : (
        <span>Game over. It is TIE!</span>
      )}
    </div>
  )
}
