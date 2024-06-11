import { websiteLinks } from "../lib/definitions";
import LoginForm from "../ui/LoginForm";

export default function LoginPage() {
  return (
    <main id="login_page" className="flex flex-col md:flex-row h-screen bg-[#0F172A]">
      {/* Image section */}
      <div className="md:w-1/2 h-1/2 md:h-full flex items-center justify-center">
        <div className="w-full h-full max-h-screen m-5">
          <img 
            src="/BartFitness-Login.png"
            alt="Login"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Login section */}
      <div className="md:w-1/2 h-full flex justify-center items-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <LoginForm/>
            <div className="flex justify-center">
              <a href={websiteLinks.register.link} className="text-blue-600 hover:text-blue-400 text-sm mt-6">
                Create an account
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
    </main>
  );
}
