'use server'

import { takePhotoWithModel } from '@/lib/replicate'

export default async function runNewImages(modelId: string, count: number, prompt: string) {
  return await takePhotoWithModel(modelId, count, prompt)
}