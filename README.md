サンプル電卓アプリ calc
=======================

[![Build Status](https://travis-ci.org/ototadana/example-calc.svg)](https://travis-ci.org/ototadana/example-calc)

これは何?
---------
わりと新しめ（2015年1月時点）の JavaScript フレームワークを使ったアプリのサンプルとその自動テストプログラムのサンプル。


セットアップ
------------
### 必須ソフトウェア (事前インストールが必要)
*   [node.js](http://nodejs.org/) (0.11.*)
*   [Bower](http://bower.io/)
*   [Google Chrome](https://www.google.com/chrome/)

### 依存ライブラリのインストール
```bash
npm install
bower install
```

### 動作確認テスト
1.  `grunt serve` でサーバを起動する。
2.  `grunt` で、すべてのテストを実行する。


サンプルアプリの構成
--------------------
```
app.js                      ... サーバアプリ本体
controllers/calc.js         ... サーバアプリのビジネスロジック
public/index.html           ... メインページ
public/example-calc.html    ... カスタムタグ要素 <example-calc>
public/example-calc.js      ... <example-calc> のロジック
```

利用しているフレームワーク
--------------------------
### サーバー側
*   [node.js](http://nodejs.org/) (0.11.*)
*   [Koa](http://koajs.com/)


### クライアント側
*   [Polymer](https://www.polymer-project.org/)


利用している依存関係管理ツール
------------------------------
### サーバー側
*   [npm](https://www.npmjs.com/)

### クライアント側
*   [Bower](http://bower.io/)


利用しているビルドツール
------------------------
*   [Grunt](http://gruntjs.com/)


サーバアプリの実行について
--------------------------
*   ファイル変更時に自動再起動させるため、
    [nodemon](http://nodemon.io/) を用いて実行する。

*   開発環境では nodemon の起動は
    [grunt-nodemon](https://github.com/ChrisWren/grunt-nodemon)を使用し、
    Grunt 経由で行う (`grunt serve` で起動)。


アプリ実装について
------------------
### サーバアプリ
#### ファイルの構成
*   [app.js](./app.js) : アプリ本体。
    ミドルウェア設定、ルーティング定義、クライアントからの接続待ち受け（listen）を行う。
*   [controllers/calc.js](./controllers/calc.js) : ビジネスロジック（四則演算処理を行う）。

#### アプリ実装
*   環境変数 `PORT` で指定されたポート番号でクライアントからの接続を待ち受ける。
*   [koa-static](https://github.com/koajs/static)により、public フォルダのファイルを表示する。
*   四則演算処理の入力値は以下のように HTTP GET メソッドのURLとして受け取り、
    JSON 形式の文字列で結果を返す。

    入力例：

    ```
    GET /calc/add/1/2
    ```

    出力例：

    ```
    {"result": 3}
    ```


### クライアントアプリ
#### ファイルの構成
*   [index.html](./public/index.html) : アプリのメインページ。
*   [example-calc.html](./public/example-calc.html) : `<example-calc>` 要素のUI定義。
*   [example-calc.js](./public/example-calc.js) : `<example-calc>` 要素の処理実装。
    通常はこのような形でファイルを分けずに `example-calc.html`
    の中に JavaScript を埋め込むのが一般的だが、カバレッジレポート取得を容易にするために、
    ファイルを分割した。

#### アプリ実装
*   サーバとの通信は [core-ajax](https://github.com/polymer/core-ajax) 要素により行う。
    `auto` 属性を指定することにより、`url` 属性値の変更時に自動的にサーバとの通信が行われる。


自動テストについて
------------------
### 基本的な方針
*   サーバアプリ単体テスト、クライアントアプリ単体テスト、クライアント・サーバの通し(E2E)テストを実施する。
*   テスト結果は JUnit XML 形式のファイルに出力する。
*   単体テストに関してはカバレッジレポートを出力する。

### テストプログラムの構成
```
test/server/*               ... サーバアプリのテスト
test/client/*               ... クライアントアプリのテスト
test/e2e/*                  ... E2Eテスト
test-results/*              ... テスト結果(JUnit XML形式)格納先フォルダ
coverage/*                  ... カバレッジレポート格納先フォルダ
```

### 利用するツール・フレームワーク
できるだけテスト環境をシンプルにするため、ツールおよびフレームワークは以下の方針で選択する。

*   実行はすべて Grunt から行う。
*   テストプログラム用のフレームワークとしては
    [Mocha](http://mochajs.org/) と [Chai](http://chaijs.com/) を利用する。
*   カバレッジレポートは [istanbul](http://gotwarlost.github.io/istanbul/) を使用し、
    HTML 形式レポートおよび Cobertura 形式レポートを作成する。
*   テストで使用するブラウザは Chrome とする。

### サーバアプリ単体テスト
#### 起動方法
*   `grunt server-test` で単体テスト実行、`grunt mocha_istanbul` でカバレッジレポート作成を行う。

#### 実行環境
*   単体テストを Grunt から実行するため、
    [grunt-mocha-test](https://github.com/pghalliday/grunt-mocha-test)を使用する。
*   カバレッジレポート作成を Grunt から実行するため、
    [grunt-mocha-istanbul](https://github.com/pocesar/grunt-mocha-istanbul)を使用する。
*   サーバ側では、ES6 Harmony の機能を利用するため、
    [これに対応した istanbul](https://github.com/gotwarlost/istanbul/tree/harmony)
    が必要。このために、
    `npm install --save-dev gotwarlost/istanbul#harmony` で harmony ブランチの istanbul
    をインストールした。

#### 利用ライブラリ
*   HTTPインターフェースに対するテストを簡単に行うために
    [SuperTest](https://github.com/tj/supertest) を利用する。

#### テストプログラム
*   [test/server/appTest.js](./test/server/appTest.js)



### クライアントアプリ単体テスト
#### 起動方法
*   開発中は `grunt karma:multiRun` でファイル変更を監視させて、
    コード修正に伴って自動的にテストさせることができるようにする。
    CI環境などでは、`grunt karma:singleRun` でテスト実行する。

#### 実行環境
*   [Karma](http://karma-runner.github.io/) を利用してテスト実行する。
*   テスト環境（テストフレームワーク、利用ブラウザ、レポーター、プリプロセッサ）
    の設定やテストプログラムが利用するライブラリは [karma.conf.js](./karma.conf.js) に記述する。
    このファイルに [Mocha](http://mochajs.org/) と [Chai](http://chaijs.com/) を指定する。
*   カスタムタグ要素 `<example-calc>` を記述した HTML ファイル（[example-calcTest.html](./test/client/example-calcTest.html)）を利用するために
    [karma-html2js-preprocessor](https://github.com/karma-runner/karma-html2js-preprocessor)
    を使用する。

#### 利用ライブラリ
*   非同期処理をシンプルに記述するために [Async.js](https://github.com/caolan/async) を使用する。
*   フェイクオブジェクトを利用してサーバとの通信を省略するために [Sinon.JS](http://sinonjs.org/)
    を利用する。

#### テストプログラム
*   [test/client/example-calcTest.js](./test/client/example-calcTest.js)
    *   テスト前に実行される`before` ファンクションの中で
        [example-calcTest.html](./test/client/example-calcTest.html)
        の読み込みを行い、`<example-calc>` 要素を `calc` 変数に設定し、
        ロードされるまで待つ。
    *   サーバへのリクエストは実際に行わずに、
        [Sinon.JS](http://sinonjs.org/) のフェイクオブジェクトを使用する。


### E2Eテスト
#### 起動方法
*   事前に `grunt serve` でサーバアプリを起動しておき、
    `grunt e2e-test` で実行する。

#### 実行環境
*   [grunt-webdriver](https://github.com/webdriverio/grunt-webdriver)
    で実行することで、
    [Selenium WebDriver](http://docs.seleniumhq.org/projects/webdriver/) を利用し、
    実際にブラウザを操作するイメージに近いテストを行う。

#### 利用ライブラリ
*   ブラウザ操作は [WebdriverIO](http://webdriver.io/) で行う。

#### テストプログラム
*   [test/e2e/indexTest.js](./test/e2e/indexTest.js)
    *   [WebDriver は、Shadow DOM をセレクタで指定できないため](https://www.w3.org/Bugs/Public/show_bug.cgi?id=22987)、
        代替策として [WebDriverIO の execute](http://webdriver.io/api/protocol/execute.html) を用い、
        ブラウザ側環境で `document.querySelector` を呼び出してセレクタ指定する。 
