import { Button, Stack } from '@mui/material';
import { Box } from '@mui/system'
import React from 'react'
import { TableColumn } from 'react-data-table-component';
import BreadCrumbs from '../../../components/BreadCrumbs'
import DataTableBase from '../../../components/TableData'
import { IDataRowTeams } from './teamsTypes';
// import {userCredentials} from './../../../utilities/config'

const TeamsPage = () => {


    // console.log(userCredentials, 'userrr')

    const data = [
        {
            "_id" : "gsdawe",
            "name": "John Doe",
            "email": "johndoe@gmail.com",
            "role": "owner",
            "status": "Active",
            "verified": false
        },
        {
            "_id" : "ljfkfd",
            "name": "John Mariyadi",
            "email": "mariyadi@gmail.com",
            "role": "admin",
            "status": "Active",
            "verified": false
        },
        {
            "_id" : "tvwgfhi",
            "name": "Thai Mikel",
            "email": "thai@gmail.com",
            "role": "finance",
            "status": "Active",
            "verified": false
        },
        {
            "_id" : "pppwsdf",
            "name": "Karin Michel",
            "email": "karin@gmail.com",
            "role": "picker",
            "status": "Active",
            "verified": false
        },
        {
            "_id" : "asdgad",
            "name": "Mario Bros",
            "email": "mario@gmail.com",
            "role": "admin",
            "status": "Active",
            "verified": false
        }
    ]

    const columns: TableColumn<IDataRowTeams>[] = [
        {
            name: 'NO',
            width: '70px',
            cell: (row, index) => (
                <p>{index + 1}</p>
            )
        },
        {
            name: 'ID',
            selector: row => row._id,
            width: '200px'

        },
        {
            name: 'NAME',
            selector: row => row.name,
        },
        {
            name: 'EMAIL',
            selector: row => row.email,
        },
        {
            name: 'ROLE',
            selector: row => row.role,
        },
        {
            name: 'STATUS',
            selector: row => row.status,
        },
        {
            name: 'ACTION',
            width: '200px',
            cell: (row) => (
                <Stack direction="row" spacing={2}>
                    <Button 
                        variant="outlined" color="primary" size="small"
                    >
                        Update
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={{pt:2, pl:3, pr:3}}>
            <BreadCrumbs
                isPage={false}
                current="Teams Page"
            />
            <Box sx={{pt: 2}}>
                <h2>Users Team Management</h2>
            </Box>

            <Box sx={{pt:3}}>
                <DataTableBase 
                    columns={columns}
                    data={data}
                    // progressPending={usersuperadmin?.loading}
                />
            </Box>

        </Box>
    )
}

export default TeamsPage
