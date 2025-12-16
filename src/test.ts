import pluginInstance from "./index";

async function testsearch() {
    let result = await pluginInstance.search("周杰", 1, "music")
    console.log(JSON.stringify(result))
}

async function getMediaSource() {
    let result: IPlugin.IMediaSourceResult;

    result = await pluginInstance.getMediaSource({
        platform: "qqmp3",
        id: "7722",
        title: "可爱女人",
        artist: "周杰伦",
        artwork: "https://img.qqmp3.vip/image/20240715/20240715210455_2931.webp",

    }, "low");


    console.log('--------------------')
    console.log(JSON.stringify(result))
}

async function getRecommendSheetTags() {
    let result: IPlugin.IGetRecommendSheetTagsResult;

    result = await pluginInstance.getRecommendSheetTags();


    console.log('---------getRecommendSheetTags-----------'+JSON.stringify(result))
}

async function testgetRecommendSheetsByTag() {
    let result: ICommon.PaginationResponse<IMusic.IMusicSheetItem>;

    result = await pluginInstance.getRecommendSheetsByTag({id: 'rand'});


    console.log('---------getRecommendSheetsByTag-----------'+JSON.stringify(result))
}


testsearch()
getMediaSource()
getRecommendSheetTags()
testgetRecommendSheetsByTag()