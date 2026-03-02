import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "LendyWendy privacy policy - how we collect, use, and protect your personal information.",
  alternates: { canonical: "https://lendywendy.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: March 2, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-0">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              LendyWendy (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website lendywendy.com (the &quot;Service&quot;).
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
              visit our website and use our mortgage matching services. By using the Service, you agree to the
              collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">2. Information We Collect</h2>
            <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
            <p className="text-gray-600 leading-relaxed">When you use our Service, we may collect:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Name, email address, and phone number</li>
              <li>Property and loan information (loan type, property value, location)</li>
              <li>Financial information (credit score range, income range, employment status)</li>
              <li>IP address, browser type, and device information</li>
              <li>Chat conversation transcripts with our AI advisor</li>
              <li>Mortgage readiness assessment responses and scores</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-4">Automatically Collected Information</h3>
            <p className="text-gray-600 leading-relaxed">
              We use Google Analytics 4 to collect usage data including pages visited, time on site,
              referral source, and device/browser information. This data is anonymized and used solely
              for improving our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>To match you with appropriate mortgage lenders and professionals</li>
              <li>To send you your mortgage readiness score and recommendations</li>
              <li>To communicate with you about your inquiry</li>
              <li>To improve our AI advisor and Service quality</li>
              <li>To comply with legal obligations</li>
              <li>To detect and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">4. Information Sharing</h2>
            <p className="text-gray-600 leading-relaxed">
              We share your personal information only with licensed mortgage professionals and lenders
              who may be able to assist with your mortgage needs. We do not sell your personal information
              to third parties for marketing purposes. We may share information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>With mortgage lenders and agents matched to your profile</li>
              <li>With service providers who assist in operating our Service (e.g., email, hosting)</li>
              <li>When required by law or to protect our legal rights</li>
              <li>In connection with a business transfer or merger</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">5. TCPA Consent &amp; Communications</h2>
            <p className="text-gray-600 leading-relaxed">
              By submitting your contact information and checking the consent checkbox on our forms,
              you expressly consent to receive telephone calls, text messages, and emails from
              LendyWendy and our matched mortgage professionals regarding your inquiry. You understand
              that this consent is not a condition of purchasing any property or obtaining any loan.
              Standard message and data rates may apply. You may opt out at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">6. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We use industry-standard security measures to protect your personal information,
              including encrypted connections (HTTPS/TLS), secure database storage, and access controls.
              However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">7. Cookies &amp; Tracking</h2>
            <p className="text-gray-600 leading-relaxed">
              We use cookies and similar technologies for analytics (Google Analytics 4), error tracking
              (Sentry), and to improve your experience. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">8. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Request a copy of your data in a portable format</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-2">
              California residents have additional rights under the CCPA/CPRA, including the right to
              know what personal information is collected and the right to opt out of the sale of
              personal information. We do not sell personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">9. Children&apos;s Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              Our Service is not intended for individuals under the age of 18. We do not knowingly
              collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">10. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900">11. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@lendywendy.com" className="text-teal-600 hover:underline">
                privacy@lendywendy.com
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-teal-600 hover:underline font-medium">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
