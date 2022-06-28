const fs = require('fs');
const execa = require('execa');
const target = fs.readdirSync('packages').filter(f => {
    if(!fs.statSync(`packages/${f}`).isDirectory()) {
        return false;
    }else {
        return true;
    }
});


// 
async  function build(target) {
    await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {stdio: 'inherit'})
}

function runParallel(target, iteratorFn) {
    let res = [];
    for(const item of target) {
        const p = iteratorFn(item);
    }
    return Promise.all(res)
}
runParallel(target, build);