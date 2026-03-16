import { Scale } from "lucide-react";

export default function Page() {
  const lastUpdate: string = "05, March, 2026";

  return (
    <div className="w-[95%] max-w-400 mx-auto">
      <div className="w-full 2xl:w-[70%] mx-auto my-10 md:my-14 lg:my-20">
        <div>
          {/* Content - Terms of Service page */}
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="flex items-start gap-4 mb-8 bg-gradient-to-br from-card to-muted/30 p-6 rounded-2xl border border-border/40 shadow-sm">
              <div>
                <h1 className="heading-1 mb-2">Terms of Service</h1>
                <p className="paragraph-small text-muted-foreground flex items-center gap-2">
                  <Scale size={16} className="opacity-70" />
                  Last updated: {lastUpdate}
                </p>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">1. Agreement to Terms</h2>
              <p className="paragraph">
                By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not access or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">2. Definitions</h2>
              <ul className="list-disc pl-6 paragraph text-muted-foreground space-y-2 mt-3">
                <li>
                  <span className="font-medium">&quot;Service&quot;</span> refers to the website and any related services provided by us.
                </li>
                <li>
                  <span className="font-medium">&quot;User&quot;</span> refers to any individual or entity accessing or using our Service.
                </li>
                <li>
                  <span className="font-medium">&quot;Content&quot;</span> refers to any text, images, videos, or other materials uploaded or displayed through the Service.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">3. User Accounts</h2>
              <p className="paragraph">When you create an account with us, you must provide accurate and complete information. You are solely responsible for:</p>
              <ul className="list-disc pl-6 paragraph text-muted-foreground space-y-2 mt-3">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
              <p className="paragraph mt-4">We reserve the right to suspend or terminate accounts that violate these terms.</p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">4. Acceptable Use</h2>
              <p className="paragraph">You agree not to use the Service to:</p>
              <ul className="list-disc pl-6 paragraph text-muted-foreground space-y-2 mt-3">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Distribute malicious software or harmful content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Collect or harvest user data without consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">5. Intellectual Property</h2>
              <p className="paragraph">
                The Service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not modify, reproduce, distribute, or create derivative works based on our content without explicit permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">6. User Content</h2>
              <p className="paragraph">
                By submitting content to our Service, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display that content solely for the purpose of providing and improving the Service. You retain all ownership rights to your content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">7. Termination</h2>
              <p className="paragraph">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">8. Limitation of Liability</h2>
              <p className="paragraph">
                To the fullest extent permitted by law, in no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6 paragraph text-muted-foreground space-y-2 mt-3">
                <li>Your use or inability to use the Service</li>
                <li>Any unauthorized access to or use of our servers</li>
                <li>Any interruption or cessation of transmission to or from our Service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">9. Changes to Terms</h2>
              <p className="paragraph">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days&apos; notice prior to any new terms taking effect. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">10. Contact Us</h2>
              <p className="paragraph">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <address className="not-italic paragraph text-muted-foreground mt-2">
                Email: legal@techtwen.com
                <br />
                Address: 123 Business St, City, State 12345
              </address>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}