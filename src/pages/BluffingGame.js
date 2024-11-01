import React from 'react';

import { UseEffectScroll } from 'react-use-smooth-scroll'
import 'react-use-smooth-scroll/dist/index.css'
import TextContainer from '../TextContainer';
import './PageStyle.css';
import BoardContainer from './components/BoardContainer';
import Board from './components/board'



const BluffingGame = () => {
  return (
    <div>
      <h1>Game Arena - Bluffing Game</h1>
      <TextContainer
        title="Bluffing Game Introduction"
        content1="Enter the deceptive world of the Bluffing game, where truth and fiction blur. Here, you attempt to convince the AI of a false statement without giving away your deceit. The AI’s task is to unravel your story through <span class='underline'>strategic questioning</span> , using <span class='underline'>inductive reasoning</span> to judge the authenticity of your claims based on the consistency and reliability of the information you provide. Test how well you can bluff, or how effectively the AI can detect your lies."
      />
      <UseEffectScroll>
        <section className='bgSec bgTabooSec1'>
          <BoardContainer/>
        </section>
        <section className='bgSec bgTabooSec2'>
          <BoardContainer title='Top Model LeaderBoard' columnnames={['Model Name', 'Skill Strength']}/>
        </section>
        <section className='bgSec bgTabooSec3'>
          <h1>Section 3</h1>
        </section>
        <section className='bgSec bgTabooSec4'>
          <h1>Section 4</h1>
        </section>
      </UseEffectScroll>
    </div>
  )
}

export default BluffingGame