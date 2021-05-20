# will generate a .zip file
zip -r gameoflife.zip . -9 -x ".git/*" -x ".vs/*" -x ".nyc_output/*" -x "bin/*" -x "coverage/*" -x "data/*" -x "node_modules/*" -x "obj/*" -x "out/*"