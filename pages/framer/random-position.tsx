/**@jsx jsx */
import { motion } from 'framer-motion'

import { jsx, css, Global } from '@emotion/core'
import { useState } from 'react'

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']

export default () => {
  const [arr, setArr] = useState<number[]>(new Array(7).fill(0).map((_, index) => index))
  console.log('render')
  const randomize = () => {
    arr.sort(() => (Math.random() > 0.5 ? -1 : 1))
    setArr([...arr])
  }
  return (
    <div
      css={css`
        position: fixed;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: #f7f7f7;
        /* background: linear-gradient(#e66465, #9198e5); */
      `}
    >
      <div
        css={css`
          max-width: 70vw;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        `}
      >
        {arr.map((t) => (
          <motion.div
            positionTransition
            key={t}
            css={css`
              height: 48px;
              width: 48px;
              border-radius: 4px;
              background-color: ${colors[t]};
              margin: 16px;
            `}
          ></motion.div>
        ))}
      </div>
      <button onClick={randomize}>Click Me!</button>
      <Global
        styles={css`
          body {
            margin: 0;
          }
        `}
      />
    </div>
  )
}
