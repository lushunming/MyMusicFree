var $8zHUo$axios = require("axios");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $882b6d93070905b3$export$2e2bcd8739ae039);

const $882b6d93070905b3$var$siteUrl = 'https://api.qqmp3.vip';
// 注意：不要使用async () => {}，hermes不支持异步箭头函数
const $882b6d93070905b3$var$search = async function(query, page, type) {
    if (type === 'music') {
        let result = await (0, ($parcel$interopDefault($8zHUo$axios))).get($882b6d93070905b3$var$siteUrl + '/api/songs.php?type=search&keyword=' + encodeURI(query));
        let resultJson = result.data;
        if (resultJson.code === 200) {
            let musicList = resultJson.data.map(function(item) {
                return {
                    id: item.rid,
                    title: item.name,
                    artist: item.artist,
                    album: '',
                    duration: '',
                    artwork: item.pic,
                    url: '',
                    lrc: '',
                    rawLrc: ''
                };
            });
            return {
                isEnd: true,
                data: musicList
            };
        }
    }
};
const $882b6d93070905b3$var$getMediaSource = async function(musicItem, quality) {
    let result = await (0, ($parcel$interopDefault($8zHUo$axios))).get($882b6d93070905b3$var$siteUrl + '/api/kw.php?rid=' + musicItem.id + '&type=json&level=exhigh&lrc=true');
    let resultJson = result.data;
    if (resultJson.code === 200) return {
        url: resultJson.data.url
    };
};
const $882b6d93070905b3$var$getLyric = async function(musicItem) {
    let result = await (0, ($parcel$interopDefault($8zHUo$axios))).get($882b6d93070905b3$var$siteUrl + '/api/kw.php?rid=' + musicItem.id + '&type=json&level=exhigh&lrc=true');
    let resultJson = result.data;
    if (resultJson.code === 200) return {
        rawLrc: resultJson.data.lrc
    };
};
const $882b6d93070905b3$var$getRecommendSheetTags = async function() {
    /*[
            {id: '', title: '热门'},
            {id: 'rand', title: '随机'},
            {id: 'new', title: '新歌'},
        ]*/ return {
        pinned: [
            {
                id: '',
                title: "\u70ED\u95E8",
                platform: 'qqmp3'
            },
            {
                id: 'rand',
                title: "\u968F\u673A",
                platform: 'qqmp3'
            },
            {
                id: 'new',
                title: "\u65B0\u6B4C",
                platform: 'qqmp3'
            }
        ],
        data: [
            {
                title: "\u70ED\u95E8\u6B4C\u5355",
                data: [
                    {
                        id: '',
                        title: "\u70ED\u95E8",
                        platform: 'qqmp3'
                    },
                    {
                        id: 'rand',
                        title: "\u968F\u673A",
                        platform: 'qqmp3'
                    },
                    {
                        id: 'new',
                        title: "\u65B0\u6B4C",
                        platform: 'qqmp3'
                    }
                ]
            }
        ]
    };
};
const $882b6d93070905b3$var$getMusicInfo = async function(musicBase) {
    let result = await (0, ($parcel$interopDefault($8zHUo$axios))).get($882b6d93070905b3$var$siteUrl + '/api/kw.php?rid=' + musicBase.id + '&type=json&level=exhigh&lrc=true');
    let resultJson = result.data;
    if (resultJson.code === 200) return {
        url: resultJson.data.url
    };
};
const $882b6d93070905b3$var$getRecommendSheetsByTag = async function(tag, page) {
    var url = $882b6d93070905b3$var$siteUrl + '/api/songs.php';
    if (tag.id) url += '?type=' + tag.id;
    let result = await (0, ($parcel$interopDefault($8zHUo$axios))).get(url);
    let resultJson = result.data;
    if (resultJson.code === 200) {
        let musicList = resultJson.data.map(function(item) {
            return {
                id: item.rid,
                title: item.name,
                artist: item.artist,
                album: '',
                duration: '',
                artwork: item.pic,
                url: '',
                lrc: '',
                rawLrc: ''
            };
        });
        return {
            isEnd: true,
            data: [
                {
                    title: "\u6B4C\u5355",
                    platform: 'qqmp3',
                    id: tag.id,
                    musicList: musicList
                }
            ]
        };
    }
};
const $882b6d93070905b3$var$pluginInstance = {
    platform: "qqmp3",
    version: "0.0.6",
    srcUrl: "https://ghproxy.net/https://raw.githubusercontent.com/lushunming/MyMusicFree/refs/heads/master/dist/plugin.js",
    search: $882b6d93070905b3$var$search,
    getLyric: $882b6d93070905b3$var$getLyric,
    getMediaSource: $882b6d93070905b3$var$getMediaSource,
    getRecommendSheetTags: $882b6d93070905b3$var$getRecommendSheetTags,
    getRecommendSheetsByTag: $882b6d93070905b3$var$getRecommendSheetsByTag,
    getMusicInfo: $882b6d93070905b3$var$getMusicInfo
};
var $882b6d93070905b3$export$2e2bcd8739ae039 = $882b6d93070905b3$var$pluginInstance;


//# sourceMappingURL=plugin.js.map
