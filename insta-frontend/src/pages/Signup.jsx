import { Footer } from "../components/commons/Footer;
import { SignupForm } from "../components/Signup/SignupForm";

export const Signup = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050509] text-white">

      {/* ================= AMBIENT BACKGROUND ================= */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div
          className="
            absolute
            w-[500px]
            h-[500px]
            rounded-full
            bg-blue-600/15
            blur-[160px]
            -top-40
            -right-40
          "
        />

        <div
          className="
            absolute
            w-[500px]
            h-[500px]
            rounded-full
            bg-purple-600/12
            blur-[160px]
            top-[30%]
            -left-40
          "
        />

        <div
          className="
            absolute
            w-[400px]
            h-[400px]
            rounded-full
            bg-fuchsia-600/8
            blur-[150px]
            bottom-[-150px]
            right-[30%]
          "
        />

      </div>

      {/* ================= MAIN ================= */}

      <div className="relative min-h-screen flex flex-col">

        {/* ================= SIGNUP AREA ================= */}

        <div className="flex-1 flex items-center justify-center px-6 py-10">

          <div className="w-full max-w-[460px]">

            {/* Glass container */}

            <div
              className="
                relative
                rounded-3xl
                border
                border-white/[0.08]
                bg-white/[0.035]
                backdrop-blur-2xl
                shadow-[0_25px_100px_rgba(0,0,0,0.45)]
                p-6
                sm:p-8
              "
            >

              {/* Subtle top glow */}

              <div
                className="
                  absolute
                  -top-20
                  left-1/2
                  -translate-x-1/2
                  w-48
                  h-48
                  rounded-full
                  bg-purple-500/10
                  blur-[90px]
                  pointer-events-none
                "
              />

              <div className="relative">
                <SignupForm />
              </div>

            </div>

          </div>

        </div>

        {/* ================= FOOTER ================= */}

        <div className="relative border-t border-white/[0.06]">

          <Footer />

        </div>

      </div>

    </div>
  );
};