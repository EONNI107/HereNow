'use client';
import { Regions } from '@/types/maintype';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function LocalItemList() {
  const router = useRouter();

  const regions: Regions = require('@/data/regions.json');

  const handleClick = (i: string) => {
    router.push(`/local/${i}`);
  };

  return (
    <section>
      <div className="flex overflow-x-scroll whitespace-nowrap py-4 cursor-pointer">
        {regions.region.map((i) => (
          <div
            key={i.ename}
            className="flex flex-col mx-2"
            onClick={() => handleClick(i.ename)}
          >
            <div className="relative h-[68px] w-[68px] rounded-full border">
              <Image
                src={i.image}
                alt="이미지"
                layout="fill"
                className="rounded-full object-cover"
              />
            </div>
            <div className="text-center mt-2">{i.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

{
  /* <section>
<div className="flex">
  {region.region.map((i) => (
    <div key={i.code} className="flex flex-col">
      <div className="relative h-[68px] rounded-full border">
        <Image src={i.image} alt="이미지" fill />
      </div>
      <div>{i.name}</div>
    </div>
  ))}
</div>
</section> */
}

// export default function LocalItemList() {
//   const router = useRouter();
//   const region: Regions = require('@/data/regions.json');

//   const handleClick = (i: string) => {
//     router.push(`/local/${i}`);
//   };

//   return (
//     <section>
//       <div className="flex overflow-x-scroll whitespace-nowrap py-4 cursor-pointer">
//         {region.region.map((i) => (
//           <div
//             key={i.ename}
//             className="flex flex-col mx-2"
//             onClick={() => handleClick(i.ename)}
//           >
//             <div className="relative h-[68px] w-[68px] rounded-full border">
//               <Image
//                 src={i.image}
//                 alt="이미지"
//                 layout="fill"
//                 className="rounded-full object-cover"
//               />
//             </div>
//             <div className="text-center mt-2">{i.name}</div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
