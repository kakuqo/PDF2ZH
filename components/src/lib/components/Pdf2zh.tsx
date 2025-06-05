import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from '../utils'
import { AimComponentStore, BaseComponentProps } from '../../types'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
// 添加 Electron API 类型声明
declare global {
  interface Window {
    electronAPI?: {
      openPath: (path: string) => void;
    };
  }
}

// 添加 Node.js 类型声明
declare const require: any;

// Set component props
export const properties: AimComponentStore['properties'] = []

// Default props data of component instance
export const data = {
  apiKey: '',
  serviceEndpoint: 'https://api.example.com',
  timeout: 30,
  customConfig: '',
  autoUpdate: false,
  pluginEnabled: true
}

export interface Props {
  className?: string
  _t?: (key: string) => string
  updateProps?: (key: string, value: any) => void
  onOpenPath?: (path: string) => void
  data?: any,
  [key: string]: any
}

export default function Pdf2zh({ className, _t, updateProps, onOpenPath, data, ...props }: Props) {
  const [activeTab, setActiveTab] = useState('introduction')
  const t = _t ? _t : (key: string) => key
  // 配置表单状态
  const [config, setConfig] = useState({
    outputPath: (data as any)?.outputPath || '',
    prompt: (data as any)?.prompt || '',
    provider: (data as any)?.provider || 'google',
    apiKey: (data as any)?.apiKey || '',
    baseUrl: (data as any)?.baseUrl || '',
    model: (data as any)?.model || '',
  })

  // 状态管理
  const [ollamaModels, setOllamaModels] = useState<string[]>([])
  const [loadingModels, setLoadingModels] = useState(false)
  const [curProvider, setCurProvider] = useState(data?.provider || '')
  const [curModel, setCurModel] = useState(data?.model || '')

  // 支持的服务商列表
  const serviceProviders = [
    { value: 'google', label: 'Google Translate', requiresKey: false },
    { value: 'deepl', label: 'DeepL', requiresKey: true },
    { value: 'ollama', label: 'Ollama', baseUrl: 'http://localhost:11434', requiresKey: false, requiresModel: true },
    { value: 'openai', label: 'OpenAI', baseUrl: 'https://api.openai.com/v1', requiresKey: true, requiresModel: true },
    { value: 'zhipu', label: 'Zhipu', requiresKey: true , requiresModel: true},
    { value: 'silicon', label: 'Silicon', requiresKey: true , requiresModel: true},
    { value: 'grok', label: 'Grok', requiresKey: true , requiresModel: true},
    { value: 'deepseek', label: 'DeepSeek', requiresKey: true , requiresModel: true},
  ]

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
        toast.error('无法获取Ollama模型列表')
        setOllamaModels([])
      }
    } catch (error) {
      toast.error('获取Ollama模型列表失败')
      setOllamaModels([])
    }
    setLoadingModels(false)
  }

  // 当服务商变为Ollama时获取模型列表
  useEffect(() => {
    if (config.provider === 'ollama') {
      fetchOllamaModels()
    }
  }, [config.provider, config.baseUrl])

  // 同步状态
  useEffect(() => {
    setCurProvider(config.provider)
  }, [config.provider])
  
  useEffect(() => {
    setCurModel(config.model)
  }, [config.model])

  // 保存配置
  const handleSaveConfig = () => {
    // 先同步当前状态到config
    const finalConfig = {
      ...config,
      provider: curProvider === 'custom' ? config.provider : curProvider,
      model: curModel === 'custom' ? config.model : curModel
    }
    
    console.log('保存配置:', finalConfig)
    if (props.updateData) {
      props.updateData(finalConfig)
      toast.success(t('配置保存成功'))
    } else {
      toast.error(t('保存失败，请稍后重试'))
    }
  }

  // 打开路径
  const handleOpenPath = (path: string) => {
    console.log(props)
    props.pluginManager.openFolderDialog([props.mainConfig.pluginDir, path])
  };

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
    <div className={cn('w-full', className)}>
      {/* Header */}
      {/* <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pdf2zh</h1>
            <p className="text-sm text-gray-500">v1.0.0</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            {t('更新')}
          </Button>
          <Button size="sm" className="bg-black text-white hover:bg-gray-800">
            {t('卸载')}
          </Button>
        </div>
      </div> */}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-4 px-6">
          <button
            onClick={() => setActiveTab('introduction')}
            className={cn(
              'py-4 px-1 font-medium text-sm transition-colors relative',
              activeTab === 'introduction'
                ? 'text-primary'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {t('介绍')}
            {activeTab === 'introduction' && (
              <div style={{ height: '2px' }} className="absolute bottom-0 left-0 right-0 bg-primary rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('configuration')}
            className={cn(
              'py-4 px-1 font-medium text-sm transition-colors relative',
              activeTab === 'configuration'
                ? 'text-primary'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {t('配置')}
            {activeTab === 'configuration' && (
              <div style={{ height: '2px' }} className="absolute bottom-0 left-0 right-0 bg-primary rounded-full" />
            )}
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'introduction' && (
          <div className="space-y-8">
            {/* 功能模块 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <h2 className="text-lg font-semibold text-gray-900">{t('功能模块')}</h2>
              </div>
              <p className="text-sm text-gray-600 mb-6">{t('PDF文档智能翻译工具')}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{t('PDF解析')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{t('智能翻译')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{t('格式保持')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{t('批量处理')}</span>
                </div>
              </div>
            </div>
            {/* 参数模块 */}
            <div className="bg-gray-50 rounded-lg p-6 mt-4">
              <div className="flex items-center space-x-2 mb-4">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <h2 className="text-lg font-semibold text-gray-900">{t('参数模块')}</h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('关联仓库')}</span>
                  <a href="https://github.com/Byaidu/PDFMathTranslate" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                    <span>{t('查看仓库')}</span>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
                {/* <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('插件大小')}</span>
                  <span className="text-sm text-gray-900">18.7 MB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('最后更新')}</span>
                  <span className="text-sm text-gray-900">2024-01-10</span>
                </div> */}
              </div>

              {/* <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-700">{t('自动更新')}</span>
                  <button 
                    onClick={() => handleToggle('autoUpdate')}
                    className={cn(
                      "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                      config.autoUpdate ? "bg-blue-600" : "bg-gray-200"
                    )}
                  >
                    <span className="sr-only">Enable auto-update</span>
                    <span className={cn(
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full ring-0 transition duration-200 ease-in-out",
                      config.autoUpdate ? "translate-x-5" : "translate-x-0"
                    )}></span>
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{t('启用插件')}</span>
                  <button 
                    onClick={() => handleToggle('pluginEnabled')}
                    className={cn(
                      "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                      config.pluginEnabled ? "bg-gray-900" : "bg-gray-200"
                    )}
                  >
                    <span className="sr-only">Enable plugin</span>
                    <span className={cn(
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full ring-0 transition duration-200 ease-in-out",
                      config.pluginEnabled ? "translate-x-5" : "translate-x-0"
                    )}></span>
                  </button>
                </div>
              </div> */}
            </div>

            {/* 许可证信息 */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-amber-800 mb-2">{t('开源许可证')}</h3>
                  <p className="text-sm text-amber-700 mb-3">
                    {t('本插件采用 AGPL-3.0 开源协议。如果您在产品中使用本插件，需要遵守相应的开源协议条款。')}
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      AGPL-3.0
                    </span>
                    <a
                      href="https://www.gnu.org/licenses/agpl-3.0.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-amber-600 hover:text-amber-800 underline"
                    >
                      {t('查看完整协议')}
                    </a>
                  </div>
                </div>
              </div>
            </div>


          </div>
        )}

        {activeTab === 'configuration' && (
          <div className="space-y-6">
            {/* 插件配置 */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{t('插件配置信息')}</h2>
            </div>

            {/* 统一配置卡片 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
              
              {/* 配置卡片头部 - 添加保存按钮 */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900">{t('插件配置')}</h3>
                </div>
                <Button 
                  onClick={handleSaveConfig}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  {t('保存配置')}
                </Button>
              </div>
              
              {/* 输出文件路径配置 */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-sm font-medium text-green-800">{t('输出文件路径配置')}</h3>
                </div>
                <div className="space-y-3 ml-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t('输出目录')}
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-50 border border-gray-200 rounded px-3 py-2">
                        <code className="text-xs text-gray-900 break-all">
                          {config.outputPath || t('翻译文件目录（默认）')}
                        </code>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-shrink-0"
                        onClick={() => {
                          console.log('选择输出文件夹')
                          selectSingleFolder()
                        }}
                      >
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        {t('选择路径')}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {t('翻译后的文件将保存到此目录，默认与原文件在同一目录')}
                    </p>
                  </div>
                </div>
              </div>

              {/* 分隔符 */}
              <div className="border-t border-gray-200"></div>

              {/* 翻译服务配置 */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-sm font-medium text-blue-800">{t('翻译服务配置')}</h3>
                </div>
                <div className="space-y-4 ml-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      {t('服务商选择')}
                    </label>
                    <div className="space-y-2">
                      <select
                        value={curProvider}
                        onChange={(e) => {
                          if (e.target.value === 'custom') {
                            setCurProvider(e.target.value)
                          } else {
                            setCurProvider(e.target.value)
                            setConfig({ ...config, provider: e.target.value })
                          }
                        }}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {serviceProviders.map((provider) => (
                          <option key={provider.value} value={provider.value}>
                            {provider.label}
                          </option>
                        ))}
                        <option value="custom">{t('自定义服务商')}</option>
                      </select>
                      
                      {curProvider === 'custom' && (
                        <Input
                          type="text"
                          value={config.provider}
                          onChange={(e) => setCurProvider(e.target.value)}
                          onBlur={() => setConfig({ ...config, provider: curProvider })}
                          placeholder={t('请输入自定义服务商名称')}
                          className="text-sm border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                        />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {t('选择翻译服务提供商，默认使用Google Translate，或添加自定义服务商')}
                    </p>
                  </div>

                  {/* 模型选择 */}
                  {(serviceProviders.find(p => p.value === config.provider)?.requiresModel || curProvider === 'custom') && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-medium text-gray-700">
                          {t('模型选择')}
                        </label>
                        {config.provider === 'ollama' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={fetchOllamaModels}
                            disabled={loadingModels}
                            className="text-xs px-2 py-1"
                          >
                            {loadingModels ? (
                              <svg className="animate-spin w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                              </svg>
                            ) : (
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                              </svg>
                            )}
                            {t('刷新')}
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <select
                          value={curModel}
                          onChange={(e) => {
                            setCurModel(e.target.value)
                          }}
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">{t('请选择模型')}</option>
                          {(commonModels[config.provider as keyof typeof commonModels] || []).map((model) => (
                            <option key={model} value={model}>
                              {model}
                            </option>
                          ))}
                          <option value="custom">{t('自定义模型')}</option>
                        </select>
                        
                        {curModel === 'custom' && <Input
                          type="text"
                          value={config.model}
                          onChange={(e) => setCurModel(e.target.value)}
                          placeholder={t('或输入自定义模型名称')}
                          className="text-sm border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                        />}
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-1">
                        {config.provider === 'ollama' 
                          ? t('选择已安装的Ollama模型，或输入自定义模型名称')
                          : t('选择推荐模型或输入自定义模型名称')
                        }
                      </p>
                    </div>
                  )}

                  {(serviceProviders.find(p => p.value === config.provider)?.requiresKey || curProvider === 'custom') && (
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t('API密钥')}
                      </label>
                      <Input
                        type="password"
                        value={config.apiKey}
                        onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                        placeholder={t('请输入API密钥')}
                        className="text-sm border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {t('使用此服务商需要提供有效的API密钥')}
                      </p>
                    </div>
                  )}

                  {(config.provider !== 'google' || curProvider === 'custom') && (
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t('服务端点')} <span className="text-gray-400">({t('可选')})</span>
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
                        className="text-sm border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {config.provider === 'ollama'
                          ? t('Ollama服务地址，默认为 http://localhost:11434')
                          : t('留空使用默认端点，或输入自定义端点地址')
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* 分隔符 */}
              <div className="border-t border-gray-200"></div>

              {/* 自定义Prompt配置 */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.894A1 1 0 0018 16V3z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-sm font-medium text-purple-800">{t('自定义Prompt配置')}</h3>
                </div>
                <div className="space-y-3 ml-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      {t('翻译提示词')}
                    </label>
                    <Textarea
                      value={config.prompt}
                      onChange={(e) => setConfig({ ...config, prompt: e.target.value })}
                      placeholder={t('请输入自定义的翻译提示词，用于指导AI翻译行为...')}
                      className="min-h-[100px] text-sm border-gray-200 focus:ring-purple-500 focus:border-purple-500 resize-vertical"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      {t('自定义提示词可以改善翻译质量，指定特定的翻译风格或术语处理方式。留空使用默认提示词。')}
                    </p>
                  </div>
                </div>
              </div>

              {/* 分隔符 */}
              <div className="border-t border-gray-200"></div>

              {/* 模型路径信息 */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                  <h3 className="text-sm font-medium text-gray-700">{t('模型路径信息')}</h3>
                </div>
                <div className="space-y-3 ml-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t('模型路径')}
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-50 border border-gray-200 rounded px-3 py-2">
                        <code className="text-xs text-gray-900 break-all">
                          /engine
                        </code>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-shrink-0"
                        onClick={() => handleOpenPath('engine')}
                      >
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                        </svg>
                        {t('打开')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 服务商支持说明 */}
              <div className="mt-6 p-4 bg-blue-50 rounded-md border-l-4 border-blue-400">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium text-blue-800 mb-2">{t('服务商支持说明')}</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• <strong>Google Translate:</strong> {t('免费服务，无需API密钥，适合日常使用')}</li>
                      <li>• <strong>OpenAI:</strong> {t('GPT-4系列模型，高质量翻译，支持复杂文档结构')}</li>
                      <li>• <strong>Ollama:</strong> {t('本地部署，数据隐私安全，支持多种开源模型')}</li>
                      <li>• <strong>DeepL:</strong> {t('欧洲语言翻译质量优秀')}</li>
                      <li>• <strong>Zhipu/DeepSeek:</strong> {t('国产大模型，中文理解能力强')}</li>
                      <li>• <strong>Silicon/Grok:</strong> {t('高性能AI服务，支持多种先进模型')}</li>
                    </ul>
                    <p className="text-xs text-blue-600 mt-2">
                      {t('详细配置说明请参考：')}
                      <a
                        href="https://github.com/Byaidu/PDFMathTranslate/blob/main/docs/ADVANCED.md#services"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-blue-800 ml-1"
                      >
                        {t('官方文档')}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 故障排除和手动安装 */}
            {props.pluginManager?.isWin && <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-800 mb-2">{t('使用故障排除')}</h3>
                  <p className="text-sm text-red-700 mb-4">
                    {t('如果插件使用失败或翻译功能异常，请打开下方文件夹点击.exe文件安装')}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-200 text-red-700 hover:bg-red-100"
                    onClick={() => {
                      handleOpenPath('engine/build')
                    }}
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    {t('打开目录')}
                  </Button>
                </div>
              </div>
            </div>}

            <Toaster />
          </div>
        )}
      </div>
    </div>
  )
} 