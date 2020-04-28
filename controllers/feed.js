const { validationResult} = require('express-validator/check');

exports.getPosts = (req, res, next)  => {
    res.status(200).json({
        posts: [{ 
            _id: '1',
            title: 'First Post', 
            content: 'This is a content',
            imageUrl: 'images/duck.jpg',
            creator: {
                name: 'Malinga'
            },
            createdAt: new Date()
        }]
    });
}

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            message: 'Validation failed, entered data is incorrect.',
            errors: errors.array()
        })
    }
    const title = req.body.title;
    const content = req.body.content;
    //create post in db
    res.status(201).json({
        message: 'Post created Successfully',
        post: { 
            _id: new Date().toISOString(),
            title: title, content: content,
            creator: { name: 'malonga'} ,
            createdAt: new Date()
        }
    });
}