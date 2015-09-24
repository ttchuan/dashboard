var Report = {
  aggcount:{
    groupby:{
      type1:function (data) {
        groupObj = createGroupObj(data[0].count3)
        for (var i = 0; i < list.length; i++) {
          groupObjData(groupObj, data[i].count3);
          categories[0].category.push({
            "label": data[i].key
          })
        };
        datasetArr = dataSetPush(groupObj)
      },
      type2:function (data) {
        groupObj = createGroupObj(list[0].count3.values)
        for (var i = 0; i < list.length; i++) {
          groupObjData(groupObj, list[i].count3.values);
          categories[0].category.push({
            "label": list[i].key
          })
        };
        datasetArr = dataSetPush(groupObj)
      },
      type3:function () {
        groupObj = createGroupObj(list[0].count3.buckets)
        for (var i = 0; i < list.length; i++) {
          groupObjData(groupObj, list[i].count3.buckets);
          categories[0].category.push({
            "label": list[i].key
          })
        };
      }
    },
    normal:{
      type1:function (data) {
        for (i in list) {
        this.chartData.push({
            label: list[i].key,
            toolText: list[i].key + ":" + (list[i].doc_count || list[i].value),
            value: (list[i].doc_count || list[i].value)
          });
        }
      }
    }
  },
  aggdatehits{
    normal:{
      type1:function (data) {
        for (var i = 0; i < list.length; i++) {
          var datestr = new Date(list[i].key);
          var fmtDateStr = moment(datestr).format('YYYY-MM-DD HH:mm');
          infoStr = settings.renderAt + "&" + type + "&" + panelId + "&" + fmtDateStr;
          this.chartData.push({
            label: "",
            toolText: fmtDateStr + "," + list[i].doc_count + "条日志",
            value: list[i].doc_count,
            link: "j-linkHandle-" + infoStr + ""
          });
        };
      }
    }
  },
  aggdatehitstats:{
    groupby:{
      type1:function (data) {
        groupObj = createGroupObj(data[0].count3.buckets[0].count4)
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data[i].count3.buckets.length; j++) {
            groupObjData(groupObj, data[i].count3.buckets[j].count4);
          };
          categories[0].category.push({
            "label": data[i].key
          })
        };
        datasetArr = dataSetPush(groupObj);
      },
      type2:function (data) {
        groupObj = createGroupObj(data[0].count3.buckets[0].count4.values)
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data[i].count3.buckets.length; j++) {
            groupObjData(groupObj, data[i].count3.buckets[j].count4.values);
          };
          categories[0].category.push({
            "label": data[i].key
          })
        };
        datasetArr = dataSetPush(groupObj);
      },
      type3:function (data) {
        for (var i = 0; i < list.length; i++) {
          label = list[i].key.toString();
          for (var j = 0; j < list[i].count3.buckets.length; j++) {
            var key = list[i].count3.buckets[j].key;
            var timeformat = moment(key).format('YYYY-MM-DD HH:mm');
            if (!this[key]) {
              this[key] = {
                "seriesname": timeformat,
                "data": []
              }
            };
            for (var x = 0; x < list[i].count3.buckets[j].count4.buckets.length; x++) {
              var term = list[i].count3.buckets[j].count4.buckets[x].key;
              var termCount = list[i].count3.buckets[j].count4.buckets[x].doc_count;
              this[key].data.push({
                label: list[i].count3.buckets[j].count4.buckets[x].key,
                toolText: label + "," + timeformat + ",单词\"" + term + "\":" + termCount + "条日志",
                value: list[i].count3.buckets[j].count4.buckets[x].doc_count
              })
            };
            if (i == list.length - 1) {
              datasetArr.push(this[key]);
            };
          }
          categories[0].category.push({
            "label": label
          })
        };
      }
    },
    normal:{
      type1:function (data) {
        groupObj = createGroupObj(data[0].count3)
        for (var i = 0; i < data.length; i++) {
          var dateFormat = moment(data[i].key).format('YYYY-MM-DD HH:mm')
          groupObjData(groupObj, data[i].count3);
          categories[0].category.push({
            "label": dateFormat
          })
        };
        datasetArr = dataSetPush(groupObj)
      },
      type2:function (data) {
        groupObj = createGroupObj(data[0].count3.values)
        for (var i = 0; i < data.length; i++) {
          var dateFormat = moment(data[i].key).format('YYYY-MM-DD HH:mm');
          groupObjData(groupObj, data[i].count3.values);
          categories[0].category.push({
            "label": dateFormat
          })
        };
        datasetArr = dataSetPush(groupObj)
      },
      type3:function (data) {
        for (var i = 0; i < data.length; i++) {
          groupObj = createGroupObj(data[i].count3.buckets, groupObj);
        };
        for (var i = 0; i < data.length; i++) {
          var dateFormat = moment(data[i].key).format('YYYY-MM-DD HH:mm');
          groupObjData(groupObj, data[i].count3.buckets);
          categories[0].category.push({
            "label": dateFormat
          })
        };
        datasetArr = dataSetPush(groupObj);
      }
    }
  },
}
function Report(obj) {
  obj{
    data:{},
    postData:{},
    settings:{},
    chartType:"",
    reportType"aggcount",
    group:"groupby",//"normal"
    countType:1//2,3
  }
  var reportType = obj.reportType;
  var group = obj.group;
  var countType = 'type'+obj.countType;
  this.chartData = [];
  var datasetArr = [];
  var groupObj = {};
  var dataObjArr = [];
  var categories = [{
    "category": []
  }];
  var report_wrop = settings.renderAt;
  this.chartObj = {
      "type": obj.chartType, //mscolumn3d
      "renderAt": postData.renderAt,
      "width": "100%",
      "height": "400",
      "dataFormat": "json",
      "dataSource": {
        "chart": {
          "paletteColors": "#0099FF,#009899,#9BCDFF,#0066C8,#61CFFF,#01CBFD",
          "pieRadius": 140,
          "pieSliceDepth": 30,
          "caption": postData.title,
          "subCaption": postData.description,
          "subcaptionFontSize": "8",
          "yAxisName": this.yAxisName,
          "labelFontSize": 12,
          "showLegend": 0,
          "exportEnabled": "1",
          "theme": "fint",
          "showPercentValues": "1",
          "showPercentInTooltip": "1",
          "showLegend": "1",
          "decimals": "1",
          "useDataPlotColorForLabels": "1",
        },
        "data": this.chartData
      }
  };
  (Report[reportType][group][countType](obj.data))(groupObj,groupObjData,categories,datasetArr);
  this.chartObj.type = groupType(this.chartObj.type)
  this.chartObj.dataSource = groupDatasource(categories, datasetArr);
  this.chartObj = $.extend(true, this.chartObj, settings);
}