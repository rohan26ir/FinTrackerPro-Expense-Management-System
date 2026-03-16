import { Eye } from "lucide-react";


export default function Page() {


  const lastUpdate:string = "05, March, 2026"


  return (
    <div className="w-[95%] max-w-400 mx-auto">
      <div className="w-full 2xl:w-[70%] mx-auto my-10 md:my-14 lg:my-20">
        <div>
          {/* Content - Privacy policy page */}
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="flex items-start gap-4 mb-8 bg-gradient-to-br from-card to-muted/30 p-6 rounded-2xl border border-border/40 shadow-sm">
            
            <div>
              <h1 className="heading-1 mb-2">Privacy Policy</h1>
              <p className="paragraph-small text-muted-foreground flex items-center gap-2">
                <Eye size={16} className="opacity-70" />
                Last updated: {lastUpdate}
              </p>
            </div>
          </div>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">1. Introduction</h2>
              <p className="paragraph">
                Welcome to our website. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we handle your information when you visit our site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">2. Data We Collect</h2>
              <p className="paragraph">We may collect, use, store and transfer different kinds of personal data about you including:</p>
              <ul className="list-disc pl-6 paragraph text-muted-foreground space-y-2 mt-3">
                <li>
                  <span className="font-medium">Identity Data:</span> first name, last name, username.
                </li>
                <li>
                  <span className="font-medium">Contact Data:</span> email address, phone number.
                </li>
                <li>
                  <span className="font-medium">Technical Data:</span> IP address, browser type, time zone setting.
                </li>
                <li>
                  <span className="font-medium">Usage Data:</span> how you use our website and services.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">3. How We Use Your Data</h2>
              <p className="paragraph">We use your personal data only when permitted by law. Most commonly:</p>
              <ul className="list-disc pl-6 paragraph text-muted-foreground space-y-2 mt-3">
                <li>To register you as a new customer</li>
                <li>To manage our relationship with you</li>
                <li>To improve our website and services</li>
                <li>To recommend products or services that may interest you</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">4. Data Security</h2>
              <p className="paragraph">
                We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees and partners who have a business need to know.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">5. Your Legal Rights</h2>
              <p className="paragraph">Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
              <ul className="list-disc pl-6 paragraph text-muted-foreground space-y-2 mt-3">
                <li>Request access to your personal data</li>
                <li>Request correction of your personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing</li>
                <li>Request transfer of your personal data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="heading-3 mb-4">6. Contact Us</h2>
              <p className="paragraph">
                If you have any questions about this privacy policy or our data practices, please contact us at:
              </p>
              <address className="not-italic paragraph text-muted-foreground mt-2">
                Email: privacy@techtwen.com<br />
                Address: 123 Business St, City, State 12345
              </address>
            </section>
          </article>
        </div>
      </div>
    </div>
  )
}