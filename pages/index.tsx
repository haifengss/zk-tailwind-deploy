import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

// 交易类型
type Trade = {
  id: number
  date: string
  symbol: string
  name: string
  position: string
  entryPrice: number
  size: string
  reason: string
  status: string
  currentPrice?: number
  imageUrl?: string
}

type Comment = {
  id: number
  username: string
  content: string
  reply?: string
}

const mockTrades: Trade[] = [
  {
    id: 1,
    date: "2025-04-17",
    symbol: "AAPL",
    name: "Apple Inc.",
    position: "多头",
    entryPrice: 168.5,
    currentPrice: 175.2,
    size: "20% 仓位",
    reason: "筹码锁定、强势整理 + AI 概念回暖。",
    status: "持有中",
    imageUrl: "https://ts1.cn.mm.bing.net/th/id/R-C.c2fbd2c54059d3dba062fc53b47aefdb?rik=gjdpcWqec3vlxg&riu=http%3a%2f%2fwww.lzbs.com.cn%2fres%2f2022-08%2f31%2f004922e9_ad5d_4be3_b478_531cbf537bfd.jpg"
  },
  {
    id: 2,
    date: "2025-04-15",
    symbol: "TSLA",
    name: "Tesla Inc.",
    position: "多头",
    entryPrice: 172.2,
    currentPrice: 183.4,
    size: "30% 仓位",
    reason: "利好消息，突破整理平台",
    status: "持有中",
    imageUrl: "https://via.placeholder.com/300x180.png?text=TSLA"
  },
  {
    id: 3,
    date: "2025-04-10",
    symbol: "NVDA",
    name: "NVIDIA",
    position: "多头",
    entryPrice: 785,
    currentPrice: 801,
    size: "15% 仓位",
    reason: "AI继续发酵，技术面破位",
    status: "已止盈",
    imageUrl: "https://via.placeholder.com/300x180.png?text=NVDA"
  }
]

const mockComments: Comment[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  username: `用户${i + 1}`,
  content: `这是第 ${i + 1} 条评论，观点很有意思！`,
  reply: i % 3 === 0 ? `回复用户${i + 1}：谢谢你的反馈！` : undefined
}))

export default function Home() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-xl p-4 md:p-8">
        <header className="text-center mb-10">
          <img
            src="https://i.pravatar.cc/120"
            alt="头像"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold">陈耀东</h1>
          <p className="text-gray-600">“交易是一场修行”</p>
        </header>

        <main>
          <h2 className="text-2xl font-bold mb-6 text-center">📈 交易记录</h2>
          {mockTrades.map(trade => {
            const profitRate = trade.currentPrice
              ? (((trade.currentPrice - trade.entryPrice) / trade.entryPrice) * 100).toFixed(2)
              : null

            const isClosed = trade.status.includes("止盈") || trade.status.includes("止损")

            return (
              <div key={trade.id} className={`border p-4 rounded-lg mb-6 shadow-sm ${isClosed ? 'bg-yellow-50 border-yellow-400' : 'border-gray-200'}`}>
                <h3 className="text-xl font-semibold mb-2">{trade.symbol} - {trade.name}</h3>

                {profitRate && (
                  <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                    <span className="text-2xl font-bold text-green-600">盈亏：{profitRate}%</span>
                    <span className="text-sm text-gray-500">当前价格：${trade.currentPrice}</span>
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <p>📅 日期：{trade.date}</p>
                    <p>🧭 仓位：{trade.position}</p>
                    <p>💰 买入价：${trade.entryPrice}</p>
                    <p>📦 仓位大小：{trade.size}</p>
                    <p>📝 理由：{trade.reason}</p>
                    <p>📊 状态：<span className="font-semibold">{trade.status}</span></p>
                  </div>

                  {trade.imageUrl && (
                    <div className="flex-shrink-0 w-full md:w-72">
                      <img
                        src={trade.imageUrl}
                        alt="交易截图"
                        className="w-full h-auto rounded border object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-6 border-t pt-4">
                  <h4 className="font-medium mb-2">💬 评论</h4>
                  <button
                    className="text-blue-600 text-sm mb-3 underline"
                    onClick={() => setExpandedId(expandedId === trade.id ? null : trade.id)}
                  >
                    {expandedId === trade.id ? '收起评论' : '展开评论'}
                  </button>

                  {expandedId === trade.id && (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {mockComments.map(comment => (
                        <div key={comment.id} className="border border-gray-200 rounded p-3">
                          <p className="text-sm"><strong>{comment.username}</strong>：{comment.content}</p>
                          {comment.reply && (
                            <p className="text-sm text-blue-600 mt-1">{comment.reply}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </main>

        <footer className="mt-10 border-t pt-4 text-sm text-center text-gray-500">
          📷 联系方式：me@example.com
        </footer>
      </div>
    </div>
  )
}
