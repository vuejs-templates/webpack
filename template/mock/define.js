/**
 * @mockData
 * @author  stylehuan
 * @create  2017-02-14 11:38
 */

var interFaces = new Map();
module.exports = {
    define: {
        isProxy: false,
        domains: {
            test1: "http://hd.tcysys.uc108.org:1505"
        }
    },
    interFaces: interFaces,
    getInterFace(key){
        return interFaces.get(key);
    }
};

interFaces.set("/api/SignInUser/GetInfo", {
    "Data": {
        "MaxDay": 7,
        "SignIn": {
            "SignInConfigType": 1,
            "SignInDay": 1,
            "AwardGuid": "dd096414-16bc-4d01-a940-f55638dac834",
            "AwardCode": "21170",
            "AwardType": 2,
            "AwardNumber": 1,
            "ActiveID": "1155",
            "ActiveAwardType": 2,
            "ActiveAwardNumber": "1-2"
        },
        "SignInActive": null,
        "SignInUser": {
            "UserID": 15526,
            "LastDay": 6,
            "LastDate": 20161216,
            "LastType": 3,
            "LastAwardType": 1,
            "LastAwardNumber": 1,
            "LastAwardName": null,
            "IsSignIn": false,
            "IsCanSignIn": true,
            "IsCanLottery": true,
            "IsLottery": true,
            "IsCanShare": false,
            "IsShare": false
        },
        "Advert": [
            {
                "Sort": 1,
                "ImgUrl": "http://fdsimg.tcy365.net/Portrait/9c4a0a01-faf8-49af-ab2a-0c7ccdf35312.jpg",
                "Url": "http://www.baidu.com"
            }
        ],
        "Lucky": [
            {
                "UserName": "wenzq",
                "AwardName": "aa"
            },
            {
                "UserName": "wenzq22",
                "AwardName": "bbb"
            },
            {
                "UserName": "wenzq22",
                "AwardName": "bbb"
            },
            {
                "UserName": "wenzq22",
                "AwardName": "bbb"
            }
        ]
    },
    "Successed": true,
    "Status": 0,
    "Message": null
});