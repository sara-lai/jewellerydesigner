// clerk complains that i need the [[...signup]] catchall:
// https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#optional-catch-all-segments

import SignUps from "@/components/Landing/SignUps"

import "../../landing.css";

const SignUpPage = () => {
    return (
         <SignUps />
    )
}

export default SignUpPage