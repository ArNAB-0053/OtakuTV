import "@/styles/Privacy_Term.css";

const page = () => {
  return (
    <div className=" background-Term-Policy mt-4 lg:mt-[2.1rem] p-8 md:p-16 text-white/70">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">Last Updated: <strong>September 2024</strong></p>

        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="mb-6">
          Welcome to Otaku.tv. This privacy policy outlines how we handle the data and privacy of
          our users. Otaku.tv is a personal project aimed at anime enthusiasts, designed for
          educational purposes and personal development. We are not affiliated with any official anime
          streaming services and do not endorse piracy or illegal activities.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>

        <h3 className="text-xl font-medium mb-2">1. User-Provided Information</h3>
        <ul className="list-disc pl-6 mb-6">
          <li className='li-term-policy'>
            <strong>Account Creation:</strong> If you choose to create an account or leave reviews, we may collect
            your username, email address, and profile picture.
          </li>
          <li className='li-term-policy'>
            <strong>Comments:</strong> When submitting comments or reviews, that content is stored in our database.
          </li>
        </ul>

        <h3 className="text-xl font-medium mb-2">2. Automatically Collected Information</h3>
        <ul className="list-disc pl-6 mb-6">
          <li className='li-term-policy'>
            <strong>Cookies:</strong> Otaku.tv may use cookies to store preferences and enhance the user experience.
          </li>
          <li className='li-term-policy'>
            <strong>Analytics:</strong> Basic analytics data, such as page views and browser info, may be collected.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <p className="mb-6">
          We use the collected information to enable user interaction, improve site functionality, and maintain security.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Data Sharing</h2>
        <p className="mb-6">
          We do not share, sell, or rent your personal information to any third parties. This project is for personal
          learning purposes only.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
        <p className="mb-6">
          We take reasonable precautions to safeguard your personal information, despite Otaku.tv being a personal
          project.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Third-Party Links</h2>
        <p className="mb-6">
          Otaku.tv may contain links to external websites, such as anime databases. We are not responsible for the
          privacy practices of these third-party websites.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
        <p className="mb-6">
          You have the right to access, delete, or modify your personal information stored on Otaku.tv.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Changes to this Privacy Policy</h2>
        <p className="mb-6">
          We may update this Privacy Policy from time to time to reflect changes to the website's functionality or legal
          requirements. We will notify users of significant changes.
        </p>
      </div>
    </div>
  );
};

export default page;
