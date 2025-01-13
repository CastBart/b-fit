import RegisterForm from "../ui/RegisterForm";

export default function RegistrationPage(): React.ReactNode {
  

  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#0F172A]">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create an account
          </h2>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
}
