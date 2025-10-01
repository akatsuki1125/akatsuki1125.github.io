# Repository Guidelines

## プロジェクト構成とモジュール整理
本リポジトリ は Bootstrap ベース の 静的 ポートフォリオ です。index.html が セクション ID と ナビゲーション を 定義 し、css/styles.css が テーマ カラー と 余白 を 制御 します。js/scripts.js は スクロール スパイ と ナビ トグル を 担当 します。assets/ へ 画像 や 添付 資料 を 追加 し、相対 パス を 忘れず に 更新 してください。config/hypercorn.toml は ローカル ポート 設定 を 保存 し、logs/ と cache/ は 調査 用 のみ なので コミット 前 に 中身 を 点検 します。

## ビルド・テスト・開発コマンド
- `python3 -m http.server 8000`: ルート で 実行 し、http://localhost:8000 で レイアウト を 即時 チェック します。
- `npx serve`: Node.js 利用 時 の 代替 サーバ。HTTP ヘッダー 挙動 を 確認 できます。
- `npx prettier --write index.html css/styles.css js/scripts.js`: 推奨 整形。初回 は 作業 ブランチ で 差分 を 確認 してください。

## コーディングスタイルと命名規則
HTML は 4 スペース インデント を 維持 し、コメント は `<!-- Section -->` の 形式 を 使います。クラス 名 と ID は ケバブ ケース (例: `career-summary`) を 基本 と し、Bootstrap ユーティリティ が 存在 すれば そちら を 優先 します。CSS は 2 スペース で 揃え、色 の 直接 指定 は :root で 事前 に 変数 化 します。JavaScript は `const` 優先、DOM 取得 変数 は `navToggle` の よう に 役割 を 含め ます。

## テストガイドライン
自動 テスト は 未導入 です。変更 後 は ローカル サーバ で Chrome、Firefox、Safari を 手動 確認 し、モバイル ビュー と キーボード 操作 も 点検 してください。静的 構文 チェック として `npx prettier --check` と `npx htmlhint index.html` を 推奨 し、重大 事象 は GitHub Issues に 記録 します。

## コミットとプルリクエスト指針
コミット メッセージ は 英語 命令形 を 基本 と し、必要 に 応じて `feat:`, `fix:`, `chore:` など の プレフィックス を 付けます。複数 ページ を 触る 場合 は 機能 単位 に 分割 し、整形 だけ の 変更 は 専用 コミット に してください。プルリクエスト では 変更 要約、スクリーンショット、ローカル テスト 結果、関連 Issue 番号 (`Closes #12`) を 箇条書き で 添付 し、レビュー 前 に コンフリクト と Lint を 解消 します。

## セキュリティと設定ヒント
外部 CDN 更新 時 は バージョン と `integrity` を 再確認 し、機密 情報 は `.gitignore` で 除外 した 上 で 設定 手順 を `config/README.md` に 記録 してください。
