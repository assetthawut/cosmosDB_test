var config = {}

config.endpoint = "https://cosmosship.documents.azure.com";
config.primaryKey = "aMxcIVHF0tcUiUqjNH2tLJRwSm2COs55hvp6WhQEm9AEyA7N4ZAxLKEcpdl1LRWwV0QjDLiY1l7iaUTT9vii2Q==";

config.database = {
    "id": "GoingMerryDB4"
};

config.collection = {
    "id": "FamilyColl"
};

config.collection2 = {
    "id": "ManagerName"
}

config.documents = {
    "Andersen": {
        "id": "Anderson.1",
        "lastName": "Andersen",
        "parents": [{
            "firstName": "Thomas"
        }, {
                "firstName": "Mary Kay"
            }],
        "children": [{
            "firstName": "Henriette Thaulow",
            "gender": "female",
            "grade": 5,
            "pets": [{
                "givenName": "Fluffy"
            }]
        }],
        "address": {
            "state": "WA",
            "county": "King",
            "city": "Seattle"
        }
    },
    "Wakefield": {
        "id": "Wakefield.7",
        "parents": [{
            "familyName": "Wakefield",
            "firstName": "Robin"
        }, {
                "familyName": "Miller",
                "firstName": "Ben"
            }],
        "children": [{
            "familyName": "Merriam",
            "firstName": "Jesse",
            "gender": "female",
            "grade": 8,
            "pets": [{
                "givenName": "Goofy"
            }, {
                    "givenName": "Shadow"
                }]
        }, {
                "familyName": "Miller",
                "firstName": "Lisa",
                "gender": "female",
                "grade": 1
            }],
        "address": {
            "state": "NY",
            "county": "Manhattan",
            "city": "NY"
        },
        "isRegistered": false
    },

    "Rooney" : {
        "id":"Rooney.1",
        "name":"เวน Rooney",
        "position":"ST,CF,CAM,CM",
        "bithdate":"14.10.1985"
    },
    "Ferguson" : {
        "id":"Alex",
        "ชื่อ":"เซอร์อเล็ก เฟอร์กูซัน"
    },
    "Mourinho":{
        "id":"Mourinho",
        "name":"Jose Mourinho",
        "position":"Manager",
        "currentteam":"Manchester United"
    },
    "Klopp":{
        "id":"Klopp",
        "name":"Jürgen Klopp",
        "position":"Thailand",
        "currentteam":"Liverpool"
    }
    
};

module.exports = config;