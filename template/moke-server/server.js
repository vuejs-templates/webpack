var express = require('express');
var app = express();

app.get('/getPermission', function (req, res) {
  res.send({
    "data": [
      {
        "code": "INDEX",
      },
      {
        "code": "EXPENSE_MANAGEMENT_APPLY",
        "operates": [
          {
            "code": "check",
            "name": "查看明细",
          },
          {
            "code": "add",
            "name": "新增",
          },
          {
            "code": "export",
            "name": "Excel导出",
          },
          {
            "code": "del",
            "name": "删除",
          },
          {
            "code": "column-edit",
            "name": "编辑",
          },
          {
            "code": "column-check",
            "name": "查看",
            "metaData": "{\"a\": 1}"
          }
        ]
      },
      {
        "code": "EXPENSE_MANAGEMENT_APPLY_ADD"
      },
      {
        "code": "EXPENSE_MANAGEMENT_EXAMINE"
      },
      {
        "code": "EXPENSE_MANAGEMENT_APPLY_DETAILS"
      }
    ],
    "description": "success",
    "errorcode": 200,
    "page": null,
    "success": true
  });
});

app.get('/test/order/metadata/tb_req_goodsDTO', function (req, res) {
  res.send({
    "head": [
      {
        "name": "goodsCode",
        "nameCN": "商品代码",
        "canQuery": true,
        "visible": true,
        "readOnly": true
      },
      {
        "name": "goodsName",
        "nameCN": "商品名称",
        "type": "枚举",
        "canQuery": true,
        "visible": true,
        "constraintParams": "[{\"label\": \"label1\", \"value\": 1}]"
      },
      {
        "name": "goodsImg",
        "nameCN": "商品图片",
        "visible": true,
        "readOnly": true
      }
    ],
    "tableMultiSelect": true
  });
});

app.post('/test/order/tb_req_goodsService/findBy', function (req, res) {
  res.send({
    "resultCode": 0,
    "data": {
      "content": [
        {
          "goodsName": "asdad",
          "goodsCode": "143423",
        },
        {
          "goodsName": "sdadsaada",
          "goodsCode": "1314123",
        },
        {
          "goodsName": "sdada",
          "goodsCode": "143423",
        },
        {
          "goodsName": "sdada",
          "goodsCode": "134123",
        },
        {
          "goodsName": "sdada",
          "goodsCode": "134123",
        },
        {
          "goodsName": "sdada",
          "goodsCode": "134123",
        },
        {
          "goodsName": "sdada",
          "goodsCode": "134123",
        },
        {
          "goodsName": "sdada",
          "goodsCode": "134123",
        },
        {
          "goodsName": "sdada",
          "goodsCode": "134123",
        },
        {
          "goodsName": "sdada",
          "goodsCode": "134123",
        },
        {
          "goodsName": "sdada",
          "goodsCode": "134123",
        },
        {
          "goodsName": "sdada",
          "goodsCode": "134123",
        },
        {
          "goodsName": "sdada",
          "goodsCode": "134123",
        },
        {
          "goodsName": "sdada",
          "goodsCode": "134123",
        },
        {
          "goodsName": "sdada",
          "goodsCode": "134123",
        },
        {
          "goodsName": "sdada",
          "goodsCode": "134123",
        },
        {
          "goodsName": "sdada",
          "goodsCode": "134123",
        },
        {
          "goodsName": "sdada",
          "goodsCode": "134123",
        },
        {
          "goodsName": "sdada",
          "goodsCode": "134123",
        }
      ],
      "totalObj": {
        "goodsName": "测试总计"
      }
    }
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
