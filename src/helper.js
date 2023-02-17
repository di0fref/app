import {format, formatRelative} from "date-fns";

export const dbDateFormat = "Y-MM-dd"
export const dateFormat = "d MMM"


function getFormat(date, include_day) {

    let format = "";

    if (!include_day) {
        format = dateFormat + (date.getFullYear() === new Date().getFullYear() ? '' : ', YYY');
    } else {
        format = dateFormat + (date.getFullYear() === new Date().getFullYear() ? '' : ', YYY') + " ‧ EEEE";

    }
    return format
}

Date.prototype.isValid = function () {
    return this instanceof Date && isFinite(this.getTime())
};


export function formatDate(date, include_day) {
    date = new Date(date);

    if (!date.isValid()) {
        return ""
    }

    return format(new Date(date), getFormat(date, false))
}

export const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}
