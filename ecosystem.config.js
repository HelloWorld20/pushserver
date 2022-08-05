module.exports = {
  apps: [
    {
      name: 'push-server',
      script: 'dist/index.js',
      interpreter: 'node',
      exec_mode: 'fork',
      instantces: 1,
      error: 'logs/push-server/pm2-error.log',
      out: 'logs/push-server/pm2-out.log',
      merge_logs: true
    }
  ]
}                                             