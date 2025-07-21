import { heroBg } from "@/shared/images";
import { ROUTES } from "@/shared/model";
import { Link } from "@/shared/ui";

export default function HeroSection() {
  return (
    <section
      className="px-4 bg-white bg-bottom bg-no-repeat sm:pt-32 pb-70
      bg-size-[25rem] sm:bg-size-[45rem] sm:pb-130 lg:bg-size-[65rem] lg:pb-[44rem] 
      xl:pb-[40rem] 2xl:bg-size-[75rem]"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="container mx-auto text-center">
        <h1
          className="mx-auto mb-16 max-w-[320px] text-center text-3xl leading-13
          font-medium sm:max-w-[700px] sm:text-5xl sm:leading-16 xl:max-w-[900px]
          xl:text-6xl xl:leading-32"
        >
          Organizing your day activity with Todo Daily
        </h1>

        <Link
          to={ROUTES.AUTH}
          replace
          variant="filled"
          size="md"
        >
          Get started
        </Link>
      </div>
    </section>
  );
}
