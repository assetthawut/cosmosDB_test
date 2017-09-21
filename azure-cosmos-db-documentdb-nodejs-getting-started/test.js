"use strict";
var documentClient = require("documentdb").DocumentClient;
var config = require("./config");
var url = require("url");

var client = new documentClient(config.endpoint, { "masterKey": config.primaryKey });
var HttpStatusCodes = {NOTFOUND:404};
var databaseUrl = `dbs/${config.database.id}`;
//var databaseUrl = `dbs/${config.database.id}`;
var collectionUrl = `${databaseUrl}/colls/${config.collection.id}`;
var collectionUrl2 = `${databaseUrl}/colls/${config.collection2.id}`;

function getDatabase(){

    console.log(`Getting database:\n${config.database.id}\n`);
  //  console.log(config);
  //  console.log(url);
  //  console.log(client);

    return new Promise((resolve,reject)=>{
        client.readDatabase(databaseUrl,(err,result)=>{
            client.createDatabase(config.database, (err, created) => {
                if (err) reject(err)
                else resolve(created);
            });
        })
    });
}


// function cleanup() {
//     console.log(`Cleaning up by deleting database ${config.database.id}`);

    
// }

function cleanup() {
    console.log(`Cleaning up by deleting database ${config.database.id}`);
    console.log(databaseUrl);

    return new Promise((resolve, reject) => {
        client.deleteDatabase(databaseUrl, (err) => {
            if (err) reject(err)
            else resolve();
        });
    });
}


// เพิ่ม Collection  
function createCollectionKab() {
    console.log(`Getting collection:\n${config.collection.id}\n`);

    return new Promise((resolve, reject) => {
        client.readCollection(collectionUrl, (err, result) => {
            if (err) {
                if (err.code == HttpStatusCodes.NOTFOUND) {
                    client.createCollection(databaseUrl, config.collection, { offerThroughput: 400 }, (err, created) => {
                        if (err) reject(err)
                        else resolve(created);
                    });
                } else {
                    reject(err);
                }
            } else {
                resolve(result);
            }
        });
    });
}



function newCollect(){
    console.log(`Create New Collection: ${config.collection2.id}`);
    return new Promise((resolve,reject) =>{
        client.readCollection(collectionUrl2,(err,result)=>{
            client.createCollection(databaseUrl, config.collection2, { offerThroughput: 400 }, (err, created) => {
                if (err) reject(err)
                else resolve(created);
            });
        }); 
    });
}


function getFamilyDocument(document) {
    let documentUrl = `${collectionUrl}/docs/${document.id}`;
    console.log(`Getting document:\n${document.id}\n`);

    return new Promise((resolve, reject) => {
        client.readDocument(documentUrl, (err, result) => {
            if (err) {
                if (err.code == HttpStatusCodes.NOTFOUND) {
                    client.createDocument(collectionUrl, document, (err, created) => {
                        if (err) reject(err)
                        else resolve(created);
                    });
                } else {
                    reject(err);
                }
            } else {
                resolve(result);
            }
        });
    });
};







function addDocument(document){
    let documentUrl = `${collectionUrl}/docs/${document.id}`;
    console.log(`${documentUrl}`);
    console.log(`${collectionUrl}`);
    

    return new Promise((resolve,reject)=>{
        client.createDocument(collectionUrl2,document,(err,created)=>{
            if (err) reject(err)
            else resolve(created);
        });
    });
    
}



function deleteDoc(document){
         let documentUrl = `${collectionUrl2}/docs/${document.id}`;
         console.log(documentUrl);

         return new Promise((resolve,reject)=>{
              client.deleteDocument(documentUrl,(err,result)=>{
                   if(err) reject(err);
                   else resolve(result);

              });
         });
    

};




function updateDoc(document){ 
    let documentUrl = `${collectionUrl2}/docs/${document.id}`;
    console.log(documentUrl);
    console.log(document);
    document.position = "Ex-manager XV >>>";

    return new Promise((resolve,reject) =>{
        client.replaceDocument(documentUrl,document,(err,result)=>{
                if(err) reject(err);
                else{
                    resolve(result);
                }
        });
    });
}



function updateDocSuper(document){ 
    let documentUrl = `${collectionUrl2}/docs/${document.id}`;
    console.log(documentUrl);
    console.log(document);
    document.id       = "Steve";
    document.position = "Ex-manager XV >>>";
    document.name     = "Steve Job";

    return new Promise((resolve,reject) =>{
        client.replaceDocument(documentUrl,document,(err,result)=>{
                if(err) reject(err);
                else{
                    resolve(result);
                }
        });
    });
}

function readColl(){
    //client.readCollection
    console.log(collectionUrl2);
    console.log(`Querying collection through  index: ${config.collection.id}`);
    console.log("collection 2 "+collectionUrl);
    return new Promise((resolve,reject)=>{
        console.log(resolve);
        console.log(reject);
       // client.queryDocuments(collectionUrl2,'SELECT VALUE r.children FROM root r WHERE r.lastName = "Andersen"').toArray((err, results) => {
        client.queryDocuments(collectionUrl2,'SELECT VALUE r.children FROM root r WHERE r.lastName = "Andersen"').toArray((err, results) => { 
            if (err) reject(err)
            else {
                for (var queryResult of results) {
                    let resultString = JSON.stringify(queryResult);
                    console.log(`\tQuery returned ${resultString}`);
                }
                console.log();
                resolve(results);
            }
        });
    });
}


// Test 
function queryCollection() {
    console.log(`Test Querying collection through index:\n${config.collection2.id}`);

    return new Promise((resolve, reject) => {
        client.queryDocuments(
            collectionUrl2,
            'SELECT * FROM test '
        ).toArray((err, results) => {
            if (err) reject(err)
            else {
                for (var queryResult of results) {
                    let resultString = JSON.stringify(queryResult);
                    console.log(`\tQuery returned ${resultString}`);
                }
                console.log();
                resolve(results);
            }
        });
    });
};



//Test Manual Query

function manualQ(){
    console.log("Mauanl Query");
    console.log(collectionUrl2);
    return new Promise((resolve,reject)=>{
        client.queryDocuments("dbs/GoingMerryDB4/colls/ManagerName",'SELECT VALUE c From root c where c.id = "Steve"').toArray((err,results)=>{
            if(err) reject(err)
            else{
                for(var queryResult  of results){
                    let resultString = JSON.stringify(queryResult);
                    console.log(`\tQuery returned ${resultString}`);
                }
                console.log();
                resolve(results);
            }
        });
    });
};



/*
    Run
*/

//getDatabase().then(()=> cleanup());

//cleanup();

//newCollect();

//getDatabase();

//getFamilyDocument(config.documents.Ferguson);

//addDocument(config.documents.Klopp);

//deleteDoc(config.documents.Klopp);

//addDocument(config.documents.Klopp);

//updateDocSuper(config.documents.Klopp);

//queryCollection();

manualQ();