import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import {
    Alert,
    Card,
    CardContent, CircularProgress, FormControl, FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent, styled,
    TextField
} from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import createUser from '../../services/createUser';
import {AxiosError} from 'axios';
import {
    DataFieldType,
    PositionsDataObject,
    UserCreateData,
    UserValidationErrorFields
} from '../../types/user-types';
import {CloudUpload} from '@mui/icons-material';
import getPositions from '../../services/getPositions';
import Box from '@mui/material/Box';


const VisuallyHiddenInput = styled('input')({
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const UserCreateForm = () => {
    const [userData, setUserData] = useState<UserCreateData>({});
    const [errors, setErrors] = useState<UserValidationErrorFields>();
    const [errorMessage, setErrorMessage] = useState('');
    const [positions, setPositions] = useState<PositionsDataObject>();
    const [loading, setLoading] = useState(false);
    const [photoName, setPhotoName] = useState('');

    useEffect(() => {
        (async () => {
            const positions = await getPositions();
            setPositions(positions);
        })();
    }, []);

    const handleChange = (type: DataFieldType) => (event: SelectChangeEvent | React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>) => {

        setUserData((prevState) => {
            if (type === 'photo') {
                const files = (event.target as HTMLInputElement).files;
                if (files && files.length > 0) {
                    prevState[type] = files[0];
                    setPhotoName(files[0].name)
                }
            } else {
                prevState[type] = event.target.value;
            }

            return prevState;
        })
    };

    const handleCreate = async () => {
        try {
            setLoading(true);
            setErrors({});
            await createUser(userData);
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                setErrors(e.response.data.errors);
                setErrorMessage(e.response.data.message);
            } else {
                console.error(e);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Paper sx={{mt: 12}}>
            <Grid>
                <Card style={{maxWidth: 450, padding: '20px 5px', margin: '0 auto'}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            Create a user
                        </Typography>

                        {errorMessage && !errors ? (
                            <Alert severity="error" sx={{mb: 2}}>{errorMessage}</Alert>
                        ) : null}

                        <form>
                            <Grid container spacing={1}>
                                <Grid xs={12} item>
                                    <InputLabel id="demo-simple-select-label" sx={{textAlign: 'left', pb: 0.5}}>Image
                                        photo</InputLabel>
                                    <FormControl fullWidth error={!!errors?.photo?.length}>
                                        <Button
                                            component="label"
                                            variant="contained"
                                            tabIndex={-1}
                                            startIcon={<CloudUpload/>}
                                        >
                                            Upload image
                                            <VisuallyHiddenInput type="file" onChange={handleChange('photo')} />
                                        </Button>
                                        {photoName ? <Box sx={{textAlign: 'left', mt: 0.5}}>Selected photo: {photoName}</Box> : null}
                                        <FormHelperText sx={{m: 1, marginInline: 0}}>
                                            {errors?.photo?.map(error => (<div>{error}</div>))}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} item>
                                    <FormControl fullWidth error={!!errors?.name?.length}>
                                        <TextField
                                            placeholder="Enter name"
                                            label="Name"
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange('name')}

                                        />
                                        <FormHelperText sx={{m: 1, marginInline: 0}}>
                                            {errors?.name?.map(error => (<div>{error}</div>))}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth error={!!errors?.email?.length}>
                                        <TextField
                                            type="email"
                                            placeholder="Enter email"
                                            label="Email"
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange('email')}
                                        />
                                        <FormHelperText
                                            sx={{m: 1, marginInline: 0}}>{errors?.email?.map(error => (
                                            <div>{error}</div>))}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth error={!!errors?.phone?.length}>
                                        <TextField
                                            type="tel"
                                            placeholder="Enter phone number"
                                            label="Phone"
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange('phone')}

                                        />
                                        <FormHelperText
                                            sx={{m: 1, marginInline: 0}}>{errors?.phone?.map(error => (
                                            <div>{error}</div>))}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                {positions?.positions ? (
                                    <Grid item xs={12}>
                                        <FormControl error={!!errors?.position_id?.length} fullWidth>
                                            <InputLabel id="demo-simple-select-label">Positions</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Education"
                                                onChange={handleChange('position_id')}
                                                fullWidth
                                            >
                                                {positions.positions.map(position => (
                                                    <MenuItem key={position.id} value={position.id}>{position.name}</MenuItem>
                                                ))}
                                                <MenuItem value="15">Test</MenuItem>
                                            </Select>
                                            <FormHelperText
                                                sx={{m: 1, marginInline: 0}}>{errors?.position_id?.map(error => (
                                                <div>{error}</div>))}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                ) : null}
                                <Grid item xs={12}>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        fullWidth
                                        onClick={handleCreate}
                                        disabled={loading}
                                    >
                                        {loading ? <CircularProgress size="25px" sx={{color: 'grey'}}/> : 'Create'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Paper>
    );
};

export default UserCreateForm;