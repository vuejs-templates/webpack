/**
 * @timeDown
 * @author  stylehuan
 * @create  2015-12-11 14:02
 */
var countDown = {
    cacheDate: null,
    timer: null,
    init: function (o) {
        var self = this,
            leftsecond,
            millisecond,
            startDate = o.startDate,
            endDate = o.endDate,
            cacheDate = self.cacheDate = {};

        if (startDate > endDate) return false;

        leftsecond = Math.ceil((endDate - startDate) / 1000);
        cacheDate.days = parseInt(leftsecond / 3600 / 24);
        cacheDate.hours = parseInt((leftsecond / 3600) % 24);
        cacheDate.minute = parseInt((leftsecond / 60) % 60);
        cacheDate.seconds = parseInt(leftsecond % 60);
        cacheDate.leftsecond = millisecond = leftsecond;

        self.emit(o.runIngFn);

        var func = function () {
            cacheDate.leftsecond -= 1;
            self.emit(o.runIngFn);
            if (cacheDate.leftsecond == 0) {
                clearTimeout(self.timer);
                self.timer = null;
                o.doneFn();
                return;
            }
            self.timer = setTimeout(func, 1000);
        };

        func();
    },
    emit: function (fn) {
        var forMat = this._toLowerTime();
        var _date = {
            days: forMat.days,
            hours: forMat.hours,
            minute: forMat.minute,
            seconds: forMat.seconds
        };
        fn(_date);
    },
    _toLowerTime: function () {
        var self = this,
            cacheDate = self.cacheDate,
            millisecond = cacheDate.leftsecond,
            days = parseInt(millisecond / 3600 / 24),
            hours = parseInt((millisecond / 3600) % 24),
            minute = parseInt((millisecond / 60) % 60),
            seconds = parseInt(millisecond % 60);

        days = days < 100 ? '0' + days : days;
        hours = hours < 10 ? '0' + hours : hours;
        minute = minute < 10 ? '0' + minute : minute;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return {
            days: days,
            hours: hours,
            minute: minute,
            seconds: seconds
        }
    }
};
var TimeDown = function (options) {
    var startDate = new Date(options.startDate),
        endDate = new Date(options.endDate),
        OBJECT = Object.prototype.toString,
        runIngFn = options.runIngFn || function () {
            },
        doneFn = options.doneFn || function () {
            };

    if (startDate == 'undefined' || endDate == 'undefined') return;

    if (OBJECT.call(startDate) !== '[object Date]' || OBJECT.call(endDate) !== '[object Date]') return;

    startDate = +new Date(startDate);
    endDate = +new Date(endDate);
    var o = {
        startDate: startDate,
        endDate: endDate,
        runIngFn: runIngFn,
        doneFn: doneFn
    };
    if (startDate > endDate) return;
    countDown.init(o);
};
TimeDown.prototype = {
    destroy: function () {
        clearTimeout(countDown.timer);
        countDown.timer = null;
        countDown.cacheDate = null;
    }
};
export default TimeDown;
