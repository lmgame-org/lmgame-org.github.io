import React from 'react';

import './PageStyle.css';
import TextContainer from '../TextContainer';

import { UseEffectScroll } from 'react-use-smooth-scroll'
import 'react-use-smooth-scroll/dist/index.css'

const TabooGame = () => {
  return (
    <div>
      <h1>Game Arena - Taboo Game</h1>
      <TextContainer
        title="Taboo Game Introduction"
        content="The Taboo game puts a twist on the classic word-guessing game by reversing the roles. You provide hints that guide the AI to say a specific target word without directly mentioning it. This game assesses the AI's <span class='underline'>abductive reasoning and multi-hop capabilities</span>, as it must infer the hidden word from your indirect clues. Can you craft clever prompts to make the AI reveal the word, or will it outsmart your subtlety?"
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

export default TabooGame