import { Flex, Text, Heading } from '@chakra-ui/react'

import * as modelService from '@/services/modelService'
import * as userService from '@/services/userService'
import Dashboard from '@/components/Dashboard/Dashboard'
// import * as aiPhotoService from '@/services/aiPhotoService'

import "@/app/(landing)/landing.css" // "sun effect" on first visit only 

const DashboardPage = async () => {
    const currentUser = await userService.currentUser()

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    // todo - can make these calls in parallel... 

    const latestModel = await modelService.getLatestTrainedModel(currentUser.clerk_id) // so page defaults to latest model

    const allModels = await modelService.getModelsForCurrentUser(currentUser.clerk_id)

    // for first visit & hasnt finished training
    const firstVisit = allModels.length === 1 && latestModel?.completedTraining

    // get all images for current user (vs doing it on a per model basis)
    // await aiPhotoService.getPhotosForCurrentUser(currentUser.clerk_id) // skip for now

    return (
      <>
        {firstVisit ? (
          <>
            <div className="sun-gradient"></div>
            <Flex direction='column' justify='center' align='center' height='80%'>
              <Heading mb={4}>Your first model is training.</Heading> 
              <Text>Please come back in 20-30 minutes. We'll also send an email when ready!</Text>
            </Flex>
          </>
        ) : (
          <Dashboard latestModel={latestModel} allModels={allModels} currentUser={currentUser} />
        )}
      </>
    )
}

export default DashboardPage

