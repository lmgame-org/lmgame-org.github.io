import React from 'react';

import { UseEffectScroll } from 'react-use-smooth-scroll'
import 'react-use-smooth-scroll/dist/index.css'
import TextContainer from '../TextContainer';
import './PageStyle.css';


const AkinatorGame = () => {
  return (
    <div>
      <h1>Game Arena - Akinator Game</h1>
      <TextContainer
        title="Akinator Game Introduction"
        content="In the Akinator game, challenge our AI to a duel of wits! The AI, based on the classic web genie game, asks you a series of yes-or-no questions to guess the object you’re thinking of. This game tests the AI's <span class='underline'>deductive reasoning and multi-hop thinking</span> by requiring it to narrow down possibilities through each question answered, simulating a chain of logical deductions based on your responses. How quickly can the AI pinpoint your chosen object with the least amount of clues?"
      />
      <UseEffectScroll>
        <section className='bgSec bgTabooSec1'>
          <h1>Section 1</h1>
        </section>
        <section className='bgSec bgTabooSec2'>
          <h1>Section 2</h1>
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

export default AkinatorGame