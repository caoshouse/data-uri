import fs from 'fs'
import mimeTypes from 'mime-types'

export function decode(dataURI: string) {
    let regExMatches = dataURI.match('data:(image/.*);base64,(.*)');

    if (!regExMatches || regExMatches.length<3) {
        throw new Error('DataURI :: Error :: It is not a valid image Data URI."');
    }
    return {
        imageType: regExMatches[1],
        dataBase64: regExMatches[2],
        dataBuffer: Buffer.from(regExMatches[2], 'base64')
    };
}

export function encode(data: string | Buffer, mediaType: string) {
    if (!data || !mediaType) {
        console.log('ImageDataURI :: Error :: Missing some of the required params: data, mediaType ');
        return null;
    }

    mediaType = (/\//.test(mediaType)) ? mediaType : 'image/' + mediaType;
    let dataBase64 = (Buffer.isBuffer(data)) ? data.toString('base64') : new Buffer(data).toString('base64');
    let dataImgBase64 = 'data:' + mediaType + ';base64,' + dataBase64;

    return dataImgBase64;
}

export function encodeFromFile(filePath: string) {
    if (!filePath) {
        throw new Error('ImageDataURI :: Error :: Missing some of the required params: filePath');
    }

    let mediaType = mimeTypes.lookup(filePath);
    if (!mediaType) {
        throw new Error('ImageDataURI :: Error :: Couldn\'t recognize media type for file');
    }

    try {
        const data = fs.readFileSync(filePath)
        return encode(data, mediaType);
    } catch (err) {
        throw new Error('ImageDataURI :: Error :: ' + JSON.stringify(err, null, 4));
    }
}
