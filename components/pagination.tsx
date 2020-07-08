import { css } from '@emotion/core'
import { AnimateSharedLayout, motion } from 'framer-motion'
import { useState } from 'react'
import tw from 'twin.macro'
/**
 * Internally we assume page index starts from 0.
 */

export interface PaginationProps {
  total: number
  windowSize: number
}

const Pagination: React.FC<PaginationProps> = ({ total, windowSize }) => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const windowRange = calculateWindowRange(currentPage, total, windowSize)
  console.log(windowRange)
  console.log(currentPage)
  const pageNumbers = makeArray(...windowRange).map((index) => {
    const isCurrentPage = index === currentPage
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
          isCurrentPage && tw`text-gray-800`,
        ]}
        key={index}
        onClick={() => setCurrentPage(index)}
      >
        {index + 1}

        {isCurrentPage && (
          <motion.div
            layoutId={'page-indicator'}
            css={css`
              ${tw`h-full w-full bg-opacity-25 rounded-md bg-green-200 absolute top-0 left-0`}
              z-index: -2;
            `}
          />
        )}
      </motion.div>
    )
  })
  return (
    <AnimateSharedLayout>
      <div
        css={[
          tw`border-r-2 rounded-l-md`,
          pageOperationStyle,
          currentPage === 0 && pageOperationDisableStyle,
        ]}
        onClick={() => {
          setCurrentPage(0)
        }}
      >
        <span className="material-icons">first_page</span>
      </div>
      <div
        css={[tw`border-r-2`, pageOperationStyle, currentPage <= 0 && pageOperationDisableStyle]}
        onClick={() => {
          currentPage > 0 && setCurrentPage(currentPage - 1)
        }}
      >
        <span className="material-icons">chevron_left</span>
      </div>
      <div tw="relative overflow-hidden">
        <div tw="bg-gray-200 flex px-2 overflow-hidden">{pageNumbers}</div>
      </div>
      <div
        css={[
          tw`border-l-2`,
          pageOperationStyle,
          currentPage >= total && pageOperationDisableStyle,
        ]}
        onClick={() => {
          currentPage < total && setCurrentPage(currentPage + 1)
        }}
      >
        <span className="material-icons">chevron_right</span>
      </div>
      <div
        css={[
          tw`border-l-2 rounded-r-md`,
          pageOperationStyle,
          currentPage === total && pageOperationDisableStyle,
        ]}
        onClick={() => {
          setCurrentPage(total)
        }}
      >
        <span className="material-icons">last_page</span>
      </div>
    </AnimateSharedLayout>
  )
}

const pageOperationStyle = css`
  ${tw`bg-gray-200 w-8 h-10 border-gray-400 flex items-center justify-center cursor-pointer text-gray-600 `}
  &:hover {
    ${tw`text-gray-800`}
  }
`

const pageOperationDisableStyle = css`
  ${tw`cursor-not-allowed`}
  &:hover {
    ${tw`text-gray-600`}
  }
`

type range = [number, number]

const calculateWindowRange = (currentPage: number, totalPage: number, rangeSize: number): range => {
  const leftRest = Math.floor(rangeSize / 2)
  const rightRest = rangeSize - leftRest - 1
  console.log(leftRest, rightRest)
  let start = currentPage - leftRest
  let end = currentPage + rightRest
  if (end > totalPage) {
    start -= end - totalPage
    end = totalPage
  }
  if (start < 0) {
    end -= start
    start = 0
  }
  start = Math.max(start, 0)
  end = Math.min(totalPage, end)
  return [start, end + 1]
}

const makeArray = (start: number, end: number): number[] => {
  return Array(end - start)
    .fill(0)
    .map((_, index) => start + index)
}

export default Pagination
