/** Static export: the whole site is plain HTML/CSS/JS served by Firebase Hosting. */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
};
export default nextConfig;
