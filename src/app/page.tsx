"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CircleArrowRight,
  WandSparkles,
  Package,
  CircleCheckBig,
  Fingerprint,
  ChevronUp,
  ChevronDown,
  Box,
} from "lucide-react";
import Image from "next/image";

interface FAQItem {
  question: string;
  answer: string;
}

export default function LandingPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  const router = useRouter();

  const toAuth = () => {
    router.push("/auth");
  };

  const faqData: FAQItem[] = [
    {
      question: "Do I need to chat with buyers?",
      answer:
        "No, our AI agent handles all buyer communications for you automatically.",
    },
    {
      question: "What if my item doesn't sell?",
      answer: "You only spend the activation credits.",
    },
    {
      question: "Which marketplaces does Addi post to?",
      answer:
        "Addi posts to multiple popular marketplaces including Facebook Marketplace, Craigslist, and other local selling platforms.",
    },
    {
      question: "How long does it take for my item to be listed?",
      answer:
        "Most items are listed within 24 hours of activation. Our AI processes your item details and creates optimized listings quickly.",
    },
    {
      question: "Can I edit my listing after it's live?",
      answer:
        "Yes, you can make changes to your listing at any time through your dashboard. Updates are automatically synced across all platforms.",
    },
    {
      question: "Is there a limit to how many items I can list?",
      answer:
        "There's no hard limit, but you'll need sufficient credits for each item activation. Bulk listing discounts are available.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="px-4 sm:px-6 py-0 text-center bg-cover bg-center bg-no-repeat relative min-h-screen"
        style={{
          backgroundImage: "url('/assets/images/background.png')",
        }}
      >
        {/* White overlay gradient - more white at top and bottom, less in middle */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,1) 100%)",
          }}
        ></div>

        {/* Content with higher z-index */}
        <div className="relative z-10">
          {/* Navigation */}
          <nav className="px-4 sm:px-6 py-4 flex justify-between items-center">
            <div className="text-xl font-bold">
              <img
                src="/assets/images/logo.png"
                width={100}
                height={100}
                className="w-24 h-auto sm:w-auto sm:h-auto md:w-auto md:h-auto"
                alt="logo"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <a
                href="#"
                className="text-black hover:text-gray-900 font-semibold"
              >
                Features
              </a>
              <a
                href="#"
                className="text-black hover:text-gray-900 font-semibold"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-black hover:text-gray-900 font-semibold"
              >
                About
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-black p-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Get Started Button */}
            <button
              className="text-white cursor-pointer px-3 sm:px-4 py-2 rounded-full flex items-center justify-center gap-1 transition-all hover:shadow-lg text-xs sm:text-sm"
              style={{
                background: "linear-gradient(180deg, #323232 0%, #0A0A0A 100%)",
                boxShadow:
                  "0 1px 0 0 rgba(255, 255, 255, 0.33) inset, 0 -2px 2px 0 rgba(255, 255, 255, 0.10) inset, 0 0 0 1.5px #000, 0 3px 4px -1px rgba(0, 0, 0, 0.25)",
                padding: "6px 8px sm:6px 10px",
              }}
              onClick={toAuth}
            >
              <span className="hidden sm:inline">Get Started</span>
              <span className="sm:hidden">Start</span>
              <CircleArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </nav>

          {/* Hero Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 md:pt-16 pb-0">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6 text-black leading-tight">
              Snap. Chat. Sold.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-neutral-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              The easiest way to sell your stuff. Take a photo, let our AI do
              the work, and get paid fast.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4 sm:px-0">
              <button
                className="flex cursor-pointer items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-2 rounded-full font-semibold text-white text-sm sm:text-base
bg-gradient-to-b from-[#7C86FF] to-[#615FFF]
shadow-[inset_0_1px_0_rgba(255,255,255,0.33),inset_0_-2px_2px_rgba(10,10,10,0.10),0_0_0_1.5px_#432DD7,0_3px_4px_-1px_rgba(0,0,0,0.25)] 
transition-colors w-full sm:w-auto"
                onClick={toAuth}
              >
                <Package size={18} />
                <span className="whitespace-nowrap">Let's Sell Something</span>
              </button>

              <button
                onClick={toAuth}
                className="flex cursor-pointer items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 sm:px-8 py-3 rounded-full shadow-md font-semibold hover:border-gray-400 transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                <WandSparkles size={18} />
                <span className="whitespace-nowrap">Show Me the Magic</span>
              </button>
            </div>

            {/* Hero Image */}
            <div className="w-full max-w-5xl mx-auto">
              <img
                src="/assets/images/hero.png"
                width={1080}
                height={1080}
                className="w-full h-auto max-w-full"
                alt="hero"
                style={{
                  maxHeight: "70vh",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>

        {/* White fade out at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32 bg-gradient-to-t from-white to-transparent z-20"></div>
      </section>

      {/* Why Sell Section */}
      <section className="px-6 py-20">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-4xl font-normal text-black mb-2">
            Why sell the hard way?
          </h2>
          <p className="text-neutral-400 mb-14">
            Adol does the boring work — so you don’t have to.
          </p>

          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {/* Snap & Go (kuning, gambar bawah) */}
              <div className="rounded-3xl bg-yellow-100 shadow-sm flex flex-col h-fit">
                <div className="m-5 text-left">
                  <h3 className="font-bold text-xl mb-2 text-yellow-900">
                    Snap & Go
                  </h3>
                  <p className="text-yellow-900 text-sm leading-relaxed">
                    Upload a quick pic, no studio shots needed.
                  </p>
                </div>
                <div className="rounded-xl overflow-hidden mt-auto ml-4">
                  <Image
                    src="/assets/images/features-1.png"
                    alt="Snap & Go"
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* Negotiation Ninja (biru, gambar kanan & tinggi) */}
              <div className="rounded-3xl bg-indigo-100 shadow-sm flex flex-col h-[310px] relative">
                <div className="m-5 text-left">
                  <h3 className="font-bold text-xl mb-2 text-indigo-700">
                    Negotiation Ninja
                  </h3>
                  <p className="text-indigo-700 text-sm leading-relaxed">
                    Adol chats with buyers, filters low-ballers, and brings only
                    serious offers.
                  </p>
                </div>

                <div className="absolute right-0 bottom-0">
                  <Image
                    src="/assets/images/features-3.png"
                    alt="Negotiation Ninja"
                    width={250}
                    height={300}
                    className="h-auto"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* AI-Powered Listings (merah, gambar kanan & tinggi) */}
              <div className="rounded-3xl bg-rose-100 shadow-sm flex flex-col h-[320px] relative">
                <div className="m-5 text-left">
                  <h3 className="font-bold text-xl mb-2 text-rose-900">
                    AI-Powered Listings
                  </h3>
                  <p className="text-rose-900 text-sm leading-relaxed">
                    Smart titles, catchy descriptions, and market-based pricing
                    — done for you.
                  </p>
                </div>
                <div className="absolute right-0 bottom-4">
                  <Image
                    src="/assets/images/features-2.png"
                    alt="AI-Powered Listings"
                    width={250}
                    height={300}
                    className="h-auto"
                  />
                </div>
              </div>

              {/* One-Stop Sales Agent (hijau, gambar bawah) */}
              <div className="rounded-3xl bg-green-100 h-fit shadow-sm flex flex-col">
                <div className="m-5 text-left">
                  <h3 className="font-bold text-xl mb-2 text-green-900">
                    One-Stop Sales Agent
                  </h3>
                  <p className="text-green-900 text-sm leading-relaxed">
                    From listing to deal, Adol handles it all.
                  </p>
                </div>
                <div className="rounded-xl ml-5">
                  <Image
                    src="/assets/images/features-4.png"
                    alt="One-Stop Sales Agent"
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="px-40 py-20">
        <div className="mx-auto">
          <div className="flex flex-col gap-2 mb-16 justify-center items-center">
            <h2 className="text-4xl font-normal text-center text-black">
              Selling, simplified in 3 steps
            </h2>
            <p className="text-neutral-400">
              From photo to payout — your AI agent runs the show.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <Image
                src="/assets/images/selling-1.png"
                alt="List your items"
                width={300}
                height={200}
                className="rounded w-full h-auto"
              />
              <div className="flex flex-col gap-3 mt-3 justify-center items-center">
                <p className="flex w-8 h-8 flex-col justify-center items-center gap-2 rounded-full bg-gradient-to-b from-[#7C86FF] to-[#615FFF] text-white text-sm font-semibold">
                  1
                </p>
                <div className="mt-3">
                  <h3 className="text-xl font-normal mb-2 text-black">
                    Snap it
                  </h3>
                  <p className="text-neutral-400">
                    Take a photo of what you want to sell.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <Image
                src="/assets/images/selling-2.png"
                alt="Add words to magic"
                width={300}
                height={200}
                className="rounded w-full h-auto"
              />
              <div className="flex flex-col gap-3 mt-3 justify-center items-center">
                <p className="flex w-8 h-8 flex-col justify-center items-center gap-2 rounded-full bg-gradient-to-b from-[#7C86FF] to-[#615FFF] text-white text-sm font-semibold">
                  2
                </p>
                <div className="mt-3">
                  <h3 className="text-xl font-normal mb-2 text-black">
                    Adol works its magic
                  </h3>
                  <p className="text-neutral-400">
                    AI creates your listing, negotiates, and manages buyers.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <Image
                src="/assets/images/selling-3.png"
                alt="Get paid, sit back!"
                width={300}
                height={200}
                className="rounded w-full h-auto"
              />
              <div className="flex flex-col gap-3 mt-3 justify-center items-center">
                <p className="flex w-8 h-8 flex-col justify-center items-center gap-2 rounded-full bg-gradient-to-b from-[#7C86FF] to-[#615FFF] text-white text-sm font-semibold">
                  3
                </p>
                <div className="mt-3">
                  <h3 className="text-xl font-normal mb-2 text-black">
                    Get paid, stress-free
                  </h3>
                  <p className="text-neutral-400">
                    Approve the best offer, and let Adol handle all
                    negotiations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Powered Section */}
      <section className="px-20 text-white">
        <div className="px-30 py-20 mx-auto bg-black rounded-[40px]">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Bagian kiri: Image */}
            <div className="flex-shrink-0">
              <Image
                src="/assets/images/ai-icp.png"
                width={700}
                height={500}
                alt="icp"
              />
            </div>

            {/* Bagian kanan: Konten */}
            <div className="flex-1">
              <h2 className="text-4xl font-normal mb-3">Powered by ICP</h2>
              <p className="text-gray-400 mb-10">
                Simple, transparent, Web3-powered.
              </p>

              <div className="flex flex-col gap-4 mb-10">
                <div className="bg-gray-900 rounded-xl py-3 px-5 flex items-start gap-3">
                  <span>
                    <CircleCheckBig size={20} />
                  </span>
                  <p>
                    Top up with ICP, your digital credits fuel your AI agent.
                  </p>
                </div>
                <div className="bg-gray-900 rounded-xl py-3 px-5 flex items-start gap-3">
                  <span>
                    <CircleCheckBig size={20} />
                  </span>
                  <p>Only pay when you sell — no hidden fees.</p>
                </div>
                <div className="bg-gray-900 rounded-xl py-3 px-5 flex items-start gap-3">
                  <span>
                    <CircleCheckBig size={20} />
                  </span>
                  <p>Low credits? Adol reminds you before running out.</p>
                </div>
              </div>

              <button
                className="flex justify-center items-center gap-1 px-5 py-3 rounded-full 
             bg-gradient-to-b from-[#9BA2FE] to-[#615FFF] 
             shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-2px_2px_rgba(10,10,10,0.1),0_0_0_1px_#432DD7,0_3px_4px_-1px_rgba(0,0,0,0.25)]
             transition hover:opacity-90"
              >
                <Fingerprint size={20} />
                <span>Sign in with Internet Identity</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-70 py-20">
        <div className="mx-auto w-full">
          <div className="text-center mb-16">
            <div className="relative inline-block mb-4">
              <h2 className="text-5xl font-normal text-black">
                Stay in the loop
              </h2>
              <span
                className="absolute -top-4 -right-8 text-blue-500 italic text-lg font-medium transform rotate-12"
                style={{ fontFamily: "Figma Hand" }}
              >
                only when it matters
              </span>
            </div>
            <p className="text-neutral-400 text-lg mt-4 max-w-md mx-auto">
              Your AI agent keeps you updated at the right moments.
            </p>
          </div>

          {/* Notification Bubbles */}
          <div className="relative mx-auto">
            {/* Top Row */}
            <div className="flex justify-center items-center gap-8 mb-4">
              {/* Draft listing notification */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500/50 rounded-full flex items-center justify-center">
                  <div className="rounded-sm">📝</div>
                </div>
                <div className="flex items-center bg-purple-500 text-white px-6 py-3 rounded-full shadow-lg">
                  <span className="text-sm font-medium">
                    Draft listing ready — approve & post.
                  </span>
                </div>
              </div>

              {/* Deal notification */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-500/50 rounded-full flex items-center justify-center">
                  <div className="rounded-sm">💰</div>
                </div>
                <div className="flex items-center bg-red-500 text-white px-6 py-3 rounded-full shadow-lg">
                  <span className="text-sm font-medium">
                    Buyer’s final offer Rp 1,650,000 — deal?
                  </span>
                </div>
              </div>
            </div>

            {/* Middle Row */}
            <div className="flex justify-center items-center gap-8 mb-4">
              {/* Credits notification */}
              <div className="flex items-center w-full">
                <div className="w-10 h-10 bg-orange-500/50 rounded-full flex items-center justify-center">
                  <div className="rounded-sm">💳</div>
                </div>
                <div className="flex items-center bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg">
                  <span className="text-sm font-medium">
                    Low credits — top up to keep selling.
                  </span>
                </div>
              </div>

              {/* Shipped notification */}
              <div className="flex items-center w-full">
                <div className="w-10 h-10 bg-green-500/50 rounded-full flex items-center justify-center">
                  <div className="rounded-sm">📦</div>
                </div>
                <div className="flex items-center bg-green-500 text-white px-6 py-3 rounded-full shadow-lg">
                  <span className="text-sm font-medium">
                    Item shipped — tracking number sent.
                  </span>
                </div>
              </div>

              {/* Inquiries notification */}
              <div className="flex items-center w-full">
                <div className="w-10 h-10 bg-pink-500/50 rounded-full flex items-center justify-center">
                  <div className="rounded-sm">🔍</div>
                </div>
                <div className="flex items-center bg-pink-500 text-white px-6 py-3 rounded-full shadow-lg">
                  <span className="text-sm font-medium">
                    New inquiries received — respond promptly.
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex justify-center items-center gap-8">
              {/* Feedback notification */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-700/50 rounded-full flex items-center justify-center">
                  <div className="rounded-sm">📅</div>
                </div>
                <div className="flex items-center bg-indigo-700 text-white px-6 py-3 rounded-full shadow-lg">
                  <span className="text-sm font-medium">
                    Reminder: Feedback request pending — follow up!
                  </span>
                </div>
              </div>

              {/* Pickup notification */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-cyan-500/50 rounded-full flex items-center justify-center">
                  <div className="rounded-sm">🚚</div>
                </div>
                <div className="flex items-center bg-cyan-500 text-white px-6 py-3 rounded-full shadow-lg">
                  <span className="text-sm font-medium">
                    Pickup scheduled for Saturday — confirm?
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-normal text-center mb-4 text-black">
              Loved by amazing sellers everywhere
            </h2>
            <p className="text-neutral-400 text-lg">
              From decluttering to quick cash — see what our users say.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="bg-white shadow-lg border border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">
                  "I sold my headphones in just a day— without any effort on my
                  part. Addi has become my go-to partner for side hustling."
                </p>
                <p className="text-gray-400 text-sm">Sarah</p>
              </div>

              <div className="bg-white shadow-lg border border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">
                  "I turned my cooking skills into cash. Addi connected me with
                  eager buyers in no time!"
                </p>
                <p className="text-gray-400 text-sm">Mark</p>
              </div>

              <div className="bg-white shadow-lg border border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">
                  "Addi organized a successful garage sale for my unwanted
                  items, making it so easy."
                </p>
                <p className="text-gray-400 text-sm">Ethan</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-lg border border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">
                  "Addi helped me find a new home for my bike; the entire
                  process was seamless."
                </p>
                <p className="text-gray-400 text-sm">Jake</p>
              </div>

              <div className="bg-white shadow-lg border border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">
                  "I decluttered my apartment before moving and Addi took care
                  of everything for me."
                </p>
                <p className="text-gray-400 text-sm">Daisy</p>
              </div>

              <div className="bg-white shadow-lg border border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">
                  "Selling my handcrafted jewelry was a breeze with Addi, and I
                  reached a larger audience than ever before."
                </p>
                <p className="text-gray-400 text-sm">Sophie</p>
              </div>

              <div className="bg-white shadow-lg border border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">
                  "Transformed my handmade crafts into a thriving online shop
                  with Addi's support."
                </p>
                <p className="text-gray-400 text-sm">Ava</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white shadow-lg border border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">
                  "I effortlessly sold my vintage vinyl collection, all thanks
                  to Addi's fantastic online marketplace."
                </p>
                <p className="text-gray-400 text-sm">Emma</p>
              </div>

              <div className="bg-white shadow-lg border border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">
                  "I successfully listed and sold my old sports equipment,
                  thanks to Addi's easy-to-use interface."
                </p>
                <p className="text-gray-400 text-sm">Carlos</p>
              </div>

              <div className="bg-white shadow-lg border border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">
                  "I cleared out my closet and made some extra cash, all thanks
                  to Addi's user-friendly platform."
                </p>
                <p className="text-gray-400 text-sm">Tina</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-normal text-black mb-4">
              Simple pricing. Zero surprises.
            </h2>
            <p className="text-neutral-400 text-lg">
              Pay with Addi Credits. If you don't sell, you don't lose big.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4 max-w-2xl mx-auto">
            {/* Agent Activation Fee Card */}
            <div className="bg-green-100 px-8 py-4 rounded-[20px] border-2 border-dashed border-green-500 shadow-md transform rotate-4 w-full max-w-md">
              <p className="text-black font-medium text-center">
                <span className="font-bold">Agent Activation Fee:</span> 10
                credits per item.
              </p>
            </div>

            {/* Sales Commission Card */}
            <div className="bg-yellow-100 px-8 py-4 border-2 border-dashed border-yellow-500 rounded-[20px] shadow-md -mt-3 transform -rotate-2 w-full max-w-lg z-5">
              <p className="text-black font-medium text-center">
                <span className="font-bold">Sales Commission:</span> Small %
                after successful sale.
              </p>
            </div>

            {/* Fee-to-Commission Rebate Card */}
            <div className="bg-purple-100 px-8 py-4 rounded-[20px] border-2 border-dashed border-purple-500 shadow-md transform rotate-2 -mt-5 w-full max-w-2xl z-10">
              <p className="text-black font-medium text-center">
                <span className="font-bold">Fee-to-Commission Rebate:</span>{" "}
                Activation fee deducted from final commission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left side - Header */}
            <div>
              <h2 className="text-5xl font-normal text-black mb-4">
                Got questions?
              </h2>
              <p className="text-gray-500 text-lg">We've got the answers.</p>
            </div>

            {/* Right side - FAQ Items */}
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className={`${
                    openIndex === index &&
                    "bg-indigo-50 border-2 border-dashed border-indigo-300 rounded-[20px]"
                  } overflow-hidden`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-black">
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                    )}
                  </button>

                  {openIndex === index && (
                    <div className="px-6 pb-4">
                      <p className="text-neutral-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-20 py-20">
        <div className="mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden bg-cover bg-center bg-no-repeat min-h-[300px] flex items-center justify-center"
            style={{
              backgroundImage: "url('/assets/images/cta.png')",
            }}
          >
            {/* Content */}
            <div className="relative z-10 text-center px-6 py-12">
              <h2 className="text-4xl font-normal text-black mb-4">
                Ready to sell smarter?
              </h2>
              <p className="text-neutral-400 text-sm mb-8 max-w-md mx-auto">
                Activate your AI sales agent today — make selling easier than
                buying.
              </p>
              <button
                className="text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 mx-auto hover:scale-105"
                style={{
                  display: "flex",
                  padding: "8px 12px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "999px",
                  background:
                    "linear-gradient(180deg, #7C86FF 0%, #615FFF 100%)",
                  boxShadow:
                    "0 1px 0 0 rgba(255, 255, 255, 0.33) inset, 0 -2px 2px 0 rgba(10, 10, 10, 0.10) inset, 0 0 0 1.5px #432DD7, 0 3px 4px -1px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Box size={20} />
                Let's Sell Something
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-white px-4 py-20 sm:py-28 md:py-50 relative overflow-hidden mt-10 w-full">
        {/* White Gradient Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 40%, rgba(255, 255, 255, 0.2) 80%, rgba(255, 255, 255, 0.05) 100%)",
          }}
        ></div>

        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]">
          <div
            className="text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] xl:text-[22rem] mt-50 font-medium select-none leading-none text-center whitespace-nowrap"
            style={{
              fontFamily:
                "Geist, -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.01em",
              background: "linear-gradient(180deg, #FFF 0%, #F5F5F5 50%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Adol AI
          </div>
        </div>

        {/* Footer Content */}
        <div className="max-w-7xl mx-auto relative z-10 -mt-30">
          <div className="text-center text-sm text-neutral-400">
            <p>&copy; Adol 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
