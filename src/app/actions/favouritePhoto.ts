'use server'


import * as aiPhotoService from '@/services/aiPhotoService'
import * as userService from '@/services/userService'

export async function favouritePhoto(photoId: number) {
    const currentUser = await userService.currentUser()
    return await aiPhotoService.deleteAIPhoto(photoId, currentUser.clerk_id)
}
