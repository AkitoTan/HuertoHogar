module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: ['src/**/*.js', 'tests/**/*.js'],
    browsers: ['Chrome'],
    singleRun: true,
    reporters: ['progress']
  });
};
