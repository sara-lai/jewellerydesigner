'use server'

// brainstorm
// get currentUser via Clerk/ ensure can only delete own photos
// todo - version of this for "soft delete" / move to trash 

import * as aiPhotoService from '@/services/aiPhotoService'
import * as userService from '@/services/userService'

export default async function deletePhoto(photoId: number) {
    const currentUser = await userService.currentUser()
    return await aiPhotoService.deleteAIPhoto(photoId, currentUser.clerk_id)
}