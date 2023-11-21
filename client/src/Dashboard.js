import dashboard from "./Assests/dashboard.png"
import "./Stylesheets/Dashboard.css"
import { Box } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { useEffect, useState, useCallback} from "react"
import {Spinner, Badge} from "react-bootstrap"

function Dashboard() {
    const [isLoading, setIsloading] = useState(true)
    const [feed, setFeed] = useState(null)

    useEffect(() => {
        async function fetchData() {
            let response = await fetch("http://localhost:5000/getfeedback", {
                method: "GET",
            });
            let data = await response.json();
            console.log(data)
            setIsloading(false)
            setFeed(data)
            console.log(feed);
        }
        fetchData();
    }, []);


    const rows = feed?.map((fee, index) => ({
        ...fee,
        serialNumber: index + 1
    }))

    const columns = [
        {
            field: 'serialNumber', headerName: 'S.No.', width: 5, sortable: false,
            filterable: false, headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"
        },
        {
            field: 'visitPeriod', headerName: 'Visit Period', width: 200, headerClassName: 'super-app-theme--header',
            align: "center",
            headerAlign: 'center',
        },
        {
            field: 'recommend',
            headerName: 'Recommendation',
            width: 200,
            editable: true,
            headerClassName: 'super-app-theme--header',
            align: "center",
            headerAlign: 'center',
        },
        {
            field: 'suggestions',
            headerName: 'Suggestions',
            width: 250,
            editable: true,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"

        },
        {
            field: 'followup',
            headerName: 'Follow up',
            renderCell: (params) => params.row.followup== "on" ? (<Badge bg="success">Yes</Badge>) : (<Badge bg="danger">No</Badge>),
            type: 'text',
            width: 150,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"

        },
        {
            field: 'food',
            headerName: 'Food Quality',
            width: 150,
            sortable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"
        },
        {
            field: 'service',
            headerName: 'Service Quality',
            width: 150,
            sortable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"
        },
        {
            field: 'experience',
            headerName: 'Overall Experience',
            width: 150,
            sortable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"
        },
    ];

    const getRowSpacing = useCallback((params) => {
        return {
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
        };
    }, []);

    return (
        <>
            <main id="dashboard">
                <section className="nav">
                    <img src={dashboard} alt="dashboard" />
                </section>
            </main>
            {isLoading ? (
                <div className="loading">
                    <Spinner animation="grow" variant="warning" className="text-center" />
                </div>
            ) : (
                <section className="my-4" style={{ backgroundColor: "#FFFFFF", textAlign: "center", width:"80vw", margin:"0 auto" }}>
                    <Box
                        sx={{

                            width: '100%',
                            '& .super-app-theme--header': {
                                fontWeight: "400"
                            },
                        }}
                    >
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            getRowId={row => row._id}
                            initialState={{
                                ...feed.initialState,
                                pagination: { paginationModel: { pageSize: 5 } },
                            }}
                            pageSizeOptions={[0, 5, 10, 25]}
                            disableRowSelectionOnClick
                            getRowSpacing={getRowSpacing}
                            sx={{
                                [`& .${gridClasses.row}`]: {
                                    bgcolor: (theme) =>
                                        theme.palette.mode === 'light' ? grey[200] : grey[900],
                                },
                            }}

                        />
                    </Box>
                </section>
            )}

        </>
    )
}

export default Dashboard