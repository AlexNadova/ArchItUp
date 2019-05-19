const mongoose = require("mongoose");
const Article = require("../models/articleModel");

// Get all articles
exports.articles_get_all = (req, res, next) => {
  Article.find()
    .select(
      "_id title author description keywords articleImages titleImage category content ownerId"
    )
    .exec()
    .then(docs => {
      console.log("From database (all users)", docs);
      const response = {
        count: docs.length,
        articles: docs.map(doc => {
          return {
            _id: doc._id,
            title: doc.title,
            author: doc.author,
            description: doc.description,
            keywords: doc.keywords,
            articleImages: doc.articleImages,
            titleImage: doc.titleImage,
            category: doc.category,
            content: doc.content,
            ownerId: doc.ownerId,
            request: {
              type: "GET",
              url: "http://localhost:4000/api/articles/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

// Create article
exports.articles_create_article = (req, res, next) => {
  const article = new Article({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    keywords: req.body.keywords,
    //articleImages: req.file.path,
    //titleImage: req.file.path,
    category: req.body.category,
    content: req.body.content,
    ownerId: req.body.ownerId
  });
  article
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created article successfully",
        createdArticle: {
          _id: result._id,
          title: result.title,
          author: result.author,
          request: {
            type: "GET",
            url: "http://localhost:4000/api/articles/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

// Get article by Id
exports.articles_get_article = (req, res, next) => {
  const id = req.params.articleId;
  Article.findById(id)
    .select(
      "_id title author description keywords articleImages titleImage category content ownerId"
    )
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID " + id });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// Update article
exports.articles_update_article = (req, res, next) => {
  // Get article Id
  const id = req.params.articleId;
  // An empty JavaScript object.
  const updateOps = {};
  // Loop through all the operations (that are requested) of the request body.
  for (const ops of req.body) {
    updateOps[ops.propTitle] = ops.value;
    updateOps[ops.propAuthor] = ops.value;
    updateOps[ops.propDescription] = ops.value;
    updateOps[ops.propKeywords] = ops.value;
    updateOps[ops.propArticleImages] = ops.value;
    updateOps[ops.propTitleImage] = ops.value;
    updateOps[ops.propCategory] = ops.value;
    updateOps[ops.propContent] = ops.value;
    updateOps[ops.propOwnerId] = ops.value;
  }
  Article.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Article updated",
        request: {
          type: "GET",
          url: "http://localhost:4000/api/articles/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.articles_delete = (req, res, next) => {
  const id = req.params.articleId;
  //Article.remove({ _id: id })
  Article.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Article deleted",
        // Don't need this
        request: {
          type: "POST",
          url: "http://localhost:4000/api/articles",
          body: { title: "String", author: "String" }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
