/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "",
  assetPrefix: "./",
};

export const dataConfig = {
  // https://www.panynj.gov/bin/portauthority/ridepath.json
  path_data_source: ""
};

export default nextConfig;
