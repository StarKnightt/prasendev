"use client";

import { useRef } from "react";
import { ClientTweetCard } from "@/components/ui/client-tweet-card";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Just add tweet IDs from the URL: https://x.com/username/status/[ID]
const tweetIds = [
  "1862049464807989608", // @trikcode
  "1868648019119522142", // @Rahulsainlll
  "1861928255571251644", // @STONKS_IU
  "1861817928930431234", // @IzharThouf29718
  "1861836674637914410", // @kola1023
  "1861839293460713877", // @venelinkochev
  "1861815322115805402", // @SwatiSarangi10
  "1861832590766068017", // @AdhikariYash_
  "1862177812376862890", // @raaam_02
  "1862394170079416582", // @Arman_Officialx
  "1861834592170197289", // @AaryanBajaj18
  "1861995257891885277", // @Its_Shiv_Kumarr
  "1862057865105596661", // @csaba_kissi
  "1862129859520045405", // @nathan_covey
  "1861817455032578394", // @that_tallguy_1
  "1862389476225331622", // @o_stefanishyna
  "1861818760132272528", // @michael_c_law
  "1861816928509239710", // @itsrajputamit
  "1861851783598948414", // @_ndeyefatoudiop
  "1862134432452292849", // @ataeijo
  "1861959993332830716", // @adyingdeath
  "1862047439416680606", // @AyanDas_
  "1861880157759320380", // @Makanta__
  "1861999738360570195", // @Criticalway_
  "1862074181866627323", // @_laksh_1231
  "1862052926698492034", // @antduchofficial
  "1862093344395886593", // @raimonvibe
  "1862460639069052951", // @SanjayTomar_
  "1862209434505679222", // @dev_boai1
  "1862154797786288236", // @AbdulSonaike
  "1864869169809731964", // @bonnienewman
  "1862217676028092752", // @ShajahanArham
  "1897308522733559891", // @SaidAitmbarek
  "1897271067116495138", // @CornelisseJoran
  "1897270484909347147", // @AnshulSoni2010
  "1897390654222950482", // @Adarsh_Web3
  "1897523143625118146", // @atharvatwts
  "1897333575336517950", // @vivek_naskar
  "1897510197276631350", // @Shefali__J
  "1897512161532092756", // @sonam_murarkar
  "1897786499795431872", // @disarto_max
  "1938129572194644377", // @Abhishekcur
  "1938126895184335120", // @sevalla_hosting
  "1930892318321553902", // @the__csy20
  "1930627899830554789", // @Abhinavstwt
  "1930629574297055653", // @kayleecodez
  "1930648396467200298", // @shubhstwt
  "1930677255614722543", // @developertomek
  "1930644230235685183", // @shayanc__
  "1930647273039376406", // @podsumguy
  "1930880665047683088", // @sanjaydotpro
  "1930731875066339409", // @christiannonis
  "1930696477426500066", // @abhiix4
  "1930680531471261714", // @kshitij_sorted
  "1930907083194433924", // @chuurro_o
  "1900470345058169048", // @code_kartik
  "1900371624869720176", // @mvyk0l
];

export function TwitterTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340; // card width + gap
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-3">
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="currentColor"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <h2 className="text-xl font-bold">Thanks for all of your love 💖</h2>
      </div>

      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg hover:bg-background hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg hover:bg-background hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scrollable container */}
        <div 
          ref={scrollRef}
          className="overflow-hidden"
        >
          <div 
            className="flex gap-4 hover:[animation-play-state:paused]"
            style={{
              animation: "scroll 240s linear infinite",
              width: "max-content",
            }}
          >
            {/* First set */}
            {tweetIds.map((id, idx) => (
              <div key={`tweet-a-${idx}`} className="w-[320px] shrink-0 clean-tweet">
                <ClientTweetCard id={id} className="shadow-none" />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {tweetIds.map((id, idx) => (
              <div key={`tweet-b-${idx}`} className="w-[320px] shrink-0 clean-tweet">
                <ClientTweetCard id={id} className="shadow-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

