#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
var ignore = require('ignore');
var fs = require('fs');
	
	program
		.version('1.0.8')
		.description('统计代码行数')
		.option('--exts [value]', '统计特定文件类型，以|分隔，例如：js|css|html')
		.option('-c, --igc', '忽略注释行')
		.option('-e, --ige', '忽略空行')
		.action(function(){
			
			//	初始化参数
			var fileCount = 0;
			var fileLines = 0;
			var currentPath = process.cwd();
			var currentArgs = {
				comment: this.igc,
				empty: this.ige,
				exts: (this.exts || '').replace(/^\|/,'').replace(/\|$/,'')
			};
			var gitfile = currentPath + '\\.gitignore';
			
			//	统计行数
			var enumeline = function(filename){
				
				fileCount ++ ;
				 	
				var num = '';
				var count = 0;
				var length = fileCount.toString().length;
				var lines = fs.readFileSync(filename);
					lines = (lines ? lines.toString() : '').split('\n') || [];
					lines.forEach(function(text){
				 		
				 		if (/^\s*\/\//ig.test(text)){
				 			currentArgs.comment && count++;
				 		} else if (/^\s*$/ig.test(text)){
				 			currentArgs.empty && count++;
				 		} else {
				 			count++;
				 		}
				 	});
				 	
				 	for (var i = 0; i<5-length; i ++){
				 		num += ' ';
				 	}
				 	
				 	fileLines += count;
				 	
				 	console.log(fileCount + '.' + num + filename + chalk.green(' (' + count + ')'));
			};
			
			//	枚举文件
			var enumerate = function(ignore, dirname){
				
				var files = fs.readdirSync(dirname);
					files.forEach(function(item){
							
						if (!fileignore(ignore, item)){
							if (fs.statSync(dirname + item).isDirectory()){
								enumerate(ignore, dirname + item + '\\');
							} else {
								if (fileexts(currentArgs.exts, item)){
									enumeline(dirname + item);
								}
							}
						}
					});
			};
			
			//	匹配文件类型
			var fileexts = function(exts, filename){
				
				if (exts){
					return new RegExp('\.(' + exts + ')([\.\?]+|$)','ig').test(filename);
				}
				return true;
			};
			
			//	匹配文件路径 gitignore 
			var fileignore = function(ignore, filename){
				
				if (ignore){
					return ignore.ignores(filename);
				}
				return false;
			};
			
			//	读取 gitignore 信息
			var gitignore = function(){
				
				var gits;
					
				if (fs.existsSync(gitfile)){
					gits = fs.readFileSync(gitfile);
					enumerate(ignore().add('.git').add((gits ? gits.toString() : '').split('\n') || []), currentPath + '\\');
				} else {
					enumerate(ignore().add(['.git']), currentPath + '\\');
				}
			};
			
			console.log('\n      统计目录：' + currentPath + '\n');
			
			gitignore();
			
			console.log('\n      共计：' + chalk.green(fileLines) + ' 行代码');
		});
		
	program
		.parse(process.argv)
