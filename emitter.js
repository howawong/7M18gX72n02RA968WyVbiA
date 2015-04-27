//{"meta":{"code":200},"data":{"host":"challenge.aftership.net","port":11300}}
var fivebeans = require('fivebeans');
var job =
{
	type: 'convert',
	payload:
	{
		from: "JPY",
		to : "TWD"
	}
};

var client = new fivebeans.client('challenge.aftership.net', 11300);
client
    .on('connect', function()
    {
		client.use('howawong', function(err, tname)
		{
			console.log("using " + tname);
			client.put(0, 0, 60, JSON.stringify(['howawong', job]), function(err, jobid) {console.log(jobid);
			client.end();
	process.exit(0);
			;});
		});
    })
    .on('error', function(err)
    {
        // connection failure
    })
    .on('close', function()
    {
        // underlying connection has closed
    })
    .connect();

