import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  // Fetch doctor information by ID
  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  };

  // Get available slots for the doctor
  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // Set hours for today or future dates
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeslots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeslots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots(prev => [...prev, timeslots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
    getAvailableSlots();
  }, [doctors, docId]);

  useEffect(() => {
    if (docSlots.length > 0 && docSlots[0].length > 0) {
      setSlotTime(docSlots[0][0].time); // Set first available slot time
    }
  }, [docSlots]);

  return (
    <div>
      {docInfo ? (
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt={docInfo.name} />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name} <img className="w-5" src={assets.verified_icon} alt="Verified" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience} years</button>
            </div>

            {/* Doctor About */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="Info" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Appointment fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>
      ) : (
        <p>Loading doctor information...</p>
      )}

      {/* Booking Slots */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.length > 0 &&
            docSlots.map((item, index) => (
              <div
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'
                }`}
                key={index}
                onClick={() => setSlotIndex(index)}
              >
                <p>{item[0] && dayOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots.length > 0 &&
            docSlots[slotIndex]?.map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'
                }`}
                key={index}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">
          Confirm Appointment
        </button>
      </div>

      {/* listing Related Doctors */}
      {docInfo && <RelatedDoctors docId={docId} speciality={docInfo.speciality} />}
    </div>
  );
};

export default Appointment;
