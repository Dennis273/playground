import { jsx, css } from '@emotion/core'
import { AnimateSharedLayout, motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import Pagination from '@/components/pagination'
import 'twin.macro'
import tw from 'twin.macro'

// we assume page range starts at 1
/*

1 2 3 ...6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22
(   )    (     ) [      ^        ] (         ) (      )
*/

export default () => {
  return (
    <div tw="flex justify-center items-center h-screen select-none">
      <Pagination total={11} windowSize={5} />
    </div>
  )
}
