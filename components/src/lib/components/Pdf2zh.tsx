import React, { useEffect, useState, createContext, useContext } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from '../utils'
import { AimComponentStore } from '../../types'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { getTranslation } from '../locales'

// 主题上下文
const ThemeContext = createContext<{
  isDark: boolean;
}>({
  isDark: true,
})

// Set component props
export const properties: AimComponentStore['properties'] = []

export interface Props {
  className?: string
  _t?: (key: string) => string
  updateProps?: (key: string, value: any) => void
  onOpenPath?: (path: string) => void
  data?: any,
  isDark?: boolean,
  lang?: string,
  [key: string]: any
}

// 设置项组件
const SettingItem = ({
  title,
  description,
  children,
  icon
}: {
  title: string;
  description?: string | React.ReactNode;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  const { isDark } = useContext(ThemeContext)

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-start space-x-3 flex-1">
        {icon && (
          <div className={cn("mt-0.5", isDark ? "text-gray-400" : "text-gray-600")}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          <div className={cn("text-sm font-medium", isDark ? "text-gray-200" : "text-gray-900")}>{title}</div>
          {description && (
            <div className={cn("text-xs mt-1", isDark ? "text-gray-400" : "text-gray-600")}>
              {typeof description === 'string' ? description : description}
            </div>
          )}
        </div>
      </div>
      <div className="ml-4">
        {children}
      </div>
    </div>
  )
}

// 卡片容器组件
const SettingCard = ({
  title,
  children,
  className,
  titleExtra
}: {
  title?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  titleExtra?: React.ReactNode;
}) => {
  const { isDark } = useContext(ThemeContext)

  return (
    <div className={cn(
      "rounded-lg border",
      isDark ? "bg-gray-800/50 border-gray-700/50" : "bg-white border-gray-200",
      className
    )}>
      {title && (
        <div className={cn(
          "px-6 py-2 border-b flex items-center justify-between",
          isDark ? "border-gray-700/50" : "border-gray-200"
        )}>
          <div className={cn(
            "text-base font-medium",
            isDark ? "text-gray-200" : "text-gray-900"
          )}>
            {typeof title === 'string' ? title : title}
          </div>
          {titleExtra && <div>{titleExtra}</div>}
        </div>
      )}
      <div className="px-6 py-2">
        {children}
      </div>
    </div>
  )
}

export default function Pdf2zh({ className, _t, updateProps, onOpenPath, data, isDark, lang, ...props }: Props) {
  // const [isDark, setIsDark] = useState(isDark || false)
  const t = _t ? _t : (key: string) => getTranslation(lang || 'zh', key)

  // 主题切换函数
  // const toggleTheme = () => setIsDark(!isDark)

  // 配置表单状态
  const [config, setConfig] = useState({
    outputPath: (data as any)?.outputPath || '',
    prompt: (data as any)?.prompt || '',
    provider: (data as any)?.provider || 'google',
    apiKey: (data as any)?.apiKey || '',
    baseUrl: (data as any)?.baseUrl || '',
    model: (data as any)?.model || '',
    customVars: (data as any)?.customVars || [] as Array<{ key: string, value: string }>,
  })

  // 状态管理
  const [ollamaModels, setOllamaModels] = useState<string[]>([])
  const [loadingModels, setLoadingModels] = useState(false)
  const [curProvider, setCurProvider] = useState((data?.customVars) ? 'custom' : data?.provider || 'google')
  const [curModel, setCurModel] = useState(data?.model || '')
  const [showDefaultPrompt, setShowDefaultPrompt] = useState(false)
  // const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // 默认提示词
  const defaultPrompt = 'You are a professional, authentic machine translation engine. Only Output the translated text, do not include any other text. Translate the following markdown source text to ${lang_out}. Keep the formula notation {v*} unchanged. Output translation directly without any additional text. Source Text: ${text} Translated Text:'

  // 初始配置备份，用于比较是否有变更
  const [initialConfig, setInitialConfig] = useState({
    outputPath: (data as any)?.outputPath || '',
    prompt: (data as any)?.prompt || '',
    provider: (data as any)?.provider || 'google',
    apiKey: (data as any)?.apiKey || '',
    baseUrl: (data as any)?.baseUrl || '',
    model: (data as any)?.model || '',
    customVars: (data as any)?.customVars || [] as Array<{ key: string, value: string }>,
  })

  useEffect(() => {
    setConfig(initialConfig)
  }, [data])

  // 支持的服务商列表
  const serviceProviders = [
    { value: 'google', label: 'Google Translate', requiresKey: false },
    { value: 'deepl', label: 'DeepL', requiresKey: true },
    { value: 'ollama', label: 'Ollama', baseUrl: 'http://localhost:11434', requiresKey: false, requiresModel: true },
    { value: 'openai', label: 'OpenAI', baseUrl: 'https://api.openai.com/v1', requiresKey: true, requiresModel: true },
    { value: 'zhipu', label: 'Zhipu', requiresKey: true, requiresModel: true },
    { value: 'silicon', label: 'Silicon', requiresKey: true, requiresModel: true },
    { value: 'grok', label: 'Grok', requiresKey: true, requiresModel: true },
    { value: 'deepseek', label: 'DeepSeek', requiresKey: true, requiresModel: true },
  ]

  const providerVars = {
    deepl: {
      apiKey: 'DEEPL_AUTH_KEY',
    },
    ollama: {
      baseUrl: 'OLLAMA_HOST',
      model: 'OLLAMA_MODEL',
    },
    openai: {
      baseUrl: 'OPENAI_BASE_URL',
      apiKey: 'OPENAI_API_KEY',
      model: 'OPENAI_MODEL',
    },
    zhipu: {
      apiKey: 'ZHIPU_API_KEY',
      model: 'ZHIPU_MODEL',
    },
    silicon: {
      apiKey: 'SILICON_API_KEY',
      model: 'SILICON_MODEL',
    },
    grok: {
      apiKey: 'GROK_API_KEY',
      model: 'GROK_MODEL',
    },
    deepseek: {
      apiKey: 'DEEPSEEK_API_KEY',
      model: 'DEEPSEEK_MODEL',
    },
  }

  // 常用模型列表
  const commonModels = {
    openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
    zhipu: ['glm-4-plus', 'glm-4-0520', 'glm-4'],
    silicon: ['deepseek-ai/DeepSeek-V2.5', 'Qwen/Qwen2.5-72B-Instruct', 'meta-llama/Meta-Llama-3.1-405B-Instruct'],
    grok: ['grok-beta', 'grok-vision-beta', 'grok-2-1212'],
    deepseek: ['deepseek-chat', 'deepseek-reasoner', 'deepseek-coder'],
    ollama: ollamaModels
  }

  // 获取Ollama模型列表
  const fetchOllamaModels = async () => {
    if (config.provider !== 'ollama') return

    setLoadingModels(true)
    try {
      const baseUrl = config.baseUrl || 'http://localhost:11434'
      const response = await fetch(`${baseUrl}/api/tags`)
      if (response.ok) {
        const data = await response.json()
        const models = data.models?.map((model: any) => model.name) || []
        setOllamaModels(models)
      } else {
        toast.error(t('无法获取Ollama模型列表'))
        setOllamaModels([])
      }
    } catch (error) {
      toast.error(t('获取Ollama模型列表失败'))
      setOllamaModels([])
    }
    setLoadingModels(false)
  }

  // 处理服务商切换
  const handleProviderChange = (newProvider: string) => {
    setCurProvider(newProvider)

    if (newProvider !== 'custom') {
      const provider = serviceProviders.find(p => p.value === newProvider)

      // 重置相关配置项
      const resetConfig = {
        ...config,
        provider: newProvider,
        apiKey: '', // 清空API密钥
        baseUrl: provider?.baseUrl || '', // 设置默认服务端点
        model: '', // 清空模型选择
        customVars: [] // 清空自定义变量
      }

      setConfig(resetConfig)
      setCurModel('') // 重置当前模型选择

      // 如果是Ollama，获取模型列表
      if (newProvider === 'ollama') {
        // 延迟获取模型列表，确保baseUrl已更新
        setTimeout(() => {
          fetchOllamaModels()
        }, 100)
      }
    } else {
      // 切换到自定义服务商时，清空相关配置并初始化一些常用变量
      setConfig({
        ...config,
        provider: '',
        apiKey: '',
        baseUrl: '',
        model: '',
        customVars: [
          { key: 'API_KEY', value: '' },
          { key: 'BASE_URL', value: '' },
          { key: 'MODEL', value: '' }
        ]
      })
      setCurModel('')
    }
  }

  // 添加自定义变量
  const addCustomVar = () => {
    setConfig({
      ...config,
      customVars: [...config.customVars, { key: '', value: '' }]
    })
  }

  // 删除自定义变量
  const removeCustomVar = (index: number) => {
    const newCustomVars = config.customVars.filter((_: any, i: number) => i !== index)
    setConfig({
      ...config,
      customVars: newCustomVars
    })
  }

  // 更新自定义变量
  const updateCustomVar = (index: number, field: 'key' | 'value', value: string) => {
    const newCustomVars = [...config.customVars]
    newCustomVars[index] = { ...newCustomVars[index], [field]: value }
    setConfig({
      ...config,
      customVars: newCustomVars
    })
  }

  // 保存配置
  const handleSaveConfig = () => {
    const finalConfig: any = {
      ...config,
      provider: curProvider === 'custom' ? config.provider : curProvider,
      model: curModel === 'custom' ? config.model : curModel
    }
    let translators: any[] = []
    if (curProvider === 'custom') {//自定义配置
      let envs: any = {}
      finalConfig.customVars.forEach((item: any) => {
        if (item.value) {
          envs[item.key] = item.value
        }
      })
      if (Object.keys(envs).length > 0) {
        translators = [{
          name: finalConfig.provider,
          envs
        }]
      } else {
        translators = []
      }
    } else if (providerVars[finalConfig.provider as keyof typeof providerVars]) {
      const customVars: any = providerVars[finalConfig.provider as keyof typeof providerVars]
      let envs: any = {}
      for (const key in customVars) {
        if (finalConfig[key]) {
          envs[customVars[key]] = finalConfig[key]
        }
      }
      if (Object.keys(envs).length > 0) {
        translators = [{
          name: finalConfig.provider,
          envs
        }]
      } else {
        translators = []
      }
      delete finalConfig.customVars
      console.log('delete customVars:', finalConfig)
    } else {
      delete finalConfig.customVars
      console.log('delete customVars:', finalConfig)
    }
    finalConfig.translators = translators
    console.log('保存配置:', finalConfig)
    if (props.updateData) {
      props.updateData(finalConfig)
      setInitialConfig(finalConfig)
      // setHasUnsavedChanges(false)
      toast.success(t('配置保存成功'))
    } else {
      toast.error(t('保存失败，请稍后重试'))
    }
  }

  // 重置配置
  const handleResetConfig = () => {
    setConfig(initialConfig)
    setCurProvider(initialConfig.provider)
    setCurModel(initialConfig.model)
    toast.success(t('配置已重置'))
  }

  // 打开路径
  const handleOpenPath = (path: string) => {
    console.log(props)
    props.pluginManager.openFolderDialog([props.mainConfig.pluginDir, path])
  };

  // 选择文件夹
  const selectSingleFolder = async () => {
    const result = await props.pluginManager.openDialog('showOpenDialogSync', {
      title: '选择文件夹',
      buttonLabel: '选择',
      properties: ['openDirectory']
    });
    console.log(result)
    if (result && result.path) {
      console.log('选择的文件夹:', result.path);
      setConfig({
        ...config,
        outputPath: result.path
      })
    }
    return null;
  };

  return (
    <ThemeContext.Provider value={{ isDark: isDark || false }}>
      <div className={cn(
        'w-full min-h-screen transition-colors duration-200',
        isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900',
        className
      )}>

        {/* 主内容区域 */}
        <div className="p-4 space-y-6">
          {/* 顶部保存配置区域 */}
          <div className={cn(
            "flex items-center justify-between p-4 rounded-lg border",
            isDark ? "bg-gray-800/50 border-gray-700/50" : "bg-white border-gray-200",
            className
          )}>
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-2 h-2 rounded-full animate-pulse",
                isDark ? "bg-blue-500" : "bg-blue-600"
              )}></div>
              <div>
                <h3 className={cn("text-sm font-medium", isDark ? "text-blue-400" : "text-blue-800")}>
                  {t('配置修改后，请及时保存以免丢失')}
                </h3>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetConfig}
                className={cn(
                  isDark
                    ? "border-blue-700/50 text-blue-400 hover:bg-blue-900/30"
                    : "border-blue-200 text-blue-700 hover:bg-blue-100"
                )}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                {t('重置')}
              </Button>
              <Button
                onClick={handleSaveConfig}
                className={cn(
                  "text-white font-medium rounded-lg transition-all transform hover:scale-105",
                  isDark
                    ? "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25"
                    : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25"
                )}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                {t('保存配置')}
              </Button>
            </div>
          </div>

          {/* 输出路径配置卡片 */}
          <SettingCard title={t('输出路径配置')}>
            <div className="py-2 space-y-4">
              <div>
                <label className={cn("block text-sm font-medium mb-2", isDark ? "text-gray-300" : "text-gray-700")}>
                  {t('输出目录')}
                </label>
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "flex-1 border rounded-lg px-3 py-2",
                    isDark ? "bg-gray-700/50 border-gray-600" : "bg-gray-50 border-gray-300"
                  )}>
                    <code className={cn("text-sm break-all", isDark ? "text-gray-300" : "text-gray-700")}>
                      {config.outputPath || t('翻译文件目录（默认）')}
                    </code>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "flex-shrink-0",
                      isDark
                        ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    )}
                    onClick={selectSingleFolder}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                    {t('选择')}
                  </Button>
                </div>
                <p className={cn("text-xs mt-2", isDark ? "text-gray-500" : "text-gray-600")}>
                  {t('翻译后的文件将保存到此目录，默认与原文件在同一目录')}
                </p>
              </div>
            </div>
          </SettingCard>

          {/* 翻译服务配置卡片 */}
          <SettingCard
            title={
              <div className="flex items-center space-x-2">
                <span>{t('翻译服务配置')}</span>
                <button
                  onClick={() => window.open('https://github.com/Byaidu/PDFMathTranslate/blob/main/docs/ADVANCED.md#services', '_blank', 'noopener,noreferrer')}
                  className={cn(
                    "p-1 rounded-full transition-colors",
                    isDark
                      ? "text-gray-400 hover:text-blue-400 hover:bg-gray-700/50"
                      : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                  )}
                  title={t('查看服务配置文档')}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            }
            titleExtra={
              <Select
                value={curProvider}
                onValueChange={(value) => handleProviderChange(value)}
              >
                <SelectTrigger className={cn(
                  "w-[180px] text-sm",
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-200"
                    : "bg-white border-gray-300 text-gray-900"
                )}>
                  <SelectValue placeholder={t('选择翻译服务')} />
                </SelectTrigger>
                <SelectContent>
                  {serviceProviders.map((provider) => (
                    <SelectItem key={provider.value} value={provider.value}>
                      {provider.label}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">{t('自定义服务商')}</SelectItem>
                </SelectContent>
              </Select>
            }
          >
            <div className="py-2 space-y-6">
              {curProvider === 'custom' ? (
                <>
                  <div>
                    <label className={cn("block text-sm font-medium mb-2", isDark ? "text-gray-300" : "text-gray-700")}>
                      {t('自定义服务商名称')}
                    </label>
                    <Input
                      type="text"
                      value={config.provider}
                      onChange={(e) => setConfig({ ...config, provider: e.target.value })}
                      placeholder={t('请输入自定义服务商名称')}
                      className={cn(
                        "focus:ring-blue-500 focus:border-blue-500",
                        isDark
                          ? "bg-gray-700 border-gray-600 text-gray-200"
                          : "bg-white border-gray-300 text-gray-900"
                      )}
                    />
                  </div>

                  {/* 自定义变量配置 */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className={cn("block text-sm font-medium", isDark ? "text-gray-300" : "text-gray-700")}>
                        {t('环境变量配置')}
                      </label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addCustomVar}
                        className={cn(
                          isDark
                            ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        {t('添加变量')}
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {config.customVars.length === 0 && (
                        <div className={cn(
                          "text-center py-8 border-2 border-dashed rounded-lg",
                          isDark ? "border-gray-600 text-gray-500" : "border-gray-300 text-gray-500"
                        )}>
                          <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                          <p className="text-sm">{t('暂无配置变量')}</p>
                          <p className="text-xs mt-1">{t('点击上方"添加变量"按钮开始配置')}</p>
                        </div>
                      )}

                      {config.customVars.map((customVar: { key: string, value: string }, index: number) => (
                        <div key={index} className={cn(
                          "flex items-center space-x-3 p-3 rounded-lg border",
                          isDark ? "bg-gray-700/30 border-gray-600" : "bg-gray-50 border-gray-200"
                        )}>
                          <div className="flex-1 grid grid-cols-2 gap-3">
                            <div>
                              <label className={cn("block text-xs font-medium mb-1", isDark ? "text-gray-400" : "text-gray-600")}>
                                {t('变量名')}
                              </label>
                              <Input
                                type="text"
                                value={customVar.key}
                                onChange={(e) => updateCustomVar(index, 'key', e.target.value)}
                                placeholder={t('如：API_KEY')}
                                className={cn(
                                  "text-sm focus:ring-blue-500 focus:border-blue-500",
                                  isDark
                                    ? "bg-gray-700 border-gray-600 text-gray-200"
                                    : "bg-white border-gray-300 text-gray-900"
                                )}
                              />
                            </div>
                            <div>
                              <label className={cn("block text-xs font-medium mb-1", isDark ? "text-gray-400" : "text-gray-600")}>
                                {t('变量值')}
                              </label>
                              <Input
                                type={customVar.key.toLowerCase().includes('key') || customVar.key.toLowerCase().includes('token') ? 'password' : 'text'}
                                value={customVar.value}
                                onChange={(e) => updateCustomVar(index, 'value', e.target.value)}
                                placeholder={t('请输入变量值')}
                                className={cn(
                                  "text-sm focus:ring-blue-500 focus:border-blue-500",
                                  isDark
                                    ? "bg-gray-700 border-gray-600 text-gray-200"
                                    : "bg-white border-gray-300 text-gray-900"
                                )}
                              />
                            </div>
                          </div>
                          <div>
                            <label className={cn("block text-xs font-medium mb-1 opacity-0", isDark ? "text-gray-400" : "text-gray-600")}>
                              button
                            </label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeCustomVar(index)}
                              className={cn(
                                "flex-shrink-0 text-red-500 hover:text-red-600",
                                isDark
                                  ? "border-gray-600 hover:bg-red-900/20"
                                  : "border-gray-300 hover:bg-red-50"
                              )}
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className={cn("text-xs mt-2", isDark ? "text-red-500" : "text-red-500")}>
                      {t('请点击标题旁的问号，参考文档查看支持的服务商，以及对应需要的变量和变量名')}
                    </p>
                  </div>
                </>
              ) : <>
                {/* 模型选择 */}
                {(serviceProviders.find(p => p.value === config.provider)?.requiresModel) && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className={cn("block text-sm font-medium", isDark ? "text-gray-300" : "text-gray-700")}>
                        {t('模型选择')}
                      </label>
                      {config.provider === 'ollama' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={fetchOllamaModels}
                          disabled={loadingModels}
                          className={cn(
                            isDark
                              ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                          )}
                        >
                          {loadingModels ? (
                            <svg className="animate-spin w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                          )}
                          {t('刷新')}
                        </Button>
                      )}
                    </div>

                    {/* 只有当不是自定义服务商且有可用模型时才显示选择框 */}
                    {curProvider !== 'custom' && (
                      <Select
                        value={curModel || undefined}
                        onValueChange={(value) => {
                          setCurModel(value)
                          if (value !== 'custom' && value !== '') {
                            setConfig({ ...config, model: value })
                          }
                        }}
                      >
                        <SelectTrigger className={cn(
                          "w-full text-sm",
                          isDark
                            ? "bg-gray-700 border-gray-600 text-gray-200"
                            : "bg-white border-gray-300 text-gray-900"
                        )}>
                          <SelectValue placeholder={t('请选择模型')} />
                        </SelectTrigger>
                        <SelectContent>
                          {(commonModels[config.provider as keyof typeof commonModels] || []).map((model) => (
                            <SelectItem key={model} value={model}>
                              {model}
                            </SelectItem>
                          ))}
                          <SelectItem value="custom">{t('自定义模型')}</SelectItem>
                        </SelectContent>
                      </Select>
                    )}

                    {(curModel === 'custom' || curProvider === 'custom') && (
                      <Input
                        type="text"
                        value={config.model}
                        onChange={(e) => setConfig({ ...config, model: e.target.value })}
                        placeholder={t('请输入自定义模型名称')}
                        className={cn(
                          "mt-2 focus:ring-blue-500 focus:border-blue-500",
                          isDark
                            ? "bg-gray-700 border-gray-600 text-gray-200"
                            : "bg-white border-gray-300 text-gray-900"
                        )}
                      />
                    )}

                    <p className={cn("text-xs mt-2", isDark ? "text-gray-500" : "text-gray-600")}>
                      {config.provider === 'ollama'
                        ? t('选择已安装的Ollama模型，或输入自定义模型名称')
                        : t('选择推荐模型或输入自定义模型名称')
                      }
                    </p>
                  </div>
                )}

                {/* API密钥 */}
                {(serviceProviders.find(p => p.value === config.provider)?.requiresKey && curProvider !== 'custom') && (
                  <div>
                    <label className={cn("block text-sm font-medium mb-2", isDark ? "text-gray-300" : "text-gray-700")}>
                      {t('API密钥')}
                    </label>
                    <Input
                      type="password"
                      value={config.apiKey}
                      onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                      placeholder={t('请输入API密钥')}
                      className={cn(
                        "focus:ring-blue-500 focus:border-blue-500",
                        isDark
                          ? "bg-gray-700 border-gray-600 text-gray-200"
                          : "bg-white border-gray-300 text-gray-900"
                      )}
                    />
                    <p className={cn("text-xs mt-2", isDark ? "text-gray-500" : "text-gray-600")}>
                      {t('使用此服务商需要提供有效的API密钥')}
                    </p>
                  </div>
                )}

                {/* 服务端点 */}
                {(config.provider !== 'google') && (
                  <div>
                    <label className={cn("block text-sm font-medium mb-2", isDark ? "text-gray-300" : "text-gray-700")}>
                      {t('服务端点')} <span className={cn(isDark ? "text-gray-500" : "text-gray-500")}>({t('可选')})</span>
                    </label>
                    <Input
                      type="text"
                      value={config.baseUrl}
                      onChange={(e) => setConfig({ ...config, baseUrl: e.target.value })}
                      placeholder={
                        config.provider === 'ollama'
                          ? 'http://localhost:11434'
                          : serviceProviders.find(p => p.value === config.provider)?.baseUrl || t('自定义服务端点URL')
                      }
                      className={cn(
                        "focus:ring-blue-500 focus:border-blue-500",
                        isDark
                          ? "bg-gray-700 border-gray-600 text-gray-200"
                          : "bg-white border-gray-300 text-gray-900"
                      )}
                    />
                    <p className={cn("text-xs mt-2", isDark ? "text-gray-500" : "text-gray-600")}>
                      {config.provider === 'ollama'
                        ? t('Ollama服务地址，默认为 http://localhost:11434')
                        : t('留空使用默认端点，或根据插件服务需要输入自定义端点地址')
                      }
                    </p>
                  </div>
                )}
              </>}

            </div>
          </SettingCard>

          {/* 自定义Prompt配置卡片 */}
          <SettingCard title={t('自定义Prompt配置')}>
            <div className="py-2">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={cn("block text-sm font-medium", isDark ? "text-gray-300" : "text-gray-700")}>
                    {t('翻译提示词')}
                  </label>
                  <button
                    onClick={() => setShowDefaultPrompt(!showDefaultPrompt)}
                    className={cn(
                      "p-1 rounded-full transition-colors",
                      isDark
                        ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700/50"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    )}
                    title={t('查看默认提示词')}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                {showDefaultPrompt && (
                  <div className={cn(
                    "mb-3 p-3 rounded-lg border text-sm",
                    isDark
                      ? "bg-blue-900/20 border-blue-700/30 text-blue-300"
                      : "bg-blue-50 border-blue-200 text-blue-700"
                  )}>
                    <div className="flex items-start space-x-2">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div className="flex-1">
                        <p className="font-medium mb-1 flex items-center justify-between">
                          <span>{t('默认提示词：')}</span>
                          <button
                            onClick={() => {
                              setConfig({ ...config, prompt: '' })
                              setShowDefaultPrompt(false)
                              toast.success(t('已应用默认提示词'))
                            }}
                            className={cn(
                              "px-2 py-1 text-xs rounded border transition-colors",
                              isDark
                                ? "bg-blue-800 border-blue-600 text-blue-200 hover:bg-blue-700"
                                : "bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200"
                            )}
                          >
                            {t('应用默认提示词')}
                          </button>
                        </p>
                        <code className="text-xs leading-relaxed break-all">
                          {defaultPrompt}
                        </code>
                      </div>
                    </div>
                  </div>
                )}

                <Textarea
                  value={config.prompt}
                  onChange={(e) => setConfig({ ...config, prompt: e.target.value })}
                  placeholder={t('请输入自定义的翻译提示词，用于指导AI翻译行为...')}
                  className={cn(
                    "min-h-[100px] resize-vertical focus:ring-blue-500 focus:border-blue-500",
                    isDark
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-900"
                  )}
                />
                <p className={cn("text-xs mt-2", isDark ? "text-gray-500" : "text-gray-600")}>
                  {t('自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。插件提供三个变量：${lang_in}、${lang_out}、${text}，可以用于指定翻译语言和源文本。')}
                </p>
              </div>
            </div>
          </SettingCard>

          {/* 模型路径信息卡片 */}
          <SettingCard title={t('模型路径信息')}>
            <SettingItem
              title={t('模型路径')}
              description="./engine"
            >
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                )}
                onClick={() => handleOpenPath('engine')}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
                {t('打开')}
              </Button>
            </SettingItem>
          </SettingCard>

          {/* Windows故障排除卡片 */}
          {props.pluginManager?.isWin && (
            <SettingCard>
              <div className="py-2">
                <div className={cn(
                  "flex items-start space-x-3 p-4 rounded-lg border",
                  isDark
                    ? "bg-red-900/20 border-red-700/30"
                    : "bg-red-50 border-red-200"
                )}>
                  <svg className={cn("w-5 h-5 mt-0.5 flex-shrink-0", isDark ? "text-red-500" : "text-red-600")} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <h3 className={cn("text-sm font-medium mb-2", isDark ? "text-red-400" : "text-red-800")}>
                      {t('使用故障排除')}
                    </h3>
                    <p className={cn("text-sm mb-4", isDark ? "text-red-300/80" : "text-red-700")}>
                      {t('如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装')}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        isDark
                          ? "border-red-700/50 text-red-400 hover:bg-red-900/30"
                          : "border-red-200 text-red-700 hover:bg-red-100"
                      )}
                      onClick={() => handleOpenPath('engine/build')}
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                      </svg>
                      {t('打开目录')}
                    </Button>
                  </div>
                </div>
              </div>
            </SettingCard>
          )}

          {/* 功能介绍文案 */}
          <SettingCard>
            <div className="py-2">
              <div className={cn("text-center space-y-4", isDark ? "text-gray-300" : "text-gray-700")}>
                <h3 className={cn("text-lg font-medium", isDark ? "text-gray-200" : "text-gray-900")}>
                  {t('PDF2ZH 文档智能翻译工具')}
                </h3>
                <p className="text-sm leading-relaxed max-w-2xl mx-auto">
                  {t('支持多种翻译服务商，保持原文档格式，提供高质量的PDF文档翻译体验。无论是学术论文、技术文档还是商业报告，都能获得专业的翻译效果。')}
                </p>

                <div className={cn("pt-4 border-t", isDark ? "border-gray-700" : "border-gray-200")}>
                  <div className="flex items-center justify-center gap-2 space-x-4 text-sm">
                    <a
                      href="https://github.com/kakuqo/PDF2ZH"
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" text-blue-500 hover:text-blue-600 flex items-center space-x-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>{t('查看源码')}</span>
                    </a>
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                      isDark
                        ? "bg-amber-900/40 text-amber-400 border-amber-700/50"
                        : "bg-amber-100 text-amber-800 border-amber-200"
                    )}>
                      AGPL-3.0
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SettingCard>
        </div>

        <Toaster />
      </div>
    </ThemeContext.Provider>
  )
} 