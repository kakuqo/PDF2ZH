import React, { useEffect, useState, createContext, useContext, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from '../utils'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { getTranslation } from '../locales'
import { commonModels, serviceProviders } from '.'

// 主题上下文
const ThemeContext = createContext<{
  isDark: boolean;
}>({
  isDark: true,
})

// 定义服务配置类型
type ServiceConfig = {
  name: string,
  provider: string,
  apiKey?: string,
  baseUrl?: string,
  models?: string[] // 保存所有可用模型
}

export interface Props {
  className?: string
  pluginConfig?: any,
  isDark?: boolean,
  lang?: string,
  translateLangs?: any[],
  pluginList?: any[],
  preload?: any,
  onTranslate?: (config: any) => Promise<void>
}

export default function Panel({ className, pluginConfig, translateLangs, pluginList, preload, isDark, lang, onTranslate }: Props) {
  const t = (key: string) => getTranslation(lang || 'zh', key)

  // 状态管理
  const [targetLang, setTargetLang] = useState('zh_cn')
  const [sourceLang, setSourceLang] = useState('en')
  const [pageRange, setPageRange] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)
  const [currentModel, setCurrentModel] = useState<string>('')
  const [serviceList, setServiceList] = useState<ServiceConfig[]>([])

  const selectModel = (model: string, provider: string) => {
    setSelectedModel(model)
    setSelectedService(provider)
  }

  // 从data中获取服务列表
  useEffect(() => {
    if (pluginConfig && pluginList) {
      console.log('pluginConfig', pluginConfig)
      initServiceList()
    }
  }, [pluginConfig, pluginList])

  const initServiceList = async () => {
    console.log('pluginConfig', pluginConfig)
    let list: any[] = []
    if (pluginConfig.serviceList) {
      list = pluginConfig.serviceList
    } else {
      const defaultList = await applyServiceList()
      list = [{ name: 'Google Translate', provider: 'google' }, ...defaultList]
    }
    // const list = (pluginConfig as any).serviceList || [{
    //   name: 'Google Translate',
    //   provider: 'google',
    // }]
    setServiceList(list.filter((item: any) => item.provider !== 'Ollama').map((item: any) => {
      return {
        name: item.name,
        provider: item.provider,
        models: item.models?.filter((model: any) => model !== 'default') || []
      }
    }))
    initOllamaList(list)
    setSelectedService(pluginConfig?.provider || 'google')
    setSelectedModel(pluginConfig?.model || '')
    if (pluginConfig?.model?.length > 0 && pluginConfig?.provider?.length > 0) {
      setCurrentModel(`${pluginConfig?.model}|${pluginConfig?.provider}`)
    } else {
      setCurrentModel(`''|${pluginConfig?.provider || 'google'}`)
    }
  }

  const applyServiceList = async () => {
    console.log(pluginList)
    if (pluginList) {
      const { config: configInfo } = await preload?.plugin.getPluginsConfig();
      console.log(configInfo)
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
      const newServiceList = pluginServiceList.map((plugin: any) => {
        const pluginConfig = configInfo[plugin.provider.value]
        const provider = serviceProviders.find((service: any) => service.plugin === plugin.provider.value)
        if (!provider) {
          return null
        }
        const models = plugin.models.map((model: any) => model.value) || commonModels[provider?.value as keyof typeof commonModels]
        const info = {
          name: provider?.label,
          provider: provider?.value,
          apiKey: pluginConfig?.apiKey,
          baseUrl: pluginConfig?.baseUrl || provider?.baseUrl,
          models: models
        }
        return info
      }).filter((service: any) => !!service && service.provider !== 'google')
      return newServiceList
    } else {
      return []
    }
  }

  const initOllamaList = async (serviceList: ServiceConfig[]) => {
    let ollamaModels = []
    if (serviceList.find((item: any) => item.provider == 'ollama')) {
      ollamaModels = await fetchOllamaModels(serviceList)
    }
    const list = serviceList.filter((item: any) => {
      if (item.provider == 'ollama') {
        return ollamaModels.length > 0
      }
      return true
    }).map((item: any) => {
      if (item.provider == 'ollama') {
        return {
          name: item.name,
          provider: item.provider,
          models: ollamaModels
        }
      }
      return {
        name: item.name,
        provider: item.provider,
        models: item.models?.filter((model: any) => model !== 'default') || []
      }
    })
    setServiceList(list)
  }

  // 获取Ollama模型列表
  const fetchOllamaModels = async (serviceList: ServiceConfig[]) => {
    try {
      const ollamaProvider = serviceList.find(item => item.provider == 'ollama')
      const baseUrl = ollamaProvider?.baseUrl || 'http://localhost:11434/api/tags'
      const response = await fetch(`${baseUrl}/api/tags`)
      if (response.ok) {
        const data = await response.json()
        const models = data.models?.map((model: any) => model.name) || []
        return models
      } else {
        return []
      }
    } catch (error) {
      return []
    }
  }

  // 处理翻译
  const handleTranslate = async () => {
    if (!selectedService) {
      toast.error(t('请选择翻译服务'))
      return
    }

    const service = serviceList.find(s => s.provider === selectedService)
    if (!service) {
      toast.error(t('未找到选中的服务'))
      return
    }

    // 如果服务需要模型选择但未选择模型
    if (service.models?.length && !selectedModel) {
      toast.error(t('请选择模型'))
      return
    }

    setIsTranslating(true)

    try {
      // 构建翻译配置
      const { serviceList, ...rest } = pluginConfig
      const curService = serviceList.find((service: any) => service.provider === selectedService)
      const translateConfig = {
        ...rest,
        targetLang,
        sourceLang,
        pageRange,
        provider: selectedService,
        model: selectedModel,
        translators: getTranslators({
          ...curService,
          model: selectedModel
        })
      }

      console.log('开始翻译:', translateConfig)

      // 这里应该调用实际的翻译功能
      // 假设通过props传递翻译函数
      if (onTranslate) {
        await onTranslate(translateConfig)
        toast.success(t('翻译已开始'))
      }
    } catch (error) {
      console.error('翻译失败:', error)
      toast.error(t('翻译失败，请稍后重试'))
    } finally {
      setIsTranslating(false)
    }
  }

  const getTranslators = (config: any): any[] => {
    const providerVars: any = {
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
    const vars = providerVars[config.provider]
    let envs: any = {}
    for (const key in vars) {
      if (config[key]) {
        envs[vars[key]] = config[key]
      }
    }
    if (Object.keys(envs).length > 0) {
      return [{
        name: config.provider,
        envs
      }]
    } else {
      return []
    }
  }

  return (
    <ThemeContext.Provider value={{ isDark: isDark || false }}>
      <div className={cn(
        'w-full transition-colors duration-200',
        className
      )}>
        {/* 主内容区域 */}
        <div className='flex flex-col gap-2'>
          {/* 服务选择 */}
          <label className={cn("block text-sm text-muted-foreground", isDark ? "text-gray-300" : "text-gray-700")}>
            {t('选择服务')}
          </label>
          <Select value={currentModel} onValueChange={(value) => {
            console.log('provider', value)
            const [modelValue, groupValue] = value.split('|');
            selectModel(modelValue, groupValue);
            setCurrentModel(value)
          }}>
            <SelectTrigger className={`${className}`}>
              <SelectValue placeholder={t('选择服务')} />
            </SelectTrigger>
            <SelectContent>
              {serviceList.map((provider) => (
                <SelectGroup key={provider.provider}>
                  {/* <SelectLabel>{group.provider.label}</SelectLabel> */}
                  {provider.models?.length ? provider.models.map((model) => (
                    <SelectItem
                      className="cursor-pointer pl-2"
                      key={model}
                      value={`${model}|${provider.provider}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-primary py-1 px-2 bg-primary/10 rounded-md">{provider.provider}</span>
                        {model}
                      </div>
                    </SelectItem>
                  )) : <SelectItem
                    className="cursor-pointer pl-2"
                    key={provider.provider}
                    value={`''|${provider.provider}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-primary py-1 px-2 bg-primary/10 rounded-md">{provider.provider}</span>
                      {provider.name}
                    </div>
                  </SelectItem>}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
          {/* 目标语言选择 */}
          <div>
            <label className={cn("block text-sm text-muted-foreground", isDark ? "text-gray-300" : "text-gray-700")}>
              {t('目标语言')}
            </label>
            <Select value={targetLang} onValueChange={setTargetLang}>
              <SelectTrigger>
                <SelectValue placeholder={t(targetLang)} />
              </SelectTrigger>
              <SelectContent className="bg-background max-h-[400px] overflow-y-auto">
                {translateLangs?.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* 源语言选择 */}
          <div>
            <label className={cn("block text-sm text-muted-foreground", isDark ? "text-gray-300" : "text-gray-700")}>
              {t('源语言')}
            </label>
            <Select value={sourceLang} onValueChange={setSourceLang}>
              <SelectTrigger>
                <SelectValue placeholder={t(sourceLang)} />
              </SelectTrigger>
              <SelectContent className="bg-background max-h-[400px] overflow-y-auto">
                {translateLangs?.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* 页面选择 */}
          <div>
            <label className={cn("block text-sm text-muted-foreground", isDark ? "text-gray-300" : "text-gray-700")}>
              {t('页面选择')}
            </label>
            <Input
              type="text"
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
              placeholder={t('按下面规则填写指定页数，例如：2,4,6，不填则翻译全文')}
              className={cn(
                "focus:ring-blue-500 focus:border-blue-500",
                isDark
                  ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              )}
            />
            <div className={cn("mt-2 text-xs", isDark ? "text-gray-500" : "text-gray-600")}>
              <p className="font-medium mb-1">{t('格式说明：')}</p>
              <ul className="space-y-1 pl-4">
                <li>• {t('单页：2')}</li>
                <li>• {t('范围：2,4-6 (第2、4-6页)')}</li>
              </ul>
            </div>
          </div>
          <div className="text-xs text-red-500 mt-2">
            {t('本工具目前不支持图片版PDF的翻译。如果您的PDF文档是扫描版或图片版，请先使用OCR工具将其转换为文本版PDF后再进行翻译。')}
          </div>
          {/* 翻译按钮 */}
          <div className="pt-2">
            <Button
              onClick={handleTranslate}
              disabled={isTranslating || serviceList.length === 0}
              className={cn(
                "w-full font-medium py-3 disabled:transform-none",
              )}
            >
              {isTranslating ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>{t('翻译中...')}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>{t('开始翻译')}</span>
                </div>
              )}
            </Button>
          </div>
        </div>
        <Toaster />
      </div>
    </ThemeContext.Provider>
  )
} 