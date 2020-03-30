const fs = require('fs');
const archiver = require('archiver');

fs.unlink('./download/videochat.zip', () => {
    var output = fs.createWriteStream('./download/videochat.zip');
    var archive = archiver('zip', {
      zlib: { level: 9 }
    });
    archive.pipe(output);
    archive.directory('./dist/videochat-win32-x64', 'videochat');
    archive.finalize()
});

