const Groups = require("../models/groupModel");
const Users = require('../models/userModel');

const createGroup = async (req,res) => {
    const {groupname,username} = req.body;
    if(!groupname || !username || !username.trim() || !groupname.trim() ){
        return res.status(401).json({ message: 'both fields are required' });
    }
    try{
        const data = await Groups.findOne({
            groupName : groupname
        });
    }catch(err){
        console.log("mongodb operation failed" + err.message);
        return res.status(401).json({ message: 'server error' });
    }
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
        return res.status(401).json({ message: 'All fields are required' });
    }
    try{
        const data = await Groups.findOne({
            groupName : groupname
        });
    }catch(err){
        console.log("mongodb operation failed" + err.message);
        return res.status(401).json({ message: 'server error' });
    }
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
    try{
        const {username} = req.body;
        if(!username || !username.trim() ){
            return res.status(401).json({ message: 'field are required' });
        }
        const data = await Users.findOne({
            username : username
        });
        if(!data){
            return res.status(401).json({ message: 'username doesnot exists' });
        }
        res.status(200).json({
            created_classes : data.created_classes,
            joined_classes : data.joined_classes
        });
    }catch(err){
        return res.status(401).json({ message: 'server error' });
    }
}

const getQuestion = async (req,res) => {
    try{
        const {groupid} = req.params;
        const data = await Groups.findOne({
            _id : groupid
        });
        if(!data){
            return res.status(401).json({ message: 'invalid group id' });
        }
        res.status(200).json({
            groupName : data.groupName,
            faculty : data.faculty,
            accessCode : data.accessCode,
            questions : data.questions
        });
    }catch(err){
        return res.status(401).json({ message: 'server error' });
    }
}

const postQuestion = async (req,res) => {
    try{
        const {groupid} = req.params;
        const data = await Groups.findOne({
            _id : groupid
        });
        if(!data){
            return res.status(401).json({ message: 'invalid group id' });
        }
        const {question,author} = req.body;
        if(!question || !author || !question.trim() || !author.trim()){
            return res.status(401).json({ message: 'both fields are required' });
        }
        // console.log(data.faculty);
        const newQuestion = {
            author : author.trim(),
            questionText : question.trim(),
            questionTimestamp : Date.now()
        }
        await Groups.findOneAndUpdate(
            {_id : groupid},
            {$push : {questions : newQuestion}}
        );
        res.status(200).json({ message: "Question added successfully" });
    }catch(err){
        return res.status(401).json({ message: 'server error' });
    }
}

const updateQuestion = async (req,res) => {
    try{
        const {groupid,questionid} = req.params;
        const data = await Groups.findOne({
            _id : groupid
        });
        if(!data){
            return res.status(401).json({ message: 'invalid group id' });
        }
        const {answer,status} = req.body;
        if(!status){
            return res.status(401).json({ message: 'field are required' });
        }
        const updatefield = {};
        if(answer.length===0){
            updatefield["questions.$.status"] = status;
        }
        else{
            updatefield["questions.$.answerText"] = answer;
            updatefield["questions.$.status"] = "answered";
            updatefield["questions.$.answerTimestamp"] = Date.now();
        }
        const update = await Groups.findOneAndUpdate(
            {_id : groupid, "questions._id" : questionid},
            { $set: updatefield },
            { new: true }
        );
        if(!update){
            return res.status(404).json({ message: "Question not found" });
        }
        else return res.status(201).json({ message: "Question updated succesfully" });
    }catch(err){
        return res.status(401).json({ message: 'server error' });
    }
}

const deleteQuestion = async (req,res) => {
    try{
        const {groupid,questionid} = req.params;
        const data = await Groups.findOne({
            _id : groupid
        });
        if(!data){
            return res.status(401).json({ message: 'invalid group id' });
        }
        const update = await Groups.findByIdAndUpdate(
            {_id : groupid},
            { $pull: { questions: { _id: questionid } } },
            { new: true }
        );
        if(!update){
            return res.status(404).json({ message: "Question not found" });
        }
        else return res.status(201).json({ message: "Question deleted succesfully" });
    }catch(err){
        return res.status(401).json({ message: 'server error' });
    }
}

module.exports = {createGroup, joinGroup, userGroups,getQuestion, postQuestion, updateQuestion, deleteQuestion};