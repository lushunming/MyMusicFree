
import pluginInstance from "./index";

async function testsearch() {
    let result = await pluginInstance.search("周杰", 1, "music")
    console.log(result)
}


testsearch()