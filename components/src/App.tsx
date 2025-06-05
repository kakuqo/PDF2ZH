import MemoComponents from "./lib"
import "./globals.css"
import { useState } from "react"

function App() {

  const [data, setData] = useState<Record<string, any>>({})

  const handleChange = (key: string, value: any) => {
    data[key] = value
    setData({ ...data })
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <MemoComponents 
        updateProps={(key: string, value: any) => handleChange('pdf2zh', value)} 
        data={data} 
      />
      
      <div className="mt-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium mb-2">组件状态</h3>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}

export default App
