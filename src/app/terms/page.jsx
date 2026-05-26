export const metadata = {
  title: 'Terms and Conditions | BagZilla',
  description: 'Read the terms and conditions of using BagZilla.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
        Terms and Conditions
      </h1>
      <div className="prose prose-indigo max-w-none text-gray-600">
        <p className="mb-4">Last updated: May 20, 2026</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
        <p className="mb-4">
          Welcome to BagZilla. By accessing and using our website, you agree to comply with and be bound by the following terms and conditions of use.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Product Purchases</h2>
        <p className="mb-4">
          All purchases made through our website are subject to availability and acceptance. We reserve the right to refuse or cancel any order for any reason at any given time.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. User Accounts</h2>
        <p className="mb-4">
          To access certain features of the site, you may be required to register for an account. You are responsible for maintaining the confidentiality of your account information.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Intellectual Property</h2>
        <p className="mb-4">
          All content included on this site, such as text, graphics, logos, images, and software, is the property of BagZilla or its content suppliers and protected by copyright laws.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Governing Law</h2>
        <p className="mb-4">
          These terms and conditions are governed by and construed in accordance with the laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
        </p>
      </div>
    </div>
  );
}
