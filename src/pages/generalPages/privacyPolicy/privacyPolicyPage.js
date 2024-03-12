import styles from "./privacyPolicyPage.module.css";

function PrivacyPolicyPage() {
  return (
    <section className={styles.privacy_page_container}>
      <div className={styles.top_image_container}>
        <span>We care about your privacy</span>
        <span>
          Your privacy is important to us at Charteey. We respect your privacy
          regarding any information we may collect from you across our website.
        </span>
      </div>
      <div className={styles.bottom_content_container}>
        <div className={styles.head_content_container}>
          <span></span>
          <span>
            Charteey is committed to protecting the privacy of our users. This
            Privacy Policy outlines the types of personal information we collect
            when you use our website www.charteey.com, how we use and protect
            that information, and your choices regarding your personal
            information.
          </span>
        </div>

        <div className={styles.head_content_container}>
          <span>Information we collect</span>
          <span>
            When you visit our Site, we may collect certain information
            automatically, including your IP address, browser type, operating
            system, referring URLs, access times, and pages viewed. We may also
            collect information about your usage and activity on the Site
            through the use of cookies, web beacons, and similar technologies.
            If you register for our stock market trading course or other
            services, we may collect personal information such as your name,
            email address, mailing address, phone number, and payment
            information.
          </span>
        </div>

        <div className={styles.head_content_container}>
          <span>How we use your information</span>
          <span>
            We may use the information we collect for various purposes,
            including: To provide and personalize our services, including the
            stock market trading course.To communicate with you, respond to your
            inquiries, and provide customer support. To analyze and improve the
            Site and our services. To detect, prevent, and address technical
            issues and security vulnerabilities. To comply with legal
            obligations and enforce our terms and policies.
          </span>
        </div>

        <div className={styles.head_content_container}>
          <span>Data security</span>
          <span>
            We take the security of your personal information seriously and
            implement appropriate technical and organizational measures to
            protect it against unauthorized access, disclosure, alteration, or
            destruction.
          </span>
        </div>

        <div className={styles.head_content_container}>
          <span>Third-party services</span>
          <span>
            We may use third-party services, such as payment processors and
            analytics providers, to help us operate the Site and deliver our
            services. These third parties may have access to your personal
            information only to perform these tasks on our behalf and are
            obligated not to disclose or use it for any other purpose.
          </span>
        </div>

        <div className={styles.head_content_container}>
          <span>Your choices</span>
          <span>
            You can choose not to provide certain personal information, but this
            may limit your ability to use certain features of the Site or access
            certain services. You may opt-out of receiving promotional
            communications from us by following the unsubscribe instructions
            provided in the communication or by contacting us directly.
          </span>
        </div>

        <div className={styles.head_content_container}>
          <span>Changes to this privacy policy</span>
          <span>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. We will notify you
            of any material changes by posting the updated Privacy Policy on the
            Site and updating the "Last Updated" date at the top of this page.
          </span>
        </div>

        <div className={styles.head_content_container}>
          <span>Contact Us</span>
          <span>
            If you have any questions or concerns about this Privacy Policy or
            our practices regarding your personal information, please contact us
            at charteey.team@gmail.com.
          </span>
        </div>

        <div className={styles.head_date_container}>
          <span>Last updated :</span>
          <span> March 12, 2024</span>
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicyPage;
