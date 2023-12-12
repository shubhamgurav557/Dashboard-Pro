import React from 'react'
import { Search } from '@mui/icons-material'
import { IconButton, TextField, InputAdornment } from '@mui/material'
import { GridToolbarDensitySelector, GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton, GridToolbar} from '@mui/x-data-grid'
import FlexBetween from './FlexBetween'

const DataGridCustomToolbar = () => {
  return (
    <GridToolbarContainer>
        <FlexBetween width="100%">
            <FlexBetween>
                <GridToolbarColumnsButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </FlexBetween>
            <TextField />
        </FlexBetween>
    </GridToolbarContainer>
  )
}

export default DataGridCustomToolbar