import { calendarIcon, caseIcon, noteIcon, taskIcon } from "@/shared/icons/static";

interface FeatureItemProps {
  icon: string;
  title: string;
}

function FeatureItem({ icon, title }: FeatureItemProps) {
  return (
    <li className="[&:not(:last-child)]:mb-10">
      <img
        className="mb-7"
        src={icon}
        alt={`${title} icon`}
      />
      <h3 className="text-2xl sm:text-3xl">{title}</h3>
    </li>
  );
}

export default function FeaturesShowcaseSection() {
  return (
    <section className="bg-white py-30 sm:section-py px-4">
      <div className="container px-4 mx-auto">
        <h2 className="mb-10 text-center text-3xl leading-normal sm:mb-24 sm:text-5xl">
          Don’t let your day doing nothing
        </h2>
        <ul className="text-center max-sm:w-fit max-sm:mx-auto sm:flex sm:justify-between">
          <FeatureItem
            icon={calendarIcon}
            title="Small task"
          />
          <FeatureItem
            icon={noteIcon}
            title="Write it"
          />
          <FeatureItem
            icon={caseIcon}
            title="Do it"
          />
          <FeatureItem
            icon={taskIcon}
            title="Repeat"
          />
        </ul>
      </div>
    </section>
  );
}
