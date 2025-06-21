import React, { useEffect, useState, createContext, useContext, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from '../utils'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { getTranslation } from '../locales'
import { Plus, RefreshCcw, Trash2 } from 'lucide-react'
import { commonModels, serviceProviders } from '.'

// 主题上下文
const ThemeContext = createContext<{
  isDark: boolean;
}>({
  isDark: true,
})

export interface Props {
  preload?: any,
  updateData: (data: any) => void,
  pluginConfig?: any,
  mainConfig?: any,
  pluginList?: any,
  lang?: string,
  isDark?: boolean,
  className?: string,
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

// 定义服务配置类型
type ServiceConfig = {
  name: string,
  provider: string,
  apiKey?: string,
  baseUrl?: string,
  models?: string[] // 保存所有可用模型
}

const defaultConfig = {
  outputPath: '',
  prompt: '',
  serviceList: [{
    name: 'Google',
    provider: 'google',
  }] as ServiceConfig[],
}

export default function Pdf2zh({ className, preload, updateData, pluginConfig, mainConfig, pluginList, lang, isDark }: Props) {
  // const [isDark, setIsDark] = useState(isDark || false)
  const t = (key: string) => getTranslation(lang || 'zh', key)

  // 主题切换函数
  // const toggleTheme = () => setIsDark(!isDark)

  // 配置表单状态
  const [config, setConfig] = useState(defaultConfig)

  // 状态管理
  const [curProvider, setCurProvider] = useState('google')
  const [curApiKey, setCurApiKey] = useState('')
  const [curBaseUrl, setCurBaseUrl] = useState('')
  const [curModels, setCurModels] = useState<string[]>([])
  const [curNewModel, setCurNewModel] = useState('')

  const [showDefaultPrompt, setShowDefaultPrompt] = useState(false)
  const [showServiceList, setShowServiceList] = useState(false)
  const [customModels, setCustomModels] = useState<Record<string, string[]>>({})
  const [showAddCustomModel, setShowAddCustomModel] = useState(false)

  // 默认提示词
  const defaultPrompt = 'You are a professional, authentic machine translation engine. Only Output the translated text, do not include any other text. Translate the following markdown source text to ${lang_out}. Keep the formula notation {v*} unchanged. Output translation directly without any additional text. Source Text: ${text} Translated Text:'

  useEffect(() => {
    console.log(pluginConfig)
    if (pluginConfig) {
      applyServiceList(pluginConfig.serviceList).then((newServiceList: any) => {
        const newConfig = { ...pluginConfig, serviceList: [...newServiceList] }
        if (!pluginConfig.serviceList && updateData) {
          updateData(newConfig)
        }
        setConfig(newConfig)
      })
    }
  }, [pluginConfig, pluginList])

  // 第三个对象：支持的服务商列表配置
  // const serviceProviders = [
  //   { value: 'google', plugin: 'GoogleAI', label: 'Google', requiresKey: false },
  //   { value: 'bing', plugin: 'MicrosoftAI', label: 'Bing', requiresKey: false },
  //   { value: 'deepl', plugin: 'DeepLAI', label: 'DeepL', requiresKey: true },
  //   { value: 'ollama', plugin: 'OllamaAI', label: 'Ollama', baseUrl: 'http://localhost:11434', requiresKey: false, requiresModel: true },
  //   { value: 'openai', plugin: 'OpenAI', label: 'OpenAI', baseUrl: 'https://api.openai.com/v1', requiresKey: true, requiresModel: true },
  //   { value: 'zhipu', plugin: 'ZhipuAI', label: 'Zhipu', requiresKey: true, requiresModel: true },
  //   { value: 'siliconflow', plugin: 'SiliconflowAI', label: 'SiliconFlow', baseUrl: 'https://api.siliconflow.cn/v1', requiresKey: true, requiresModel: true },
  //   { value: 'grok', plugin: 'XAI', label: 'Grok', requiresKey: true, requiresModel: true },
  //   { value: 'deepseek', plugin: 'DeepSeekAI', label: 'DeepSeek', requiresKey: true, requiresModel: true },
  //   { value: 'xinference', plugin: 'XinferenceAI', label: 'Xinference', baseUrl: 'http://localhost:9997', requiresKey: false, requiresModel: true },
  //   { value: 'azureopenai', plugin: 'AzureOpenAI', label: 'Azure OpenAI', requiresKey: true, requiresModel: true },
  //   { value: 'modelscope', plugin: 'ModelScopeAI', label: 'ModelScope', requiresKey: true, requiresModel: true },
  //   { value: 'tencentmechinetranslation', plugin: 'TencentMT', label: 'Tencent MT', requiresKey: true },
  //   { value: 'gemini', plugin: 'GeminiAI', label: 'Gemini', requiresKey: true, requiresModel: true },
  //   { value: 'azure', plugin: 'AzureAI', label: 'Azure', requiresKey: true },
  //   { value: 'anythingllm', plugin: 'AnythingLLM', label: 'AnythingLLM', baseUrl: 'http://localhost:3001', requiresKey: true },
  //   { value: 'dify', plugin: 'DifyAI', label: 'Dify', baseUrl: 'http://localhost/v1', requiresKey: true },
  //   { value: 'groq', plugin: 'GroqAI', label: 'Groq', baseUrl: 'https://api.groq.com/openai/v1', requiresKey: true, requiresModel: true },
  //   { value: 'qwenmt', plugin: 'QwenMT', label: 'Qwen MT', requiresKey: true },
  //   { value: 'openaicompatible', plugin: 'OpenAICompatible', label: 'OpenAI Compatible', requiresKey: true, requiresModel: true },
  // ]



  // 获取Ollama模型列表
  const fetchOllamaModels = async () => {
    try {
      const ollamaProvider = config.serviceList?.find(item => item.provider == 'ollama')
      const baseUrl = ollamaProvider?.baseUrl || 'http://localhost:11434'
      const response = await fetch(`${baseUrl}/api/tags`)
      if (response.ok) {
        const data = await response.json()
        const models = data.models?.map((model: any) => model.name) || []
        setCurModels(models)
      } else {
        toast.error(t('无法获取Ollama模型列表'))
        setCurModels([])
      }
    } catch (error) {
      toast.error(t('获取Ollama模型列表失败'))
      setCurModels([])
    }
  }

  // 处理服务商切换
  const handleProviderChange = (newProvider: string) => {
    setCurProvider(newProvider)
    const curService = config.serviceList?.find((service: ServiceConfig) => service.provider === newProvider)
    const provider = serviceProviders.find(p => p.value === newProvider)
    if (curService) {
      setCurApiKey(curService.apiKey || '')
      setCurBaseUrl(curService.baseUrl || provider?.baseUrl || '')
      console.log(curService.models)
      setCurModels(curService.models || commonModels[newProvider as keyof typeof commonModels] || [])
    } else if (newProvider !== 'google') {
      setCurApiKey('')
      setCurBaseUrl(provider?.baseUrl || '')
      setCurModels(commonModels[newProvider as keyof typeof commonModels] || [])
    }
    // 如果是Ollama，获取模型列表
    if (newProvider === 'ollama') {
      // 延迟获取模型列表，确保baseUrl已更新
      setTimeout(() => {
        fetchOllamaModels()
      }, 100)
    }

  }

  // 添加到服务列表
  const handleAddToServiceList = () => {

    // 检查配置完整性
    if (curProvider !== 'google') {
      const provider = serviceProviders.find(p => p.value === curProvider)
      if (provider?.requiresKey && !curApiKey) {
        toast.error(t('请先配置API密钥'))
        return
      }
      if (provider?.requiresModel && curModels.length === 0) {
        toast.error(t('请配置模型'))
        return
      }
    }

    const serviceName = serviceProviders.find(p => p.value === curProvider)?.label || curProvider
    const serviceConfig: ServiceConfig = {
      name: serviceName,
      provider: curProvider,
      apiKey: curApiKey,
      baseUrl: curBaseUrl,
      models: curModels // 保存所有可用模型
    }

    // 检查是否已存在相同服务商的配置，如果存在则替换
    const existingServiceIndex = config.serviceList.findIndex((service: ServiceConfig) => service.provider === serviceConfig.provider)

    if (existingServiceIndex > -1) {
      // 替换现有服务配置
      const newServiceList = [...config.serviceList]
      newServiceList[existingServiceIndex] = serviceConfig
      setConfig({ ...config, serviceList: newServiceList })
      toast.success(t('已更新服务配置：') + serviceName)
    } else {
      // 添加新服务配置
      const newServiceList = [...config.serviceList, serviceConfig]
      setConfig({ ...config, serviceList: newServiceList })
      toast.success(t('已添加到服务列表：') + serviceName)
    }
  }

  const applyServiceList = async (serviceList: any[]) => {
    console.log('pluginList', pluginList)
    if (pluginList) {
      const { config: configInfo } = await preload?.plugin.getPluginsConfig();
      console.log('configInfo', configInfo)
      const pluginServiceList = pluginList.filter((plugin: any) => {
        const supportProvider = serviceProviders.find((service: any) => service.plugin === plugin.provider.value)
        if (supportProvider) {
          const pluginConfig = configInfo[supportProvider.plugin]
          if (supportProvider.requiresKey && !pluginConfig?.apiKey) {
            return false
          }
          return true
        }
        return false
      })
      console.log('pluginServiceList', pluginServiceList)
      const newServiceList = pluginServiceList.map((plugin: any) => {
        const pluginConfig = configInfo[plugin.provider.value]
        const provider = serviceProviders.find((service: any) => service.plugin === plugin.provider.value)
        console.log('provider', provider)
        if (!provider) {
          return null
        }
        const models = plugin.models.map((model: any) => model.value) || commonModels[provider?.value as keyof typeof commonModels]
        if (curProvider == provider?.value) {
          setCurApiKey(configInfo?.apiKey)
          setCurBaseUrl(configInfo?.baseUrl || provider?.baseUrl)
          setCurModels(models)
        }
        let baseUrl = ''
        if (pluginConfig?.baseURL) {
          if (provider?.baseUrl && provider?.baseUrl.indexOf(pluginConfig.baseURL) > -1) {
            baseUrl = provider?.baseUrl
          } else {
            baseUrl = pluginConfig?.baseURL
          }
        } else if (provider?.baseUrl) {
          baseUrl = provider?.baseUrl || ''
        }
        const info = {
          name: provider?.label,
          provider: provider?.value,
          apiKey: pluginConfig?.apiKey,
          baseUrl: baseUrl,
          models: models
        }
        console.log('info', pluginConfig, provider, info)
        return info
      }).filter((service: any) => !!service)
      if (serviceList.length > 0) {
        serviceList.forEach((service: any) => {
          const hasExistIndex = newServiceList.findIndex((item: any) => item.provider === service.provider)
          if (hasExistIndex == -1) {
            newServiceList.push(service)
          }
        })
      }
      if (!newServiceList.find((item: any) => item.provider === 'google')) {
        newServiceList.push({ name: 'Google', provider: 'google' })
      }
      return newServiceList
    }
  }

  // 删除服务配置
  const handleDeleteService = (serviceProvider: string) => {
    if (config.serviceList.length === 1) {
      toast.error(t('至少保留一个服务配置'))
      return
    }
    const newServiceList = config.serviceList.filter((service: ServiceConfig) => service.provider !== serviceProvider)
    setConfig({ ...config, serviceList: newServiceList })
    toast.success(t('服务删除成功：') + serviceProvider)
  }

  // 保存配置
  const handleSaveConfig = () => {
    console.log('保存配置:', config)
    if (updateData) {
      updateData(config)
      toast.success(t('配置保存成功'))
    } else {
      toast.error(t('保存失败，请稍后重试'))
    }
  }

  // 重置配置
  const handleResetConfig = async () => {
    const newServiceList = (await applyServiceList(config.serviceList))
    setConfig({ ...defaultConfig, serviceList: [...newServiceList] })
    setCurProvider('google')
    setCurApiKey('')
    setCurBaseUrl('')
    setCurModels([])
    setCurNewModel('')
    setShowDefaultPrompt(false)
    setShowServiceList(false)
    toast.success(t('配置已重置'))
  }

  // 打开路径
  const handleOpenPath = (path: string) => {
    if (mainConfig.pluginDir) {
      preload?.openFolderDialog([mainConfig.pluginDir, path])
    }
  };

  // 选择文件夹
  const selectSingleFolder = async () => {
    const result = await preload?.openDialog('showOpenDialogSync', {
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

  // 添加自定义模型
  const addCustomModel = () => {
    if (!curNewModel.trim()) {
      toast.error(t('请输入模型名称'))
      return
    }

    const providerKey = curProvider
    if (!providerKey) {
      toast.error(t('请先选择服务商'))
      return
    }

    const existingModels = customModels[providerKey] || []
    if (existingModels.includes(curNewModel.trim())) {
      toast.error(t('该模型已存在'))
      return
    }

    const newCustomModels = {
      ...customModels,
      [providerKey]: [...existingModels, curNewModel.trim()]
    }

    setCustomModels(newCustomModels)
    setCurNewModel('')
    setShowAddCustomModel(false)
    toast.success(t('自定义模型添加成功'))
  }

  // 删除模型
  const removeModel = (modelName: string) => {
    const curSerivce = serviceProviders.find((service: any) => service.value === curProvider)
    if (curSerivce?.requiresModel && curModels.length === 1) {
      toast.error(t('至少保留一个模型'))
      return
    }
    const newModels = curModels.filter((model: string) => model !== modelName)
    setCurModels(newModels)
    toast.success(t('自定义模型删除成功'))
  }

  const curService = useMemo(() => config.serviceList?.find((service: ServiceConfig) => service.provider === curProvider), [config.serviceList, curProvider])

  return (
    <ThemeContext.Provider value={{ isDark: isDark || false }}>
      <div className={cn(
        'w-full',
        className
      )}>

        {/* 主内容区域 */}
        <div className="p-4 space-y-6">
          {/* 顶部保存配置区域 */}
          <div className={cn(
            "flex items-center justify-between p-4 rounded-lg border",
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
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 101.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
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
                    onClick={() => setConfig({ ...config, outputPath: '' })}
                    className={cn(
                      "flex-shrink-0",
                      isDark
                        ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <RefreshCcw className="w-4 h-4" />
                    {t('重置')}
                  </Button>
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
              <div className="flex items-center space-x-2">
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
                    <div className="flex flex-col max-h-[300px] overflow-y-auto">
                      {serviceProviders.map((provider) => (
                        <SelectItem key={provider.value} value={provider.value}>
                          {provider.label}
                        </SelectItem>
                      ))}
                    </div>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowServiceList(!showServiceList)}
                  className={cn(
                    isDark
                      ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a1 1 0 011-1h12a1 1 0 110 2H3a1 1 0 01-1-1zM2 15a1 1 0 011-1h12a1 1 0 110 2H3a1 1 0 01-1-1z" />
                  </svg>
                  {t('服务列表')}
                </Button>
              </div>
            }
          >
            <div className="py-2 space-y-6">
              {/* 服务列表 */}
              {showServiceList && (
                <div className={cn(
                  "p-4 rounded-lg border",
                  isDark ? "bg-gray-700/30 border-gray-600" : "bg-gray-50 border-gray-200"
                )}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className={cn("text-sm font-medium", isDark ? "text-gray-300" : "text-gray-700")}>
                      {t('已保存的服务')} ({config.serviceList.length})
                    </h4>
                    <Button variant="outline" size="sm" onClick={async () => {
                      const newServiceList = await applyServiceList(config.serviceList)
                      setConfig({ ...config, serviceList: newServiceList })
                    }}>
                      <Plus className="w-4 h-4" />
                      {t('应用已有服务')}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {config.serviceList?.map((service: ServiceConfig) => (
                      <div key={service.provider} className={cn(
                        "flex items-center justify-between p-3 rounded-lg border",
                        isDark ? "bg-gray-800/50 border-gray-600" : "bg-white border-gray-200"
                      )}>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h5 className={cn("text-sm font-medium", isDark ? "text-gray-200" : "text-gray-900")}>
                              {service.name}
                            </h5>
                            <span className={cn(
                              "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                              isDark
                                ? "bg-blue-900/40 text-blue-400"
                                : "bg-blue-100 text-blue-800"
                            )}>
                              {service.provider}
                            </span>
                          </div>
                          <p className={cn("text-xs mt-1", isDark ? "text-gray-400" : "text-gray-600")}>
                            {service.baseUrl && `${t('端点')}: ${service.baseUrl}`}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteService(service.provider)}
                          className={cn(
                            "text-red-500 hover:text-red-600",
                            isDark
                              ? "border-gray-600 hover:bg-red-900/20"
                              : "border-gray-300 hover:bg-red-50"
                          )}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 模型选择 */}
              {serviceProviders.find(p => p.value === curProvider)?.requiresModel && (
                <div>
                  <label className={cn("block text-sm font-medium mb-3", isDark ? "text-gray-300" : "text-gray-700")}>
                    {t('模型选择')}
                  </label>

                  {/* 模型按钮列表 */}
                  <div className={cn(
                    "border rounded-lg",
                    isDark ? "border-gray-600" : "border-gray-200"
                  )}>
                    {/* 添加自定义模型按钮 - 固定在顶部 */}
                    <div className={cn(
                      "p-3 border-b",
                      isDark ? "border-gray-600" : "border-gray-200"
                    )}>
                      <button
                        onClick={() => setShowAddCustomModel(!showAddCustomModel)}
                        className={cn(
                          "w-full inline-flex items-center justify-center px-3 py-2 rounded-lg border text-sm font-medium transition-all",
                          showAddCustomModel
                            ? isDark
                              ? "bg-blue-900/50 border-blue-600 text-blue-300"
                              : "bg-blue-50 border-blue-500 text-blue-700"
                            : isDark
                              ? "bg-gray-800/50 border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50"
                              : "bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                        )}
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        {t('添加模型')}
                      </button>
                    </div>

                    {/* 模型列表 - 可滚动区域 */}
                    <ScrollArea className="h-32">
                      <div className="p-3 flex flex-wrap gap-2">
                        {curModels.map((model: string) => (
                          <div key={model} className="relative group">
                            <div
                              className={cn(
                                "inline-flex items-center px-3 py-2 rounded-lg border text-sm font-medium transition-all max-w-[200px]",
                                isDark
                                  ? "bg-gray-800/50 border-gray-600 text-gray-300"
                                  : "bg-white border-gray-300 text-gray-700"
                              )}
                            >
                              <span className="truncate">{model}</span>
                            </div>

                            {/* 删除按钮 */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                removeModel(model)
                              }}
                              className={cn(
                                "absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100",
                                isDark
                                  ? "bg-red-600 hover:bg-red-700 text-white"
                                  : "bg-red-500 hover:bg-red-600 text-white"
                              )}
                            >
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        
                        {/* 当没有模型时显示提示 */}
                        {curModels.length === 0 && (
                          <div className={cn(
                            "w-full text-center py-4 text-sm",
                            isDark ? "text-gray-500" : "text-gray-400"
                          )}>
                            {t('暂无模型，请点击上方按钮添加')}
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* 添加自定义模型输入框 */}
                  {showAddCustomModel && (
                    <div className={cn(
                      "mt-3 p-4 rounded-lg border",
                      isDark ? "bg-blue-900/20 border-blue-700/30" : "bg-blue-50 border-blue-200"
                    )}>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1">
                          <Input
                            type="text"
                            value={curNewModel}
                            onChange={(e) => setCurNewModel(e.target.value)}
                            placeholder={t('请输入自定义模型名称，如：gpt-4o-latest')}
                            className={cn(
                              "focus:ring-blue-500 focus:border-blue-500",
                              isDark
                                ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                            )}
                            autoFocus
                          />
                        </div>
                        <Button
                          onClick={addCustomModel}
                          disabled={!curNewModel.trim()}
                          size="sm"
                          className={cn(
                            "text-white font-medium",
                            isDark
                              ? "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600"
                              : "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                          )}
                        >
                          {t('确认')}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setShowAddCustomModel(false)
                            setCurNewModel('')
                          }}
                          className={cn(
                            isDark
                              ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                              : "border-gray-300 text-gray-700 hover:bg-gray-50"
                          )}
                        >
                          {t('取消')}
                        </Button>
                      </div>
                      <p className={cn("text-xs mt-2", isDark ? "text-blue-400" : "text-blue-700")}>
                        {t('按回车键快速添加模型')}
                      </p>
                    </div>
                  )}

                  <p className={cn("text-xs mt-3", isDark ? "text-gray-500" : "text-gray-600")}>
                    {curProvider === 'ollama'
                      ? t('选择已安装的Ollama模型，或添加自定义模型')
                      : t('添加需要的模型，将保存到服务配置中')
                    }
                  </p>
                </div>
              )}

              {/* API密钥 */}
              {serviceProviders.find(p => p.value === curProvider)?.requiresKey && (
                <div>
                  <label className={cn("block text-sm font-medium mb-2", isDark ? "text-gray-300" : "text-gray-700")}>
                    {t('API密钥')}
                  </label>
                  <Input
                    type="password"
                    value={curApiKey || ''}
                    onChange={(e) => setCurApiKey(e.target.value)}
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
              {curProvider !== 'google' && (
                <div>
                  <label className={cn("block text-sm font-medium mb-2", isDark ? "text-gray-300" : "text-gray-700")}>
                    {t('服务端点')} <span className={cn(isDark ? "text-gray-500" : "text-gray-500")}>({t('可选')})</span>
                  </label>
                  <Input
                    type="text"
                    value={curBaseUrl || ''}
                    onChange={(e) => setCurBaseUrl(e.target.value)}
                    placeholder={
                      curProvider === 'ollama'
                        ? 'http://localhost:11434'
                        : curService?.baseUrl || t('自定义服务端点URL')
                    }
                    className={cn(
                      "focus:ring-blue-500 focus:border-blue-500",
                      isDark
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    )}
                  />
                  <p className={cn("text-xs mt-2", isDark ? "text-gray-500" : "text-gray-600")}>
                    {curProvider === 'ollama'
                      ? t('Ollama服务地址，默认为 http://localhost:11434')
                      : t('留空使用默认端点，或根据插件服务需要输入自定义端点地址')
                    }
                  </p>
                </div>
              )}

              {/* 添加到服务列表按钮 */}
              <div className={cn(
                "p-4 rounded-lg border bg-gradient-to-r",
                isDark
                  ? "from-blue-900/30 to-purple-900/30 border-blue-700/50"
                  : "from-blue-50 to-purple-50 border-blue-200"
              )}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className={cn("text-sm font-medium", isDark ? "text-blue-300" : "text-blue-800")}>
                      {t('添加到服务列表')}
                    </h4>
                    <p className={cn("text-xs mt-1", isDark ? "text-blue-400/80" : "text-blue-700/80")}>
                      {t('配置完成后，点击按钮保存当前服务配置')}
                    </p>
                  </div>
                  <Button
                    onClick={handleAddToServiceList}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "gap-1",
                      isDark
                        ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    {t('添加到列表')}
                  </Button>
                </div>
              </div>

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
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
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
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 100 2h2a1 1 0 100-2H9zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
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
              description="./pdf2zh_next"
            >
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                )}
                onClick={() => handleOpenPath('pdf2zh_next')}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
                {t('打开')}
              </Button>
            </SettingItem>
          </SettingCard>

          {/* Windows故障排除卡片 */}
          {preload?.isWin && (
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
                          ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
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