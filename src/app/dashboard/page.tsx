import { Flex, Text } from '@chakra-ui/react'

import * as modelService from '@/services/modelService'
import * as userService from '@/services/userService'
import Dashboard from '@/components/Dashboard/Dashbhoard'

// brainstorm
// next.js have to get state into client components not here, will use a parent client component (Dashboard)
// this file should pass initial data/state to that parent.... 

const DashboardPage = async () => {
    const currentUser = await userService.currentUser()

    // todo - need to sth prisma to include images with these calls

    // always show latest Model output (make sure images are sorted by creation time....uhoh)
    const latestModel = await modelService.getLatestTrainedModel(currentUser.clerk_id)

    // for first visit & hasnt finished training
    const allModels = await modelService.getModelsForCurrentUser(currentUser.clerk_id)
    const completedTraining = latestModel?.completedTraining
    const firstVisit = allModels.length === 1 && !completedTraining

    return (
      <>
        {firstVisit ? (
          <Flex justify='center' align='center' height='80%'>
            <Text>Your first model is training! Please come back in 20-30 minutes. We'll also send you an email.</Text>
          </Flex>
        ) : (
          <Dashboard latestModel={latestModel} allModels={allModels} />
        )}
      </>
    )
}

export default DashboardPage

