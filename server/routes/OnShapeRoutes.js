const express = require('express');
const partStudioRouter = require('./partStudioRoutes');
const onShapeAuth = require('../middlewares/onShapeAuth')

const router = express.Router();

router.use('/partstudios', onShapeAuth, partStudioRouter);
// router.use('/api/parts', partRouter);
// router.use('/api/elements', elementRouter);


module.exports = router;
