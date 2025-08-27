'use server'

import * as userService from '@/services/userService'
import * as modelService from '@/services/modelService'

export default async function getModelSecurely(modelId: number) {
    const currentUser = await userService.currentUser()
    return await modelService.getModelByIdSecure(modelId, currentUser.clerk_id)
}