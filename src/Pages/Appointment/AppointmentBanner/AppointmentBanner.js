import React from 'react';
import chair from '../../../assets/images/chair.png';
import backgroundImg from '../../../assets/images/bg.png';
import { DayPicker } from 'react-day-picker';

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
    return (
        <header>
            <div
                className='hero lg:h-[550px] mb-12 lg:m-0'
                style={{
                    background: `url(${backgroundImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '8px',
                }}
            >
                <div className='hero-content flex-col lg:flex-row-reverse'>
                    <img src={chair} className='rounded-lg lg:w-1/2' />
                    <div>
                        <DayPicker
                            mode='single'
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;
