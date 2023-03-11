import React from 'react';
import { Box } from "@mui/material"
import Head from "next/head";
import { Navbar } from '../ui';

interface Props {
  title?: string;
  children?: React.ReactNode
}

export const Layout = ({ title = 'OpenTODO - app', children }: Props) => {
  return (
    <Box sx={{ flexFlow: 1 }}>

      {/* Title */}
      <Head>{title}</Head>

      <Navbar />

      <Box sx={{ padding: '10px 20px' }}>
        {children}
      </Box>

    </Box>
  )
}
