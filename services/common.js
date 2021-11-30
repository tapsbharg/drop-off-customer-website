

export default {
    base64Mime:(encoded)=> {
        var result = null;
        if (typeof encoded !== 'string') {
          return result;
        }
        var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
        if (mime && mime.length) {
          result = mime[1];
        }
        return result;
    },
    readFile : (base64String) => {
        var nonBlob = base64String==undefined?0:base64String.length;
        var filetype = base64Mime(base64String)
        var datass={size:nonBlob/1000, type:filetype}
        return datass;
    }
}