"use client";
import Image from "next/image";
import { MotionDiv } from "./MotionDiv";
import { useRouter } from "next/navigation";

export interface AnimeProp {
  id: string;
  name: string;
  image: {
    original: string;
  };
  kind: string;
  episodes: number;
  episodes_aired: number;
  score: string;
  url: string;
}

interface Prop {
  anime: AnimeProp;
  index: number;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const apiUrl = "https://shikimori.one";

function AnimeCard({ anime, index }: Prop) {
  const router = useRouter();

  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.25, // stagger the animation
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      className="max-w-sm rounded relative w-full cursor-pointer"
      onClick={() => router.push(`${apiUrl}${anime.url}`)}
    >
      <div className="relative w-full h-[37vh]">
        <Image
          src={`${apiUrl}${anime.image.original}`}
          alt={anime.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-xl"
        />
      </div>
      <div className="py-4 flex flex-col gap-3">
        <div className="flex justify-between items-center gap-1">
          <h2 className="font-bold text-white text-xl line-clamp-1 w-full">
            {anime.name}
          </h2>
          <div className="py-1 px-2 bg-[#161921] rounded-sm">
            <p className="text-white text-sm font-bold capitalize">
              {anime.kind}
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="./episodes.svg"
              alt="episodes"
              width={20}
              height={20}
              className="object-contain"
            />
            <p className="text-base text-white font-bold">
              {anime.episodes || anime.episodes_aired}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="./star.svg"
              alt="star"
              width={18}
              height={18}
              className="object-contain"
            />
            <p className="text-base font-bold text-[#FFAD49]">{anime.score}</p>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}

export default AnimeCard;
