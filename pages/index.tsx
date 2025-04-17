from zipfile import ZipFile

# Full-featured index.tsx page with personal profile + trade cards + comments
index_page = '''\
import { useState } from 'react'

type Trade = {
  id: number
  date: string
  symbol: string
  name: string
  position: string
  entryPrice: number
  currentPrice: number
  size: string
  reason: string
  status: string
  imageUrl: string
}

type Comment = {
  id: number
  tradeId: number
  username: string
  content: string
  reply?: string
}

const trades: Trade[] = [
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
    imageUrl: "https://via.placeholder.com/300x180.png?text=AAPL+交易截图"
  },
  {
    id: 2,
    date: "2025-04-15",
    symbol: "TSLA",
    name: "Tesla Inc.",
    position: "多头",
    entryPrice: 172.2,
    currentPrice: 183.4,
    size: "15% 仓位",
    reason: "趋势突破 + 板块轮动",
    status: "已止盈",
    imageUrl: "https://via.placeholder.com/300x180.png?text=TSLA+交易截图"
  }
]

const comments: Comment[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  tradeId: i < 6 ? 1 : 2,
  username: `用户${i + 1}`,
  content: `这是评论内容 ${i + 1}`,
  reply: i % 3 === 0 ? `回复用户${i + 1}：谢谢反馈！` : undefined
}))

export default function Home() {
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({})

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-md p-6 mb-8 text-center">
        <img src="https://i.pravatar.cc/100" alt="头像" className="mx-auto w-24 h-24 rounded-full mb-4" />
        <h1 className="text-2xl font-bold">陈耀东</h1>
        <p className="text-gray-500">交易是一场修行</p>
      </div>

      <div className="w-full max-w-3xl">
        {trades.map((trade) => {
          const profitRate = (((trade.currentPrice - trade.entryPrice) / trade.entryPrice) * 100).toFixed(2)
          const tradeComments = comments.filter(c => c.tradeId === trade.id)
          return (
            <div key={trade.id} className="bg-white p-6 rounded-lg shadow mb-6">
              <h2 className="text-xl font-semibold mb-2">{trade.symbol} - {trade.name}</h2>
              <div className="flex items-center justify-between mb-3">
                <span className="text-green-600 font-bold text-lg">盈亏：{profitRate}%</span>
                <span className="text-sm text-gray-500">当前价格：${trade.currentPrice}</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1 text-sm">
                  <p>📅 日期：{trade.date}</p>
                  <p>🧭 仓位：{trade.position}</p>
                  <p>💰 买入价：${trade.entryPrice}</p>
                  <p>📦 仓位大小：{trade.size}</p>
                  <p>📝 理由：{trade.reason}</p>
                  <p>📊 状态：<span className="font-semibold">{trade.status}</span></p>
                </div>
                <div>
                  <img src={trade.imageUrl} alt="交易截图" className="rounded border" />
                </div>
              </div>

              <div className="mt-4 border-t pt-3">
                <h3 className="font-medium mb-1 text-sm">💬 评论</h3>
                <button
                  className="text-blue-600 text-sm mb-2 underline"
                  onClick={() => setShowComments(prev => ({ ...prev, [trade.id]: !prev[trade.id] }))}
                >
                  {showComments[trade.id] ? "收起评论" : `展开评论（${tradeComments.length}）`}
                </button>
                {showComments[trade.id] && (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {tradeComments.map(c => (
                      <div key={c.id} className="border border-gray-200 rounded p-2 text-sm">
                        <p><strong>{c.username}</strong>：{c.content}</p>
                        {c.reply && <p className="text-blue-600 mt-1">{c.reply}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
'''

# Prepare and zip it
zip_path = "/mnt/data/tailwind-trade-display.zip"
with ZipFile(zip_path, 'w') as zipf:
    zipf.writestr("pages/index.tsx", index_page)

zip_path
