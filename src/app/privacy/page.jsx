export const metadata = {
  title: 'Privacy Policy | BagZilla',
  description: 'Read the privacy policy of BagZilla.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
        Privacy Policy
      </h1>
      <div className="prose prose-indigo max-w-none text-gray-600">
        <p className="mb-4">Last updated: May 20, 2026</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We collect information that you provide directly to us when registering for an account, making a purchase, or communicating with us. This includes your name, email address, phone number, and payment information.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect to process transactions, manage your account, send you updates about your orders, and communicate with you about products and promotions.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Data Security</h2>
        <p className="mb-4">
          We implement a variety of security measures to maintain the safety of your personal information. Your personal data is contained behind secured networks and is only accessible by a limited number of persons.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Sharing Your Information</h2>
        <p className="mb-4">
          We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Your Consent</h2>
        <p className="mb-4">
          By using our site, you consent to our website privacy policy.
        </p>
      </div>
    </div>
  );
}
