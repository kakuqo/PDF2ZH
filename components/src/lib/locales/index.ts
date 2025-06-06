// 多语言配置类型
interface LocaleConfig {
  [key: string]: string
}

interface Locales {
  [languageCode: string]: LocaleConfig
}

// 多语言配置
export const locales: Locales = {
  'zh': {
    // 通用
    '保存': '保存',
    '重置': '重置',
    '选择': '选择',
    '打开': '打开',
    '刷新': '刷新',
    '添加变量': '添加变量',
    '删除': '删除',
    '可选': '可选',
    '配置保存成功': '配置保存成功',
    '保存失败，请稍后重试': '保存失败，请稍后重试',
    '配置已重置': '配置已重置',
    
    // 主要功能标题
    '输出路径配置': '输出路径配置',
    '翻译服务配置': '翻译服务配置',
    '自定义Prompt配置': '自定义Prompt配置',
    '模型路径信息': '模型路径信息',
    '使用故障排除': '使用故障排除',
    
    // 配置项
    '输出目录': '输出目录',
    '翻译文件目录（默认）': '翻译文件目录（默认）',
    '翻译后的文件将保存到此目录，默认与原文件在同一目录': '翻译后的文件将保存到此目录，默认与原文件在同一目录',
    '选择文件夹': '选择文件夹',
    
    // 服务商配置
    '自定义服务商': '自定义服务商',
    '自定义服务商名称': '自定义服务商名称',
    '请输入自定义服务商名称': '请输入自定义服务商名称',
    '环境变量配置': '环境变量配置',
    '暂无配置变量': '暂无配置变量',
    '点击上方"添加变量"按钮开始配置': '点击上方"添加变量"按钮开始配置',
    '变量名': '变量名',
    '变量值': '变量值',
    '如：API_KEY': '如：API_KEY',
    '请输入变量值': '请输入变量值',
    '请点击标题旁的问号，参考文档查看支持的服务商，以及对应需要的变量和变量名': '请点击标题旁的问号，参考文档查看支持的服务商，以及对应需要的变量和变量名',
    
    // 模型配置
    '模型选择': '模型选择',
    '请选择模型': '请选择模型',
    '自定义模型': '自定义模型',
    '请输入自定义模型名称': '请输入自定义模型名称',
    '选择已安装的Ollama模型，或输入自定义模型名称': '选择已安装的Ollama模型，或输入自定义模型名称',
    '选择推荐模型或输入自定义模型名称': '选择推荐模型或输入自定义模型名称',
    
    // API配置
    'API密钥': 'API密钥',
    '请输入API密钥': '请输入API密钥',
    '使用此服务商需要提供有效的API密钥': '使用此服务商需要提供有效的API密钥',
    '服务端点': '服务端点',
    '自定义服务端点URL': '自定义服务端点URL',
    'Ollama服务地址，默认为 http://localhost:11434': 'Ollama服务地址，默认为 http://localhost:11434',
    '留空使用默认端点，或根据插件服务需要输入自定义端点地址': '留空使用默认端点，或根据插件服务需要输入自定义端点地址',
    
    // Prompt配置
    '翻译提示词': '翻译提示词',
    '查看默认提示词': '查看默认提示词',
    '默认提示词：': '默认提示词：',
    '应用默认提示词': '应用默认提示词',
    '已应用默认提示词': '已应用默认提示词',
    '请输入自定义的翻译提示词，用于指导AI翻译行为...': '请输入自定义的翻译提示词，用于指导AI翻译行为...',
    '自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。插件提供三个变量：${lang_in}、${lang_out}、${text}，可以用于指定翻译语言和源文本。': '自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。插件提供三个变量：${lang_in}、${lang_out}、${text}，可以用于指定翻译语言和源文本。',
    
    // 模型路径
    '模型路径': '模型路径',
    
    // 故障排除
    '如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装': '如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装',
    '打开目录': '打开目录',
    
    // 介绍文案
    'PDF2ZH 文档智能翻译工具': 'PDF2ZH 文档智能翻译工具',
    '支持多种翻译服务商，保持原文档格式，提供高质量的PDF文档翻译体验。无论是学术论文、技术文档还是商业报告，都能获得专业的翻译效果。': '支持多种翻译服务商，保持原文档格式，提供高质量的PDF文档翻译体验。无论是学术论文、技术文档还是商业报告，都能获得专业的翻译效果。',
    '查看源码': '查看源码',
    
    // 保存提示
    '配置修改后，请及时保存以免丢失': '配置修改后，请及时保存以免丢失',
    '保存配置': '保存配置',
    
    // 错误提示
    '无法获取Ollama模型列表': '无法获取Ollama模型列表',
    '获取Ollama模型列表失败': '获取Ollama模型列表失败',
    
    // 文档链接
    '查看服务配置文档': '查看服务配置文档',
  },
  
  'zh_tw': {
    // 通用
    '保存': '儲存',
    '重置': '重設',
    '选择': '選擇',
    '打开': '開啟',
    '刷新': '重新整理',
    '添加变量': '新增變數',
    '删除': '刪除',
    '可选': '可選',
    '配置保存成功': '設定儲存成功',
    '保存失败，请稍后重试': '儲存失敗，請稍後重試',
    '配置已重置': '設定已重設',
    
    // 主要功能标题
    '输出路径配置': '輸出路徑設定',
    '翻译服务配置': '翻譯服務設定',
    '自定义Prompt配置': '自訂Prompt設定',
    '模型路径信息': '模型路徑資訊',
    '使用故障排除': '使用疑難排解',
    
    // 配置项
    '输出目录': '輸出目錄',
    '翻译文件目录（默认）': '翻譯檔案目錄（預設）',
    '翻译后的文件将保存到此目录，默认与原文件在同一目录': '翻譯後的檔案將儲存到此目錄，預設與原檔案在同一目錄',
    '选择文件夹': '選擇資料夾',
    
    // 服务商配置
    '自定义服务商': '自訂服務商',
    '自定义服务商名称': '自訂服務商名稱',
    '请输入自定义服务商名称': '請輸入自訂服務商名稱',
    '环境变量配置': '環境變數設定',
    '暂无配置变量': '暫無設定變數',
    '点击上方"添加变量"按钮开始配置': '點擊上方「新增變數」按鈕開始設定',
    '变量名': '變數名稱',
    '变量值': '變數值',
    '如：API_KEY': '如：API_KEY',
    '请输入变量值': '請輸入變數值',
    '请点击标题旁的问号，参考文档查看支持的服务商，以及对应需要的变量和变量名': '請點擊標題旁的問號，參考文件查看支援的服務商，以及對應需要的變數和變數名稱',
    
    // 模型配置
    '模型选择': '模型選擇',
    '请选择模型': '請選擇模型',
    '自定义模型': '自訂模型',
    '请输入自定义模型名称': '請輸入自訂模型名稱',
    '选择已安装的Ollama模型，或输入自定义模型名称': '選擇已安裝的Ollama模型，或輸入自訂模型名稱',
    '选择推荐模型或输入自定义模型名称': '選擇推薦模型或輸入自訂模型名稱',
    
    // API配置
    'API密钥': 'API金鑰',
    '请输入API密钥': '請輸入API金鑰',
    '使用此服务商需要提供有效的API密钥': '使用此服務商需要提供有效的API金鑰',
    '服务端点': '服務端點',
    '自定义服务端点URL': '自訂服務端點URL',
    'Ollama服务地址，默认为 http://localhost:11434': 'Ollama服務位址，預設為 http://localhost:11434',
    '留空使用默认端点，或根据插件服务需要输入自定义端点地址': '留空使用預設端點，或根據外掛服務需要輸入自訂端點位址',
    
    // Prompt配置
    '翻译提示词': '翻譯提示詞',
    '查看默认提示词': '查看預設提示詞',
    '默认提示词：': '預設提示詞：',
    '应用默认提示词': '套用預設提示詞',
    '已应用默认提示词': '已套用預設提示詞',
    '请输入自定义的翻译提示词，用于指导AI翻译行为...': '請輸入自訂的翻譯提示詞，用於指導AI翻譯行為...',
    '自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。插件提供三个变量：${lang_in}、${lang_out}、${text}，可以用于指定翻译语言和源文本。': '自訂提示詞可以改善翻譯品質，指定特定的翻譯風格或術語處理方式。留空使用預設提示詞。外掛提供三個變數：${lang_in}、${lang_out}、${text}，可以用於指定翻譯語言和來源文字。',
    
    // 模型路径
    '模型路径': '模型路徑',
    
    // 故障排除
    '如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装': '如果外掛使用失敗或翻譯功能異常，請開啟下方資料夾點擊.exe檔案安裝',
    '打开目录': '開啟目錄',
    
    // 介绍文案
    'PDF2ZH 文档智能翻译工具': 'PDF2ZH 文件智慧翻譯工具',
    '支持多种翻译服务商，保持原文档格式，提供高质量的PDF文档翻译体验。无论是学术论文、技术文档还是商业报告，都能获得专业的翻译效果。': '支援多種翻譯服務商，保持原文件格式，提供高品質的PDF 文書 翻訳 體驗。無論是學術論文、技術 文書、ビジネスレポートなど、プロフェッショナルな翻訳結果を得ることができます。',
    '查看源码': '查看原始碼',
    
    // 保存提示
    '配置修改后，请及时保存以免丢失': '設定修改後，請及時儲存以免遺失',
    '保存配置': '儲存設定',
    
    // 错误提示
    '无法获取Ollama模型列表': '無法取得Ollama模型清單',
    '获取Ollama模型列表失败': '取得Ollama模型清單失敗',
    
    // 文档链接
    '查看服务配置文档': '查看服務設定文件',
  },
  
  'en': {
    // 通用
    '保存': 'Save',
    '重置': 'Reset',
    '选择': 'Select',
    '打开': 'Open',
    '刷新': 'Refresh',
    '添加变量': 'Add Variable',
    '删除': 'Delete',
    '可选': 'Optional',
    '配置保存成功': 'Configuration saved successfully',
    '保存失败，请稍后重试': 'Save failed, please try again later',
    '配置已重置': 'Configuration has been reset',
    
    // 主要功能标题
    '输出路径配置': 'Output Path Configuration',
    '翻译服务配置': 'Translation Service Configuration',
    '自定义Prompt配置': 'Custom Prompt Configuration',
    '模型路径信息': 'Model Path Information',
    '使用故障排除': 'Troubleshooting',
    
    // 配置项
    '输出目录': 'Output Directory',
    '翻译文件目录（默认）': 'Translation file directory (default)',
    '翻译后的文件将保存到此目录，默认与原文件在同一目录': 'Translated files will be saved to this directory, default is the same directory as the original file',
    '选择文件夹': 'Select Folder',
    
    // 服务商配置
    '自定义服务商': 'Custom Service Provider',
    '自定义服务商名称': 'Custom Service Provider Name',
    '请输入自定义服务商名称': 'Please enter custom service provider name',
    '环境变量配置': 'Environment Variables Configuration',
    '暂无配置变量': 'No configuration variables',
    '点击上方"添加变量"按钮开始配置': 'Click the "Add Variable" button above to start configuration',
    '变量名': 'Variable Name',
    '变量值': 'Variable Value',
    '如：API_KEY': 'e.g.: API_KEY',
    '请输入变量值': 'Please enter variable value',
    '请点击标题旁的问号，参考文档查看支持的服务商，以及对应需要的变量和变量名': 'Please click the question mark next to the title to refer to the documentation for supported service providers and their required variables and variable names',
    
    // 模型配置
    '模型选择': 'Model Selection',
    '请选择模型': 'Please select a model',
    '自定义模型': 'Custom Model',
    '请输入自定义模型名称': 'Please enter custom model name',
    '选择已安装的Ollama模型，或输入自定义模型名称': 'Select an installed Ollama model, or enter a custom model name',
    '选择推荐模型或输入自定义模型名称': 'Select a recommended model or enter a custom model name',
    
    // API配置
    'API密钥': 'API Key',
    '请输入API密钥': 'Please enter API key',
    '使用此服务商需要提供有效的API密钥': 'Using this service provider requires a valid API key',
    '服务端点': 'Service Endpoint',
    '自定义服务端点URL': 'Custom service endpoint URL',
    'Ollama服务地址，默认为 http://localhost:11434': 'Ollama service address, default is http://localhost:11434',
    '留空使用默认端点，或根据插件服务需要输入自定义端点地址': 'Leave blank to use default endpoint, or enter custom endpoint address as needed for plugin service',
    
    // Prompt配置
    '翻译提示词': 'Translation Prompt',
    '查看默认提示词': 'View default prompt',
    '默认提示词：': 'Default prompt:',
    '应用默认提示词': 'Apply Default Prompt',
    '已应用默认提示词': 'Default prompt applied',
    '请输入自定义的翻译提示词，用于指导AI翻译行为...': 'Please enter custom translation prompt to guide AI translation behavior...',
    '自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。插件提供三个变量：${lang_in}、${lang_out}、${text}，可以用于指定翻译语言和源文本。': 'Custom prompts can improve translation quality by specifying specific translation styles or terminology handling. Leave blank to use default prompt. The plugin provides three variables: ${lang_in}, ${lang_out}, ${text}, which can be used to specify translation languages and source text.',
    
    // 模型路径
    '模型路径': 'Model Path',
    
    // 故障排除
    '如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装': 'If the plugin fails or translation function is abnormal, please open the folder below and click the .exe file to install',
    '打开目录': 'Open Directory',
    
    // 介绍文案
    'PDF2ZH 文档智能翻译工具': 'PDF2ZH Intelligent Document Translation Tool',
    '支持多种翻译服务商，保持原文档格式，提供高质量的PDF文档翻译体验。无论是学术论文、技术文档还是商业报告，都能获得专业的翻译效果。': 'Supports multiple translation service providers, maintains original document format, and provides high-quality PDF document translation experience. Whether it\'s academic papers, technical documents, or business reports, you can get professional translation results.',
    '查看源码': 'View Source Code',
    
    // 保存提示
    '配置修改后，请及时保存以免丢失': 'Please save promptly after configuration changes to avoid loss',
    '保存配置': 'Save Configuration',
    
    // 错误提示
    '无法获取Ollama模型列表': 'Unable to get Ollama model list',
    '获取Ollama模型列表失败': 'Failed to get Ollama model list',
    
    // 文档链接
    '查看服务配置文档': 'View service configuration documentation',
  },
  
  'ja': {
    // 通用
    '保存': '保存',
    '重置': 'リセット',
    '选择': '選択',
    '打开': '開く',
    '刷新': '更新',
    '添加变量': '変数を追加',
    '删除': '削除',
    '可选': 'オプション',
    '配置保存成功': '設定の保存に成功しました',
    '保存失败，请稍后重试': '保存に失敗しました。後でもう一度お試しください',
    '配置已重置': '設定がリセットされました',
    
    // 主要功能标题
    '输出路径配置': '出力パス設定',
    '翻译服务配置': '翻訳サービス設定',
    '自定义Prompt配置': 'カスタムプロンプト設定',
    '模型路径信息': 'モデルパス情報',
    '使用故障排除': 'トラブルシューティング',
    
    // 配置项
    '输出目录': '出力ディレクトリ',
    '翻译文件目录（默认）': '翻訳ファイルディレクトリ（デフォルト）',
    '翻译后的文件将保存到此目录，默认与原文件在同一目录': '翻訳されたファイルはこのディレクトリに保存されます。デフォルトは元のファイルと同じディレクトリです',
    '选择文件夹': 'フォルダを選択',
    
    // 服务商配置
    '自定义服务商': 'カスタムサービスプロバイダー',
    '自定义服务商名称': 'カスタムサービスプロバイダー名',
    '请输入自定义服务商名称': 'カスタムサービスプロバイダー名を入力してください',
    '环境变量配置': '環境変数設定',
    '暂无配置变量': '設定変数がありません',
    '点击上方"添加变量"按钮开始配置': '上の「変数を追加」ボタンをクリックして設定を開始してください',
    '变量名': '変数名',
    '变量值': '変数値',
    '如：API_KEY': '例：API_KEY',
    '请输入变量值': '変数値を入力してください',
    '请点击标题旁的问号，参考文档查看支持的服务商，以及对应需要的变量和变量名': 'タイトル横のクエスチョンマークをクリックして、サポートされているサービスプロバイダーと必要な変数と変数名についてドキュメントを参照してください',
    
    // 模型配置
    '模型选择': 'モデル選択',
    '请选择模型': 'モデルを選択してください',
    '自定义模型': 'カスタムモデル',
    '请输入自定义模型名称': 'カスタムモデル名を入力してください',
    '选择已安装的Ollama模型，或输入自定义模型名称': 'インストール済みのOllamaモデルを選択するか、カスタムモデル名を入力してください',
    '选择推荐模型或输入自定义模型名称': '推奨モデルを選択するか、カスタムモデル名を入力してください',
    
    // API配置
    'API密钥': 'APIキー',
    '请输入API密钥': 'APIキーを入力してください',
    '使用此服务商需要提供有效的API密钥': 'このサービスプロバイダーを使用するには有効なAPIキーが必要です',
    '服务端点': 'サービスエンドポイント',
    '自定义服务端点URL': 'カスタムサービスエンドポイントURL',
    'Ollama服务地址，默认为 http://localhost:11434': 'Ollamaサービスアドレス、デフォルトは http://localhost:11434',
    '留空使用默认端点，或根据插件服务需要输入自定义端点地址': '空白のままでデフォルトエンドポイントを使用するか、プラグインサービスの必要に応じてカスタムエンドポイントアドレスを入力してください',
    
    // Prompt配置
    '翻译提示词': '翻訳プロンプト',
    '查看默认提示词': 'デフォルトプロンプトを表示',
    '默认提示词：': 'デフォルトプロンプト：',
    '应用默认提示词': 'デフォルトプロンプトを適用',
    '已应用默认提示词': 'デフォルトプロンプトが適用されました',
    '请输入自定义的翻译提示词，用于指导AI翻译行为...': 'AI翻訳の動作を指導するためのカスタム翻訳プロンプトを入力してください...',
    '自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。插件提供三个变量：${lang_in}、${lang_out}、${text}，可以用于指定翻译语言和源文本。': 'カスタムプロンプトは、特定の翻訳スタイルや用語処理方法を指定することで翻訳品質を向上させることができます。空白のままでデフォルトプロンプトを使用します。プラグインは${lang_in}、${lang_out}、${text} の3つの変数を提供し、翻訳言語とソース テキストを指定するために使用できます。',
    
    // 模型路径
    '模型路径': 'モデルパス',
    
    // 故障排除
    '如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装': 'プラグインの使用に失敗したり翻訳機能に異常がある場合は、下のフォルダを開いて.exeファイルをクリックしてインストールしてください',
    '打开目录': 'ディレクトリを開く',
    
    // 介绍文案
    'PDF2ZH 文档智能翻译工具': 'PDF2ZH インテリジェント文書翻訳ツール',
    '支持多种翻译服务商，保持原文档格式，提供高质量的PDF文档翻译体验。无论是学术论文、技术文档还是商业报告，都能获得专业的翻译效果。': '複数の翻訳サービスプロバイダーをサポートし、元の文書形式を維持し、高品質のPDF 文書 翻訳 体験を提供します。学術 論文、技術 文書、ビジネスレポートなど、プロフェッショナルな翻訳結果を得ることができます。',
    '查看源码': 'ソースコードを表示',
    
    // 保存提示
    '配置修改后，请及时保存以免丢失': '設定変更後は紛失を避けるため速やかに保存してください',
    '保存配置': '設定を保存',
    
    // 错误提示
    '无法获取Ollama模型列表': 'Ollamaモデルリストを取得できません',
    '获取Ollama模型列表失败': 'Ollamaモデルリストの取得に失敗しました',
    
    // 文档链接
    '查看服务配置文档': 'サービス設定ドキュメントを表示',
  },
  
  'ko': {
    // 통용
    '保存': '저장',
    '重置': '재설정',
    '选择': '선택',
    '打开': '열기',
    '刷新': '새로고침',
    '添加变量': '변수 추가',
    '删除': '삭제',
    '可选': '선택사항',
    '配置保存成功': '설정 저장 성공',
    '保存失败，请稍后重试': '저장 실패, 나중에 다시 시도해주세요',
    '配置已重置': '설정이 재설정되었습니다',
    
    // 주요 기능 제목
    '输出路径配置': '출력 경로 설정',
    '翻译服务配置': '번역 서비스 설정',
    '自定义Prompt配置': '사용자 정의 프롬프트 설정',
    '模型路径信息': '모델 경로 정보',
    '使用故障排除': '사용 문제 해결',
    
    // 설정 항목
    '输出目录': '출력 디렉토리',
    '翻译文件目录（默认）': '번역 파일 디렉토리 (기본값)',
    '翻译后的文件将保存到此目录，默认与原文件在同一目录': '번역된 파일이 이 디렉토리에 저장됩니다. 기본값은 원본 파일과 같은 디렉토리입니다',
    '选择文件夹': '폴더 선택',
    
    // 서비스 제공업체 설정
    '自定义服务商': '사용자 정의 서비스 제공업체',
    '自定义服务商名称': '사용자 정의 서비스 제공업체 이름',
    '请输入自定义服务商名称': '사용자 정의 서비스 제공업체 이름을 입력하세요',
    '环境变量配置': '환경 변수 설정',
    '暂无配置变量': '설정된 변수가 없습니다',
    '点击上方"添加变量"按钮开始配置': '위의 "변수 추가" 버튼을 클릭하여 설정을 시작하세요',
    '变量名': '변수명',
    '变量值': '변수값',
    '如：API_KEY': '예: API_KEY',
    '请输入变量值': '변수값을 입력하세요',
    '请点击标题旁的问号，参考文档查看支持的服务商，以及对应需要的变量和变量名': '제목 옆의 물음표를 클릭하여 지원되는 서비스 제공업체와 필요한 변수 및 변수명에 대한 문서를 참조하세요',
    
    // 모델 설정
    '模型选择': '모델 선택',
    '请选择模型': '모델을 선택하세요',
    '自定义模型': '사용자 정의 모델',
    '请输入自定义模型名称': '사용자 정의 모델 이름을 입력하세요',
    '选择已安装的Ollama模型，或输入自定义模型名称': '설치된 Ollama 모델을 선택하거나 사용자 정의 모델 이름을 입력하세요',
    '选择推荐模型或输入自定义模型名称': '추천 모델을 선택하거나 사용자 정의 모델 이름을 입력하세요',
    
    // API 설정
    'API密钥': 'API 키',
    '请输入API密钥': 'API 키를 입력하세요',
    '使用此服务商需要提供有效的API密钥': '이 서비스 제공업체를 사용하려면 유효한 API 키가 필요합니다',
    '服务端点': '서비스 엔드포인트',
    '自定义服务端点URL': '사용자 정의 서비스 엔드포인트 URL',
    'Ollama服务地址，默认为 http://localhost:11434': 'Ollama 서비스 주소, 기본값은 http://localhost:11434',
    '留空使用默认端点，或根据插件服务需要输入自定义端点地址': '기본 엔드포인트를 사용하려면 비워두거나, 플러그인 서비스 요구사항에 따라 사용자 정의 엔드포인트 주소를 입력하세요',
    
    // 프롬프트 설정
    '翻译提示词': '번역 프롬프트',
    '查看默认提示词': '기본 프롬프트 보기',
    '默认提示词：': '기본 프롬프트:',
    '应用默认提示词': '기본 프롬프트 적용',
    '已应用默认提示词': '기본 프롬프트가 적용되었습니다',
    '请输入自定义的翻译提示词，用于指导AI翻译行为...': 'AI 번역 동작을 가이드하기 위한 사용자 정의 번역 프롬프트를 입력하세요...',
    '自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。插件提供三个变量：${lang_in}、${lang_out}、${text}，可以用于指定翻译语言和源文本。': '사용자 정의 프롬프트는 특정 번역 스타일이나 용어 처리 방식을 지정하여 번역 품질을 향상시킬 수 있습니다. 기본 프롬프트를 사용하려면 비워두세요. 플러그인은 ${lang_in}、${lang_out}、${text} 세 개의 변수를 제공하며, 번역 언어와 소스 텍스트를 지정하는 데 사용할 수 있습니다.',
    
    // 모델 경로
    '模型路径': '모델 경로',
    
    // 문제 해결
    '如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装': '플러그인 사용 실패 또는 번역 기능에 이상이 있을 경우, 아래 폴더를 열고 .exe 파일을 클릭하여 설치하세요',
    '打开目录': '디렉토리 열기',
    
    // 소개 문구
    'PDF2ZH 文档智能翻译工具': 'PDF2ZH 문서 지능형 번역 도구',
    '支持多种翻译服务商，保持原文档格式，提供高质量的PDF文档翻译体验。无论是学术论文、技术文档还是商业报告，都能获得专业的翻译效果。': '支援多種翻譯服務商，保持原文件格式，提供高品質的PDF文件翻譯體驗。無論是學術論文、技術文件還是商業報告，都能獲得專業的翻譯效果。',
    '查看源码': '소스 코드 보기',
    
    // 저장 알림
    '配置修改后，请及时保存以免丢失': '설정 수정 후 분실 방지를 위해 즉시 저장하세요',
    '保存配置': '설정 저장',
    
    // 오류 메시지
    '无法获取Ollama模型列表': 'Ollama 모델 목록을 가져올 수 없습니다',
    '获取Ollama模型列表失败': 'Ollama 모델 목록 가져오기 실패',
    
    // 문서 링크
    '查看服务配置文档': '서비스 설정 문서 보기',
  },
  
  'es': {
    // Común
    '保存': 'Guardar',
    '重置': 'Restablecer',
    '选择': 'Seleccionar',
    '打开': 'Abrir',
    '刷新': 'Actualizar',
    '添加变量': 'Agregar Variable',
    '删除': 'Eliminar',
    '可选': 'Opcional',
    '配置保存成功': 'Configuración guardada exitosamente',
    '保存失败，请稍后重试': 'Error al guardar, por favor intente más tarde',
    '配置已重置': 'Configuración restablecida',
    
    // Títulos principales
    '输出路径配置': 'Configuración de Ruta de Salida',
    '翻译服务配置': 'Configuración de Servicio de Traducción',
    '自定义Prompt配置': 'Configuración de Prompt Personalizado',
    '模型路径信息': 'Informaciones de Ruta del Modelo',
    '使用故障排除': 'Solución de Problemas de Uso',
    
    // Elementos de configuración
    '输出目录': 'Directorio de Salida',
    '翻译文件目录（默认）': 'Directorio de archivos traducidos (por defecto)',
    '翻译后的文件将保存到此目录，默认与原文件在同一目录': 'Los archivos traducidos se guardarán en este directorio, por defecto es el mismo que el archivo original',
    '选择文件夹': 'Seleccionar Carpeta',
    
    // Configuración de proveedores
    '自定义服务商': 'Proveedor de Servicios Personalizado',
    '自定义服务商名称': 'Nombre del Proveedor de Servicios Personalizado',
    '请输入自定义服务商名称': 'Por favor ingrese el nombre del proveedor personalizado',
    '环境变量配置': 'Configuración de Variables de Entorno',
    '暂无配置变量': 'No hay variables configuradas',
    '点击上方"添加变量"按钮开始配置': 'Haga clic en el botón "Agregar Variable" de arriba para comenzar la configuración',
    '变量名': 'Nombre de Variable',
    '变量值': 'Valor de Variable',
    '如：API_KEY': 'ej.: API_KEY',
    '请输入变量值': 'Por favor ingrese el valor de la variable',
    '请点击标题旁的问号，参考文档查看支持的服务商，以及对应需要的变量和变量名': 'Por favor haga clic en el signo de interrogación junto al título para consultar la documentación sobre proveedores compatibles y sus variables requeridas',
    
    // Configuración de modelo
    '模型选择': 'Selección de Modelo',
    '请选择模型': 'Por favor seleccione un modelo',
    '自定义模型': 'Modelo Personalizado',
    '请输入自定义模型名称': 'Por favor ingrese el nombre del modelo personalizado',
    '选择已安装的Ollama模型，或输入自定义模型名称': 'Seleccione un modelo Ollama instalado o ingrese un nombre de modelo personalizado',
    '选择推荐模型或输入自定义模型名称': 'Seleccione un modelo recomendado o ingrese un nombre de modelo personalizado',
    
    // Configuración de API
    'API密钥': 'Clave API',
    '请输入API密钥': 'Por favor ingrese la clave API',
    '使用此服务商需要提供有效的API密钥': 'Usar este proveedor requiere una clave API válida',
    '服务端点': 'Punto Final del Servicio',
    '自定义服务端点URL': 'URL del Punto Final del Servicio Personalizado',
    'Ollama服务地址，默认为 http://localhost:11434': 'Dirección del servicio Ollama, por defecto http://localhost:11434',
    '留空使用默认端点，或根据插件服务需要输入自定义端点地址': 'Deje en blanco para usar el punto final predeterminado, o ingrese una dirección personalizada según las necesidades del servicio del plugin',
    
    // Configuración de Prompt
    '翻译提示词': 'Prompt de Traducción',
    '查看默认提示词': 'Ver Prompt Predeterminado',
    '默认提示词：': 'Prompt Predeterminado:',
    '应用默认提示词': 'Aplicar Prompt Predeterminado',
    '已应用默认提示词': 'Prompt predeterminado aplicado',
    '请输入自定义的翻译提示词，用于指导AI翻译行为...': 'Por favor ingrese un prompt de traducción personalizado para guiar el comportamiento de traducción de la IA...',
    '自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。插件提供三个变量：${lang_in}、${lang_out}、${text}，可以用于指定翻译语言和源文本。': 'Los prompts personalizados pueden mejorar la calidad de traducción especificando estilos de traducción específicos o métodos de manejo de terminología. Deje en blanco para usar el prompt predeterminado. El plugin proporciona tres variables: ${lang_in}, ${lang_out}, ${text}, que se pueden usar para especificar idiomas de traducción y texto fuente.',
    
    // Ruta del modelo
    '模型路径': 'Ruta del Modelo',
    
    // Solución de problemas
    '如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装': 'Si el plugin falla o la función de traducción es anormal, por favor abra la carpeta de abajo y haga clic en el archivo .exe para instalar',
    '打开目录': 'Abrir Directorio',
    
    // Texto de introducción
    'PDF2ZH 文档智能翻译工具': 'PDF2ZH Herramienta de Traducción Inteligente de Documentos',
    '支持多种翻译服务商，保持原文档格式，提供高质量的PDF文档翻译体验。无论是学术论文、技术文档还是商业报告，都能获得专业的翻译效果。': 'Compatible con múltiples proveedores de servicios de traducción, mantiene el formato del documento original y proporciona una experiencia de traducción de documentos PDF de alta calidad. Ya sea para artículos académicos, documentos técnicos o informes comerciales, puede obtener resultados de traducción profesionales.',
    '查看源码': 'Ver Código Fuente',
    
    // Aviso de guardado
    '配置修改后，请及时保存以免丢失': 'Por favor guarde oportunamente después de modificar la configuración para evitar pérdidas',
    '保存配置': 'Guardar Configuración',
    
    // Mensajes de error
    '无法获取Ollama模型列表': 'No se puede obtener la lista de modelos Ollama',
    '获取Ollama模型列表失败': 'Error al obtener la lista de modelos Ollama',
    
    // Enlace de documentación
    '查看服务配置文档': 'Ver documentación de configuración del servicio',
  },
  
  'fr': {
    // Commun
    '保存': 'Sauvegarder',
    '重置': 'Réinitialiser',
    '选择': 'Sélectionner',
    '打开': 'Ouvrir',
    '刷新': 'Actualiser',
    '添加变量': 'Ajouter Variable',
    '删除': 'Supprimer',
    '可选': 'Optionnel',
    '配置保存成功': 'Configuration sauvegardée avec succès',
    '保存失败，请稍后重试': 'Échec de la sauvegarde, veuillez réessayer plus tard',
    '配置已重置': 'Configuration réinitialisée',
    
    // Titres principaux
    '输出路径配置': 'Configuration du Chemin de Sortie',
    '翻译服务配置': 'Configuration du Service de Traduction',
    '自定义Prompt配置': 'Configuration du Prompt Personnalisé',
    '模型路径信息': 'Informations sur le Chemin du Modèle',
    '使用故障排除': 'Dépannage d\'Utilisation',
    
    // Éléments de configuration
    '输出目录': 'Répertoire de Sortie',
    '翻译文件目录（默认）': 'Répertoire des fichiers traduits (par défaut)',
    '翻译后的文件将保存到此目录，默认与原文件在同一目录': 'Les fichiers traduits seront sauvegardés dans ce répertoire, par défaut dans le même répertoire que le fichier original',
    '选择文件夹': 'Sélectionner Dossier',
    
    // Configuration des fournisseurs
    '自定义服务商': 'Fournisseur de Services Personnalisé',
    '自定义服务商名称': 'Nom du Fournisseur de Services Personnalisé',
    '请输入自定义服务商名称': 'Veuillez saisir le nom du fournisseur personnalisé',
    '环境变量配置': 'Configuration des Variables d\'Environnement',
    '暂无配置变量': 'Aucune variable configurée',
    '点击上方"添加变量"按钮开始配置': 'Cliquez sur le bouton "Ajouter Variable" ci-dessus pour commencer la configuration',
    '变量名': 'Nom de Variable',
    '变量值': 'Valeur de Variable',
    '如：API_KEY': 'ex : API_KEY',
    '请输入变量值': 'Veuillez saisir la valeur de la variable',
    '请点击标题旁的问号，参考文档查看支持的服务商，以及对应需要的变量和变量名': 'Veuillez cliquer sur le point d\'interrogation à côté du titre pour consulter la documentation sur les fournisseurs pris en charge et leurs variables requises',
    
    // Configuration du modèle
    '模型选择': 'Sélection du Modèle',
    '请选择模型': 'Veuillez sélectionner un modèle',
    '自定义模型': 'Modèle Personnalisé',
    '请输入自定义模型名称': 'Veuillez saisir le nom du modèle personnalisé',
    '选择已安装的Ollama模型，或输入自定义模型名称': 'Sélectionnez un modèle Ollama installé ou saisissez un nom de modèle personnalisé',
    '选择推荐模型或输入自定义模型名称': 'Sélectionnez un modèle recommandé ou saisissez un nom de modèle personnalisé',
    
    // Configuration API
    'API密钥': 'Clé API',
    '请输入API密钥': 'Veuillez saisir la clé API',
    '使用此服务商需要提供有效的API密钥': 'L\'utilisation de ce fournisseur nécessite une clé API valide',
    '服务端点': 'Point de Terminaison du Service',
    '自定义服务端点URL': 'URL du Point de Terminaison du Service Personnalisé',
    'Ollama服务地址，默认为 http://localhost:11434': 'Adresse du service Ollama, par défaut http://localhost:11434',
    '留空使用默认端点，或根据插件服务需要输入自定义端点地址': 'Laissez vide pour utiliser le point de terminaison par défaut, ou saisissez une adresse personnalisée selon les besoins du service du plugin',
    
    // Configuration Prompt
    '翻译提示词': 'Prompt de Traduction',
    '查看默认提示词': 'Voir le Prompt par Défaut',
    '默认提示词：': 'Prompt par Défaut :',
    '应用默认提示词': 'Appliquer le Prompt par Défaut',
    '已应用默认提示词': 'Prompt par défaut appliqué',
    '请输入自定义的翻译提示词，用于指导AI翻译行为...': 'Veuillez saisir un prompt de traduction personnalisé pour guider le comportement de traduction de l\'IA...',
    '自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。插件提供三个变量：${lang_in}、${lang_out}、${text}，可以用于指定翻译语言和源文本。': 'Les prompts personnalisés peuvent améliorer la qualité de traduction en spécifiant des styles de traduction spécifiques ou des méthodes de traitement de terminologie. Laissez vide pour utiliser le prompt par défaut. Le plugin fournit trois variables : ${lang_in}, ${lang_out}, ${text}, qui peuvent être utilisées pour spécifier les langues de traduction et le texte source.',
    
    // Chemin du modèle
    '模型路径': 'Chemin du Modèle',
    
    // Dépannage
    '如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装': 'Si le plugin échoue ou si la fonction de traduction est anormale, veuillez ouvrir le dossier ci-dessous et cliquer sur le fichier .exe pour installer',
    '打开目录': 'Ouvrir Répertoire',
    
    // Texte d'introduction
    'PDF2ZH 文档智能翻译工具': 'PDF2ZH Outil de Traduction Intelligente de Documents',
    '支持多种翻译服务商，保持原文档格式，提供高质量的PDF文档翻译体验。无论是学术论文、技术文档还是商业报告，都能获得专业的翻译效果。': 'Compatible avec múltiples proveedores de servicios de traducción, mantiene el formato del document original et fournit une expérience de traduction de documents PDF de haute qualité. Que ce soit pour des articles académiques, des documents techniques ou des rapports commerciaux, vous pouvez obtenir des résultats de traduction professionnels.',
    '查看源码': 'Voir le Code Source',
    
    // Avis de sauvegarde
    '配置修改后，请及时保存以免丢失': 'Veuillez sauvegarder rapidement après avoir modifié la configuration pour éviter la perte',
    '保存配置': 'Sauvegarder Configuration',
    
    // Messages d'erreur
    '无法获取Ollama模型列表': 'Impossible d\'obtenir la liste des modèles Ollama',
    '获取Ollama模型列表失败': 'Échec de l\'obtention de la liste des modèles Ollama',
    
    // Lien de documentation
    '查看服务配置文档': 'Voir la documentation de configuration du service',
  },
  
  'de': {
    // Allgemein
    '保存': 'Speichern',
    '重置': 'Zurücksetzen',
    '选择': 'Auswählen',
    '打开': 'Öffnen',
    '刷新': 'Aktualisieren',
    '添加变量': 'Variable hinzufügen',
    '删除': 'Löschen',
    '可选': 'Optional',
    '配置保存成功': 'Konfiguration erfolgreich gespeichert',
    '保存失败，请稍后重试': 'Speichern fehlgeschlagen, bitte später erneut versuchen',
    '配置已重置': 'Konfiguration zurückgesetzt',
    
    // Hauptfunktionen
    '输出路径配置': 'Ausgabepfad-Konfiguration',
    '翻译服务配置': 'Übersetzungsdienst-Konfiguration',
    '自定义Prompt配置': 'Benutzerdefinierte Prompt-Konfiguration',
    '模型路径信息': 'Modellpfad-Informationen',
    '使用故障排除': 'Fehlerbehebung bei der Nutzung',
    
    // Konfigurationselemente
    '输出目录': 'Ausgabeverzeichnis',
    '翻译文件目录（默认）': 'Übersetzungsdatei-Verzeichnis (Standard)',
    '翻译后的文件将保存到此目录，默认与原文件在同一目录': 'Übersetzte Dateien werden in diesem Verzeichnis gespeichert, standardmäßig im selben Verzeichnis wie die Originaldatei',
    '选择文件夹': 'Ordner auswählen',
    
    // Anbieter-Konfiguration
    '自定义服务商': 'Benutzerdefinierter Dienstanbieter',
    '自定义服务商名称': 'Name des benutzerdefinierten Dienstanbieters',
    '请输入自定义服务商名称': 'Bitte geben Sie den Namen des benutzerdefinierten Anbieters ein',
    '环境变量配置': 'Umgebungsvariablen-Konfiguration',
    '暂无配置变量': 'Keine konfigurierten Variablen',
    '点击上方"添加变量"按钮开始配置': 'Klicken Sie auf die Schaltfläche "Variable hinzufügen" oben, um mit der Konfiguration zu beginnen',
    '变量名': 'Variablenname',
    '变量值': 'Variablenwert',
    '如：API_KEY': 'z.B.: API_KEY',
    '请输入变量值': 'Bitte geben Sie den Variablenwert ein',
    '请点击标题旁的问号，参考文档查看支持的服务商，以及对应需要的变量和变量名': 'Bitte klicken Sie auf das Fragezeichen neben dem Titel, um die Dokumentation über unterstützte Dienstanbieter und deren erforderliche Variablen einzusehen',
    
    // Modell-Konfiguration
    '模型选择': 'Modellauswahl',
    '请选择模型': 'Bitte wählen Sie ein Modell',
    '自定义模型': 'Benutzerdefiniertes Modell',
    '请输入自定义模型名称': 'Bitte geben Sie den Namen des benutzerdefinierten Modells ein',
    '选择已安装的Ollama模型，或输入自定义模型名称': 'Wählen Sie ein installiertes Ollama-Modell oder geben Sie einen benutzerdefinierten Modellnamen ein',
    '选择推荐模型或输入自定义模型名称': 'Wählen Sie ein empfohlenes Modell oder geben Sie einen benutzerdefinierten Modellnamen ein',
    
    // API-Konfiguration
    'API密钥': 'API-Schlüssel',
    '请输入API密钥': 'Bitte geben Sie den API-Schlüssel ein',
    '使用此服务商需要提供有效的API密钥': 'Die Verwendung dieses Dienstanbieters erfordert einen gültigen API-Schlüssel',
    '服务端点': 'Service-Endpunkt',
    '自定义服务端点URL': 'Benutzerdefinierte Service-Endpunkt-URL',
    'Ollama服务地址，默认为 http://localhost:11434': 'Ollama-Dienstadresse, Standard ist http://localhost:11434',
    '留空使用默认端点，或根据插件服务需要输入自定义端点地址': 'Leer lassen für Standard-Endpunkt oder benutzerdefinierte Endpunkt-Adresse je nach Plugin-Service-Anforderungen eingeben',
    
    // Prompt-Konfiguration
    '翻译提示词': 'Übersetzungs-Prompt',
    '查看默认提示词': 'Standard-Prompt anzeigen',
    '默认提示词：': 'Standard-Prompt:',
    '应用默认提示词': 'Standard-Prompt anwenden',
    '已应用默认提示词': 'Standard-Prompt angewendet',
    '请输入自定义的翻译提示词，用于指导AI翻译行为...': 'Bitte geben Sie einen benutzerdefinierten Übersetzungs-Prompt ein, um das KI-Übersetzungsverhalten zu steuern...',
    '自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。插件提供三个变量：${lang_in}、${lang_out}、${text}，可以用于指定翻译语言和源文本。': 'Benutzerdefinierte Prompts können die Übersetzungsqualität verbessern, indem sie spezifische Übersetzungsstile oder Terminologie-Behandlungsmethoden festlegen. Leer lassen für Standard-Prompt. Das Plugin bietet drei Variablen: ${lang_in}, ${lang_out}, ${text}, die zur Angabe von Übersetzungssprachen und Quelltext verwendet werden können.',
    
    // Modellpfad
    '模型路径': 'Modellpfad',
    
    // Fehlerbehebung
    '如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装': 'Wenn das Plugin fehlschlägt oder die Übersetzungsfunktion abnormal ist, öffnen Sie bitte den Ordner unten und klicken Sie auf die .exe-Datei zur Installation',
    '打开目录': 'Verzeichnis öffnen',
    
    // Einführungstext
    'PDF2ZH 文档智能翻译工具': 'PDF2ZH Intelligentes Dokumentenübersetzungstool',
    '支持多种翻译服务商，保持原文档格式，提供高质量的PDF文档翻译体验。无论是学术论文、技术文档还是商业报告，都能获得专业的翻译效果。': 'Unterstützt mehrere Übersetzungsdienstanbieter, behält das ursprüngliche Dokumentformat bei und bietet eine hochwertige PDF-Dokumentenübersetzungserfahrung. Ob wissenschaftliche Arbeiten, technische Dokumentationen oder Geschäftsberichte - Sie können professionelle Übersetzungsergebnisse erzielen.',
    '查看源码': 'Quellcode anzeigen',
    
    // Speicher-Hinweis
    '配置修改后，请及时保存以免丢失': 'Bitte speichern Sie zeitnah nach Konfigurationsänderungen, um Verluste zu vermeiden',
    '保存配置': 'Konfiguration speichern',
    
    // Fehlermeldungen
    '无法获取Ollama模型列表': 'Ollama-Modellliste kann nicht abgerufen werden',
    '获取Ollama模型列表失败': 'Abrufen der Ollama-Modellliste fehlgeschlagen',
    
    // Dokumentationslink
    '查看服务配置文档': 'Service-Konfigurationsdokumentation anzeigen',
  },
  
  'it': {
    // Comune
    '保存': 'Salva',
    '重置': 'Ripristina',
    '选择': 'Seleziona',
    '打开': 'Apri',
    '刷新': 'Aggiorna',
    '添加变量': 'Aggiungi Variabile',
    '删除': 'Elimina',
    '可选': 'Opzionale',
    '配置保存成功': 'Configurazione salvata con successo',
    '保存失败，请稍后重试': 'Salvataggio fallito, riprova più tardi',
    '配置已重置': 'Configurazione ripristinata',
    
    // Funzioni principali
    '输出路径配置': 'Configurazione Percorso di Output',
    '翻译服务配置': 'Configurazione Servizio di Traduzione',
    '自定义Prompt配置': 'Configurazione Prompt Personalizzato',
    '模型路径信息': 'Informazioni Percorso Modello',
    '使用故障排除': 'Risoluzione dei Problemi di Utilizzo',
    
    // Elementi di configurazione
    '输出目录': 'Directory di Output',
    '翻译文件目录（默认）': 'Directory file tradotti (predefinita)',
    '翻译后的文件将保存到此目录，默认与原文件在同一目录': 'I file tradotti verranno salvati in questa directory, per impostazione predefinita nella stessa directory del file originale',
    '选择文件夹': 'Seleziona Cartella',
    
    // Configurazione provider
    '自定义服务商': 'Provider di Servizi Personalizzato',
    '自定义服务商名称': 'Nome Provider di Servizi Personalizzato',
    '请输入自定义服务商名称': 'Inserisci il nome del provider personalizzato',
    '环境变量配置': 'Configurazione Variabili di Ambiente',
    '暂无配置变量': 'Nessuna variabile configurata',
    '点击上方"添加变量"按钮开始配置': 'Fai clic sul pulsante "Aggiungi Variabile" sopra per iniziare la configurazione',
    '变量名': 'Nome Variabile',
    '变量值': 'Valore Variabile',
    '如：API_KEY': 'es.: API_KEY',
    '请输入变量值': 'Inserisci il valore della variabile',
    '请点击标题旁的问号，参考文档查看支持的服务商，以及对应需要的变量和变量名': 'Fai clic sul punto interrogativo accanto al titolo per consultare la documentazione sui provider supportati e le loro variabili richieste',
    
    // Configurazione modello
    '模型选择': 'Selezione Modello',
    '请选择模型': 'Seleziona un modello',
    '自定义模型': 'Modello Personalizzato',
    '请输入自定义模型名称': 'Inserisci il nome del modello personalizzato',
    '选择已安装的Ollama模型，或输入自定义模型名称': 'Seleziona un modello Ollama installato o inserisci un nome di modello personalizzato',
    '选择推荐模型或输入自定义模型名称': 'Seleziona un modello raccomandato o inserisci un nome di modello personalizzato',
    
    // Configurazione API
    'API密钥': 'Chiave API',
    '请输入API密钥': 'Inserisci la chiave API',
    '使用此服务商需要提供有效的API密钥': 'L\'uso di questo provider richiede una chiave API valida',
    '服务端点': 'Endpoint del Servizio',
    '自定义服务端点URL': 'URL Endpoint del Servizio Personalizzato',
    'Ollama服务地址，默认为 http://localhost:11434': 'Indirizzo del servizio Ollama, predefinito http://localhost:11434',
    '留空使用默认端点，或根据插件服务需要输入自定义端点地址': 'Lascia vuoto per usare l\'endpoint predefinito, o inserisci un indirizzo personalizzato secondo le esigenze del servizio plugin',
    
    // Configurazione Prompt
    '翻译提示词': 'Prompt di Traduzione',
    '查看默认提示词': 'Visualizza Prompt Predefinito',
    '默认提示词：': 'Prompt Predefinito:',
    '应用默认提示词': 'Applica Prompt Predefinito',
    '已应用默认提示词': 'Prompt predefinito applicato',
    '请输入自定义的翻译提示词，用于指导AI翻译行为...': 'Inserisci un prompt di traduzione personalizzato per guidare il comportamento di traduzione dell\'IA...',
    '自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。插件提供三个变量：${lang_in}、${lang_out}、${text}，可以用于指定翻译语言和源文本。': 'I prompt personalizzati possono migliorare la qualità della traduzione specificando stili di traduzione specifici o metodi di gestione della terminologia. Lascia vuoto per usare il prompt predefinito. Il plugin fornisce tre variabili: ${lang_in}, ${lang_out}, ${text}, che possono essere utilizzate per specificare le lingue di traduzione e il testo sorgente.',
    
    // Percorso modello
    '模型路径': 'Percorso Modello',
    
    // Risoluzione problemi
    '如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装': 'Se il plugin fallisce o la funzione di traduzione è anomala, apri la cartella sottostante e fai clic sul file .exe per installare',
    '打开目录': 'Apri Directory',
    
    // Testo introduttivo
    'PDF2ZH 文档智能翻译工具': 'PDF2ZH Strumento di Traduzione Intelligente di Documenti',
    '支持多种翻译服务商，保持原文档格式，提供高质量的PDF文档翻译体验。无论是学术论文、技术文档还是商业报告，都能获得专业的翻译效果。': 'Supporta più provider di servizi di traduzione, mantiene il formato del documento originale e fornisce un\'esperienza di traduzione di documenti PDF di alta qualità. Che si tratti di articoli accademici, documentazione tecnica o report aziendali, puoi ottenere risultati di traduzione professionali.',
    '查看源码': 'Visualizza Codice Sorgente',
    
    // Avviso di salvataggio
    '配置修改后，请及时保存以免丢失': 'Salva tempestivamente dopo aver modificato la configurazione per evitare perdite',
    '保存配置': 'Salva Configurazione',
    
    // Messaggi di errore
    '无法获取Ollama模型列表': 'Impossibile ottenere l\'elenco dei modelli Ollama',
    '获取Ollama模型列表失败': 'Recupero dell\'elenco dei modelli Ollama fallito',
    
    // Link documentazione
    '查看服务配置文档': 'Visualizza documentazione configurazione servizio',
  },
}

// 获取翻译文本的函数
export function getTranslation(lang: string = 'zh', key: string): string {
  const translation = locales[lang as keyof typeof locales]
  if (translation && translation[key]) {
    return translation[key]
  }
  // 如果找不到翻译，尝试使用默认语言（中文）
  if (lang !== 'zh' && locales['zh'][key]) {
    return locales['zh'][key]
  }
  // 如果都找不到，返回原始键名
  return key
}

// 支持的语言列表
export const supportedLanguages = [
  { code: 'zh', name: '简体中文' },
  { code: 'zh_tw', name: '繁體中文' },
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
] 