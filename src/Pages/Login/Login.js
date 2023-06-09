import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';

const Login = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const { loginUser } = useContext(AuthContext);
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = (data, e) => {
        loginUser(data.email, data.password)
            .then((result) => {
                const user = result.user;
                setLoginUserEmail(data.email);
                toast.success('Login Success');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };
    return (
        <section className='h-[600px] flex justify-center items-center'>
            <div
                className=' w-72 md:w-80 lg:w-96 p-8'
                style={{
                    boxShadow: '3px 4px 10px 2px rgba(0, 0, 0, 0.05)',
                    borderRadius: '18px',
                }}
            >
                <h2 className='text-4xl text-center text-black'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className='form-control w-full max-w-xs'>
                        <label className='label'>
                            <span className='label-text text-black'>Email</span>
                        </label>
                        <input
                            type='email'
                            className='input input-bordered w-full'
                            {...register('email', {
                                required: 'Please Enter Your Email Address !',
                            })}
                        />
                        {errors.email && (
                            <p role='alert' className=' text-error my-3'>
                                {errors.email?.message}
                            </p>
                        )}
                    </div>
                    <div className='form-control w-full max-w-xs'>
                        <label className='label'>
                            <span className='label-text text-black'>
                                Password
                            </span>
                        </label>
                        <input
                            type='password'
                            className='input input-bordered w-full'
                            {...register('password', {
                                required: 'Please Enter Password !',
                                minLength: {
                                    value: 6,
                                    message:
                                        'Password must be 6 character or longer',
                                },
                            })}
                        />
                        {errors.password && (
                            <p role='alert' className=' text-error my-3'>
                                {errors.password?.message}
                            </p>
                        )}
                        <label className='label mb-3'>
                            <Link to='/' className='label-text-alt text-black'>
                                Forgot Password ?
                            </Link>
                        </label>
                    </div>
                    <input
                        type='submit'
                        value='Login'
                        className='btn btn-accent w-full max-w-xs font-normal text-[#D4D9E3]'
                    />
                    <p className='font-normal text-black text-center text-sm my-4'>
                        New to Doctors Portal?
                        <Link to='/signup' className='text-secondary'>
                            {' '}
                            Create new account
                        </Link>
                    </p>
                    <div className='divider text-black'>OR</div>
                    <button className='btn btn-accent btn-outline w-full max-w-xs font-normal'>
                        CONTINUE WITH GOOGLE
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Login;
