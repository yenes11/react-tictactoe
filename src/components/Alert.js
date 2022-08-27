import React from 'react'
import { Spring, useSpring, animated } from 'react-spring';

export const Alert = ({winner, animation}) => {
  return (
    <animated.div style={animation}>
    <div className='alert' style={animation}>
        Game over. {winner} won!
    </div>
    </animated.div>
  )
}
