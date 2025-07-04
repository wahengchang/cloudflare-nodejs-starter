export default {
  test: {
    environment: 'miniflare',
    environmentOptions: {
      modules: true,
    },
    include: ['src/**/*.test.js', 'tests/**/*.test.js'],
  },
};
