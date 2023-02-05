import {format, formatRelative} from "date-fns";
import {enGB} from "date-fns/locale";

export const dbDateFormat = "Y-MM-dd"
export const dateFormat = "d MMM"
export const groupBy = (items, key) => items.reduce(
    (result, item) => ({
        ...result,
        [item[key]]: [
            ...(result[item[key]] || []),
            item,
        ],
    }),
    {},
);
export const _groupBy = (consolidatedHeroes, groupBy) => {
    return Object.keys(consolidatedHeroes).reduce((groups, key, index) => {
        const currentHero = consolidatedHeroes[key];
        let groupId = currentHero[groupBy];
        if (!groups[groupId]) {
            groups[groupId] = [];
        }
        groups[groupId].push(currentHero);
        return groups;
    }, []);
};

export const sortF = (a, b, sortBy) => {
    if (!a && !b) {
        return false
    }
    return a[sortBy] > b[sortBy] ? 1 : -1
}


export function sortGroup(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}

function getFormat(date, token, include_day) {

    let format = "";
    let formatRelativeLocale = {}
    if (!include_day) {
        format = dateFormat + (date.getFullYear() === new Date().getFullYear() ? '' : ', YYY');

        formatRelativeLocale = {
            lastWeek: format,
            yesterday: "'Yesterday'",
            today: "'Today'",
            tomorrow: "'Tomorrow'",
            nextWeek: format,
            other: format,
        }

    } else {
        format = dateFormat + (date.getFullYear() === new Date().getFullYear() ? '' : ', YYY') + " ‧ EEEE";

        formatRelativeLocale = {
            lastWeek: format,
            yesterday: "'Yesterday' ‧ EEEE",
            today: "'Today' ‧ EEEE",
            tomorrow: "'Tomorrow' ‧ EEEE",
            nextWeek: format,
            other: format,
        }

    }
    return formatRelativeLocale[token]
}

Date.prototype.isValid = function () {
    return this instanceof Date && isFinite(this.getTime())
};

export function formatRelativeDate(date, include_day) {


    date = new Date(date);

    if (!date.isValid()) {
        return "No date"
    }

    const locale = {
        ...enGB,
        formatRelative: (token) => getFormat(date, token, include_day)//formatRelativeLocale[token],
    };
    return formatRelative(date, new Date(), {locale});
}

export function formatDate(date, include_day) {

    return formatRelativeDate(date, include_day);
}

export const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}