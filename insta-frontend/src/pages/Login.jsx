import { Footer } from "../components/commons/footer";
import { LoginForm } from "../components/Login/LoginForm";
import hero from "../assets/hero.png";

export const Login = () => {
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
            -left-40
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
            top-[25%]
            -right-40
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
            left-[35%]
          "
        />

      </div>

      {/* ================= MAIN ================= */}

      <div className="relative min-h-screen flex flex-col">

        {/* ================= LOGIN AREA ================= */}

        <div className="flex-1 flex items-center justify-center px-6 py-10">

          <div
            className="
              w-full
              max-w-6xl
              flex
              flex-col
              lg:flex-row
              items-center
              justify-center
              gap-12
              lg:gap-20
            "
          >

            {/* ================= HERO ================= */}

            <div
              className="
                hidden
                md:flex
                w-full
                lg:w-1/2
                justify-center
                items-center
                relative
              "
            >

              {/* Glow behind image */}

              <div
                className="
                  absolute
                  w-[320px]
                  h-[320px]
                  rounded-full
                  bg-blue-500/10
                  blur-[100px]
                "
              />

              <img
                src={hero}
                alt="Instagram"
                className="
                  relative
                  max-h-[430px]
                  w-auto
                  object-contain
                  drop-shadow-[0_25px_60px_rgba(59,130,246,0.18)]
                  transition-transform
                  duration-500
                  hover:scale-[1.02]
                "
              />

            </div>

            {/* ================= LOGIN FORM ================= */}

            <div className="w-full lg:w-[420px] flex justify-center">

              <div
                className="
                  w-full
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

                {/* Top glow */}

                <div
                  className="
                    absolute
                    pointer-events-none
                    w-40
                    h-40
                    bg-blue-500/10
                    blur-[80px]
                    rounded-full
                  "
                />

                <div className="relative">
                  <LoginForm />
                </div>

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