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
    
    // 新增的缺失翻译
    '选择翻译服务': '选择翻译服务',
    '服务列表': '服务列表',
    '已保存的服务': '已保存的服务',
    '应用已有服务': '应用已有服务',
    '端点': '端点',
    '添加模型': '添加模型',
    '请输入自定义模型名称，如：gpt-4o-latest': '请输入自定义模型名称，如：gpt-4o-latest',
    '确认': '确认',
    '取消': '取消',
    '按回车键快速添加模型': '按回车键快速添加模型',
    '选择已安装的Ollama模型，或添加自定义模型': '选择已安装的Ollama模型，或添加自定义模型',
    '添加需要的模型，将保存到服务配置中': '添加需要的模型，将保存到服务配置中',
    '添加到服务列表': '添加到服务列表',
    '配置完成后，点击按钮保存当前服务配置': '配置完成后，点击按钮保存当前服务配置',
    '添加到列表': '添加到列表',
    '请先配置API密钥': '请先配置API密钥',
    '请配置模型': '请配置模型',
    '已更新服务配置：': '已更新服务配置：',
    '已添加到服务列表：': '已添加到服务列表：',
    '至少保留一个服务配置': '至少保留一个服务配置',
    '服务删除成功：': '服务删除成功：',
    '请输入模型名称': '请输入模型名称',
    '请先选择服务商': '请先选择服务商',
    '该模型已存在': '该模型已存在',
    '自定义模型添加成功': '自定义模型添加成功',
    '至少保留一个模型': '至少保留一个模型',
    '自定义模型删除成功': '自定义模型删除成功',
    '请选择翻译服务': '请选择翻译服务',
    '未找到选中的服务': '未找到选中的服务',
    '翻译已开始': '翻译已开始',
    '翻译失败，请稍后重试': '翻译失败，请稍后重试',
    '选择服务': '选择服务',
    '目标语言': '目标语言',
    '源语言': '源语言',
    '页面选择': '页面选择',
    '按下面规则填写指定页数，例如：2,4,6，不填则翻译全文': '按下面规则填写指定页数，例如：2,4,6，不填则翻译全文',
    '格式说明：': '格式说明：',
    '单页：2': '单页：2',
    '范围：2,4-6 (第2、4-6页)': '范围：2,4-6 (第2、4-6页)',
    '翻译中...': '翻译中...',
    '开始翻译': '开始翻译',
  },
  
  'zh_tw': {
    // 通用
    '保存': '儲存',
    '重置': '重置',
    '选择': '選擇',
    '打开': '打開',
    '刷新': '重新整理',
    '添加变量': '新增變數',
    '删除': '刪除',
    '可选': '可選',
    '配置保存成功': '設定儲存成功',
    '保存失败，请稍后重试': '儲存失敗，請稍後再試',
    '配置已重置': '設定已重置',
    
    // 主要功能标题
    '输出路径配置': '輸出路徑設定',
    '翻译服务配置': '翻譯服務設定',
    '自定义Prompt配置': '自訂提示詞設定',
    '模型路径信息': '模型路徑資訊',
    '使用故障排除': '使用疑難排解',
    
    // 配置项
    '输出目录': '輸出目錄',
    '翻译文件目录（默认）': '翻譯檔案目錄（預設）',
    '翻译后的文件将保存到此目录，默认与原文件在同一目录': '翻譯後的檔案將儲存到此目錄，預設與原始檔案在同一目錄',
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
    'Ollama服务地址，默认为 http://localhost:11434': 'Ollama服務地址，預設為 http://localhost:11434',
    '留空使用默认端点，或根据插件服务需要输入自定义端点地址': '留空使用預設端點，或根據插件服務需要輸入自訂端點地址',
    
    // Prompt配置
    '翻译提示词': '翻譯提示詞',
    '查看默认提示词': '檢視預設提示詞',
    '默认提示词：': '預設提示詞：',
    '应用默认提示词': '套用預設提示詞',
    '已应用默认提示词': '已套用預設提示詞',
    '请输入自定义的翻译提示词，用于指导AI翻译行为...': '請輸入自訂的翻譯提示詞，用於指導AI翻譯行為...',
    '自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。插件提供三个变量：${lang_in}、${lang_out}、${text}，可以用于指定翻译语言和源文本。': '自訂提示詞可以改善翻譯品質，指定特定的翻譯風格或術語處理方式。留空使用預設提示詞。插件提供三個變數：${lang_in}、${lang_out}、${text}，可以用於指定翻譯語言和原始文字。',
    
    // 模型路径
    '模型路径': '模型路徑',
    
    // 故障排除
    '如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装': '如果插件使用失敗或翻譯功能異常，請打開下方資料夾點擊.exe檔案安裝',
    '打开目录': '開啟目錄',
    
    // 介绍文案
    'PDF2ZH 文档智能翻译工具': 'PDF2ZH 文件智能翻譯工具',
    '支持多种翻译服务商，保持原文档格式，提供高质量的PDF文档翻译体验。无论是学术论文、技术文档还是商业报告，都能获得专业的翻译效果。': '支援多種翻譯服務商，保持原始文件格式，提供高品質的PDF文件翻譯體驗。無論是學術論文、技術文件還是商業報告，都能獲得專業的翻譯效果。',
    '查看源码': '檢視原始碼',
    
    // 保存提示
    '配置修改后，请及时保存以免丢失': '設定修改後，請及時儲存以免遺失',
    '保存配置': '儲存設定',
    
    // 错误提示
    '无法获取Ollama模型列表': '無法取得Ollama模型列表',
    '获取Ollama模型列表失败': '取得Ollama模型列表失敗',
    
    // 文档链接
    '查看服务配置文档': '檢視服務設定文件',
    
    // 新增的缺失翻译
    '选择翻译服务': '選擇翻譯服務',
    '服务列表': '服務列表',
    '已保存的服务': '已儲存的服務',
    '应用已有服务': '套用現有服務',
    '端点': '端點',
    '添加模型': '新增模型',
    '请输入自定义模型名称，如：gpt-4o-latest': '請輸入自訂模型名稱，如：gpt-4o-latest',
    '确认': '確認',
    '取消': '取消',
    '按回车键快速添加模型': '按Enter鍵快速新增模型',
    '选择已安装的Ollama模型，或添加自定义模型': '選擇已安裝的Ollama模型，或新增自訂模型',
    '添加需要的模型，将保存到服务配置中': '新增需要的模型，將儲存到服務設定中',
    '添加到服务列表': '新增到服務列表',
    '配置完成后，点击按钮保存当前服务配置': '設定完成後、點擊按鈕儲存目前的服務設定',
    '添加到列表': '新增到列表',
    '请先配置API密钥': '請先設定API金鑰',
    '请配置模型': '請設定模型',
    '已更新服务配置：': '已更新服務設定：',
    '已添加到服务列表：': '已新增到服務列表：',
    '至少保留一个服务配置': '至少保留一個服務設定',
    '服务删除成功：': '服務刪除成功：',
    '请输入模型名称': '請輸入模型名稱',
    '请先选择服务商': '請先選擇服務商',
    '该模型已存在': '該模型已存在',
    '自定义模型添加成功': '自訂模型新增成功',
    '至少保留一个模型': '至少保留一個模型',
    '自定义模型删除成功': '自訂模型刪除成功',
    '请选择翻译服务': '請選擇翻譯服務',
    '未找到选中的服务': '未找到選中的服務',
    '翻译已开始': '翻譯已開始',
    '翻译失败，请稍后重试': '翻譯失敗，請稍後再試',
    '选择服务': '選擇服務',
    '目标语言': '目標語言',
    '源语言': '原始語言',
    '页面选择': '頁面選擇',
    '按下面规则填写指定页数，例如：2,4,6，不填则翻译全文': '按下面規則填寫指定頁數，例如：2,4,6，不填則翻譯全文',
    '格式说明：': '格式說明：',
    '单页：2': '單頁：2',
    '范围：2,4-6 (第2、4-6页)': '範圍：2,4-6 (第2、4-6頁)',
    '翻译中...': '翻譯中...',
    '开始翻译': '開始翻譯',
  },
  
  'en': {
    // Common
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
    '配置已重置': 'Configuration reset',
    
    // Main Function Titles
    '输出路径配置': 'Output Path Configuration',
    '翻译服务配置': 'Translation Service Configuration',
    '自定义Prompt配置': 'Custom Prompt Configuration',
    '模型路径信息': 'Model Path Information',
    '使用故障排除': 'Troubleshooting',
    
    // Configuration Items
    '输出目录': 'Output Directory',
    '翻译文件目录（默认）': 'Translated File Directory (Default)',
    '翻译后的文件将保存到此目录，默认与原文件在同一目录': 'Translated files will be saved to this directory, by default in the same directory as the original file',
    '选择文件夹': 'Select Folder',
    
    // Service Provider Configuration
    '自定义服务商': 'Custom Service Provider',
    '自定义服务商名称': 'Custom Service Provider Name',
    '请输入自定义服务商名称': 'Enter custom service provider name',
    '环境变量配置': 'Environment Variable Configuration',
    '暂无配置变量': 'No configuration variables',
    '点击上方"添加变量"按钮开始配置': 'Click the "Add Variable" button above to start configuration',
    '变量名': 'Variable Name',
    '变量值': 'Variable Value',
    '如：API_KEY': 'e.g. API_KEY',
    '请输入变量值': 'Enter variable value',
    '请点击标题旁的问号，参考文档查看支持的服务商，以及对应需要的变量和变量名': 'Click the question mark next to the title to view the documentation on supported service providers and the required variables and variable names',
    
    // Model Configuration
    '模型选择': 'Model Selection',
    '请选择模型': 'Select a model',
    '自定义模型': 'Custom Model',
    '请输入自定义模型名称': 'Enter custom model name',
    '选择已安装的Ollama模型，或输入自定义模型名称': 'Select an installed Ollama model, or enter a custom model name',
    '选择推荐模型或输入自定义模型名称': 'Select a recommended model or enter a custom model name',
    
    // API Configuration
    'API密钥': 'API Key',
    '请输入API密钥': 'Enter API key',
    '使用此服务商需要提供有效的API密钥': 'Using this service provider requires a valid API key',
    '服务端点': 'Service Endpoint',
    '自定义服务端点URL': 'Custom Service Endpoint URL',
    'Ollama服务地址，默认为 http://localhost:11434': 'Ollama service address, default http://localhost:11434',
    '留空使用默认端点，或根据插件服务需要输入自定义端点地址': 'Leave blank to use the default endpoint, or enter a custom endpoint address as required by the plugin service',
    
    // Prompt Configuration
    '翻译提示词': 'Translation Prompt',
    '查看默认提示词': 'View Default Prompt',
    '默认提示词：': 'Default Prompt:',
    '应用默认提示词': 'Apply Default Prompt',
    '已应用默认提示词': 'Default prompt applied',
    '请输入自定义的翻译提示词，用于指导AI翻译行为...': 'Enter a custom translation prompt to guide AI translation behavior...',
    '自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。插件提供三个变量：${lang_in}、${lang_out}、${text}，可以用于指定翻译语言和源文本。': 'Custom prompts can improve translation quality by specifying translation styles or terminology handling. Leave blank to use the default prompt. The plugin provides three variables: ${lang_in}, ${lang_out}, ${text}, which can be used to specify translation languages and source text.',
    
    // Model Path
    '模型路径': 'Model Path',
    
    // Troubleshooting
    '如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装': 'If the plugin fails or the translation feature is abnormal, open the folder below and click the .exe file to install',
    '打开目录': 'Open Directory',
    
    // Introduction
    'PDF2ZH 文档智能翻译工具': 'PDF2ZH Document Intelligent Translation Tool',
    '支持多种翻译服务商，保持原文档格式，提供高质量的PDF文档翻译体验。无论是学术论文、技术文档还是商业报告，都能获得专业的翻译效果。': 'Supports multiple translation service providers, maintains the original document format, and provides a high-quality PDF document translation experience. Whether it\'s academic papers, technical documents, or business reports, you can get professional translation results.',
    '查看源码': 'View Source Code',
    
    // Save Prompt
    '配置修改后，请及时保存以免丢失': 'Save promptly after modifying the configuration to avoid loss',
    '保存配置': 'Save Configuration',
    
    // Error Messages
    '无法获取Ollama模型列表': 'Unable to get Ollama model list',
    '获取Ollama模型列表失败': 'Failed to get Ollama model list',
    
    // Documentation Links
    '查看服务配置文档': 'View Service Configuration Documentation',
    
    // Additional Missing Translations
    '选择翻译服务': 'Select Translation Service',
    '服务列表': 'Service List',
    '已保存的服务': 'Saved Services',
    '应用已有服务': 'Apply Existing Service',
    '端点': 'Endpoint',
    '添加模型': 'Add Model',
    '请输入自定义模型名称，如：gpt-4o-latest': 'Enter custom model name, e.g. gpt-4o-latest',
    '确认': 'Confirm',
    '取消': 'Cancel',
    '按回车键快速添加模型': 'Press Enter to add model quickly',
    '选择已安装的Ollama模型，或添加自定义模型': 'Select an installed Ollama model, or add a custom model',
    '添加需要的模型，将保存到服务配置中': 'Add the required models, they will be saved in the service configuration',
    '添加到服务列表': 'Add to Service List',
    '配置完成后，点击按钮保存当前服务配置': 'After completing the configuration, click the button to save the current service configuration',
    '添加到列表': 'Add to List',
    '请先配置API密钥': 'Configure API key first',
    '请配置模型': 'Configure the model',
    '已更新服务配置：': 'Service configuration updated: ',
    '已添加到服务列表：': 'Added to service list: ',
    '至少保留一个服务配置': 'Keep at least one service configuration',
    '服务删除成功：': 'Service deleted successfully: ',
    '请输入模型名称': 'Enter model name',
    '请先选择服务商': 'Select service provider first',
    '该模型已存在': 'This model already exists',
    '自定义模型添加成功': 'Custom model added successfully',
    '至少保留一个模型': 'Keep at least one model',
    '自定义模型删除成功': 'Custom model deleted successfully',
    '请选择翻译服务': 'Select translation service',
    '未找到选中的服务': 'Selected service not found',
    '翻译已开始': 'Translation started',
    '翻译失败，请稍后重试': 'Translation failed, please try again later',
    '选择服务': 'Select Service',
    '目标语言': 'Target Language',
    '源语言': 'Source Language',
    '页面选择': 'Page Selection',
    '按下面规则填写指定页数，例如：2,4,6，不填则翻译全文': 'Fill in the specific page numbers according to the following rules, e.g. 2,4,6, leave blank to translate the entire document',
    '格式说明：': 'Format Description:',
    '单页：2': 'Single Page: 2',
    '范围：2,4-6 (第2、4-6页)': 'Range: 2,4-6 (pages 2, 4-6)',
    '翻译中...': 'Translating...',
    '开始翻译': 'Start Translation',
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
    '配置保存成功': '設定を保存しました',
    '保存失败，请稍后重试': '保存に失敗しました。後でもう一度お試しください',
    '配置已重置': '設定をリセットしました',
    
    // 主要功能标题
    '输出路径配置': '出力パス設定',
    '翻译服务配置': '翻訳サービス設定',
    '自定义Prompt配置': 'カスタムプロンプト設定',
    '模型路径信息': 'モデルパス情報',
    '使用故障排除': 'トラブルシューティング',
    
    // 配置项
    '输出目录': '出力ディレクトリ',
    '翻译文件目录（默认）': '翻訳ファイルディレクトリ（デフォルト）',
    '翻译后的文件将保存到此目录，默认与原文件在同一目录': '翻訳されたファイルはこのディレクトリに保存されます。デフォルトでは元のファイルと同じディレクトリです',
    '选择文件夹': 'フォルダを選択',
    
    // サービスプロバイダー設定
    '自定义服务商': 'カスタムサービスプロバイダー',
    '自定义服务商名称': 'カスタムサービスプロバイダー名',
    '请输入自定义服务商名称': 'カスタムサービスプロバイダー名を入力してください',
    '环境变量配置': '環境変数設定',
    '暂无配置变量': '設定変数なし',
    '点击上方"添加变量"按钮开始配置': '上の「変数を追加」ボタンをクリックして設定を開始',
    '变量名': '変数名',
    '变量值': '変数値',
    '如：API_KEY': '例：API_KEY',
    '请输入变量值': '変数値を入力してください',
    '请点击标题旁的问号，参考文档查看支持的服务商，以及对应需要的变量和变量名': 'タイトル横のクエスチョンマークをクリックして、サポートされているサービスプロバイダーと必要な変数・変数名についてドキュメントを参照してください',
    
    // モデル設定
    '模型选择': 'モデル選択',
    '请选择模型': 'モデルを選択してください',
    '自定义模型': 'カスタムモデル',
    '请输入自定义模型名称': 'カスタムモデル名を入力してください',
    '选择已安装的Ollama模型，或输入自定义模型名称': 'インストール済みのOllamaモデルを選択するか、カスタムモデル名を入力してください',
    '选择推荐模型或输入自定义模型名称': '推奨モデルを選択するか、カスタムモデル名を入力してください',
    
    // API設定
    'API密钥': 'APIキー',
    '请输入API密钥': 'APIキーを入力してください',
    '使用此服务商需要提供有效的API密钥': 'このサービスプロバイダーを使用するには、有効なAPIキーが必要です',
    '服务端点': 'サービスエンドポイント',
    '自定义服务端点URL': 'カスタムサービスエンドポイントURL',
    'Ollama服务地址，默认为 http://localhost:11434': 'Ollamaサービスアドレス、デフォルトは http://localhost:11434',
    '留空使用默认端点，或根据插件服务需要输入自定义端点地址': '空白にしてデフォルトエンドポイントを使用するか、プラグインサービスの要件に応じてカスタムエンドポイントアドレスを入力してください',
    
    // プロンプト設定
    '翻译提示词': '翻訳プロンプト',
    '查看默认提示词': 'デフォルトプロンプトを表示',
    '默认提示词：': 'デフォルトプロンプト：',
    '应用默认提示词': 'デフォルトプロンプトを適用',
    '已应用默认提示词': 'デフォルトプロンプトが適用されました',
    '请输入自定义的翻译提示词，用于指导AI翻译行为...': 'AI翻訳動作を指導するためのカスタム翻訳プロンプトを入力してください...',
    '自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。插件提供三个变量：${lang_in}、${lang_out}、${text}，可以用于指定翻译语言和源文本。': 'カスタムプロンプトは翻訳品質を向上させ、特定の翻訳スタイルや用語処理方法を指定できます。空白にするとデフォルトプロンプトを使用します。プラグインは${lang_in}、${lang_out}、${text} の3つの変数を提供し、翻訳言語とソーステキストの指定に使用できます。',
    
    // モデルパス
    '模型路径': 'モデルパス',
    
    // トラブルシューティング
    '如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装': 'プラグインの使用が失敗したり翻訳機能が異常な場合は、下のフォルダを開いて.exeファイルをクリックしてインストールしてください',
    '打开目录': 'ディレクトリを開く',
    
    // 紹介
    'PDF2ZH 文档智能翻译工具': 'PDF2ZH インテリジェント文書翻訳ツール',
    '支持多种翻译服务商，保持原文档格式，提供高质量的PDF文档翻译体验。无论是学术论文、技术文档还是商业报告，都能获得专业的翻译效果。': '複数の翻訳サービスプロバイダーをサポートし、元の文書形式を維持して、高品質なPDF文書翻訳体験を提供します。学術論文、技術文書、ビジネスレポートなど、どんなものでも専門的な翻訳効果を得ることができます。',
    '查看源码': 'ソースコードを表示',
    
    // 保存プロンプト
    '配置修改后，请及时保存以免丢失': '設定変更後は、紛失を避けるため早めに保存してください',
    '保存配置': '設定を保存',
    
    // エラーメッセージ
    '无法获取Ollama模型列表': 'Ollamaモデルリストを取得できません',
    '获取Ollama模型列表失败': 'Ollamaモデルリストの取得に失敗しました',
    
    // ドキュメントリンク
    '查看服务配置文档': 'サービス設定ドキュメントを表示',
    
    // 追加の欠落翻訳
    '选择翻译服务': '翻訳サービスを選択',
    '服务列表': 'サービスリスト',
    '已保存的服务': '保存済みサービス',
    '应用已有服务': '既存サービスを適用',
    '端点': 'エンドポイント',
    '添加模型': 'モデルを追加',
    '请输入自定义模型名称，如：gpt-4o-latest': 'カスタムモデル名を入力してください、例：gpt-4o-latest',
    '确认': '確認',
    '取消': 'キャンセル',
    '按回车键快速添加模型': 'Enterキーを押してモデルを迅速に追加',
    '选择已安装的Ollama模型，或添加自定义模型': 'インストール済みのOllamaモデルを選択するか、カスタムモデルを追加',
    '添加需要的模型，将保存到服务配置中': '必要なモデルを追加、サービス設定に保存されます',
    '添加到服务列表': 'サービスリストに追加',
    '配置完成后，点击按钮保存当前服务配置': '設定完了後、ボタンをクリックして現在のサービス設定を保存',
    '添加到列表': 'リストに追加',
    '请先配置API密钥': '最初にAPIキーを設定してください',
    '请配置模型': 'モデルを設定してください',
    '已更新服务配置：': 'サービス設定が更新されました：',
    '已添加到服务列表：': 'サービスリストに追加されました：',
    '至少保留一个服务配置': '少なくとも1つのサービス設定を保持してください',
    '服务删除成功：': 'サービスが正常に削除されました：',
    '请输入模型名称': 'モデル名を入力してください',
    '请先选择服务商': '最初にサービスプロバイダーを選択してください',
    '该模型已存在': 'このモデルは既に存在します',
    '自定义模型添加成功': 'カスタムモデルが正常に追加されました',
    '至少保留一个模型': '少なくとも1つのモデルを保持してください',
    '自定义模型删除成功': 'カスタムモデルが正常に削除されました',
    '请选择翻译服务': '翻訳サービスを選択してください',
    '未找到选中的服务': '選択されたサービスが見つかりません',
    '翻译已开始': '翻訳が開始されました',
    '翻译失败，请稍后重试': '翻訳に失敗しました。しばらくしてから再試行してください',
    '选择服务': 'サービスを選択',
    '目标语言': 'ターゲット言語',
    '源语言': 'ソース言語',
    '页面选择': 'ページ選択',
    '按下面规则填写指定页数，例如：2,4,6，不填则翻译全文': 'アドバイスに従って特定のページ番号を入力、例：2,4,6、空白の場合は全文翻訳',
    '格式说明：': 'フォーマット説明:',
    '单页：2': '単一ページ: 2',
    '范围：2,4-6 (第2、4-6页)': '範囲: 2,4-6 (2, 4-6ページ)',
    '翻译中...': '翻訳中...',
    '开始翻译': '翻訳開始',
  },
  
  'ko': {
    // 공통
    '保存': '저장',
    '重置': '재설정',
    '选择': '선택',
    '打开': '열기',
    '刷新': '새로고침',
    '添加变量': '변수 추가',
    '删除': '삭제',
    '可选': '선택사항',
    '配置保存成功': '구성이 성공적으로 저장되었습니다',
    '保存失败，请稍后重试': '저장에 실패했습니다. 나중에 다시 시도해주세요',
    '配置已重置': '구성이 재설정되었습니다',
    
    // 주요 기능 제목
    '输出路径配置': '출력 경로 구성',
    '翻译服务配置': '번역 서비스 구성',
    '自定义Prompt配置': '사용자 정의 프롬프트 구성',
    '模型路径信息': '모델 경로 정보',
    '使用故障排除': '사용 문제 해결',
    
    // 구성 항목
    '输出目录': '출력 디렉토리',
    '翻译文件目录（默认）': '번역 파일 디렉토리 (기본값)',
    '翻译后的文件将保存到此目录，默认与原文件在同一目录': '번역된 파일이 이 디렉토리에 저장됩니다. 기본적으로 원본 파일과 같은 디렉토리입니다',
    '选择文件夹': '폴더 선택',
    
    // 서비스 제공업체 구성
    '自定义服务商': '사용자 정의 서비스 제공업체',
    '自定义服务商名称': '사용자 정의 서비스 제공업체 이름',
    '请输入自定义服务商名称': '사용자 정의 서비스 제공업체 이름을 입력하세요',
    '环境变量配置': '환경 변수 구성',
    '暂无配置变量': '구성 변수 없음',
    '点击上方"添加变量"按钮开始配置': '위의 "변수 추가" 버튼을 클릭하여 구성을 시작하세요',
    '变量名': '변수명',
    '变量值': '변수값',
    '如：API_KEY': '예: API_KEY',
    '请输入变量值': '변수값을 입력하세요',
    '请点击标题旁的问号，参考文档查看支持的服务商，以及对应需要的变量和变量名': '제목 옆의 물음표를 클릭하여 지원되는 서비스 제공업체와 필요한 변수 및 변수명에 대한 문서를 참조하세요',
    
    // 모델 구성
    '模型选择': '모델 선택',
    '请选择模型': '모델을 선택하세요',
    '自定义模型': '사용자 정의 모델',
    '请输入自定义模型名称': '사용자 정의 모델명을 입력하세요',
    '选择已安装的Ollama模型，或输入自定义模型名称': '설치된 Ollama 모델을 선택하거나 사용자 정의 모델명을 입력하세요',
    '选择推荐模型或输入自定义模型名称': '추천 모델을 선택하거나 사용자 정의 모델명을 입력하세요',
    
    // API 구성
    'API密钥': 'API 키',
    '请输入API密钥': 'API 키를 입력하세요',
    '使用此服务商需要提供有效的API密钥': '이 서비스 제공업체를 사용하려면 유효한 API 키가 필요합니다',
    '服务端点': '서비스 엔드포인트',
    '自定义服务端点URL': '사용자 정의 서비스 엔드포인트 URL',
    'Ollama服务地址，默认为 http://localhost:11434': 'Ollama 서비스 주소, 기본값은 http://localhost:11434',
    '留空使用默认端点，或根据插件服务需要输入自定义端点地址': '기본 엔드포인트를 사용하려면 비워두거나, 플러그인 서비스 요구사항에 따라 사용자 정의 엔드포인트 주소를 입력하세요',
    
    // 프롬프트 구성
    '翻译提示词': '번역 프롬프트',
    '查看默认提示词': '기본 프롬프트 보기',
    '默认提示词：': '기본 프롬프트:',
    '应用默认提示词': '기본 프롬프트 적용',
    '已应用默认提示词': '기본 프롬프트가 적용되었습니다',
    '请输入自定义的翻译提示词，用于指导AI翻译行为...': 'AI 번역 동작을 안내하기 위한 사용자 정의 번역 프롬프트를 입력하세요...',
    '自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。插件提供三个变量：${lang_in}、${lang_out}、${text}，可以用于指定翻译语言和源文本。': '사용자 정의 프롬프트는 특정 번역 스타일이나 용어 처리 방식을 지정하여 번역 품질을 개선할 수 있습니다. 비워두면 기본 프롬프트를 사용합니다. 플러그인은 ${lang_in}, ${lang_out}, ${text} 세 개의 변수를 제공하며, 번역 언어와 소스 텍스트 지정에 사용할 수 있습니다.',
    
    // 모델 경로
    '模型路径': '모델 경로',
    
    // 문제 해결
    '如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装': '플러그인 사용이 실패하거나 번역 기능이 비정상적인 경우, 아래 폴더를 열고 .exe 파일을 클릭하여 설치하세요',
    '打开目录': '디렉토리 열기',
    
    // 소개
    'PDF2ZH 文档智能翻译工具': 'PDF2ZH 지능형 문서 번역 도구',
    '支持多种翻译服务商，保持原文档格式，提供高质量的PDF文档翻译体验。无论是学术论文、技术文档还是商业报告，都能获得专业的翻译效果。': '다양한 번역 서비스 제공업체를 지원하고, 원본 문서 형식을 유지하며, 고품질 PDF 문서 번역 경험을 제공합니다. 학술 논문, 기술 문서, 비즈니스 보고서 등 어떤 것이든 전문적인 번역 결과를 얻을 수 있습니다.',
    '查看源码': '소스 코드 보기',
    
    // 저장 프롬프트
    '配置修改后，请及时保存以免丢失': '구성 변경 후 손실을 방지하기 위해 즉시 저장하세요',
    '保存配置': '구성 저장',
    
    // 오류 메시지
    '无法获取Ollama模型列表': 'Ollama 모델 목록을 가져올 수 없습니다',
    '获取Ollama模型列表失败': 'Ollama 모델 목록 가져오기 실패',
    
    // 문서 링크
    '查看服务配置文档': '서비스 구성 문서 보기',
    
    // 추가 누락 번역
    '选择翻译服务': '번역 서비스 선택',
    '服务列表': '서비스 목록',
    '已保存的服务': '저장된 서비스',
    '应用已有服务': '기존 서비스 적용',
    '端点': '엔드포인트',
    '添加模型': '모델 추가',
    '请输入自定义模型名称，如：gpt-4o-latest': '사용자 정의 모델명을 입력하세요, 예: gpt-4o-latest',
    '确认': '확인',
    '取消': '취소',
    '按回车键快速添加模型': 'Enter 키를 눌러 빠르게 모델 추가',
    '选择已安装的Ollama模型，或添加自定义模型': '설치된 Ollama 모델을 선택하거나 사용자 정의 모델 추가',
    '添加需要的模型，将保存到服务配置中': '필요한 모델을 추가하면 서비스 구성에 저장됩니다',
    '添加到服务列表': '서비스 목록에 추가',
    '配置完成后，点击按钮保存当前服务配置': '구성 완료 후 버튼을 클릭하여 현재 서비스 구성 저장',
    '添加到列表': '목록에 추가',
    '请先配置API密钥': 'API 키를 먼저 구성하세요',
    '请配置模型': '모델을 구성하세요',
    '已更新服务配置：': '서비스 구성이 업데이트되었습니다: ',
    '已添加到服务列表：': '서비스 목록에 추가되었습니다: ',
    '至少保留一个服务配置': '최소 하나의 서비스 구성을 유지하세요',
    '服务删除成功：': '서비스가 성공적으로 삭제되었습니다: ',
    '请输入模型名称': '모델명을 입력하세요',
    '请先选择服务商': '서비스 제공업체를 먼저 선택하세요',
    '该模型已存在': '이 모델은 이미 존재합니다',
    '自定义模型添加成功': '사용자 정의 모델이 성공적으로 추가되었습니다',
    '至少保留一个模型': '최소 하나의 모델을 유지하세요',
    '自定义模型删除成功': '사용자 정의 모델이 성공적으로 삭제되었습니다',
    '请选择翻译服务': '번역 서비스를 선택하세요',
    '未找到选中的服务': '선택한 서비스를 찾을 수 없습니다',
    '翻译已开始': '번역이 시작되었습니다',
    '翻译失败，请稍后重试': '번역에 실패했습니다. 나중에 다시 시도하세요',
    '选择服务': '서비스 선택',
    '目标语言': '타겟 언어',
    '源语言': '소스 언어',
    '页面选择': '페이지 선택',
    '按下面规则填写指定页数，例如：2,4,6，不填则翻译全文': '아래 규칙에 따라 지정 페이지 번호를 입력하세요, 예: 2,4,6, 비워두면 전체 문서 번역',
    '格式说明：': '형식 설명:',
    '单页：2': '단일 페이지: 2',
    '范围：2,4-6 (第2、4-6页)': '범위: 2,4-6 (2, 4-6페이지)',
    '翻译中...': '번역 중...',
    '开始翻译': '번역 시작',
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
    '保存失败，请稍后重试': 'Error al guardar, intente nuevamente más tarde',
    '配置已重置': 'Configuración restablecida',
    
    // Títulos de Funciones Principales
    '输出路径配置': 'Configuración de Ruta de Salida',
    '翻译服务配置': 'Configuración del Servicio de Traducción',
    '自定义Prompt配置': 'Configuración de Prompt Personalizado',
    '模型路径信息': 'Información de Ruta del Modelo',
    '使用故障排除': 'Solución de Problemas de Uso',
    
    // Elementos de Configuración
    '输出目录': 'Directorio de Salida',
    '翻译文件目录（默认）': 'Directorio de Archivos Traducidos (Predeterminado)',
    '翻译后的文件将保存到此目录，默认与原文件en同一目录': 'Los archivos traducidos se guardarán en este directorio, por defecto en el mismo directorio que el archivo original',
    '选择文件夹': 'Seleccionar Carpeta',
    
    // Configuración del Proveedor de Servicios
    '自定义服务商': 'Proveedor de Servicio Personalizado',
    '自定义服务商名称': 'Nombre del Proveedor de Servicio Personalizado',
    '请输入自定义服务商名称': 'Ingrese el nombre del proveedor de servicio personalizado',
    '环境变量配置': 'Configuración de Variables de Entorno',
    '暂无配置变量': 'Sin variables de configuración',
    '点击上方"添加变量"按钮开始配置': 'Haga clic en el botón "Agregar Variable" arriba para comenzar la configuración',
    '变量名': 'Nombre de Variable',
    '变量值': 'Valor de Variable',
    '如：API_KEY': 'ej.: API_KEY',
    '请输入变量值': 'Ingrese el valor de la variable',
    '请点击标题旁的问号，参考文档查看支持的服务商，以及对应需要的变量和变量名': 'Haga clic en el signo de interrogación junto al título para consultar la documentación sobre los proveedores de servicios compatibles y las variables y nombres de variables requeridos',
    
    // Configuración del Modelo
    '模型选择': 'Selección de Modelo',
    '请选择模型': 'Seleccione un modelo',
    '自定义模型': 'Modelo Personalizado',
    '请输入自定义模型名称': 'Ingrese el nombre del modelo personalizado',
    '选择已安装的Ollama模型，或输入自定义模型名称': 'Seleccione un modelo Ollama instalado, o ingrese un nombre de modelo personalizado',
    '选择推荐模型或输入自定义模型名称': 'Seleccione un modelo recomendado o ingrese un nombre de modelo personalizado',
    
    // Configuración API
    'API密钥': 'Clave API',
    '请输入API密钥': 'Ingrese la clave API',
    '使用此服务商需要提供有效的API密钥': 'Usar este proveedor de servicios requiere una clave API válida',
    '服务端点': 'Punto de Conexión del Servicio',
    '自定义服务端点URL': 'URL del Punto de Conexión del Servicio Personalizado',
    'Ollama服务地址，默认为 http://localhost:11434': 'Dirección del servicio Ollama, por defecto http://localhost:11434',
    '留空使用默认端点，或根据插件服务需要输入自定义端点地址': 'Deje en blanco para usar el punto de conexión predeterminado, o ingrese una dirección de punto de conexión personalizada según los requisitos del servicio del complemento',
    
    // Configuración de Prompt
    '翻译提示词': 'Prompt de Traducción',
    '查看默认提示词': 'Ver Prompt Predeterminado',
    '默认提示词：': 'Prompt Predeterminado:',
    '应用默认提示词': 'Aplicar Prompt Predeterminado',
    '已应用默认提示词': 'Prompt predeterminado aplicado',
    '请输入自定义的翻译提示词，用于指导AI翻译行为...': 'Ingrese un prompt de traducción personalizado para guiar el comportamiento de traducción de la IA...',
    '自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。插件提供三个变量：${lang_in}、${lang_out}、${text}，可以用于指定翻译语言和源文本。': 'Los prompts personalizados pueden mejorar la calidad de la traducción especificando estilos de traducción particuliers o métodos de manejo de terminología. Deje en blanco para usar el prompt predeterminado. El complemento proporciona tres variables: ${lang_in}, ${lang_out}, ${text}, que se pueden usar para especificar idiomas de traducción y texto fuente.',
    
    // Ruta del Modelo
    '模型路径': 'Ruta del Modelo',
    
    // Solución de Problemas
    '如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装': 'Si el complemento falla o la función de traducción es anormal, abra la carpeta de abajo y haga clic en el archivo .exe para instalar',
    '打开目录': 'Abrir Directorio',
    
    // Introducción
    'PDF2ZH 文档智能翻译工具': 'PDF2ZH Herramienta de Traducción Inteligente de Documentos',
    '支持多种翻译服务商，保持原文档格式，提供高质量的PDF文档翻译体验。无论是学术论文、技术文档还是商业报告，都能获得专业的翻译效果。': 'Admite múltiples proveedores de servicios de traducción, mantiene el formato del documento original y proporciona una experiencia de traducción de documentos PDF de alta calidad. Ya sean artículos académicos, documentos técnicos o informes comerciales, puede obtener resultados de traducción profesionales.',
    '查看源码': 'Ver Código Fuente',
    
    // Prompt de Guardado
    '配置修改后，请及时保存以免丢失': 'Guarde rápidamente después de modificar la configuración para evitar pérdidas',
    '保存配置': 'Guardar Configuración',
    
    // Mensajes de Error
    '无法获取Ollama模型列表': 'No se puede obtener la lista de modelos Ollama',
    '获取Ollama模型列表失败': 'Failed to get Ollama model list',
    
    // Enlaces de Documentación
    '查看服务配置文档': 'Ver Documentación de Configuración del Servicio',
    
    // Traducciones Faltantes Adicionales
    '选择翻译服务': 'Seleccionar Servicio de Traducción',
    '服务列表': 'Lista de Servicios',
    '已保存的服务': 'Servicios Guardados',
    '应用已有服务': 'Aplicar Servicio Existente',
    '端点': 'Punto de Conexión',
    '添加模型': 'Agregar Modelo',
    '请输入自定义模型名称，如：gpt-4o-latest': 'Ingrese el nombre del modelo personalizado, ej.: gpt-4o-latest',
    '确认': 'Confirmar',
    '取消': 'Cancelar',
    '按回车键快速添加模型': 'Presione Enter para agregar modelo rápidamente',
    '选择已安装的Ollama模型，或添加自定义模型': 'Seleccione un modelo Ollama instalado, o agregue un modelo personalizado',
    '添加需要的模型，将保存到服务配置中': 'Agregue los modelos necesarios, se guardarán en la configuración del servicio',
    '添加到服务列表': 'Agregar a Lista de Servicios',
    '配置完成后，点击按钮保存当前服务配置': 'Después de completar la configuración, haga clic en el botón para guardar la configuración del servicio actual',
    '添加到列表': 'Agregar a Lista',
    '请先配置API密钥': 'Configure primero la clave API',
    '请配置模型': 'Configure el modelo',
    '已更新服务配置：': 'Configuración del servicio actualizada: ',
    '已添加到服务列表：': 'Agregado a la lista de servicios: ',
    '至少保留一个服务配置': 'Mantenga al menos una configuración de servicio',
    '服务删除成功：': 'Servicio eliminado exitosamente: ',
    '请输入模型名称': 'Ingrese el nombre del modelo',
    '请先选择服务商': 'Seleccione primero el proveedor de servicios',
    '该模型已存在': 'Este modelo ya existe',
    '自定义模型添加成功': 'Modelo personalizado agregado exitosamente',
    '至少保留一个模型': 'Mantenga al menos un modelo',
    '自定义模型删除成功': 'Modelo personalizado eliminado exitosamente',
    '请选择翻译服务': 'Seleccione el servicio de traducción',
    '未找到选中的服务': 'Servicio seleccionado no encontrado',
    '翻译已开始': 'Traducción iniciada',
    '翻译失败，请稍后重试': 'Traducción fallida, intente nuevamente más tarde',
    '选择服务': 'Seleccionar Servicio',
    '目标语言': 'Idioma de Destino',
    '源语言': 'Idioma de Origen',
    '页面选择': 'Selección de Páginas',
    '按下面规则填写指定页数，例如：2,4,6，不填则翻译全文': 'Complete los números de página específicos según las reglas a continuación, ej.: 2,4,6, deje en blanco para traducir todo el documento',
    '格式说明：': 'Descripción del Formato:',
    '单页：2': 'Página única: 2',
    '范围：2,4-6 (第2、4-6页)': 'Rango: 2,4-6 (páginas 2, 4-6)',
    '翻译中...': 'Traduciendo...',
    '开始翻译': 'Iniciar Traducción',
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
    
    // Titres des Fonctions Principales
    '输出路径配置': 'Configuration du Chemin de Sortie',
    '翻译服务配置': 'Configuration du Service de Traduction',
    '自定义Prompt配置': 'Configuration du Prompt Personnalisé',
    '模型路径信息': 'Informations sur le Chemin du Modèle',
    '使用故障排除': 'Dépannage d\'Utilisation',
    
    // Éléments de Configuration
    '输出目录': 'Répertoire de Sortie',
    '翻译文件目录（默认）': 'Répertoire des Fichiers Traduits (Par défaut)',
    '翻译后的文件将保存到此目录，默认与原文件在同一目录': 'Les fichiers traduits seront sauvegardés dans ce répertoire, par défaut dans le même répertoire que le fichier original',
    '选择文件夹': 'Sélectionner le Dossier',
    
    // Configuration du Fournisseur de Services
    '自定义服务商': 'Fournisseur de Service Personnalisé',
    '自定义服务商名称': 'Nom du Fournisseur de Service Personnalisé',
    '请输入自定义服务商名称': 'Veuillez entrer le nom du fournisseur de service personnalisé',
    '环境变量配置': 'Configuration des Variables d\'Environnement',
    '暂无配置变量': 'Aucune variable de configuration',
    '点击上方"添加变量"按钮开始配置': 'Cliquez sur le bouton "Ajouter Variable" ci-dessus pour commencer la configuration',
    '变量名': 'Nom de Variable',
    '变量值': 'Valeur de Variable',
    '如：API_KEY': 'ex.: API_KEY',
    '请输入变量值': 'Veuillez entrer la valeur de la variable',
    '请点击标题旁的问号，参考文档查看支持的服务商，以及对应需要的变量和变量名': 'Veuillez cliquer sur le point d\'interrogation à côté du titre pour consulter la documentation sur les fournisseurs de services pris en charge et les variables et noms de variables requis',
    
    // Configuration du Modèle
    '模型选择': 'Sélection du Modèle',
    '请选择模型': 'Veuillez sélectionner un modèle',
    '自定义模型': 'Modèle Personnalisé',
    '请输入自定义模型名称': 'Veuillez entrer le nom du modèle personnalisé',
    '选择已安装的Ollama模型，或输入自定义模型名称': 'Sélectionnez un modèle Ollama installé, ou entrez un nom de modèle personnalisé',
    '选择推荐模型或输入自定义模型名称': 'Sélectionnez un modèle recommandé ou entrez un nom de modèle personnalisé',
    
    // Configuration API
    'API密钥': 'Clé API',
    '请输入API密钥': 'Veuillez entrer la clé API',
    '使用此服务商需要提供有效的API密钥': 'L\'utilisation de ce fournisseur de services nécessite une clé API valide',
    '服务端点': 'Point de Terminaison du Service',
    '自定义服务端点URL': 'URL du Point de Terminaison du Service Personnalisé',
    'Ollama服务地址，默认为 http://localhost:11434': 'Adresse du service Ollama, par défaut http://localhost:11434',
    '留空使用默认端点，或根据插件服务需要输入自定义端点地址': 'Laissez vide pour utiliser le point de terminaison par défaut, ou entrez une adresse de point de terminaison personnalisée selon les exigences du service plugin',
    
    // Configuration du Prompt
    '翻译提示词': 'Prompt de Traduction',
    '查看默认提示词': 'Voir le Prompt par Défaut',
    '默认提示词：': 'Prompt par Défaut :',
    '应用默认提示词': 'Appliquer le Prompt par Défaut',
    '已应用默认提示词': 'Prompt par défaut appliqué',
    '请输入自定义的翻译提示词，用于指导AI翻译行为...': 'Veuillez entrer un prompt de traduction personnalisé pour guider le comportement de traduction de l\'IA...',
    '自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。插件提供三个变量：${lang_in}、${lang_out}、${text}，可以用于指定翻译语言和源文本。': 'Les prompts personnalisés peuvent améliorer la qualité de la traduction en spécifiant des styles de traduction particuliers ou des méthodes de traitement de la terminologie. Laissez vide pour utiliser le prompt par défaut. Le plugin fournit trois variables : ${lang_in}, ${lang_out}, ${text}, qui peuvent être utilisées pour spécifier les langues de traduction et le texte source.',
    
    // Chemin du Modèle
    '模型路径': 'Chemin du Modèle',
    
    // Dépannage
    '如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装': 'Si le plugin échoue ou si la fonction de traduction est anormale, ouvrez le dossier ci-dessous et cliquez sur le fichier .exe pour l\'installer',
    '打开目录': 'Ouvrir le Répertoire',
    
    // Introduction
    'PDF2ZH 文档智能翻译工具': 'PDF2ZH Outil de Traduction Intelligente de Documents',
    '支持多种翻译服务商，保持原文档格式，提供高质量的PDF文档翻译体验。无论是学术论文、技术文档还是商业报告，都能获得专业的翻译效果。': 'Prend en charge plusieurs fournisseurs de services de traduction, maintient le format du document original et fournit une expérience de traduction de documents PDF de haute qualité. Qu\'il s\'agisse d\'articles académiques, de documents techniques ou de rapports commerciaux, vous pouvez obtenir des résultats de traduction professionnels.',
    '查看源码': 'Voir le Code Source',
    
    // Invite de Sauvegarde
    '配置修改后，请及时保存以免丢失': 'Sauvegardez rapidement après avoir modifié la configuration pour éviter la perte',
    '保存配置': 'Sauvegarder la Configuration',
    
    // Messages d\'Erreur
    '无法获取Ollama模型列表': 'Impossible d\'obtenir la liste des modèles Ollama',
    '获取Ollama模型列表失败': 'Échec de l\'obtention de la liste des modèles Ollama',
    
    // Liens de Documentation
    '查看服务配置文档': 'Voir la Documentation de Configuration du Service',
    
    // Traductions Manquantes Supplémentaires
    '选择翻译服务': 'Sélectionner le Service de Traduction',
    '服务列表': 'Liste des Services',
    '已保存的服务': 'Services Sauvegardés',
    '应用已有服务': 'Appliquer le Service Existant',
    '端点': 'Point de Terminaison',
    '添加模型': 'Ajouter un Modèle',
    '请输入自定义模型名称，如：gpt-4o-latest': 'Veuillez entrer le nom du modèle personnalisé, ex. : gpt-4o-latest',
    '确认': 'Confirmer',
    '取消': 'Annuler',
    '按回车键快速添加模型': 'Appuyez sur Entrée pour ajouter rapidement un modèle',
    '选择已安装的Ollama模型，或添加自定义模型': 'Sélectionnez un modèle Ollama installé, ou ajoutez un modèle personnalisé',
    '添加需要的模型，将保存到服务配置中': 'Ajoutez les modèles nécessaires, ils seront sauvegardés dans la configuration du service',
    '添加到服务列表': 'Ajouter à la Liste des Services',
    '配置完成后，点击按钮保存当前服务配置': 'Après avoir terminé la configuration, cliquez sur le bouton pour sauvegarder la configuration actuelle du service',
    '添加到列表': 'Ajouter à la Liste',
    '请先配置API密钥': 'Veuillez d\'abord configurer la clé API',
    '请配置模型': 'Veuillez configurer le modèle',
    '已更新服务配置：': 'Configuration du service mise à jour : ',
    '已添加到服务列表：': 'Ajouté à la liste des services : ',
    '至少保留一个服务配置': 'Conservez au moins une configuration de service',
    '服务删除成功：': 'Service supprimé avec succès : ',
    '请输入模型名称': 'Veuillez entrer le nom du modèle',
    '请先选择服务商': 'Veuillez d\'abord sélectionner le fournisseur de services',
    '该模型已存在': 'Ce modèle existe déjà',
    '自定义模型添加成功': 'Modèle personnalisé ajouté avec succès',
    '至少保留一个模型': 'Conservez au moins un modèle',
    '自定义模型删除成功': 'Modèle personnalisé supprimé avec succès',
    '请选择翻译服务': 'Veuillez sélectionner le service de traduction',
    '未找到选中的服务': 'Service sélectionné introuvable',
    '翻译已开始': 'Traduction commencée',
    '翻译失败，请稍后重试': 'Échec de la traduction, veuillez réessayer plus tard',
    '选择服务': 'Sélectionner le Service',
    '目标语言': 'Langue Cible',
    '源语言': 'Langue Source',
    '页面选择': 'Sélection de Pages',
    '按下面规则填写指定页数，例如：2,4,6，不填则翻译全文': 'Remplissez les numéros de page spécifiques selon les règles ci-dessous, ex. : 2,4,6, laissez vide pour traduire tout le document',
    '格式说明：': 'Description du Format :',
    '单页：2': 'Page unique : 2',
    '范围：2,4-6 (第2、4-6页)': 'Plage : 2,4-6 (pages 2, 4-6)',
    '翻译中...': 'Traduction en cours...',
    '开始翻译': 'Commencer la Traduction',
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
    '保存失败，请稍后重试': 'Speichern fehlgeschlagen, bitte später versuchen',
    '配置已重置': 'Konfiguration wurde zurückgesetzt',
    
    // Hauptfunktions-Titel
    '输出路径配置': 'Ausgabepfad-Konfiguration',
    '翻译服务配置': 'Übersetzungsdienst-Konfiguration',
    '自定义Prompt配置': 'Benutzerdefinierte Prompt-Konfiguration',
    '模型路径信息': 'Modellpfad-Informationen',
    '使用故障排除': 'Problembehandlung bei der Verwendung',
    
    // Konfigurationselemente
    '输出目录': 'Ausgabeverzeichnis',
    '翻译文件目录（默认）': 'Übersetzungsdatei-Verzeichnis (Standard)',
    '翻译后的文件将保存到此目录，默认与原文件在同一目录': 'Übersetzte Dateien werden in diesem Verzeichnis gespeichert, standardmäßig im selben Verzeichnis wie die Originaldatei',
    '选择文件夹': 'Ordner auswählen',
    
    // Dienstanbieter-Konfiguration
    '自定义服务商': 'Benutzerdefinierter Dienstanbieter',
    '自定义服务商名称': 'Name des benutzerdefinierten Dienstanbieters',
    '请输入自定义服务商名称': 'Bitte geben Sie den Namen des benutzerdefinierten Dienstanbieters ein',
    '环境变量配置': 'Umgebungsvariablen-Konfiguration',
    '暂无配置变量': 'Keine Konfigurationsvariablen',
    '点击上方"添加变量"按钮开始配置': 'Klicken Sie oben auf die Schaltfläche "Variable hinzufügen", um mit der Konfiguration zu beginnen',
    '变量名': 'Variablenname',
    '变量值': 'Variablenwert',
    '如：API_KEY': 'z.B.: API_KEY',
    '请输入变量值': 'Bitte geben Sie den Variablenwert ein',
    '请点击标题旁的问号，参考文档查看支持的服务商，以及对应需要的变量和变量名': 'Bitte klicken Sie auf das Fragezeichen neben dem Titel, um die Dokumentation zu unterstützten Dienstanbietern sowie den entsprechenden erforderlichen Variablen und Variablennamen zu sehen',
    
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
    'Ollama服务地址，默认为 http://localhost:11434': 'Ollama-Service-Adresse, Standard ist http://localhost:11434',
    '留空使用默认端点，或根据插件服务需要输入自定义端点地址': 'Leer lassen für Standard-Endpunkt oder geben Sie eine benutzerdefinierte Endpunkt-Adresse gemäß den Plugin-Service-Anforderungen ein',
    
    // Prompt-Konfiguration
    '翻译提示词': 'Übersetzungs-Prompt',
    '查看默认提示词': 'Standard-Prompt anzeigen',
    '默认提示词：': 'Standard-Prompt:',
    '应用默认提示词': 'Standard-Prompt anwenden',
    '已应用默认提示词': 'Standard-Prompt wurde angewendet',
    '请输入自定义的翻译提示词，用于指导AI翻译行为...': 'Bitte geben Sie einen benutzerdefinierten Übersetzungs-Prompt ein, um das KI-Übersetzungsverhalten zu steuern...',
    '自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。插件提供三个变量：${lang_in}、${lang_out}、${text}，可以用于指定翻译语言和源文本。': 'Benutzerdefinierte Prompts können die Übersetzungsqualität verbessern, indem sie bestimmte Übersetzungsstile oder Terminologie-Behandlungsmethoden spezifizieren. Leer lassen für Standard-Prompt. Das Plugin stellt drei Variablen bereit: ${lang_in}, ${lang_out}, ${text}, die zur Spezifikation von Übersetzungssprachen und Quelltext verwendet werden können.',
    
    // Modellpfad
    '模型路径': 'Modellpfad',
    
    // Problembehandlung
    '如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装': 'Wenn das Plugin fehlschlägt oder die Übersetzungsfunktion abnormal ist, öffnen Sie den untenstehenden Ordner und klicken Sie auf die .exe-Datei zur Installation',
    '打开目录': 'Verzeichnis öffnen',
    
    // Einführung
    'PDF2ZH 文档智能翻译工具': 'PDF2ZH Intelligentes Dokument-Übersetzungstool',
    '支持多种翻译服务商，保持原文档格式，提供高质量的PDF文档翻译体验。无论是学术论文、技术文档还是商业报告，都能获得专业的翻译效果。': 'Unterstützt mehrere Übersetzungsdienstanbieter, behält das ursprüngliche Dokumentformat bei und bietet eine hochwertige PDF-Dokument-Übersetzungserfahrung. Ob wissenschaftliche Arbeiten, technische Dokumentationen oder Geschäftsberichte - Sie können professionelle Übersetzungsergebnisse erzielen.',
    '查看源码': 'Quellcode anzeigen',
    
    // Speicher-Hinweis
    '配置修改后，请及时保存以免丢失': 'Speichern Sie nach Konfigurationsänderungen sofort, um Verluste zu vermeiden',
    '保存配置': 'Konfiguration speichern',
    
    // Fehlermeldungen
    '无法获取Ollama模型列表': 'Ollama-Modellliste kann nicht abgerufen werden',
    '获取Ollama模型列表失败': 'Abrufen der Ollama-Modellliste fehlgeschlagen',
    
    // Dokumentations-Links
    '查看服务配置文档': 'Service-Konfigurationsdokumentation anzeigen',
    
    // Zusätzliche fehlende Übersetzungen
    '选择翻译服务': 'Übersetzungsdienst auswählen',
    '服务列表': 'Service-Liste',
    '已保存的服务': 'Gespeicherte Services',
    '应用已有服务': 'Vorhandenen Service anwenden',
    '端点': 'Endpunkt',
    '添加模型': 'Modell hinzufügen',
    '请输入自定义模型名称，如：gpt-4o-latest': 'Bitte geben Sie den benutzerdefinierten Modellnamen ein, z.B.: gpt-4o-latest',
    '确认': 'Bestätigen',
    '取消': 'Abbrechen',
    '按回车键快速添加模型': 'Drücken Sie Enter, um das Modell schnell hinzuzufügen',
    '选择已安装的Ollama模型，或添加自定义模型': 'Wählen Sie ein installiertes Ollama-Modell oder fügen Sie ein benutzerdefiniertes Modell hinzu',
    '添加需要的模型，将保存到服务配置中': 'Fügen Sie benötigte Modelle hinzu, sie werden in der Service-Konfiguration gespeichert',
    '添加到服务列表': 'Zur Service-Liste hinzufügen',
    '配置完成后，点击按钮保存当前服务配置': 'Nach Abschluss der Konfiguration klicken Sie auf die Schaltfläche, um die aktuelle Service-Konfiguration zu speichern',
    '添加到列表': 'Zur Liste hinzufügen',
    '请先配置API密钥': 'Bitte konfigurieren Sie zuerst den API-Schlüssel',
    '请配置模型': 'Bitte konfigurieren Sie das Modell',
    '已更新服务配置：': 'Service-Konfiguration aktualisiert: ',
    '已添加到服务列表：': 'Zur Service-Liste hinzugefügt: ',
    '至少保留一个服务配置': 'Behalten Sie mindestens eine Service-Konfiguration bei',
    '服务删除成功：': 'Service erfolgreich gelöscht: ',
    '请输入模型名称': 'Bitte geben Sie den Modellnamen ein',
    '请先选择服务商': 'Bitte wählen Sie zuerst den Dienstanbieter',
    '该模型已存在': 'Dieses Modell existiert bereits',
    '自定义模型添加成功': 'Benutzerdefiniertes Modell erfolgreich hinzugefügt',
    '至少保留一个模型': 'Behalten Sie mindestens ein Modell bei',
    '自定义模型删除成功': 'Benutzerdefiniertes Modell erfolgreich gelöscht',
    '请选择翻译服务': 'Bitte wählen Sie den Übersetzungsdienst',
    '未找到选中的服务': 'Ausgewählter Service nicht gefunden',
    '翻译已开始': 'Übersetzung gestartet',
    '翻译失败，请稍后重试': 'Übersetzung fehlgeschlagen, bitte später versuchen',
    '选择服务': 'Service auswählen',
    '目标语言': 'Zielsprache',
    '源语言': 'Quellsprache',
    '页面选择': 'Seitenauswahl',
    '按下面规则填写指定页数，例如：2,4,6，不填则翻译全文': 'Geben Sie spezifische Seitenzahlen nach den unten stehenden Regeln ein, z.B.: 2,4,6, leer lassen für vollständige Dokumentübersetzung',
    '格式说明：': 'Formatbeschreibung:',
    '单页：2': 'Einzelne Seite: 2',
    '范围：2,4-6 (第2、4-6页)': 'Bereich: 2,4-6 (Seiten 2, 4-6)',
    '翻译中...': 'Übersetzung läuft...',
    '开始翻译': 'Übersetzung starten',
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
    
    // Titoli delle Funzioni Principali
    '输出路径配置': 'Configurazione Percorso di Output',
    '翻译服务配置': 'Configurazione Servizio di Traduzione',
    '自定义Prompt配置': 'Configurazione Prompt Personalizzato',
    '模型路径信息': 'Informazioni Percorso Modello',
    '使用故障排除': 'Risoluzione Problemi di Utilizzo',
    
    // Elementi di Configurazione
    '输出目录': 'Directory di Output',
    '翻译文件目录（默认）': 'Directory File Tradotti (Predefinita)',
    '翻译后的文件将保存到此目录，默认与原文件在同一目录': 'I file tradotti verranno salvati in questa directory, per impostazione predefinita nella stessa directory del file originale',
    '选择文件夹': 'Seleziona Cartella',
    
    // Configurazione Fornitore di Servizi
    '自定义服务商': 'Fornitore di Servizi Personalizzato',
    '自定义服务商名称': 'Nome Fornitore di Servizi Personalizzato',
    '请输入自定义服务商名称': 'Inserisci il nome del fornitore di servizi personalizzato',
    '环境变量配置': 'Configurazione Variabili di Ambiente',
    '暂无配置变量': 'Nessuna variabile di configurazione',
    '点击上方"添加变量"按钮开始配置': 'Clicca sul pulsante "Aggiungi Variabile" sopra per iniziare la configurazione',
    '变量名': 'Nome Variabile',
    '变量值': 'Valore Variabile',
    '如：API_KEY': 'es.: API_KEY',
    '请输入变量值': 'Inserisci il valore della variabile',
    '请点击标题旁的问号，参考文档查看支持的服务商，以及对应需要的变量和变量名': 'Clicca sul punto interrogativo accanto al titolo per consultare la documentazione sui fornitori di servizi supportati e le variabili e nomi di variabili richiesti',
    
    // Configurazione Modello
    '模型选择': 'Selezione Modello',
    '请选择模型': 'Seleziona un modello',
    '自定义模型': 'Modello Personalizzato',
    '请输入自定义模型名称': 'Inserisci il nome del modello personalizzato',
    '选择已安装的Ollama模型，或输入自定义模型名称': 'Seleziona un modello Ollama installato, o inserisci un nome di modello personalizzato',
    '选择推荐模型或输入自定义模型名称': 'Seleziona un modello raccomandato o inserisci un nome di modello personalizzato',
    
    // Configurazione API
    'API密钥': 'Chiave API',
    '请输入API密钥': 'Inserisci la chiave API',
    '使用此服务商需要提供有效的API密钥': 'L\'utilizzo di questo fornitore di servizi richiede una chiave API valida',
    '服务端点': 'Endpoint del Servizio',
    '自定义服务端点URL': 'URL Endpoint del Servizio Personalizzato',
    'Ollama服务地址，默认为 http://localhost:11434': 'Indirizzo servizio Ollama, predefinito http://localhost:11434',
    '留空使用默认端点，或根据插件服务需要输入自定义端点地址': 'Lascia vuoto per usare l\'endpoint predefinito, o inserisci un indirizzo endpoint personalizzato secondo i requisiti del servizio plugin',
    
    // Configurazione Prompt
    '翻译提示词': 'Prompt di Traduzione',
    '查看默认提示词': 'Visualizza Prompt Predefinito',
    '默认提示词：': 'Prompt Predefinito:',
    '应用默认提示词': 'Applica Prompt Predefinito',
    '已应用默认提示词': 'Prompt predefinito applicato',
    '请输入自定义的翻译提示词，用于指导AI翻译行为...': 'Inserisci un prompt di traduzione personalizzato per guidare il comportamento di traduzione dell\'IA...',
    '自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。插件提供三个变量：${lang_in}、${lang_out}、${text}，可以用于指定翻译语言和源文本。': 'I prompt personalizzati possono migliorare la qualità della traduzione specificando stili di traduzione particolari o metodi di gestione della terminologia. Lascia vuoto per usare il prompt predefinito. Il plugin fornisce tre variabili: ${lang_in}, ${lang_out}, ${text}, che possono essere utilizzate per specificare le lingue di traduzione e il testo sorgente.',
    
    // Percorso Modello
    '模型路径': 'Percorso Modello',
    
    // Risoluzione Problemi
    '如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装': 'Se il plugin fallisce o la funzione di traduzione è anomala, apri la cartella sottostante e clicca sul file .exe per installare',
    '打开目录': 'Apri Directory',
    
    // Introduzione
    'PDF2ZH 文档智能翻译工具': 'PDF2ZH Strumento di Traduzione Intelligente di Documenti',
    '支持多种翻译服务商，保持原文档格式，提供高质量的PDF文档翻译体验。无论是学术论文、技术文档还是商业报告，都能获得专业的翻译效果。': 'Supporta più fornitori di servizi di traduzione, mantiene il formato del documento originale e fornisce un\'esperienza di traduzione di documenti PDF di alta qualità. Che si tratti di articoli accademici, documentazione tecnica o rapporti commerciali, puoi ottenere risultati di traduzione professionali.',
    '查看源码': 'Visualizza Codice Sorgente',
    
    // Suggerimento di Salvataggio
    '配置修改后，请及时保存以免丢失': 'Salva tempestivamente dopo aver modificato la configurazione per evitare perdite',
    '保存配置': 'Salva Configurazione',
    
    // Messaggi di Errore
    '无法获取Ollama模型列表': 'Impossibile ottenere l\'elenco dei modelli Ollama',
    '获取Ollama模型列表失败': 'Fallimento nell\'ottenere l\'elenco dei modelli Ollama',
    
    // Link alla Documentazione
    '查看服务配置文档': 'Visualizza Documentazione Configurazione Servizio',
    
    // Traduzioni Mancanti Aggiuntive
    '选择翻译服务': 'Seleziona Servizio di Traduzione',
    '服务列表': 'Elenco Servizi',
    '已保存的服务': 'Servizi Salvati',
    '应用已有服务': 'Applica Servizio Esistente',
    '端点': 'Endpoint',
    '添加模型': 'Aggiungi Modello',
    '请输入自定义模型名称，如：gpt-4o-latest': 'Inserisci il nome del modello personalizzato, es.: gpt-4o-latest',
    '确认': 'Conferma',
    '取消': 'Annulla',
    '按回车键快速添加模型': 'Premi Invio per aggiungere rapidamente il modello',
    '选择已安装的Ollama模型，或添加自定义模型': 'Seleziona un modello Ollama installato, o aggiungi un modello personalizzato',
    '添加需要的模型，将保存到服务配置中': 'Aggiungi i modelli necessari, verranno salvati nella configurazione del servizio',
    '添加到服务列表': 'Aggiungi all\'Elenco Servizi',
    '配置完成后，点击按钮保存当前服务配置': 'Dopo aver completato la configurazione, clicca il pulsante per salvare la configurazione del servizio corrente',
    '添加到列表': 'Aggiungi all\'Elenco',
    '请先配置API密钥': 'Configura prima la chiave API',
    '请配置模型': 'Configura il modello',
    '已更新服务配置：': 'Configurazione servizio aggiornata: ',
    '已添加到服务列表：': 'Aggiunto all\'elenco servizi: ',
    '至少保留一个服务配置': 'Mantieni almeno una configurazione del servizio',
    '服务删除成功：': 'Servizio eliminato con successo: ',
    '请输入模型名称': 'Inserisci il nome del modello',
    '请先选择服务商': 'Seleziona prima il fornitore di servizi',
    '该模型已存在': 'Questo modello esiste già',
    '自定义模型添加成功': 'Modello personalizzato aggiunto con successo',
    '至少保留一个模型': 'Mantieni almeno un modello',
    '自定义模型删除成功': 'Modello personalizzato eliminato con successo',
    '请选择翻译服务': 'Seleziona il servizio di traduzione',
    '未找到选中的服务': 'Servizio selezionato non trovato',
    '翻译已开始': 'Traduzione avviata',
    '翻译失败，请稍后重试': 'Traduzione fallita, riprova più tardi',
    '选择服务': 'Seleziona Servizio',
    '目标语言': 'Lingua di Destinazione',
    '源语言': 'Lingua Sorgente',
    '页面选择': 'Selezione Pagine',
    '按下面规则填写指定页数，例如：2,4,6，不填则翻译全文': 'Compila i numeri di pagina specifici secondo le regole sottostanti, es.: 2,4,6, lascia vuoto per tradurre l\'intero documento',
    '格式说明：': 'Descrizione Formato:',
    '单页：2': 'Pagina singola: 2',
    '范围：2,4-6 (第2、4-6页)': 'Intervallo: 2,4-6 (pagine 2, 4-6)',
    '翻译中...': 'Traduzione in corso...',
    '开始翻译': 'Inizia Traduzione',
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