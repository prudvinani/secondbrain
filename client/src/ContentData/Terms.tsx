import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
const Terms = () => {
  return (
    <div className="w-full min-h-screen bg-[#0C0014] font-montserrat text-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button className="flex items-center gap-2 text-gray-400 hover:text-white mb-8">
          <Link to={"/login"}>
            {" "}
            <ArrowLeft size={20} />
          </Link>
          <span>Back</span>
        </button>

        <h1 className="text-4xl font-bold mb-12 tracking-tight">
          Terms of Service
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="leading-relaxed">
              By accessing or using the Second Brain service, you agree to be
              bound by these Terms of Service and all applicable laws and
              regulations. If you do not agree with any part of these terms, you
              may not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. Description of Service
            </h2>
            <p className="leading-relaxed">
              Second Brain provides a digital knowledge management platform. We
              reserve the right to modify or discontinue, temporarily or
              permanently, the service with or without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. User Responsibilities
            </h2>
            <p className="leading-relaxed">
              You are responsible for maintaining the confidentiality of your
              account and password. You agree to accept responsibility for all
              activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Content</h2>
            <p className="leading-relaxed">
              You retain all rights to the content you post on Second Brain. By
              posting content, you grant us a license to use, modify, publicly
              perform, publicly display, reproduce, and distribute such content
              on and through the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
            <p className="leading-relaxed">
              We may terminate or suspend your account and bar access to the
              service immediately, without prior notice or liability, under our
              sole discretion, for any reason whatsoever and without limitation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. It is your responsibility to check these
              Terms periodically for changes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
