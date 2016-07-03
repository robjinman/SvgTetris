module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-yuidoc");
  grunt.loadNpmTasks("grunt-browserify");

  grunt.initConfig({
    appDir: "app",
    testDir: "tests/unit",
    pkg: grunt.file.readJSON("package.json"),
    banner: "/*!\n" +
            " * <%= pkg.name %>\n" +
            " * @author <%= pkg.author %>\n" +
            " * @version <%= pkg.version %>\n" +
            " * Copyright <%= pkg.copyright %>\n" +
            " */\n",
    shell: {
      clean: {
        command: [
          'rm js/*.js',
          'rm js/*.map'
        ].join(';'),
        options: {
          execOptions: {
            cwd: "<%= appDir %>"
          }
        }
      },
    },
    browserify: {
      app: {
        files: {
          "<%= appDir %>/js/svgtetris-compiled.js": [ "<%= appDir %>/js/dev/**/*.js" ]
        },
        options: {
        }
      },
      spec: {
        files: {
          "<%= testDir %>/spec.js": [ "<%= testDir %>/*Spec.js" ]
        },
        options: {
        }
      }
    },
    uglify: {
      options: {
        banner: "<%= banner %>",
        sourceMap: true,
        sourceMapName: "<%= appDir %>/js/svgtetris.min.js.map"
      },
      target: {
        files: {
          "<%= appDir %>/js/svgtetris.min.js": ["<%= appDir %>/js/svgtetris-compiled.js"]
        }
      }
    },
    jshint: {
      all: ["<%= appDir %>/js/dev/**/*.js"]
    },
    karma: {
      unit: {
        configFile: "tests/karma-unit.conf.js",
        autoWatch: false,
        singleRun: true
      },
      unit_auto: {
        configFile: "tests/karma-unit.conf.js",
        autoWatch: true,
        singleRun: false
      }
    },
    watch: {
      scripts: {
        files: ["<%= appDir %>/js/dev/**/*.js"],
        tasks: ["browserify:app", "uglify:target", "docs"]
      }
    },
    yuidoc: {
      all: {
        name: "<%= pkg.name %>",
        description: "<%= pkg.description %>",
        version: "<%= pkg.version %>",
        url: "<%= pkg.homepage %>",
        options: {
          paths: ["<%= appDir %>/js/dev"],
          outdir: "docs"
        }
      }
    }
  });

  grunt.registerTask("clean", ["shell:clean"]);
  grunt.registerTask("build", ["browserify:app", "uglify:target"]);
  grunt.registerTask("docs", ["yuidoc"]);
  grunt.registerTask("test", ["browserify:spec", "karma:unit_auto"]);
};
