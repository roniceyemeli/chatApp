const Conversation = require("../models/Conversation")


const conversationCtrl = {
    
    //add conversation
    newConversation: async(req, res) => {
        const newConv = new Conversation({
            members: [req.body.senderId, req.body.receiverId]
        })
        try {
            const savedConv = await newConv.save();
            res.json(savedConv)
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    getConversation: async(req, res) => {
        try {
            const conv = await Conversation.find({
                members: { $in: [req.params.userId]}
            });
            res.json(conv);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    // fecth conversation from two user
    getConversationsTwoUser: async(req, res) =>{
        try {
            const conversation = await Conversation.findOne({
                members: { $all: [req.params.firstUserId, req.params.secondUserId] },
            });
            res.json(conversation)
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }
}

module.exports = conversationCtrl;