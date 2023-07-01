const Document = require('../modals/document');
const errorResponse = require('../utils/errorHandler');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../modals/users');

exports.getDocuments = asyncHandler(async (req, res, next) => {
    let documents = await Document.find();

    documents = documents.filter((document) => {
        if (document.admin == req.user.id || document.viewers.includes(req.user.email) || document.editors.includes(req.user.email)) {
            return document;
        }
    });


    res.status(200).json({ success: true, data: documents });
});

exports.createDocument = asyncHandler(async (req, res, next) => {
    req.body.admin = req.user.id;
    req.body.viewers = [];
    req.body.editors = [];

    const document = await Document.create(req.body);
    res.status(200).json({ success: true, data: document });
});

exports.editDocument = asyncHandler(async (req, res, next) => {
    if (!req.params._id) {
        return next(new errorResponse('Please provide document id', 400));
    }

    let document = await Document.findOne({ _id: req.params._id });

    if (!document) {
        return next(new errorResponse('No document found', 404));
    }

    if (req.user.id != document.admin && !document.editors.includes(req.user.email)) {
        return next(new errorResponse('Not authorized to edit this document', 401));
    }

    document.content = req.body.content;

    await document.save();

    res.status(200).json({ success: true, data: document });
});

exports.deleteDocument = asyncHandler(async (req, res, next) => {
    const document = await Document.findOne({ _id: req.params._id });

    if (!document) {
        return next(new errorResponse('No document found', 404));
    }

    if (req.user.id != document.admin) {
        return next(new errorResponse('Not authorized to delete this document', 401));
    }

    await document.remove();

    res.status(200).json({ success: true, data: {} });
});

exports.editDocumentAccess = asyncHandler(async (req, res, next) => {
    if (!req.params._id) {
        return next(new errorResponse('Please provide document id', 400));
    }

    let document = await Document.findOne({ _id: req.params._id });

    if (!document) {
        return next(new errorResponse('No document found', 404));
    }

    if (req.user.id != document.admin) {
        return next(new errorResponse('Not authorized to edit this document', 401));
    }

    document.accessibility = req.body.accessibility;

    await document.save();

    res.status(200).json({ success: true, data: document });
});

exports.addEditor = asyncHandler(async (req, res, next) => {

    if (!req.params._id) {
        return next(new errorResponse('Please provide document id', 400));
    }

    let document = await Document.findOne({ _id: req.params._id });

    if (!document) {
        return next(new errorResponse('No document found', 404));
    }

    if (req.user.id != document.admin) {
        return next(new errorResponse('Not authorized to edit this document', 401));
    }

    /* making a user an editor on the basis of email id*/
    const user = await User.findOne({ email: req.body.editor })

    if (!user) {
        return next(new errorResponse('No user found', 404));
    }

    if (document.editors.includes(req.body.editor)) {
        return res.status(200).json({ success: true, data: document });
    }

    if (document.viewers.includes(req.body.editor)) {
        document.viewers = document.viewers.filter((viewer) => {
            if (String(viewer) != String(req.body.editor)) {
                return viewer;
            }
        });
    }

    document.editors.push(req.body.editor);

    await document.save();

    res.status(200).json({ success: true, data: document });
});

exports.addViewer = asyncHandler(async (req, res, next) => {
    if (!req.params._id) {
        return next(new errorResponse('Please provide document id', 400));
    }

    let document = await Document.findOne({ _id: req.params._id });

    if (!document) {
        return next(new errorResponse('No document found', 404));
    }

    if (req.user.id != document.admin) {
        return next(new errorResponse('Not authorized to edit this document', 401));
    }

    const user = await User.findOne({ email: req.body.viewer })
    console.log(user);
    if (!user) {
        return next(new errorResponse('No user found', 404));
    }

    document.viewers.push(req.body.viewer);

    await document.save();

    res.status(200).json({ success: true, data: document });
});

exports.removeEditor = asyncHandler(async (req, res, next) => {
    if (!req.params._id) {
        return next(new errorResponse('Please provide document id', 400));
    }

    let document = await Document.findOne({ _id: req.params._id });

    if (!document) {
        return next(new errorResponse('No document found', 404));
    }

    if (req.user.id != document.admin) {
        return next(new errorResponse('Not authorized to edit this document', 401));
    }

    document.editors = document.editors.filter((editor) => {
        if (editor != req.body.editor) {
            return editor;
        }
    });

    await document.save();
    res.status(200).json({ success: true, data: document });
});

exports.removeViewer = asyncHandler(async (req, res, next) => {
    if (!req.params._id) {
        return next(new errorResponse('Please provide document id', 400));
    }

    let document = await Document.findOne({ _id: req.params._id });

    if (!document) {
        return next(new errorResponse('No document found', 404));
    }

    if (req.user.id != document.admin) {
        return next(new errorResponse('Not authorized to edit this document', 401));
    }

    document.viewers = document.viewers.filter((viewer) => {
        if (viewer != req.body.viewer) {
            return viewer;
        }
    });

    await document.save();

    res.status(200).json({ success: true, data: document });
});

exports.getDocument = asyncHandler(async (req, res, next) => {
    if (!req.params._id) {
        return next(new errorResponse('Please provide document id', 400));
    }

    let document = await Document.findOne({ _id: req.params._id });

    if (!document) {
        return next(new errorResponse('No document found', 404));
    }

    if (req.user.id != document.admin && !document.editors.includes(req.user.email) && !document.viewers.includes(req.user.email) && document.accessibility != 'public') {
        return next(new errorResponse('Not authorized to view this document', 401));
    }

    res.status(200).json({ success: true, data: document });
});

exports.editName = asyncHandler(async (req, res, next) => {
    if (!req.params._id) {
        return next(new errorResponse('Please provide document id', 400));
    }

    let document = await Document.findOne({ _id: req.params._id });

    if (!document) {
        return next(new errorResponse('No document found', 404));
    }

    if (req.user.id != document.admin) {
        return next(new errorResponse('Not authorized to edit this document', 401));
    }

    document.name = req.body.name;

    await document.save();

    res.status(200).json({ success: true, data: document });
});
