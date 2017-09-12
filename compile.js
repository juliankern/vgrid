var sass = require('node-sass');
var fs = require('fs');
var mkdirp = require('mkdirp');
var style = 'nested';

if(process.argv.slice(2)[0] === 'compress') {
    style = 'compressed';
}

mkdirp('dist/css/', function (err) {
    if (err) console.error(err)
    else console.log('dist folder created!')
});

sass.render({
    file: 'src/scss/test.scss',
    precision: 8,
    outputStyle: style
}, function(error, result) {
    console.log('sass compile done');
    if(!error){
        // No errors during the compilation, write this result on the disk
        fs.writeFile('dist/css/grid.css', result.css, { encoding: 'utf8' }, function(err){
            if(!err){
                console.log('dist/css/grid.css written to disk!');
            } else {
                console.log('error sass (1):', err);
            }
        });
    } else {
        console.log('error sass (2):', error);
    }
});
