import React, { useState } from 'react'
import Header from 'components/Header'
import { Box, useTheme } from '@mui/material'
import { useGetSalesQuery } from 'state/api';

const Overview = () => {

    const theme = useTheme();
    const { data } = useGetSalesQuery();
    console.log('Sales Data', data);

    return (
        <Box>
            <Header title="Overview" subtitle="Charts of Sales" />
        </Box>
    )
}

export default Overview