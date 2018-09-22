var fs = require('fs');
var SVN = require("node.svn");
var EventEmitter = require('events').EventEmitter;
var fileUtils = require("./libs/fileUtils.js");
var fileFilter = require("./createResourceVersionFilter.js");

var config = {
    "cwd": process.cwd() + "/../",
    "username": "你的svn用户名",
    "password": "你的密码",
    "countries": "cn"
};

var exportFile = config.cwd + "resource/" + config.countries + "/config/resource_version.json";
var singleExportNum = 70;

//var jsonpatharr = [config.cwd + "resource/"+config.countries+"/config/game_ui.res.json"];
//var jsonpathcopyarr = [config.cwd + "resource/"+config.countries+"/config/game_ui.res.json"];

//提供了写多个资源json文件的方式，jsonpatharr 和 jsonpathcopyarr对应好就行。
var jsonpatharr = [config.cwd + "resource/" + config.countries + "/config/game_ui.res.json", config.cwd + "resource/" + config.countries + "/config/default.res.json", config.cwd + "resource/config/game_animation.res.json", config.cwd + "resource/config/game_com.res.json"];
var jsonpathcopyarr = [config.cwd + "resource/" + config.countries + "/config/game_ui.res.json", config.cwd + "resource/" + config.countries + "/config/default.res.json", config.cwd + "resource/config/game_animation.res.json", config.cwd + "resource/config/game_com.res.json"];


var svn = new SVN(config);
var ee = new EventEmitter();
var dataarr = [];

var allFiles = [];
var obj = {};
var dirNum = 0;
var dirNum_complate = 0;
function foreachAllFiles(root) {
    dirNum++;
    fs.readdir(root, function (err, files) {
        if (err || files.length == 0) {
            ee.emit("fileForeachComplate");
            return;
        }

        for (var i = 0, len = files.length; i < len; i++) {
            var file = files[i];
            if (file.indexOf(".DS_Store") != -1) {
                continue;
            }

            var filePath = root + "/" + file;
            var exportFilePath = filePath.replace(config.cwd, "");

            if (fileFilter.filterConfig.indexOf(exportFilePath) == -1) {
                if (!fileUtils.isDirectory(filePath)) {
                    allFiles.push(filePath);
                } else {
                    foreachAllFiles(filePath);
                }
            }

            if (i == len - 1) {
                ee.emit("fileForeachComplate");
            }
        }
    });
}

loadNum = 0;
function getJsonData() {
    var len = jsonpatharr.length;
    //读取文件
    fs.readFile(jsonpatharr[loadNum], 'utf8', function (err, data) {
        if (err) throw err;
        dataarr[loadNum] = data;
        // console.log(JSON.parse(dataarr[0]).resources[0].url)
        loadNum++;
        if (loadNum == len) {
            foreachAllFiles(config.cwd + "resource");
        } else {
            getJsonData();
        }
    });
}

function writeJosnData() {
    var len = jsonpathcopyarr.length;
    var data;
    for (var i = 0; i < len; i++) {
        data = dataarr[i];
        fs.writeFile(jsonpathcopyarr[i], data, function (err) {
            if (err) throw err;
            //console.log('It\'s saved!'); //文件被保存
        });
    }
}

function getFileVersion() {
    var dealFiles = allFiles.splice(0, singleExportNum);
    var fileNum = dealFiles.length;
    var fileNumComplate = 0;
    dealFiles.forEach(function (filePath) {

        var path = filePath.replace(config.cwd + "resource/", "");

        //修改时间版本号start
        //文件最后一次修改的时间戳做为版本号
        var curpath = fs.statSync(filePath);
        var timenum = new Date(curpath.mtime).getTime();

        changePathVer(path, timenum);
        fileNumComplate++;
        if (fileNumComplate >= fileNum) {
            if (allFiles.length == 0) {
                saveConfigFile();
            } else {
                setTimeout(getFileVersion, 100);
            }
        }
        //修改时间版本号end

        //svn版本号start
        //svn.info(filePath, function (err, info) {
        //    if(err == null){
        //        console.log(path, info.lastchangedrev);
        //		changePathVer(path,info.lastchangedrev);
        //    }else{
        //        console.log(err);
        //    }
        //    fileNumComplate++;
        //    if(fileNumComplate >= fileNum){
        //        if(allFiles.length == 0){
        //            saveConfigFile();
        //        }else{
        //            setTimeout(getFileVersion, 100);
        //        }
        //    }
        //});
        //svn版本号end
    });
}

function changePathVer(path, ver) {
    var len = jsonpatharr.length;
    // var data;
    // for (var i = 0; i < len; i++) {
    //     data = dataarr[i];
    //     data = data.toString().replace(path, path + "?v=" + ver);
    //     dataarr[i] = data;
    // }

    var dataJson;
    for (var i = 0; i < len; i++) {
        dataJson = JSON.parse(dataarr[i])
        var len1 = dataJson.resources.length
        for (var j = 0; j < len1; j++) {
            if (dataJson.resources[j].url.indexOf(path) != -1) {
                // console.log(dataJson.resources[j].url, path)
                dataJson.resources[j].url = path + "?v=" + ver;
            }
        }
        dataarr[i] = JSON.stringify(dataJson);
    }
}

function saveConfigFile() {
    //fileUtils.save(exportFile, JSON.stringify(obj));
    writeJosnData();
    console.log("生成成功");//, exportFile);
}

ee.on("fileForeachComplate", function () {
    dirNum_complate++;
    if (dirNum_complate >= dirNum) {
        getFileVersion();
    }
});

getJsonData();

//foreachAllFiles(config.cwd + "resource");

console.log("生成中，请稍等。。。");



