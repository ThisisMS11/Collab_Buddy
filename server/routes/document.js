const express = require('express');
const {protect}=require('../middleware/auth');
const router = express.Router();

const {getDocuments,createDocument,editDocument,deleteDocument,editName,getDocument,addEditor,addViewer,removeEditor,removeViewer,editDocumentAccess}=require('../controller/document');

router.post('/create',protect,createDocument);
router.get('/getYourDocuments',protect,getDocuments);
router.get('/getDocument/:_id',protect,getDocument);
router.put('/editDocument/:_id',protect,editDocument);
router.put('/editName/:_id',protect,editName);
router.put('/editDocumentAccess/:_id',protect,editDocumentAccess);
router.delete('/deleteDocument/:_id',protect,deleteDocument);
router.put('/addEditor/:_id',protect,addEditor);
router.put('/addViewer/:_id',protect,addViewer);
router.put('/removeEditor/:_id',protect,removeEditor);
router.put('/removeViewer/:_id',protect,removeViewer);

module.exports=router;