"use client";

import React, { useEffect } from "react";
import { redirect } from "next/navigation";

const User = () => {
  useEffect(() => {
    redirect("/user/adminplan", "push");
  }, []);
  return <div></div>;
};

export default User;
