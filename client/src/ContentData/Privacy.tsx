import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
const Privacy = () => {
  return (
    <div className="w-full min-h-screen bg-[#0C0014] font-montserrat text-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button className="flex items-center gap-2 text-gray-400 hover:text-white mb-8">
        <Link to={"/login"}>  <ArrowLeft size={20} /></Link>
          <span>Back</span>
        </button>

        <h1 className="text-4xl font-bold mb-12 tracking-tight">Privacy Policy</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="leading-relaxed">
              We collect information you provide directly to us, such as when you create an account, use our
              services, or communicate with us. This may include your name, email address, and any other
              information you choose to provide.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="leading-relaxed">
              We use the information we collect to provide, maintain, and improve our services, to
              communicate with you, and to personalize your experience with Second Brain.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing and Disclosure</h2>
            <p className="leading-relaxed">
              We do not share your personal information with third parties except as described in this
              policy. We may share information with your consent, to comply with laws, to protect your
              rights, or to fulfill business obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="leading-relaxed">
              We use reasonable measures to help protect information about you from loss, theft, misuse,
              unauthorized access, disclosure, alteration, and destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
            <p className="leading-relaxed">
              You have the right to access, correct, or delete your personal information. You can also
              object to or restrict certain processing of your data. To exercise these rights, please
              contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may change this privacy policy from time to time. If we make changes, we will notify you
              by revising the date at the top of the policy and, in some cases, provide you with
              additional notice.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;