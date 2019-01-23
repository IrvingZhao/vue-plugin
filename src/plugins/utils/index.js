import dateFormat from './DateFormatter';

const sessionStorage = window.sessionStorage;

function setItem(key, value) {
    if (!key) {
        throw new Error("cache key cannot be null");
    }
    if (sessionStorage) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
}

function getItem(key) {
    if (!key) {
        throw new Error("cannot get data from null key");
    }
    if (sessionStorage) {
        return JSON.parse(sessionStorage.getItem(key));
    }
}

function getSimpleDate(date) {
    return dateFormat(date, "yyyy-MM-dd");
}

function getFullDate(date) {
    return dateFormat(date, "yyyy-MM-dd HH:mm:ss");
}

function generateTree(data, parentNodeKey, mapCache, idKey = "id", parentKey = "parent", childrenKey = "children") {
    let dataCache = mapCache || {};
    let result = [];
    data.forEach((item) => {
        dataCache[item[idKey]] = item;
    });
    data.forEach((item) => {
        let cacheParentKey = item[parentKey];
        if (cacheParentKey) {
            if (dataCache[cacheParentKey]) {
                if (!dataCache[cacheParentKey][childrenKey]) {
                    dataCache[cacheParentKey][childrenKey] = [];
                }
                dataCache[cacheParentKey][childrenKey].push(item);
                if (parentNodeKey) {
                    item[parentNodeKey] = dataCache[cacheParentKey];
                }
            }
        } else {
            result.push(item);
        }
    });
    return result;
}

/**
 * 根据对象的parentNode 获得 节点 path
 * */
function getTreePath(data, fromId, pushId = "id", parentNode = "parentNode") {
    let pathArr = [];
    let parent = data[fromId];
    while (parent) {
        pathArr.push(parent[pushId]);
        parent = parent[parentNode];
    }
    return pathArr.reverse();
}

export default {
    setItem,
    getItem,
    dateFormat,
    getSimpleDate,
    getFullDate,
    generateTree
}
