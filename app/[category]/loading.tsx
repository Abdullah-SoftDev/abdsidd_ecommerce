'use client'
import Lottie from "lottie-react";
import loadingAnimation from "../../public/loadingAnimation.json";
export default function Loading() {
  return <div className="min-h-screen">
    <Lottie style={{ height: 200 }} animationData={loadingAnimation} loop={true} />
  </div>
}