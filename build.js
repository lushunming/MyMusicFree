await Bun.build({
    entrypoints: ["./mvmp3.js"],
    outdir: "./dist",
    minify: true, // Enable all minification modes
    format: "cjs",
    target:"node",
    external: ["cheerio", "axios"]
});

await Bun.build({
    entrypoints: ["./bg.js"],
    outdir: "./dist",
    minify: true, // Enable all minification modes
    format: "cjs",
    target:"node",
    external: ["cheerio", "axios"]
});