/**@jsx jsx */
import { jsx, css } from '@emotion/core'
import { AnimateSharedLayout, motion } from 'framer-motion'
import { useState, useMemo } from 'react'

import 'twin.macro'
import tw from 'twin.macro'

// we assume page range starts at 1

const maxShowPage = 5
const pageCount = 110

export default () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [rangeStart, rangeEnd] = calculatePageRange(currentPage, pageCount, maxShowPage)
  const pageNumbers = Array(pageCount)
    .fill(0)
    .map((_, i) => {
      const isCurrentPage = i + 1 === currentPage
      return (
        <motion.div
          css={[
            css`
              ${tw`h-6 text-center m-2 rounded-md cursor-pointer relative text-gray-600`}
              z-index: 1;
              min-width: 1.5rem;
              &:hover {
                ${tw`bg-gray-400 text-gray-800`}
              }
            `,
            isCurrentPage && tw`text-gray-800 bg-green-200`,
          ]}
          key={i + 1}
          layoutId={`page-number-${i + 1}`}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}

          {/* {isCurrentPage && (
            <motion.div
              layoutId={'page-indicator'}
              css={css`
                ${tw`h-6 w-6 bg-opacity-25 rounded-md bg-green-200 absolute top-0 left-0`}
                z-index: -2;
              `}
            />
          )} */}
        </motion.div>
      )
    })
  // TODO: refactor
  const pageNumbersLeft = pageNumbers.slice(0, rangeStart - 1)
  const pageNumbersCenter = pageNumbers.slice(rangeStart - 1, rangeEnd - 1)
  const pageNumbersRight = pageNumbers.slice(rangeEnd - 1)
  return (
    <div tw="flex justify-center items-center h-screen select-none">
      <AnimateSharedLayout>
        <div
          css={[tw`border-r-2 rounded-l-md`, pageOperationStyle]}
          onClick={() => {
            setCurrentPage(1)
          }}
        >
          <span className="material-icons">first_page</span>
        </div>
        <div
          css={[tw`border-r-2`, pageOperationStyle]}
          onClick={() => {
            currentPage > 1 && setCurrentPage(currentPage - 1)
          }}
        >
          <span className="material-icons">chevron_left</span>
        </div>
        <div tw="relative  overflow-hidden">
          <div tw="bg-gray-200 flex  px-2 overflow-hidden">{pageNumbersCenter}</div>
          <div
            tw="flex absolute"
            css={css`
              left: 0;
              top: 0;
              transform: translateX(-100%);
            `}
          >
            {pageNumbersLeft}
          </div>
          <div
            tw="flex absolute"
            css={css`
              right: 0;
              top: 0;
              transform: translateX(100%);
            `}
          >
            {pageNumbersRight}
          </div>
        </div>
        <div
          css={[tw`border-l-2`, pageOperationStyle]}
          onClick={() => {
            currentPage < pageCount && setCurrentPage(currentPage + 1)
          }}
        >
          <span className="material-icons">chevron_right</span>
        </div>
        <div
          css={[tw`border-l-2 rounded-r-md`, pageOperationStyle]}
          onClick={() => {
            setCurrentPage(pageCount)
          }}
        >
          <span className="material-icons">last_page</span>
        </div>
      </AnimateSharedLayout>
    </div>
  )
}

const pageOperationStyle = css`
  ${tw`bg-gray-200 w-8 h-10 border-gray-400 flex items-center justify-center cursor-pointer text-gray-600 `}
  &:hover {
    ${tw`text-gray-800`}
  }
`

const pageBlock = () => {}

const calculatePageRange = (
  currentPage: number,
  totalPage: number,
  rangeSize: number
): [number, number] => {
  const leftRest = Math.floor(rangeSize / 2)
  const rightRest = rangeSize - leftRest - 1
  let start = currentPage - leftRest
  let end = currentPage + rightRest
  if (end > totalPage) {
    start -= end - totalPage
    end = totalPage
  }
  if (start < 1) {
    end += 1 - start
    start = 1
  }
  start = start < 1 ? 1 : start
  end = end > totalPage ? totalPage : end
  return [start, end + 1]
}
