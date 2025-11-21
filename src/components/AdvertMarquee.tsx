import React from "react";
import Marquee from "react-fast-marquee";

interface AdvertMarqueeProps {
  message1: string;
  message2: string;
}

export default function AdvertMarquee({
  message1,
  message2,
}: AdvertMarqueeProps) {
  return (
    <Marquee speed={30} className="bg-orange-100 overflow-hidden py-2">
      <span className="mr-8 inline-block">{message1}</span>
      <span className="inline-block">{message2}</span>
    </Marquee>
  );
}
