const fetch = require('node-fetch');
const { BASE_URL } = process.env;

const getGLTFData = async (req, res) => {
    console.log(req.onShapeToken)
    try {
        const { did, wvm, wvmid, eid } = req.params;

        const options = {
            headers: {
                Authorization: req.onShapeToken
            }
        };

        const response = await fetch(`${BASE_URL}/partstudios/d/${did}/${wvm}/${wvmid}/e/${eid}/gltf`, options);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching GLTF data from Onshape API:', error);
        res.status(500).json({ error: error });
    }
};

const getBoundingBoxes = async (req, res) => {
    try {
        const { did, wvm, wvmid, eid } = req.params;

        const options = {
            headers: {
                Authorization: req.onShapeToken
            }
        };

        const response = await fetch(`${BASE_URL}/partstudios/d/${did}/${wvm}/${wvmid}/e/${eid}/boundingboxes`, options);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching boundingboxes data from Onshape API:', error);
        res.status(500).json({ error: error });
    }
};

const getMassproperties = async (req, res) => {
    try {
        const { did, wvm, wvmid, eid } = req.params;

        const options = {
            headers: {
                Authorization: req.onShapeToken
            }
        };

        const response = await fetch(`${BASE_URL}/partstudios/d/${did}/${wvm}/${wvmid}/e/${eid}/massproperties`, options);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching massproperties data from Onshape API:', error);
        res.status(500).json({ error: error });
    }
};

module.exports = { getGLTFData, getBoundingBoxes, getMassproperties };
