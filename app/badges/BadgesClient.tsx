"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ConnectWallet,
  ThirdwebProvider,
  useAddress,
  useContract,
  metamaskWallet,
  coinbaseWallet,
  trustWallet,
  rainbowWallet,
  zerionWallet,
  phantomWallet,
  rabbyWallet,
  okxWallet
} from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { Star, Users, Trophy, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { badgeTiers as badgesFromData } from "@/lib/badges-data";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_BADGES_CONTRACT_ADDRESS ||
  "0xYourDeployedEditionAddressHere";

const isContractConfigured =
  CONTRACT_ADDRESS &&
  CONTRACT_ADDRESS.startsWith("0x") &&
  CONTRACT_ADDRESS.length > 10 &&
  CONTRACT_ADDRESS !== "0xYourDeployedEditionAddressHere";

const BadgesInner: React.FC = () => {
  const address = useAddress();
  const { contract, isLoading: contractLoading } = useContract(
    CONTRACT_ADDRESS,
    "edition-drop"
  );

  const [activeTokenId, setActiveTokenId] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const shortAddress =
    address && `${address.slice(0, 6)}...${address.slice(-4)}`;

  const handleClaim = useCallback(
    async (tokenId: number) => {
      if (!contract || !address) return;

      setErrorMessage(null);
      setStatusMessage(null);
      setActiveTokenId(tokenId);

      try {
        const c = contract as { claim: (tokenId: number, quantity: number) => Promise<unknown> };
        await c.claim(tokenId, 1);
        setStatusMessage("Badge claimed! Check your wallet 🗽");
      } catch (err: unknown) {
        console.error("Claim error", err);
        const message =
          err && typeof err === "object" && "message" in err
            ? String((err as { message: unknown }).message)
            : "Could not claim badge. Please try again or retry later.";
        setErrorMessage(
          message.length > 120 ? "Could not claim badge. Check you're on Sepolia and try again." : message
        );
      } finally {
        setActiveTokenId(null);
      }
    },
    [contract, address]
  );

  return (
    <main className="bg-[#0F172A] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-16 pt-24 sm:pt-28 md:px-6 md:pb-20 lg:px-8 lg:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.24),transparent_60%),radial-gradient(circle_at_bottom,_rgba(30,64,175,0.45),transparent_60%)]"
        />

        <div className="mx-auto flex max-w-5xl flex-col gap-8 md:gap-10">
          <div className="space-y-5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-medium text-slate-200 backdrop-blur-xl">
              <Star className="h-4 w-4 text-yellow-400" aria-hidden="true" />
              <span className="uppercase tracking-[0.18em]">
                First Sons Progression
              </span>
            </div>

            <h1 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl md:text-5xl">
              First Sons Badges
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
              Earn tiered NFTs as you move through the academy—{" "}
              <span className="font-semibold text-[#60A5FA]">
                OG → Participant → Completer
              </span>
              . Each badge is on-chain proof that you showed up and shipped with
              the group.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <ConnectWallet
                theme="dark"
                btnTitle={address ? "Switch Wallet" : "Connect Wallet"}
              />
              {address && (
                <p className="text-xs text-slate-300 sm:text-sm">
                  Connected as{" "}
                  <span className="font-mono font-semibold text-[#60A5FA]">
                    {shortAddress}
                  </span>
                </p>
              )}
            </div>

            {statusMessage && (
              <p className="text-xs font-medium text-emerald-300 sm:text-sm">
                {statusMessage}
              </p>
            )}
            {errorMessage && (
              <p className="text-xs font-medium text-rose-300 sm:text-sm">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Badge grid */}
      <section className="relative border-t border-slate-800/70 px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.3),transparent_60%)]"
        />
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-3 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">
              NFT progression
            </p>
            <h2 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
              Three tiers of on-chain proof.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
              These badges live on-chain as ERC-1155 NFTs. Start as OG fam,
              keep vibing as a participant, and lock in your builder badge once
              you&apos;ve shipped.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {badgesFromData.map((tier) => (
              <article
                key={tier.id}
                className={cn(
                  "flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5",
                  "shadow-xl shadow-blue-500/10 backdrop-blur-xl transition-all duration-300",
                  "hover:border-[#60A5FA]/30 hover:bg-white/10 hover:shadow-blue-500/20"
                )}
              >
                <div className="flex items-center gap-3">
                  {tier.image ? (
                    <div className="flex h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-900/70">
                      <img
                        src={tier.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900/70">
                      {tier.id === 0 && (
                        <Star
                          className={cn("h-5 w-5", tier.accentClass)}
                          aria-hidden="true"
                        />
                      )}
                      {tier.id === 1 && (
                        <Users
                          className={cn("h-5 w-5", tier.accentClass)}
                          aria-hidden="true"
                        />
                      )}
                      {tier.id === 2 && (
                        <Trophy
                          className={cn("h-5 w-5", tier.accentClass)}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-slate-50">
                      {tier.name}
                    </h3>
                    <p className="text-[11px] text-slate-300">
                      Token ID {tier.id} · ERC-1155
                    </p>
                  </div>
                </div>

                {tier.attributes && tier.attributes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {tier.attributes.map((a) => (
                      <span
                        key={a.trait_type}
                        className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-200"
                      >
                        <span className="text-slate-400">{a.trait_type}:</span>{" "}
                        {a.value}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-xs leading-relaxed text-slate-200 sm:text-sm">
                  {tier.description}
                </p>

                {tier.link && (
                  <Link
                    href={tier.link.href}
                    target={tier.link.href.startsWith("http") ? "_blank" : undefined}
                    rel={tier.link.href.startsWith("http") ? "noreferrer" : undefined}
                    className={cn(
                      "inline-flex items-center gap-1.5 text-[11px] font-semibold sm:text-xs",
                      "text-[#60A5FA] transition-colors hover:text-[#93C5FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
                    )}
                  >
                    {tier.link.label}
                    <ArrowRight className="h-3 w-3" aria-hidden />
                  </Link>
                )}

                <div className="mt-auto space-y-2">
                  {!address ? (
                    <p className="text-[11px] text-slate-400 sm:text-xs">
                      Connect your wallet above to see claim options.
                    </p>
                  ) : !isContractConfigured ? (
                    <div className="space-y-1.5">
                      <button
                        type="button"
                        disabled
                        className={cn(
                          "group inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-semibold",
                          "border border-slate-600/60 bg-slate-800/60 text-slate-400",
                          "opacity-80"
                        )}
                      >
                        <span>Claim Badge</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </button>
                      <p className="text-center text-[10px] text-amber-400/90">
                        Set <code className="rounded bg-slate-800/80 px-1 font-mono">NEXT_PUBLIC_BADGES_CONTRACT_ADDRESS</code> in .env.local to enable
                      </p>
                    </div>
                  ) : tier.disabled ? (
                    <button
                      type="button"
                      disabled
                      className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-full border border-slate-600/60 bg-slate-900/60 px-4 py-2.5 text-[11px] font-semibold text-slate-400"
                    >
                      {tier.disabledText ??
                        "This badge opens in a later phase."}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleClaim(tier.id)}
                      disabled={
                        !address ||
                        !contract ||
                        contractLoading ||
                        activeTokenId === tier.id
                      }
                      className={cn(
                        "group inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-semibold",
                        "bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white shadow-[0_0_26px_rgba(37,99,235,0.7)]",
                        "transition-all duration-300 hover:shadow-[0_0_40px_rgba(96,165,250,0.9)] focus-visible:outline-none",
                        "focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]",
                        (!address ||
                          !contract ||
                          contractLoading ||
                          activeTokenId === tier.id) &&
                          "cursor-not-allowed opacity-70"
                      )}
                    >
                      <span>
                        {activeTokenId === tier.id
                          ? "Claiming..."
                          : contractLoading
                            ? "Loading..."
                            : "Claim Badge"}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative border-t border-slate-800/70 px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,_rgba(30,64,175,0.45),transparent_60%)]"
        />
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">
            Qualify for badges
          </p>
          <h2 className="mt-3 bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
            Join the fam and start earning.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-base">
            Badges are for people who show up. Join Discord, work through the
            academy tracks, and stack proof on-chain as you go.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="https://discord.gg/VJj2ZHc46"
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold",
                "bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white shadow-[0_0_30px_rgba(37,99,235,0.7)]",
                "transition-all duration-300 hover:shadow-[0_0_45px_rgba(96,165,250,0.9)] focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
              )}
            >
              <span>Join Discord to Qualify</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export const BadgesClient: React.FC = () => {
  const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
  const [queryClient] = useState(() => new QueryClient());

  // Omit WalletConnect to avoid wss://relay.walletconnect.org failures (network/firewall).
  // Users can connect via MetaMask, Coinbase, Trust, Rainbow, Zerion, Phantom, Rabby, OKX.
  const supportedWallets = [
    metamaskWallet(),
    coinbaseWallet(),
    trustWallet(),
    rainbowWallet(),
    zerionWallet(),
    phantomWallet(),
    rabbyWallet(),
    okxWallet()
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider
        clientId={clientId}
        activeChain={Sepolia}
        supportedWallets={supportedWallets}
      >
        <BadgesInner />
      </ThirdwebProvider>
    </QueryClientProvider>
  );
};

