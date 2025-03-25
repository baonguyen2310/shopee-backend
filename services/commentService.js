const CommentModel = require('../models/commentModel')

class CommentService {
    static async addComment(content, author) {
        return await CommentModel.create({ // INSERT INTO TRONG SQL
            content: content,
            author: author
        })
    }

    static async getComments() {
        return await CommentModel.find() // SELECT * FROM 
    }

    static async deleteComment(commentId) {
        return await CommentModel.findByIdAndDelete(commentId)
    }
}

module.exports = CommentService