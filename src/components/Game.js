import React, { useState, useContext } from 'react';
import { Spring, useSpring, animated } from 'react-spring';
import { Alert } from './Alert';
import { GlobalContext } from '../context/GlobalState';

export const Game = () => {
    const [queue, setQueue] = useState(0);
    const [track, setTrack] = useState([[0,0,0],[0,0,0],[0,0,0]]);
    const { xWon, yWon } = useContext(GlobalContext);
    const [winner, setWinner] = useState('');
    
    const isOver = (l) => {
        var won = true;
        var row, i;
        for (row of track) {
            won = row.every(e => e === l);
            if (won) return true;
        }
        
        for (var col = 0; col < 3; col++) {
            won = true;
            for (row = 0; row < 3; row++) {
                if (track[row][col] !== l) {
                    won = false;
                    break;
                }
            }
            if (won) return true;
        }
        
        won = true;
        for (i = 0; i < 3; i++) {
            if (track[i][i] !== l) {
                won = false; 
                break;
            }
        }
        if (won) return true;
        
        won = true;
        for (i = 0; i < 3; i++) {
            if (track[i][2-i] !== l) {
                won = false;
            }
        }
        if (won) return true;
        
        return false;
    }
    
    const place = (e) => {
        e.preventDefault();
        if (e.target.innerText === '') {
            var id = e.target.id.split('x');
            if (queue % 2 === 0) {
                e.target.innerText = 'X';
                e.target.style.backgroundColor = '#00e0c6';
                setTrack(prevTrack => {
                    prevTrack[id[0]][id[1]] = 'x';
                    return prevTrack;
                })
            }
            else {
                e.target.innerText = 'O';
                e.target.style.backgroundColor = '#f54768';
                setTrack(prevTrack => {
                    prevTrack[id[0]][id[1]] = 'o';
                    return prevTrack;
                })
            } 
            setQueue(prevQueue => prevQueue + 1);
            
            var x, o;
            setTimeout(() => {
                x = isOver('x');
                o = isOver('o');
                if (x) {
                    console.log('X Won!');
                    setWinner('X');
                    xWon();
                    document.querySelector('.play-ground').style.pointerEvents = 'none';
                }
                if (o) {
                    console.log('O Won!');
                    setWinner('X');
                    yWon();
                    document.querySelector('.play-ground').style.pointerEvents = 'none';
                }
            }, 0);
        }
    }
    
    const reset = (e) => {
        e.preventDefault();
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                document.getElementById(`${i}x${j}`).innerText = '';
                setTrack(prevTrack => [[0,0,0],[0,0,0],[0,0,0]]);
            }
        }
        
        document.querySelector('.play-ground').style.pointerEvents = 'all';
        let children = document.querySelectorAll(".square");
        children.forEach(element => {
            element.style.backgroundColor = '#FFF';
        });
    }
    
    var pg = [];
    
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            pg.push(<div key={`${i}x${j}`} id={`${i}x${j}`} onClick={place} className='square'></div>);
        }
    }
    
    const props = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } })
    const AnimatedAlert = animated(Alert);
    return (
        <>
            <div className='play-ground'>
                { pg.map(div => div) }
            </div>
            <button onClick={reset} className='reset'>Reset</button>
            <AnimatedAlert animation={props} winner={winner}/>
        </>
        )
    }