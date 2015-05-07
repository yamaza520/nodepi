'use strict';

var Grammar = require('./JuliusGrammar');
var grammar = new Grammar;

grammar.add('おはようございます');
grammar.add('あ');
grammar.add('ん');

grammar.compile(function(err, result) {
    if (err) throw err

    // // Julius インスタンスの生成
    // var julius = new Julius( grammar.getJconf() );

    // // 認識結果のコールバックを追加
    // julius.on('result', function(str) {
    //     console.log(str);
    // });

    // // 認識の開始
    // julius.start();
});
