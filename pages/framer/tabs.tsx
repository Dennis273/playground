/**@jsx jsx */
import { jsx, css, Global } from '@emotion/core'

import { motion, AnimateSharedLayout } from 'framer-motion'
import { useState } from 'react'

const tabs = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4']

export default () => {
  const [activeTab, setActiveTab] = useState<number>(0)
  return (
    <>
      <nav
        css={css`
          position: fixed;
          top: 0;
          width: 100vw;
          background-color: #f7f7f7;
          ol {
            display: flex;
            list-style: none;
            li {
              width: 120px;
            }
          }
        `}
      >
        <AnimateSharedLayout>
          <ol>
            {tabs.map((title, index) => {
              const isActiveTab = index === activeTab
              return (
                <motion.li
                  key={title}
                  animate
                  css={css`
                    color: ${isActiveTab ? 'red' : 'black'};
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 32px;
                  `}
                  onClick={() => setActiveTab(index)}
                >
                  {title}
                  {isActiveTab && (
                    <motion.div
                      layoutId="animatedLayoutId"
                      css={css`
                        width: 60%;
                        height: 6px;
                        border-radius: 3px;
                        background-color: #00000050;
                      `}
                    />
                  )}
                </motion.li>
              )
            })}
          </ol>
        </AnimateSharedLayout>
      </nav>
      <Global
        styles={css`
          body {
            margin: 0;
          }
        `}
      />
    </>
  )
}
