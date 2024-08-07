import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export default function WhatsappRegistration() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleGetOtp = async (e) => {
    e.preventDefault();

    const userData = {
      name: name,
      phoneNumber: number,
    };

    try {
      const response = await axios.post(
        "https://9d70-2401-4900-51fd-1774-893d-3551-b3fb-d590.ngrok-free.app/send-otp",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      setIsOtpSent(true);
      toast.success("OTP sent successfully!", {
        duration: 3000,
      });
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to send OTP!", {
        duration: 3000,
      });
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();

    const otpData = {
      phoneNumber: number,
      otp: otp,
    };

    try {
      const response = await axios.post(
        "https://9d70-2401-4900-51fd-1774-893d-3551-b3fb-d590.ngrok-free.app/verify-otp",
        otpData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("done");
      console.log(response.data);
      toast.success("OTP Verified Successfully!", {
        duration: 3000,
      });
      navigate("/");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to verify OTP!", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen  flex bg-gradient-to-br from-purple-400 via-purple-300 to-blue-400 text-black items-center justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl ">
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text ">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">WhatsApp Number</span>
            </label>
            <input
              type="number"
              placeholder="Number"
              className="input input-bordered"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
          {!isOtpSent ? (
            <div className="form-control mt-6">
              <button className="btn bg-purple-500" onClick={handleGetOtp}>
                Get OTP
              </button>
            </div>
          ) : (
            <div className="form-control mt-6">
              <label className="label">
                <span className="label-text">OTP</span>
              </label>
              <input
                type="text"
                placeholder="Enter OTP"
                className="input input-bordered"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button
                className="btn btn-primary mt-4"
                onClick={handleSubmitOtp}
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
