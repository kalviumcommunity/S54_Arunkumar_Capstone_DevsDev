import React from 'react';

const HelpPage = () => {
  return (
      <div className="min-h-screen max-w-7xl">
        <div className=" rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">Help Center</h1>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Quick Links Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li><a href="/" className="text-blue-500 hover:underline">Getting Started</a></li>
                <li><a href="#api-reference" className="text-blue-500 hover:underline">API Reference</a></li>
                <li><a href="#troubleshooting" className="text-blue-500 hover:underline">Troubleshooting</a></li>
                <li><a href="/faqs" className="text-blue-500 hover:underline">FAQs</a></li>
                <li><a href="#contact" className="text-blue-500 hover:underline">Contact Support</a></li>
              </ul>
            </section>

            {/* Resources Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Resources</h2>
              <ul className="space-y-2">
                <li><a href="https://docs.google.com/document/d/1rU1uU0899VTwm7Ge_rNLE2V6E5ucLacT92NgeCflr2Y/edit?usp=sharing" target='_blank' className="text-blue-500 hover:underline">Documentation</a></li>
                <li><a href="https://github.com/kalviumcommunity/S54_Arunkumar_Capstone_DevsDev.git" target='_blank' className="text-blue-500 hover:underline">Github</a></li>
                <li><a href="#community-forum" className="text-blue-500 hover:underline">Community Forum</a></li>
                <li><a href="#blog" className="text-blue-500 hover:underline">Blog</a></li>
              </ul>
            </section>

            {/* Popular Topics Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Popular Topics</h2>
              <ul className="space-y-2">
                <li><a href="#billing" className="text-blue-500 hover:underline">Billing & Payments</a></li>
                <li><a href="#account-settings" className="text-blue-500 hover:underline">Account Settings</a></li>
                <li><a href="#security" className="text-blue-500 hover:underline">Security</a></li>
                <li><a href="#integration" className="text-blue-500 hover:underline">Integration</a></li>
              </ul>
            </section>

            {/* Contact Us Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <p className="mb-4">If you still need help, don't hesitate to reach out to our support team.</p>
              <div>
                <p>Email: <a href="mailto:devsdev2309@gmail.com" className="text-blue-500 hover:underline">devsdev2309@gmail.com</a></p>
                <p>Phone: <a href="tel:+1234567890" className="text-blue-500 hover:underline">+1 (234) 567-890</a></p>
              </div>
            </section>

            {/* Feedback Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Feedback</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">How can we improve?</label>
                  <textarea id="feedback" rows="4" className="mt-1 block w-full rounded-md text-black p-2 resize-none" />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit Feedback</button>
              </form>
            </section>
          </div>
        </div>
      </div>
  );
};

export default HelpPage;
