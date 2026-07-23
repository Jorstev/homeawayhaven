import { useForm } from "react-hook-form";
import InputField from "../ui/InputField";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminValidation } from "../features/booking/bookingSlice";

function Login() {
  // const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    dispatch(setAdminValidation(true));
    navigate("/login/console");
  };

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#eff6ff_48%,_#ffffff_100%)] px-3 py-8 md:px-6 md:py-12">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(160deg,_#0f172a_0%,_#1e293b_48%,_#155e75_100%)] p-6 text-white shadow-[0_28px_70px_rgba(15,23,42,0.22)] md:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/85">
            Admin Access
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Administration Console
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-200 md:text-base">
            Manage listings, review inventory, and keep your stays current from a cleaner control surface designed for quick updates.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/15 bg-white/10 px-5 py-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/80">
                Listings
              </p>
              <p className="mt-3 text-2xl font-semibold">Create</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/15 bg-white/10 px-5 py-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/80">
                Content
              </p>
              <p className="mt-3 text-2xl font-semibold">Edit</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/15 bg-white/10 px-5 py-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/80">
                Control
              </p>
              <p className="mt-3 text-2xl font-semibold">Publish</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[0_24px_60px_rgba(148,163,184,0.18)] backdrop-blur-sm md:p-8 lg:p-10">
          <div className="border-b border-slate-200/80 pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
              Secure Sign In
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              Enter console credentials
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600 md:text-base">
              Use the administration credentials below to access the management dashboard.
            </p>
          </div>

          <form
            className="mt-8 grid gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField
              fieldName="Username"
              registerName="username"
              type="text"
              register={register}
              value={"Admin123"}
            />
            <InputField
              fieldName="Password"
              registerName="password"
              type="password"
              register={register}
              value={"123456"}
            />

            <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 px-5 py-4 text-sm leading-6 text-slate-600 shadow-inner shadow-slate-100">
              This environment still uses the existing local demo credentials. The styling is updated without changing your current login behavior.
            </div>

            <input
              className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_32px_rgba(15,23,42,0.2)] transition-colors duration-200 hover:bg-cyan-500"
              type="submit"
              value={"Access Console"}
            />
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;
