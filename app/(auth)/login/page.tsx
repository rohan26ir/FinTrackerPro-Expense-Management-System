import SignInForm from "@/app/components/Auth/SignInForm";






export default function page() {
  return (
    <div className="w-[95%] max-w-400 mx-auto my-20">
      <h1>Login Page</h1>

      <div>
        <SignInForm></SignInForm>
      </div>
    </div>
  )
}