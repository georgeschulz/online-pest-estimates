//write a function called unixToDatabaseDate that takes a unix timestamp and returns a date in the format of YYYY-MM-DD HH:MM:SS
//for example, unixToDatabaseDate(1546300800) should return '2019-01-01 00:00:00'

const unixToDatabaseDate = (unix) => {
    const date = new Date(unix * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}

module.exports = {
    unixToDatabaseDate
}

