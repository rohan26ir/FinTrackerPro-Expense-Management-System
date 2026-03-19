


const SignInForm = () => {
  return (
    <div>
      <div>
        <div>

          <form action="">
            <button 
            className="px-3 py-1.5 rounded-lg bg-secondary"
            type="submit" name="action" value="google">
              Sign in With Google
            </button>


            <button 
            className="px-3 py-1.5 rounded-lg bg-secondary"
            type="submit" name="action" value="github">
              Sign in With GitHub
            </button>
          </form>


        </div>
      </div>
    </div>
  );
};

export default SignInForm;