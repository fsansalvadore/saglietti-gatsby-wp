import styled from "styled-components"
import { motion } from "framer-motion"

const VerticalLine = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 60%;
  z-index: 2;
  width: 1px;
  height: 100%;
  background: #000;
`

export default VerticalLine
