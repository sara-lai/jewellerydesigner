import '../onboarding.css'

import * as userService from '@/services/userService'

const FirstModel = async () => {

    const user = await userService.currentUser()
    console.log('currentUser', user)
    if (user && !user.hasPlan){
        console.log('problem! currentUser on first model page without a plan')
    }

    return (
        <>first model page</>
    )
}

export default FirstModel