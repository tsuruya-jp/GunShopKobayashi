import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { signIn, getCsrfToken, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRef } from 'react';

const Login = ({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const userName = useRef('');
  const password = useRef('');
  const onSubmit = async () => {
    const result = await signIn('credentials', {
      username: userName.current,
      password: password.current,
      redirect: true,
      callbackUrl: '/admin',
    });
  };

  return (
    <>
      <div className='bg-white py-6 sm:py-8 lg:py-12 h-screen'>
        <div className='mx-auto max-w-screen-2xl px-4 md:px-8 h-full'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl'>Login</h2>
          <form method='post' action='/api/auth/callback/credentials' className='mx-auto max-w-lg rounded-lg border'>
            <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
            <div className='flex flex-col gap-4 p-4 md:p-8'>
              {router.query?.error && <div className='text-red-600'>ユーザー情報が間違っています</div>}
              <div>
                <label className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>User Name</label>
                <input
                  onChange={(e) => (userName.current = e.target.value)}
                  className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring'
                />
              </div>
              <div>
                <label className='mb-2 inline-block text-sm text-gray-800 sm:text-base'>Password</label>
                <input
                  onChange={(e) => (password.current = e.target.value)}
                  className='w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring'
                />
              </div>
              <button
                onClick={onSubmit}
                className='block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base'
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);
  if (session) {
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
