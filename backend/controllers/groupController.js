const Groups = require("../models/groupModel");

const createGroup = async (req,res) => {
    const {groupname,username} = req.body;
    if(!groupname || !username || username.length ===0 || groupname.length == 0 ){
        return res.status(401).json({ message: 'both fields are required' });
    }
    const data = await Groups.findOne({
        groupName : groupname
    });
    if(data){
        return res.status(401).json({ message: 'group Name already exists' });
    }
    let accesscode;
    while(1){
        accesscode = (Math.floor(100000 + Math.random() * 900000)).toString();
        const val = await Groups.findOne({accessCode:accesscode});
        if(!val)break;
    }
    try{
        const newGroup = await Groups.create({
            groupName : groupname,
            faculty : username,
            accessCode : accesscode
        });
        return res.status(200).json({message: 'Group created', group: newGroup });
    }catch(err){
        console.log("mongodb insert one failed" + err.message);
        return res.status(401).json({ message: 'server error' });
    }
}

const joinGroup = async (req,res) => {
    
}

const userGroups = async (req,res) => {
    
}

const getQuestion = async (req,res) => {
    
}

const postQuestion = async (req,res) => {
    
}

const updateQuestion = async (req,res) => {
    
}

const deleteQuestion = async (req,res) => {
    
}

module.exports = {createGroup, joinGroup, userGroups,getQuestion, postQuestion, updateQuestion, deleteQuestion};