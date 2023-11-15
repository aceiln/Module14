const User = require('../models/user');
const Article = require('../models/article');
const Comment = require('../models/comment');

User.hasMany(Article, {
    foreignKey: 'article_id',
    onDelete: 'CASCADE'
});

Article.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Article.hasMany(Comment, {
    foreignKey: 'article_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Article, {
    foreignKey: 'article_id'
});

module.exports = { User, Article, Comment };