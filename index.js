"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeFromFile = exports.encode = exports.decode = void 0;
const fs_1 = __importDefault(require("fs"));
const mime_types_1 = __importDefault(require("mime-types"));
function decode(dataURI) {
    let regExMatches = dataURI.match('data:(image/.*);base64,(.*)');
    if (!regExMatches || regExMatches.length < 3) {
        throw new Error('DataURI :: Error :: It is not a valid image Data URI."');
    }
    return {
        imageType: regExMatches[1],
        dataBase64: regExMatches[2],
        dataBuffer: Buffer.from(regExMatches[2], 'base64')
    };
}
exports.decode = decode;
function encode(data, mediaType) {
    if (!data || !mediaType) {
        console.log('ImageDataURI :: Error :: Missing some of the required params: data, mediaType ');
        return null;
    }
    mediaType = (/\//.test(mediaType)) ? mediaType : 'image/' + mediaType;
    let dataBase64 = (Buffer.isBuffer(data)) ? data.toString('base64') : new Buffer(data).toString('base64');
    let dataImgBase64 = 'data:' + mediaType + ';base64,' + dataBase64;
    return dataImgBase64;
}
exports.encode = encode;
function encodeFromFile(filePath) {
    if (!filePath) {
        throw new Error('ImageDataURI :: Error :: Missing some of the required params: filePath');
    }
    let mediaType = mime_types_1.default.lookup(filePath);
    if (!mediaType) {
        throw new Error('ImageDataURI :: Error :: Couldn\'t recognize media type for file');
    }
    try {
        const data = fs_1.default.readFileSync(filePath);
        return encode(data, mediaType);
    }
    catch (err) {
        throw new Error('ImageDataURI :: Error :: ' + JSON.stringify(err, null, 4));
    }
}
exports.encodeFromFile = encodeFromFile;
