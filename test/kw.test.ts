
import { expect, test, describe,fail } from "bun:test";
import kw from '../kw.js'

describe('kw音乐搜索功能测试', () => {
    test('搜索夜曲', async () => {
        try {
            const result = await kw.search("夜曲", 1, 'music');

            // 验证返回结果结构
            expect(result).toBeDefined();
            expect(result).toHaveProperty('isEnd');
            expect(result).toHaveProperty('data');
            expect(Array.isArray(result.data)).toBe(true);

            // 如果有结果，验证音乐项结构
            if (result.data.length > 0) {
                const musicItem = result.data[0];
                expect(musicItem).toHaveProperty('id');
                expect(musicItem).toHaveProperty('title');
                expect(musicItem).toHaveProperty('artist');
                expect(musicItem).toHaveProperty('album');
            }

            console.log(`搜索到 ${result.data.length} 首歌曲`);
            console.log("结果详情:", JSON.stringify(result, null, 2));

        } catch (error) {
            console.error('搜索失败:', error);
            fail(`搜索请求失败: ${error.message}`);
        }
    });


});


describe('kw音乐详情测试', () => {
    test('bg-getMusicInfo', async () => {
        try {
            const result = await kw.getMusicInfo(  {
                "id": "37316619",
                "artwork": "https://img4.kuwo.cn/star/albumcover/1080/17/79/2445214436.jpg",
                "title": "夜曲",
                "artist": "纯音乐",
                "album": "世界名曲（10）土耳其进行曲",
                "albumId": "5069454",
                "artistId": "11081"
            });

            // 验证返回结果结构
            expect(result).toBeDefined();





            console.log("结果详情:", JSON.stringify(result, null, 2));

        } catch (error) {
            console.error('搜索失败:', error);
            fail(`搜索请求失败: ${error.message}`);
        }
    });
});

describe('bg歌单列表', () => {
    test('bg-getTopLists', async () => {
        try {
            const result = await kw.getTopLists();

            // 验证返回结果结构
            expect(result).toBeDefined();





            console.log("结果详情:", JSON.stringify(result, null, 2));

        } catch (error) {
            console.error('搜索失败:', error);
            fail(`搜索请求失败: ${error.message}`);
        }
    });
});

describe('bg歌单详情', () => {
    test('bg-getTopListDetail', async () => {
        try {
            const result = await kw.getTopListDetail( {
                "id": "293",
                "coverImg": "http://img2.kwcdn.kuwo.cn/star/upload/3/3/1649672816467_.jpg",
                "title": "Space Shower",
                "description": "SPACE SHOWER TV设立于1989年，因通过MV和直播节目介绍了日本的众多艺人而备受好评。 本榜单根据频道上的播放次数计算，为你展现日本音乐的流行趋势。 每周三更新。"
            },2);

            // 验证返回结果结构
            expect(result).toBeDefined();





            console.log("结果详情:", JSON.stringify(result, null, 2));

        } catch (error) {
            console.error('搜索失败:', error);
            fail(`搜索请求失败: ${error.message}`);
        }
    });
});

describe('bg歌单 tag ', () => {
    test('bg-getRecommendSheetTags', async () => {
        try {
            const result = await kw.getRecommendSheetTags();

            // 验证返回结果结构
            expect(result).toBeDefined();





            console.log("结果详情:", JSON.stringify(result, null, 2));

        } catch (error) {
            console.error('搜索失败:', error);
            fail(`搜索请求失败: ${error.message}`);
        }
    });
});

describe('bg获取某个 tag 下的所有歌单 ', () => {
    test('bg-getRecommendSheetsByTag ', async () => {
        try {
            const result = await kw.getRecommendSheetsByTag( {
                "title": "浼ゆ劅",
                "digest": "10000",
                "id": "146"
            },2);

            // 验证返回结果结构
            expect(result).toBeDefined();





            console.log("结果详情:", JSON.stringify(result, null, 2));

        } catch (error) {
            console.error('搜索失败:', error);
            fail(`搜索请求失败: ${error.message}`);
        }
    });
});

describe('bg获取歌单详情 ', () => {
    test('bg-getMusicSheetInfo ', async () => {
        try {
            const result = await kw.getMusicSheetInfo(  {
                "title": "伤感｜你让爱成了一种迷糊",
                "artist": "制作家工作室",
                "id": "3674441683",
                "artwork": "http://img1.kuwo.cn/star/userpl2015/98/66/1765771354010_577097598_500.jpg",
                "playCount": "3113",
                "createUserId": "577097598"
            },1);

            // 验证返回结果结构
            expect(result).toBeDefined();





            console.log("结果详情:", JSON.stringify(result, null, 2));

        } catch (error) {
            console.error('搜索失败:', error);
            fail(`搜索请求失败: ${error.message}`);
        }
    });
});