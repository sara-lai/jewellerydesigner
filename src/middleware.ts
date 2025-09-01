// made from clerk dashboard post sign-in and https://clerk.com/docs/references/nextjs/clerk-middleware

// todo - per GPT use middleware to handle redirects depending on stage of onboarding (avoid page flashes)
// ideal: if account but !paid, go to plans ; if account && paid, go to first-model ; if account && paid && first model, go to dashboard

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)', 
  '/onboarding/plans' // testing prod issue after stripe redirect...
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
