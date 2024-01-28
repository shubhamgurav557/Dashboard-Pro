import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import { Box, useTheme } from "@mui/material";
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'

const Transactions = () => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");

    const { data, isLoading } = useGetTransactionsQuery({ page, limit, sort: JSON.stringify(sort), search });
    console.log("Transactions Data", data);

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1
        },
        {
            field: "createdAt",
            headerName: "Created At",
            flex: 1
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        }
    ]

    return (
        <Box m="1.5rem 2rem" overflowX="auto">
            <Header title="TRANSACTIONS" subtitle="List Of All Transactions" />
            <Box mt="20px">
                <div className="datagrid-container">
                    <DataGrid
                        loading={isLoading || !data}
                        getRowId={(row) => row._id}
                        rows={(data && data.transactions) || []}
                        columns={columns}
                        rowCount={(data && data.total) || 0}
                        rowsPerPageOptions={[20, 50, 100]}
                        pagination
                        page={page}
                        pageSize={limit}
                        paginationMode="server"
                        sortingMode="server"
                        onPageChange={(newPage) => setPage(newPage)}
                        onPageSizeChange={(newLimit) => setLimit(newLimit)}
                        onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                        components={{ Toolbar: DataGridCustomToolbar }}
                        componentsProps={{
                            toolbar: { searchInput, setSearchInput, setSearch }
                        }}
                        sx={{
                            "& .MuiDataGrid-root": {
                                border: 'none',
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "none",
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: theme.palette.background.alt,
                                color: theme.palette.secondary[100],
                                borderBottom: "none",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: theme.palette.primary.light,
                            },
                            "& .MuiDataGrid-footerContainer": {
                                backgroundColor: theme.palette.background.alt,
                                color: theme.palette.secondary[100],
                                borderTop: "none",
                            },
                            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                color: `${theme.palette.secondary[200]} !important`,
                            },
                            // Set a fixed width for the DataGrid container
                            "& .datagrid-container": {
                                maxWidth: '100%', // Adjust the width as needed
                                overflowX: 'auto',
                            },
                        }}
                    />
                </div>
            </Box>
        </Box>
    )
}

export default Transactions