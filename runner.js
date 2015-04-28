var fivebeans = require('fivebeans');
var runner = new fivebeans.runner(process.argv[2], './runner.yml');
runner.go();
