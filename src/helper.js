import {format, formatRelative} from "date-fns";

export const dbDateFormat = "Y-MM-dd"
export const dateFormat = "d MMM HH:mm"


function getFormat(date, include_time = true) {

    let format = "";

    include_time
        ? format = (date.getFullYear() === new Date().getFullYear() ? 'd MMM HH:mm' : 'd MMM, YYY HH:mm')
        : format = (date.getFullYear() === new Date().getFullYear() ? 'd MMM' : 'd MMM, YYY')


    // format = (date.getFullYear() === new Date().getFullYear() ? 'd MMM HH:mm' : 'd MMM, YYY HH:mm');
    return format
}

Date.prototype.isValid = function () {
    return this instanceof Date && isFinite(this.getTime())
};


export function formatDate(date, include_time) {
    date = new Date(date);

    if (!date.isValid()) {
        return ""
    }

    return format(new Date(date), getFormat(date, include_time))
}

export const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

export function isGuid(stringToTest) {
    if (stringToTest[0] === "{") {
        stringToTest = stringToTest.substring(1, stringToTest.length - 1);
    }
    var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
    return regexGuid.test(stringToTest);
}
