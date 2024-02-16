import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import getUsersList from '../../services/getUsersList';
import {UsersDataObject} from '../../types/user-types';

interface Props {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    setUsers: Dispatch<SetStateAction<UsersDataObject | undefined>>;
}

const LoadMore: React.FC<Props> = ({setPage, page, setUsers}) => {
    const [loading, setLoading] = useState(false);
    const [prevPage, setPrevPage] = useState(1);
    const handleClick = () => {
        setPrevPage(page);
        setPage(prev => ++prev);
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            const usersData = await getUsersList(page);

            if (prevPage === usersData.page) {
                setLoading(false);
                return;
            }

            setUsers(prev => {
                if (!prev) return prev;

                const users = prev.users;
                const newUsers = [...users, ...usersData.users];

                return {...usersData, users: newUsers};
            });

            setLoading(false);
        })()
    }, [page, setUsers, prevPage]);

    return loading ? <div>Loading... </div> : (
        <Button onClick={handleClick} variant="contained" sx={{mt: 3, mb: 3}}>
            Load More
        </Button>)
};

export default LoadMore;