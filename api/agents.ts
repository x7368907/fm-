export const runtime = 'edge'

export default function handler() {
  return new Response(
    JSON.stringify({
      ok: true,
      message: 'agents api is working',
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
