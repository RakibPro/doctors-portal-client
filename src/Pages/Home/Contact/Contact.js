import React from 'react';
import appointment from '../../../assets/images/appointment.png';

const Contact = () => {
    return (
        <section
            className=' mt-5 rounded-lg'
            style={{
                background: `url(${appointment})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className='text-center pt-16'>
                <h3 className='text-xl font-bold text-secondary pb-2.5'>
                    Contact Us
                </h3>
                <h2 className='text-4xl text-white'>Stay Connected With Us</h2>
            </div>
            <div className='flex justify-center'>
                <form>
                    <div className='card flex-shrink-0'>
                        <div className='card-body'>
                            <div className='form-control'>
                                <input
                                    type='text'
                                    placeholder='Email Address'
                                    className='input pl-5 w-full lg:w-[400px] '
                                />
                            </div>
                            <div className='form-control my-4'>
                                <input
                                    type='text'
                                    placeholder='Subject'
                                    className='input pl-5 w-full lg:w-[400px] '
                                />
                            </div>
                            <div className='form-control'>
                                <textarea
                                    placeholder='Your message'
                                    className='textarea textarea-lg pl-5 w-full lg:w-[400px] '
                                ></textarea>
                            </div>
                            <div className='form-control mt-8 mx-auto pb-16'>
                                <input
                                    className='btn btn-primary w-32 text-white border-none bg-gradient-to-r from-secondary to-primary'
                                    type='submit'
                                    value='Submit'
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Contact;
