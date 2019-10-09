const MONTHS = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
}

export const parseDate = (date) => {
    const year = parseInt(date.slice(0, 4));
    const month = parseInt(date.slice(5, 7));
    const day = date.slice(8, 10);
    const hours = parseInt(date.slice(11, 13));
    const minutes = parseInt(date.slice(14, 16));
    const seconds = parseInt(date.slice(17, 19));
}