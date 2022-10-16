import React from 'react';
import { FC } from "react";
import { Box } from "@mui/material"
import Head from "next/head";
import { Navbar } from '../ui';

interface Props {
    title?: string;
    children?: React.ReactNode
}

export const Layout: FC<Props> = ({ title = 'OpenTODO - app', children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>

        {/* Title */}
        <Head>{ title }</Head>

        <Navbar />

        {/* Sidebar */}

        <Box sx={{ padding: '10px 20px' }}>
            { children }
        </Box>

    </Box>
  )
}
