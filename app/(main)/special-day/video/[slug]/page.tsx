import ProtectedVideoClient from "./protected-video-client"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return <ProtectedVideoClient slug={slug} />
}