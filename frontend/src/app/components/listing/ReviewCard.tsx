import Image from "next/image";

// Define the shape of the data so TypeScript is happy (optional but good practice)
interface ReviewCardProps {
  name: string;
  date: string;
  img: string;
  comment: string;
}

const ReviewCard = ({ name, date, img, comment }: ReviewCardProps) => {
  return (
    <div className="flex flex-col gap-4">
      
      {/* HEADER: Avatar + Name */}
      <div className="flex flex-row items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          <Image src={img} fill className="object-cover" alt={name} />
        </div>
        <div>
          <div className="font-semibold text-base">{name}</div>
          <div className="text-gray-500 text-sm">2 years in Haven</div>
        </div>
      </div>

      {/* BODY: Rating + Comment */}
      <div>
        <div className="flex text-xs mb-2">
            ★★★★★ &middot; <span className="text-gray-500 ml-1">{date}</span>
        </div>
        
        <div className="text-gray-700 text-base leading-relaxed">
          {comment}
        </div>
        
        {/* 'Show more' is only needed if text is very long, but we keep it static for now */}
        <div className="font-semibold underline mt-2 cursor-pointer text-sm">
            Show more
        </div>
      </div>

    </div>
  );
};

export default ReviewCard;