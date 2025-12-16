import axios from 'axios';
import IMediaSourceResult = IPlugin.IMediaSourceResult;
import IGetRecommendSheetTagsResult = IPlugin.IGetRecommendSheetTagsResult;


const siteUrl = 'https://api.qqmp3.vip';
// 注意：不要使用async () => {}，hermes不支持异步箭头函数
const search: IPlugin.ISearchFunc = async function (query, page, type) {
    if (type === 'music') {

        let result = await axios.get(siteUrl + '/api/songs.php?type=search&keyword=' + encodeURI(query))
        let resultJson = result.data
        if (resultJson.code === 200) {
            let musicList = resultJson.data.map(function (item) {
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
                }
            })
            return {
                isEnd: true,
                data: musicList
            }
        }


    }
}

const getMediaSource: (
    musicItem: IMusic.IMusicItemPartial,
    quality: IMusic.IQualityKey
) => Promise<IMediaSourceResult | null> = async function (musicItem, quality) {
    let result = await axios.get(siteUrl + '/api/kw.php?rid=' + musicItem.id + '&type=json&level=exhigh&lrc=true')
    let resultJson = result.data
    if (resultJson.code === 200) {
        return {
            url: resultJson.data.url
        }
    }

}

const getLyric
    : (
    musicItem: IMusic.IMusicItemPartial
) => Promise<ILyric.ILyricSource | null> =
    async function (musicItem) {
        let result = await axios.get(siteUrl + '/api/kw.php?rid=' + musicItem.id + '&type=json&level=exhigh&lrc=true')
        let resultJson = result.data
        if (resultJson.code === 200) {
            return {
                lrc: resultJson.data.lrc
            }
        }

    }


const getRecommendSheetTags: () => Promise<IGetRecommendSheetTagsResult> =
    async function () {
        /*[
            {id: '', title: '热门'},
            {id: 'rand', title: '随机'},
            {id: 'new', title: '新歌'},
        ]*/
        return {
            pinned: [{id: '', title: '热门', platform: 'qqmp3'},
                {id: 'rand', title: '随机', platform: 'qqmp3'},
                {id: 'new', title: '新歌', platform: 'qqmp3'}],
            data: [
                {
                    title: '热门歌单',
                    data: [

                        {id: '', title: '热门', platform: 'qqmp3'},
                        {id: 'rand', title: '随机', platform: 'qqmp3'},
                        {id: 'new', title: '新歌', platform: 'qqmp3'}
                    ]

                }]


        }


    }
const getRecommendSheetsByTag: (tag: IMedia.IUnique, page?: number) => Promise<ICommon.PaginationResponse<IMusic.IMusicSheetItem>> =
    async function (tag, page) {
        let result = await axios.get(siteUrl + '/api/songs.php?type=' + tag.id)
        let resultJson = result.data
        if (resultJson.code === 200) {
            let musicList = resultJson.data.map(function (item) {
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
                }
            })
            return {
                isEnd: true,
                data: [{
                    id: tag.id,
                    title: tag.$.title,
                    data: musicList,
                    platform: 'qqmp3'
                }]
            }
        }


    }

const pluginInstance: IPlugin.IPluginDefine = {
    platform: "qqmp3",
    version: "0.0.2",
    srcUrl: "https://ghproxy.net/https://raw.githubusercontent.com/lushunming/MyMusicFree/refs/heads/master/dist/plugin.js",
    search,
    getLyric,
    getMediaSource,
    getRecommendSheetTags
};


export default pluginInstance;