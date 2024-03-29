import React, { useState } from 'react'
import Header from 'components/Header'
import { Box, FormControl, MenuItem, InputLabel, Select, useTheme } from '@mui/material'
import OverviewChart from 'components/OverviewChart'

const Overview = () => {
    const theme = useTheme();
    const [view, setView] = useState("units");
    return (
        <Box m="1.5rem 2rem">
            <Header title="Overview" subtitle="Overview of general revenue and profit" />
            <Box height="75vh" backgroundColor={theme.palette.background.alt} borderRadius="0.55rem" mt="1rem" p="1rem .5rem">
                <FormControl sx={{mt: "1rem"}}>
                    <InputLabel>View</InputLabel>
                    <Select value={view} label="View" onChange={(e) => setView(e.target.value)}>
                        <MenuItem value="sales">Sales</MenuItem>
                        <MenuItem value="units">Units</MenuItem>
                    </Select>
                </FormControl>
                <OverviewChart view={view} />
            </Box>
        </Box>
    )
}

export default Overview