import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import SectionDivider from "./SectionDivider";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const posts = [
  {
    image: blog1,
    date: "August 14, 2024",
    title: "Revolutionizing Taste: How Our Kitchen Achieves Perfect Flavor Harmony",
  },
  {
    image: blog2,
    date: "August 15, 2024",
    title: "How Our Kitchen Blends Taste & Perfectionism",
  },
  {
    image: blog3,
    date: "August 20, 2024",
    title: "Beyond Sushi Rolls: A World of Culinary Innovation and Taste",
  },
];

const BlogSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <SectionDivider label="Blog" />
        <h2 className="text-4xl md:text-5xl font-heading text-center mt-4 mb-4">
          Culinary Insights
        </h2>
        <p className="text-center text-muted-foreground font-body max-w-xl mx-auto mb-12">
          Discover stories, tips, and culinary insights that inspire your dining adventures daily.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  width={640}
                  height={512}
                  loading="lazy"
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                <Calendar size={14} className="text-gold" />
                <span className="text-xs font-body">{post.date}</span>
              </div>
              <h3 className="mt-2 font-heading font-semibold text-lg leading-snug group-hover:text-gold transition-colors duration-300">
                {post.title}
              </h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
