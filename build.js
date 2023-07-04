import esbuild from 'esbuild';

const baseConfig = {
  entryPoints: ['lib/index.ts'],
  outdir: 'dist',
  bundle: true,
};

Promise.all([
  esbuild.build({
    ...baseConfig,
    format: 'cjs',
    outExtension: { '.js': '.cjs' },
  }),
  esbuild.build({
    ...baseConfig,
    format: 'esm',
  }),
]).catch((err) => {
  console.error(err);
  process.exit(1);
});
