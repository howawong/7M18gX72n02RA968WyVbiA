const child = require('child_process');
for (var  i = 0; i < parseInt(process.argv[2]); i++) {
	child.fork("./runner.js", [process.argv[3] + i.toString()])
}
