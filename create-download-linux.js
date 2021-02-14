const fs = require('fs');
const archiver = require('archiver');

fs.unlink('./download/videochat-linux.zip', () => {
    var output = fs.createWriteStream('./download/videochat-linux.zip');
    var archive = archiver('zip', {
      zlib: { level: 9 }
    });
    archive.pipe(output);
    archive.directory('./dist/videochat-linux-x64', 'videochat');
    archive.finalize()
});

