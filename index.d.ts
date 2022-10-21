/// <reference types="node" />
export declare function decode(dataURI: string): {
    imageType: string;
    dataBase64: string;
    dataBuffer: Buffer;
};
export declare function encode(data: string | Buffer, mediaType: string): string | null;
export declare function encodeFromFile(filePath: string): string | null;
