import { submitWaitlist } from "@/app/actions/waitlist";
import { WaitlistForm } from "@/components/WaitlistForm";
import { WaitlistFormFields } from "@/components/WaitlistFormFields";
import { isValidWaitlistCourseSlug } from "@/lib/waitlist-courses";

type Props = {
  courseSlug: string;
  courseTitle: string;
};

export function CourseWaitlistSection({ courseSlug, courseTitle }: Props) {
  if (!isValidWaitlistCourseSlug(courseSlug)) {
    return (
      <section
        id="course-waitlist"
        className="relative border-t border-slate-800/70 px-4 py-16 md:px-6 md:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm text-slate-300">
            For the cohort waitlist, use the form on the{" "}
            <a
              href="/#waitlist"
              className="font-medium text-[#60A5FA] hover:underline"
            >
              homepage
            </a>{" "}
            and choose your course there.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="course-waitlist"
      className="relative border-t border-slate-800/70 px-4 py-16 md:px-6 md:py-20 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_55%)]"
      />
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300/90">
          Waitlist · {courseTitle}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          Save your spot for this track
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          You&apos;re signing up for the{" "}
          <span className="font-semibold text-slate-100">{courseTitle}</span>{" "}
          waitlist. Same cohort system as the main site—pre-selected for this
          track.
        </p>

        <div className="mt-8">
          <WaitlistForm action={submitWaitlist}>
            <WaitlistFormFields
              variant="course"
              courseSlug={courseSlug}
              courseTitle={courseTitle}
              idPrefix={`course-${courseSlug}-`}
            />
          </WaitlistForm>
        </div>
      </div>
    </section>
  );
}
