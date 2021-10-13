const Message = require("../models/Message")


const messageCtrl = {
    
    newMessage: async(req, res) => {
        const newMess = new Message(req.body)
        try {
            const savedMessage = await newMess.save();
            res.json(savedMessage);
        } catch (error) {
            res.status(500).json({msg: error.messsage})
        }
    },

    getMessages: async(req, res) => {
        try {
            const msgs = await Message.find({
                conversationId: req.params.conversationId,
            })
            res.json(msgs)
        } catch (error) {
            res.status(500).json({msg: error.messsage})
        }
    }
}

module.exports = messageCtrl;