'use client'
import Lottie from "lottie-react";
import loadingAnimation from "../../public/loadingAnimation.json";
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <Lottie  style={{ height: 200 }} animationData={loadingAnimation} loop={true} />
  }