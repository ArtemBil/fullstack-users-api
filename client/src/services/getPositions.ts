import axios from 'axios';
import {PositionsDataObject} from '../types/user-types';

export default async function getPositions() {
    const {data} = await axios.get<PositionsDataObject>(`/api/positions`);

    return data;
}