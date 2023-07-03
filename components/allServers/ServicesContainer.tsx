import React, { useState, useEffect } from 'react';
import ServerPage from './ServerPage/ServerPage';
import { useSelector, useDispatch } from 'react-redux';
import { receiveServerData } from '@/state/actions/serverDataActions';

const API_URL = process.env.API_URL;

const ServicesContainer = () => {
    const [historicData, setHistoricData] = useState([]);
    const serverData = useSelector((state: { serverData: any }) => state.serverData);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                console.log(data, 'data')

                dispatch(receiveServerData(data));
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
        

    }, [dispatch]);

    useEffect(() => {
        const updateHistoricData = () => {
            if (Array.isArray(serverData)) {
                setHistoricData((prevData) => [...prevData, ...serverData]);
            }
        };

        updateHistoricData();
    }, [serverData]);

    const currentData = historicData.concat(serverData);

    return (
        <div>
            <ServerPage serversData={currentData} />
        </div>
    );
};

export default ServicesContainer;