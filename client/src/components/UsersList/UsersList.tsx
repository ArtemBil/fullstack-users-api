import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {Card, CardContent, CardHeader, CardMedia} from '@mui/material';
import LoadMore from '../LoadMore';
import getUsersList from '../../services/getUsersList';
import {UsersDataObject} from '../../types/user-types';

const UsersList: React.FC = () => {
    const [page, setPage] = useState(1);
    const [usersData, setUsersData] = useState<UsersDataObject>();
    const [numOfPages, setNumOfPages] = useState(0);
    const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);

    useEffect(() => {
        (async () => {
            const users = await getUsersList();
            setUsersData(users);
            setNumOfPages(users.total_pages);
        })()
    }, []);

    useEffect(() => {
        if (page === numOfPages) setShowLoadMoreButton(false);
    }, [usersData, numOfPages, page]);


    if (!usersData?.users.length) {
        return null;
    }

    return <>
        <Paper sx={{mt: 10}}>
            <h1>Users list</h1>
            {
                usersData.users.map(({id, name, phone, photo, email, registration_timestamp, position}) => (
                    <Card sx={{maxWidth: 1024, mt: 2, textAlign: 'left', marginInline: 'auto'}}>
                        <CardHeader>
                            <Typography variant="h5" component="div">
                                Username: {name}
                            </Typography>
                        </CardHeader>
                        <CardContent>
                            <CardMedia
                                component="img"
                                height="194"
                                image={photo}
                                alt={name}
                                sx={{objectFit: 'contain', objectPosition: 'left', borderRadius: '8px', width: 'max-content'}}
                            />

                            <Typography variant="h5" component="div">
                                {name} - (#{id})
                            </Typography>
                            <Typography sx={{fontSize: 16}}>
                                Email: {email}
                            </Typography>
                            <Typography sx={{fontSize: 16}}>
                                Phone: {phone}
                            </Typography>
                            <Typography sx={{fontSize: 16}} variant="body2">
                                Position: {position}
                            </Typography>
                            <Typography sx={{fontSize: 16}} variant="h5" component="div">
                                Created at: {new Date(registration_timestamp).toLocaleString()}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            }
            {showLoadMoreButton &&
                <LoadMore setPage={setPage} page={page} setUsers={setUsersData} />}
        </Paper>
    </>
};

export default UsersList;