import Promise from 'bluebird';

function BufferLoader(context, fileList) {
    this.context = context;
    this.fileList = fileList;
    this.bufferList = []
    this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(file, index) {
    return new Promise((resolve, reject) => {
        // Load buffer asynchronously
        let request = new XMLHttpRequest();
        request.open("GET", file.src, true);
        request.responseType = "arraybuffer";

        let loader = this;

        request.onload = function() {
            // Asynchronously decode the audio file data in request.response
            loader.context.decodeAudioData(
                request.response,
                function(buffer) {
                    if (!buffer) {
                        reject('error decoding file data: ' + file.src);
                    }
                    loader.loadCount++;
                    loader.bufferList[index] = {
                        name: file.name,
                        buffer: buffer
                    };
                    resolve({
                        name: file.name,
                        buffer: buffer
                    });
                },
                function(err) {
                    reject(err);
                }
            );
        }

        request.onerror = function(err) {
            reject(err);
        }

        request.send();
    });
}

BufferLoader.prototype.load = function() {
    let promises = [];
    for (var i = 0; i < this.fileList.length; ++i) {
        promises.push(this.loadBuffer(this.fileList[i], i));
    }

    return Promise.all(promises);
}

export default BufferLoader;