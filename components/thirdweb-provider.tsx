"use client";

import React from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

type ThirdwebClientProviderProps = {
  children: React.ReactNode;
};

export const ThirdwebClientProvider: React.FC<ThirdwebClientProviderProps> = ({
  children
}) => {
  const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

  if (!clientId && typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.warn(
      "[First Sons] NEXT_PUBLIC_THIRDWEB_CLIENT_ID is not set. Thirdweb features may not work as expected."
    );
  }

  return (
    <ThirdwebProvider clientId={clientId} activeChain={Sepolia}>
      {children}
    </ThirdwebProvider>
  );
};

