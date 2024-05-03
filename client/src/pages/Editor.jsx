import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Editor() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [data, setData] = useState(null);
    const Navigate = useNavigate()

    useEffect(() => {
        if (!location.state) {
            return Navigate(`/products`)
        }
        const fetchData = async () => {
            const id = searchParams.get('id');
            const { elementId, wvmId, wvmOption } = location.state;
            setData(`${import.meta.env.VITE_SERVER_URL}/api/onShape/partstudios/d/${id}/${wvmOption}/${wvmId}/e/${elementId}/gltf`)
            // console.log(`${import.meta.env.VITE_SERVER_URL}/api/onShape/partstudios/${wvmOption}/${documentId}/w/${wvmId}/e/${elementId}/gltf`)
            // setData(`${import.meta.env.VITE_SERVER_URL}/api/onShape/partstudios/${wvmOption}/${documentId}/w/${wvmId}/e/${elementId}/gltf`)
            // try {
            //     const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/onShape/partstudios/${wvmOption}/${documentId}/w/${wvmId}/e/${elementId}/gltf`);
            //     setData(response.data);
            // } catch (error) {
            //     console.error('Error fetching data:', error);
            // }
        };

        fetchData();
    }, []);

    return (
        <>
            <>
                <Navbar />
                <div className='h-[80vh] flex items-center justify-center'>
                    <div className='lg-h-2/3'>
                        {data ? (
                            <model-viewer
                                auto-rotate
                                camera-controls
                                touch-action="pan-y"
                                alt="A 3D model of a sphere"
                                src={data}
                                style={{ height: '400px' }}
                            >
                            </model-viewer>
                        ) : <CircularProgress />}
                    </div>
                </div>
            </>

        </>
    );
}

export default Editor;
