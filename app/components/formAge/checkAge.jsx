"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";

const CheckAge = () => {
  const router = useRouter();
  useEffect(() => {
    const ageCheckSession = sessionStorage.getItem("AgeCheck");
    const ageCheckLocal = localStorage.getItem("AgeCheck");
    if (!ageCheckSession || !ageCheckLocal) {
      router.push("/");
    }
  }, [router]);
};

export default CheckAge;
