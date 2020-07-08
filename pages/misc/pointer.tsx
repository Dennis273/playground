import { jsx, css } from '@emotion/core'
import { useRef, useEffect, MouseEventHandler, useState } from 'react'
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion'

const transition = { type: 'spring', damping: 100, stiffness: 1000 }

export default () => {
  return (
    <AnimateSharedLayout>
      <div
        css={css`
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          & > * {
            margin: 4px 0;
          }
        `}
      >
        <MotionDiv>Button</MotionDiv>
        <MotionDiv>Button</MotionDiv>
        <MotionDiv>Button</MotionDiv>
      </div>
    </AnimateSharedLayout>
  )
}

const MotionDiv: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const domRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [mouseOver, setMouseOver] = useState<boolean>(false)
  const handleMouseMove: MouseEventHandler = (e) => {
    if (!mouseOver) {
      setMouseOver(true)
    }
    if (domRef.current !== null) {
      const { top, left, right, bottom } = domRef.current.getBoundingClientRect()
      const domX = (left + right) / 2
      const domY = (top + bottom) / 2
      setOffset({
        x: e.clientX - domX,
        y: e.clientY - domY,
      })
    }
  }
  const handleMouseLeave: MouseEventHandler = (e) => {
    setMouseOver(false)

    setOffset({
      x: 0,
      y: 0,
    })
    // setShowShadow(false)
  }
  return (
    <div
      ref={domRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      css={css`
        /* border: 1px solid black; */
        cursor: pointer;
        position: relative;
        border-radius: 4px;
      `}
    >
      <AnimatePresence>
        <motion.div
          transition={transition}
          layoutId={'pointer'}
          animate={{ x: offset.x / 10, y: offset.y / 15, opacity: mouseOver ? 1 : 0 }}
          css={css`
            /* transform: translate(${offset.x / 10}px, ${offset.y / 10}px); */
            background: rgba(0, 0, 0, 0.1);
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            border-radius: 4px;
            z-index: -1;
          `}
        ></motion.div>
      </AnimatePresence>

      <motion.div
        transition={transition}
        animate={{ x: offset.x / 20, y: offset.y / 25, scale: mouseOver ? 1.05 : 1 }}
        css={css`
          margin: 4px 8px;
        `}
      >
        {children}
      </motion.div>
    </div>
  )
}
