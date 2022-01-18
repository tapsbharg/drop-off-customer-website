module.exports = {
    apps: [
      {
        name: 'Customer',
        cwd: ' /home/your-name/my-nextjs-project',
        script: 'npm',
        args: 'start',
        env: {
          NEXT_PUBLIC_CUST: 'NEXT_PUBLIC_CUST',
        },
      },
      // optionally a second project
  ],};