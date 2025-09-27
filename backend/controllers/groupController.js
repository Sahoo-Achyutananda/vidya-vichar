const Groups = require("../models/groupModel");
const Users = require('../models/userModel');

const createGroup = async (req,res) => {
    const {groupname,username} = req.body;
    if(!groupname || !username || !username.trim() || !groupname.trim() ){
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
        await Users.findOneAndUpdate(
            {username:username},
            {$push:{created_classes:newGroup.groupName}}
        );
        return res.status(200).json({message: 'Group created', group: newGroup });
    }catch(err){
        console.log("mongodb operation failed" + err.message);
        return res.status(401).json({ message: 'server error' });
    }
}

const joinGroup = async (req,res) => {
    const {username,groupname,accesscode} = req.body;
    if(!groupname || !username || !username.trim() || !groupname.trim() || !accesscode || !accesscode.trim() ){
        return res.status(401).json({ message: 'both fields are required' });
    }
    const data = await Groups.findOne({
        groupName : groupname
    });
    if(!data){
        return res.status(401).json({ message: 'group Name doesnot exists' });
    }
    if(data.accessCode === accesscode){
        try{
            await Users.findOneAndUpdate(
                {username:username},
                {$push:{joined_classes:groupname}}
            );
            return res.status(200).json({message: 'joined successfully'});
        }catch(err){
            console.log("mongodb operation failed" + err.message);
            return res.status(401).json({ message: 'server error' });
        }
    }
    else{
        return res.status(401).json({ message: 'access code is incorrect' });
    }
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