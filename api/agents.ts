// ✅ 告訴 Vercel：這是 Edge Runtime
export const runtime = 'edge'

export default async function handler(request: Request) {
  const { searchParams } = new URL(request.url)
  const level = searchParams.get('level')
  const parentKey = searchParams.get('parentKey')

  const MOCK_AGENTS = [
    {
      key: '1',
      name: 'FMCA',
      currentLevel: 1,
      maxLevel: 5,
      memberCount: 8,
      parentKey: null,
    },
    {
      key: '2',
      name: '代理 A',
      currentLevel: 2,
      maxLevel: 5,
      memberCount: 3,
      parentKey: '1',
    },
    {
      key: '3',
      name: '代理 B',
      currentLevel: 2,
      maxLevel: 5,
      memberCount: 2,
      parentKey: '1',
    },
    {
      key: '4',
      name: '代理 C',
      currentLevel: 3,
      maxLevel: 5,
      memberCount: 0,
      parentKey: '2',
    },
  ]

  let result = MOCK_AGENTS

  if (parentKey) {
    result = result.filter((a) => a.parentKey === parentKey)
  }

  if (level) {
    result = result.filter((a) => a.currentLevel === Number(level))
  }

  return new Response(
    JSON.stringify({
      list: result,
      total: result.length,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
