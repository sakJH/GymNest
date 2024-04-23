import React from 'react';
import { Typography, Box, IconButton, Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const MembershipStatus = ({ memberships, onRenew, onCancel, membershipTypes }) => {
    const getMembershipTypeName = (membershipTypeId) => {
        if (!membershipTypes) {
            return 'Načítání typů...';
        }
        const membershipType = membershipTypes.find(type => type.id === membershipTypeId);
        return membershipType ? membershipType.membershipName : 'Neznámý typ';
    };

    return (
        <Box sx={{
            marginBottom: 2,
            border: '1px solid lightgray',
            borderRadius: '8px',
            padding: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>Stav vašeho členství</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row">Typ členství</TableCell>
                            <TableCell align='center'>Začátek členství</TableCell>
                            <TableCell align='center'>Konec členství</TableCell>
                            <TableCell align='center'>Stav</TableCell>
                            <TableCell align='right'>Akce</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {memberships.map((membership) => (
                            <TableRow key={membership.id}>
                                <TableCell component="th" scope="row">{getMembershipTypeName(membership.membershipTypeId)}</TableCell>
                                <TableCell align='center'>{membership.startDate}</TableCell>
                                <TableCell align='center'>{membership.endDate}</TableCell>
                                <TableCell align='center'>{membership.status}</TableCell>
                                <TableCell align='right'>
                                    <Tooltip title="Obnovit členství">
                                        <IconButton
                                            onClick={() => onRenew(membership.id)}
                                            disabled={membership.status !== 'active'}
                                            color="primary"
                                        >
                                            <AutorenewIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Zrušit členství">
                                        <IconButton
                                            onClick={() => onCancel(membership.id)}
                                            color="error"
                                        >
                                            <CancelIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
export default MembershipStatus;