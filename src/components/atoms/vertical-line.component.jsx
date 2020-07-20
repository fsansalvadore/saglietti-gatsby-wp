import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
const VerticalLine = styled(motion.div)`
  position: absolute;
  z-index: 2;
  width: 1px;
  height: 100vh;
  background: #000;
`

export default VerticalLine;