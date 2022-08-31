import React, { useState, useContext, useEffect } from 'react';
import { Alert } from '../alert/Alert';
import { GlobalContext } from '../../context/GlobalState';
import './Game.css';

export const Game = () => {
    const [playGround, setPlayGround] = useState([]);
    const [queue, setQueue] = useState(0);
    const [track, setTrack] = useState([[0,0,0],[0,0,0],[0,0,0]]);
    const { xWon, yWon } = useContext(GlobalContext);
    const [winner, setWinner] = useState('');
    const [end, setEnd] = useState(false);
    const [toggleReset, setToggleReset] = useState(false);
    
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
                    setWinner('X');
                    xWon();
                    setEnd(prevEnd => !prevEnd);
                    document.querySelector('.play-ground').style.pointerEvents = 'none';
                }
                else if (o) {
                    setWinner('O');
                    yWon();
                    setEnd(prevEnd => !prevEnd);
                    document.querySelector('.play-ground').style.pointerEvents = 'none';
                }
                else if (queue === 8) {
                    setWinner('TIE');
                    setEnd(prevEnd => !prevEnd);
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
        setToggleReset(prevReset => !prevReset);
        setQueue(0)
    }
    
    useEffect(() => {
        var pg = [];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                pg.push(<div key={`${i}x${j}`} id={`${i}x${j}`} onClick={place} className='square'></div>)
            }
        }
        setPlayGround(pg)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queue])

    return (
        <>
            <div className='play-ground'>
                { playGround.map(div => div) }
            </div>
            <button onClick={reset} className='reset'>Reset</button>
            <Alert end={end} winner={winner } reset={toggleReset} />
        </>
        )
    }