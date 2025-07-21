import { getStartedBg } from "@/shared/images";
import { ROUTES } from "@/shared/model";
import { Link } from "@/shared/ui";

export default function CtaSection() {
  return (
    <section className="bg-white py-30 sm:section-py px-4">
      <div className="text-center md:flex md:gap-12 mx-auto container">
        <div
          className="max-w-[580px] bg-contain bg-center bg-no-repeat py-20 max-md:mx-auto max-md:mb-7 sm:w-full sm:py-48"
          style={{ backgroundImage: `url(${getStartedBg})` }}
        />
        <div className="max-w-[470px] max-md:mx-auto">
          <h2 className="text-3xl leading-normal max-md:mb-9 md:mb-10 md:text-5xl">
            Achieve your target and won your life
          </h2>
          <Link
            to={ROUTES.AUTH}
            replace
            variant="filled"
            size="md"
            type="button"
          >
            Get started
          </Link>
        </div>
      </div>
    </section>
  );
}
