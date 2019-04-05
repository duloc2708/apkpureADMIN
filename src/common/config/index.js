export const DEFAULT_FOLDER = '/';
export const DEFAULT_URL = 'http://localhost:1337';
export const API_URL = process.env.API_URL
export const API_DOWNLOAD_FILE = process.env.API_DOWNLOAD_FILE
export const API_URL_USER = 'https://apksafety.com/'
export const API_IMAGE = process.env.API_IMAGE
export const DEFAULT_DATE = '1900-01-01 00:00:00';
export const TIMEOUT = 0;
export const DATA_LIMIT = 10;
export const PAGE_LIMIT = 5;
export const COLS_NAME = {
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
};
export const EMPTY_ROW = { id: -1 };
export const TIME_COUNT_DOWN_REFRESH = {
    0: 20,
    1: 20,
    2: 75,
    5: 75
}

export const zoneLocal = moment().format('Z') //'+08:00'
export const domainID = 1
export const LOCALHOST_PHOTO = process.env.LOCALHOST_PHOTO