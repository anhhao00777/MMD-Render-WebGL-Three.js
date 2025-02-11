// file url
// maybe it can write as json... but later
var models = [
    {
        name: "Furina P",
        pathName: "Genshin",
        src: "../lib/mmd/models/furina/1.pmx",
        extension: [
            "../lib/mmd/models/furina/3.pmx", "../lib/mmd/models/furina/4.pmx",
            "../lib/mmd/models/furina/5.pmx", "../lib/mmd/models/furina/6.pmx",
            "../lib/mmd/models/furina/7.pmx", "../lib/mmd/models/furina/8.pmx",
            "../lib/mmd/models/furina/9.pmx", "../lib/mmd/models/furina/10.pmx",
            "../lib/mmd/models/furina/11.pmx", "../lib/mmd/models/furina/12.pmx",
            "../lib/mmd/models/furina/13.pmx",
        ]
    },
    {
        name: "Furina O",
        pathName: "Genshin",
        src: "../lib/mmd/models/furina/2.pmx",
        extension: []
    },
    {
        name: "Hutao",
        pathName: "Genshin",
        src: "../lib/mmd/models/hutao/1.pmx",
        extension: []
    },
    {
        name: "Chiori",
        pathName: "Genshin",
        src: "../lib/mmd/models/chiori/chiori.pmx",
        extension: []
    },
    {
        name: "Navia",
        pathName: "Genshin",
        src: "../lib/mmd/models/navia/navia.pmx",
        extension: [
            "../lib/mmd/models/navia/2.pmx",
            "../lib/mmd/models/navia/3.pmx", 
            "../lib/mmd/models/navia/4.pmx",
            "../lib/mmd/models/navia/5.pmx",
        ]
    },
    {
        name: "Robin",
        pathName: "HSR",
        src: "../lib/mmd/models/robin/1.pmx",
        extension: [
            "../lib/mmd/models/robin/2.pmx",
        ]
    },
];

var vmd = [
    {
        name: "wavefile",
        src: "../lib/mmd/vmd/1/wavefile_v2.vmd"
    },
    {
        name: "ねこみみ。。。", 
        src: "../lib/mmd/vmd/2/neko.vmd"
    },
    {
        name: "Toothless dance",
        src: "../lib/mmd/vmd/3/tld.vmd"
    },
];

var camera = [
    {
        name: "wavefile",
        src: "../lib/mmd/camera/1/wavefile_camera.vmd"
    },
    {
        name: "ねこみみ。。。",
        src: "../lib/mmd/camera/2/neko.vmd"
    },
];
var _bg = [
    {
        name: "夜月蓝·H2CU式stage13",
        isPmx: true,
        src: ["../lib/mmd/map/1/1.pmx"]
    },
    {
        name: "わた雲の空",
        isPmx: true,
        src: ["../lib/mmd/map/2/1.pmx"],
    },
];


var audio = [
    {
        name: "wavefile",
        src: "../lib/mmd/audio/wavefile_short.mp3"
    },
    {
        name: "Super Idol",
        src: "../lib/mmd/audio/idol.mp3"
    },
    {
        name: "Everyone are know",
        src: "../lib/mmd/audio/neverggyu.mp3"
    },
    {
        name: "Test file",
        src: "../lib/mmd/audio/ms_1.mp3"
    }
    
];


export {models, vmd, camera, _bg, audio}
