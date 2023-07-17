'use client'
import Lottie from "lottie-react";
import loadingAnimation from "../../public/serverError.json";
export default function page() {
    return (
        <div className="w-full flex items-center justify-center h-[70vh] overflow-hidden flex-col">
                <h1 className="text-3xl font-bold px-4 text-center">❌ Oops! Your Order Was cancel.</h1>
            <Lottie style={{ height: 300 }} animationData={loadingAnimation} loop={true} />
        </div>
    )
}