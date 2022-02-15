var jsmediatags = require("jsmediatags");

jsmediatags.read("D:/CloudMusic/Bruno Wen-li - ハルカノココロ.mp3", {
    onSuccess: function (tag) {
        console.log(tag.tags.artist,' - ', tag.tags.title,'(',tag.tags.album,')');
    },
    onError: function (error) {
        console.log(':(', error.type, error.info);
    }
})