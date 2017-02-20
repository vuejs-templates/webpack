/**
 * @zip
 * @author  stylehuan
 * @create  2017-02-20 11:04
 */

var path = require("path");
var zipper = require("zip-local");
var formatDate = function (date) {
    var d = new Date(date);
    var year = d.getFullYear();
    var getMonth = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
    var getDate = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    var getHours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    var getMinutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    return year + getMonth + getDate + getHours + getMinutes;
};
zipper.zip(path.join(__dirname, '../dist'), function (error, zipped) {
    console.log(error);
    if (!error) {
        zipped.compress(); // compress before exporting
        var buff = zipped.memory(); // get the zipped file as a Buffer
        // or save the zipped file to disk
        console.log();
        var date = formatDate(+new Date());
        zipped.save("./{{ name }}" + date + ".zip", function (error) {
            if (!error) {
                console.log("saved successfully");
            }
        });
    }
});
 