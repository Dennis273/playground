/**@jsx jsx */
import { jsx, css } from '@emotion/core'
import { AnimateSharedLayout, motion } from 'framer-motion'
import { useState } from 'react'

// we assume page range starts at 1

const maxShowPage = 5
const pageCount = 8

const pageBlockStyle = css`
  position: relative;
  margin: 0 8px;
  display: inline-block;
  width: 32px;
  border-radius: 5%;
`

export default () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [rangeStart, rangeEnd] = calculatePageRange(currentPage, pageCount, maxShowPage)
  console.log(rangeStart, rangeEnd)
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        height: 100vh;
        align-items: center;
      `}
    >
      <AnimateSharedLayout>
        <div
          css={css`
            background-color: #eee;
            font-size: 28px;
            padding: 0 32px;
            border-radius: 16px;
            user-select: none;
            position: relative;
            overflow: hidden;
          `}
        >
          <div
            css={css`
              position: absolute;
              left: -100%;
              top: 2px;
            `}
          >
            {Array(rangeStart)
              .fill(0)
              .map((_, index) => (
                <motion.span key={index} layoutId={`page-${index}`} animate css={pageBlockStyle}>
                  {index}
                </motion.span>
              ))}
          </div>
          <div
            css={css`
              position: absolute;
              right: -100%;
              top: 2px;
            `}
          >
            {Array(pageCount + 1 - rangeEnd)
              .fill(0)
              .map((_, index) => (
                <motion.span
                  key={index + rangeEnd}
                  layoutId={`page-${index + rangeEnd}`}
                  animate
                  css={pageBlockStyle}
                >
                  {index + rangeEnd}
                </motion.span>
              ))}
          </div>
          {Array(rangeEnd - rangeStart)
            .fill(0)
            .map((_, index) => index + rangeStart)
            .map((i) => {
              return (
                <motion.span
                  layoutId={`page-${i}`}
                  animate
                  onClick={() => setCurrentPage(i)}
                  key={i}
                  css={css`
                    position: relative;
                    margin: 0 8px;
                    display: inline-block;
                    width: 32px;
                    border-radius: 5%;
                    height: 32px;
                    ${i === currentPage && 'color: pink;'}
                  `}
                >
                  {i === currentPage && (
                    <motion.span
                      animate
                      layoutId="page-indicator"
                      css={css`
                        background-color: #aaa;
                        display: inline-block;
                        position: absolute;
                        height: 32px;
                        top: 5px;
                        width: 32px;
                        border-radius: 16px;
                        /* display: none; */
                      `}
                    ></motion.span>
                  )}
                  <span
                    css={css`
                      position: absolute;
                      display: inline-block;
                      width: 32px;
                      display: flex;
                      justify-content: center;
                      top: 2px;
                      left: 0;
                    `}
                  >
                    {i}
                  </span>
                </motion.span>
              )
            })}
        </div>
      </AnimateSharedLayout>
    </div>
  )
}

const calculatePageRange = (
  currentPage: number,
  totalPage: number,
  rangeSize: number
): [number, number] => {
  const leftRest = Math.floor(rangeSize / 2)
  const rightRest = rangeSize - leftRest - 1
  let start = currentPage - leftRest
  let end = currentPage + rightRest
  console.log(start, end)
  if (end > totalPage) {
    start -= end - totalPage
    end = totalPage
  }
  console.log('start', start)
  if (start < 1) {
    end += 1 - start
    start = 1
  }
  start = start < 1 ? 1 : start
  end = end > totalPage ? totalPage : end
  return [start, end + 1]
}

/*

1 2 3 4 5
  [ ^ ]
   */
