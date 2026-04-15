import { Camera } from "lucide-react";
import insta1 from "@/assets/insta-1.jpg";
import insta2 from "@/assets/insta-2.jpg";
import insta3 from "@/assets/insta-3.jpg";
import insta4 from "@/assets/insta-4.jpg";
import insta5 from "@/assets/insta-5.jpg";

const images = [insta1, insta2, insta3, insta4, insta5];

const InstagramGallery = () => {
  const allImages = [...images, ...images, ...images];

  return (
    <section className="py-16 overflow-hidden">
      <div className="relative">
        <div className="flex animate-marquee">
          {allImages.map((img, i) => (
            <a
              key={i}
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-shrink-0 w-56 h-56 mx-1.5"
            >
              <img
                src={img}
                alt="Instagram post"
                loading="lazy"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <Camera size={28} className="text-gold" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
