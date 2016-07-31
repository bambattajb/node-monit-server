module.exports = function(grunt) {
    
    grunt.initConfig({
        easy_rpm: {
            options: {
                // These are the bare-minimum values required to create a properly named
                // RPM package.  The plugin does contain defaults for these if you omit
                // them, and will notify you when this occurs.
                name: "nsc-client",
                version: "0.0.2",
                release: 1,
                buildArch: "x86_64",
                requires: ["nodejs"],
                preInstallScript: [
                    "curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -"    
                ],
                postInstallScript: [
                    "node /opt/nsc-client/install.js"
                ]
            },
            release: {
                files: [
                    {src: "node_modules/**/*", dest: "/opt/nsc-client"},
                    {src: "server.js", dest: "/opt/nsc-client"},
                    {src: "install.js", dest: "/opt/nsc-client"},
                    {src: 'install.sh', dest: "/opt/nsc-client"}
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-easy-rpm");
    grunt.registerTask('default', ['easy_rpm']);
};