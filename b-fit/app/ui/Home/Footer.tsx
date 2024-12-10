export default function Footer() {
    return (
      <footer className="bg-[#0f172a] text-gray-300 px-4 py-8">
        <div className="max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between space-y-6 lg:space-y-0">
          {/* Brand Section */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-[#5a7be9] mb-4">B-Fit</h1>
            <p className="max-w-xs">
              Transform your fitness journey with personalized plans and tools to help you achieve your health goals.
            </p>
          </div>
  
          {/* Navigation Links */}
          <div className="flex flex-col space-y-2 text-center lg:text-left">
            <h2 className="font-bold mb-2 text-lg text-white">Quick Links</h2>
            <a href="#home" className="hover:text-[#5a7be9] transition">
              Home
            </a>
            <a href="#caloriecalculator" className="hover:text-[#5a7be9] transition">
              Calorie Calculator
            </a>
            <a href="#exercises" className="hover:text-[#5a7be9] transition">
              Exercises
            </a>
            <a href="#singleworkouts" className="hover:text-[#5a7be9] transition">
              Single Workouts
            </a>
            <a href="#workoutplans" className="hover:text-[#5a7be9] transition">
              Workout Plans
            </a>
          </div>
  
          {/* Social Media Links */}
          <div className="flex flex-col items-center lg:items-end space-y-4">
            <h2 className="font-bold mb-2 text-lg text-white">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-[#5a7be9] transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11.5 9.88v-6.99H8.39v-2.89h2.11v-2.2c0-2.08 1.23-3.22 3.11-3.22.9 0 1.84.16 1.84.16v2.02h-1.04c-1.03 0-1.35.64-1.35 1.29v1.95h2.3l-.37 2.89h-1.93v6.99A10 10 0 0022 12z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-[#5a7be9] transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.635 7.581a7.52 7.52 0 01-2.135.584 3.757 3.757 0 001.648-2.075 7.518 7.518 0 01-2.383.91A3.75 3.75 0 0012 8.871c0 .293.033.579.098.854a10.636 10.636 0 01-7.728-3.918 3.75 3.75 0 001.162 5.006 3.727 3.727 0 01-1.699-.47v.047a3.75 3.75 0 003 3.671 3.731 3.731 0 01-1.693.064 3.751 3.751 0 003.5 2.6 7.507 7.507 0 01-4.647 1.603 7.514 7.514 0 0011.267-6.374c0-.114-.003-.227-.008-.34a5.356 5.356 0 001.32-1.359z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-[#5a7be9] transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.34 3.608 1.314.975.975 1.252 2.242 1.314 3.608.058 1.267.07 1.647.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.34 2.633-1.314 3.608-.975.975-2.242 1.252-3.608 1.314-1.267.058-1.647.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.34-3.608-1.314-.975-.975-1.252-2.242-1.314-3.608-.058-1.267-.07-1.647-.07-4.85s.012-3.584.07-4.85c.062-1.366.34-2.633 1.314-3.608.975-.975 2.242-1.252 3.608-1.314C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.755 0 8.326.012 7.052.07 5.72.13 4.338.46 3.28 1.518 2.222 2.575 1.892 3.957 1.832 5.289.07 8.326 0 8.755 0 12s.012 3.674.07 4.948c.06 1.332.39 2.714 1.458 3.772C2.518 21.55 3.9 21.88 5.232 21.94c1.274.058 1.703.07 4.948.07s3.674-.012 4.948-.07c1.332-.06 2.714-.39 3.772-1.458C21.55 20.482 21.88 19.1 21.94 17.768c.058-1.274.07-1.703.07-4.948s-.012-3.674-.07-4.948c-.06-1.332-.39-2.714-1.458-3.772C20.482 2.45 19.1 2.12 17.768 2.06c-1.274-.058-1.703-.07-4.948-.07S8.326.012 7.052.07C5.72.13 4.338.46 3.28 1.518 2.222 2.575 1.892 3.957 1.832 5.289 1.57 8.326 1.5 8.755 1.5 12s.012 3.674.07 4.948c.06 1.332.39 2.714 1.458 3.772.988.988 2.256 1.266 3.622 1.328 1.267.058 1.647.07 4.85.07s3.584-.012 4.85-.07c1.366-.062 2.633-.34 3.608-1.314.975-.975 1.252-2.242 1.314-3.608.058-1.267.07-1.647.07-4.85s-.012-3.584-.07-4.85c-.062-1.366-.34-2.633-1.314-3.608-.975-.975-2.242-1.252-3.608-1.314C15.584.012 15.204 0 12 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
  
        {/* Copyright Section */}
        <div className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} B-Fit. All Rights Reserved.
        </div>
      </footer>
    );
  }
  