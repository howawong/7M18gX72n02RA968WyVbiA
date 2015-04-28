# 7M18gX72n02RA968WyVbiA

# Running the worker
```
node start_multiple_worker.js <<number of workers>> <<worker id prefix>>
```
**Example**
```
node start_multiple_worker.js 16 rate_exchange_worker
```

# Running the emitter

```
node emitter.js <<FROM>> <<TO>>
```
**Example**
```
node emitter.js TWD AUD
```

# How the worker works
1. accept a job from beanstalk
2. download data from [xe.com](http://www.xe.com/currencyconverter/convert/?Amount=1&From=HKD&To=EUR#converter)
3. grep data from rightCol
4. save to mongodb



