const CommentService = require('../services/commentService')

exports.createComment = async (req, res) => {
    try {
        const { content, author } = req.body
        const comment = await CommentService.addComment(content, author)
        return res.status(201).json({
            status: 'success',
            message: 'add comment success',
            data: comment
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'add comment fail',
            data: error
        })
    }
}

exports.getComments = async (req, res) => {
    try {
        const comments = await CommentService.getComments()
        return res.status(200).json({
            status: 'success',
            message: 'get comments success',
            data: comments
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'get comments fail',
            data: error
        })
    }
}

exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params
        const comment = await CommentService.deleteComment(id)
        return res.status(200).json({
            status: 'success',
            message: 'delete comment success',
            data: comment
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'delete comment fail',
            data: error
        })
    }
}