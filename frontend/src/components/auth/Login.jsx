import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2, User, Building2, Sparkles } from 'lucide-react';

function Login() {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });
  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "content-Type": "application/json"
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const demoLogin = async (role) => {
    const demoCredentials = {
      student: { email: 'alex@gmail.com', password: 'alex', role: 'student' },
      recruiter: { email: 'rohit@gmail.com', password: 'rohit', role: 'recruiter' }
    };

    const credentials = demoCredentials[role];
    
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, credentials, {
        headers: {
          "content-Type": "application/json"
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(`Demo login successful as ${role}!`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Demo login failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto px-4 py-8'>
        <div className='w-full max-w-md'>
          {/* Demo Login Section */}
          <div className='card-dark rounded-2xl p-8 mb-8 border border-gray-700/50'>
            <div className='text-center mb-6'>
              <Sparkles className="h-8 w-8 text-purple-500 mx-auto mb-3" />
              <h2 className='text-xl font-bold text-white mb-2'>Try Demo Login</h2>
              <p className='text-gray-400 text-sm'>Experience the platform with demo accounts</p>
            </div>
            
            <div className='space-y-3'>
              <Button 
                onClick={() => demoLogin('student')}
                disabled={loading}
                className='w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-3 flex items-center gap-3'
              >
                <User className="h-4 w-4" />
                Demo as Student
              </Button>
              
              <Button 
                onClick={() => demoLogin('recruiter')}
                disabled={loading}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 flex items-center gap-3'
              >
                <Building2 className="h-4 w-4" />
                Demo as Recruiter
              </Button>
            </div>
          </div>

          {/* Regular Login Form */}
          <div className='card-dark rounded-2xl p-8 border border-gray-700/50'>
            <h1 className='font-bold text-2xl text-white mb-6 text-center'>Login to WorkVista</h1>

            <form onSubmit={submitHandler} className='space-y-4'>
              <div>
                <Label className="text-white">Email</Label>
                <Input
                  type='email'
                  value={input.email}
                  name='email'
                  onChange={changeEventHandler}
                  placeholder='Enter your email'
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
                />
              </div>

              <div>
                <Label className="text-white">Password</Label>
                <Input
                  type='password'
                  value={input.password}
                  name='password'
                  onChange={changeEventHandler}
                  placeholder='Enter your password'
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
                />
              </div>

              <div className='flex items-center justify-between'>
                <RadioGroup className='flex items-center gap-6 my-4'>
                  <div className='flex items-center space-x-2'>
                    <Input
                      type='radio'
                      name='role'
                      value='student'
                      id='r1'
                      checked={input.role === 'student'}
                      onChange={changeEventHandler}
                      className='cursor-pointer text-purple-500 focus:ring-purple-500'
                    />
                    <Label htmlFor='r1' className="text-white cursor-pointer">Student</Label>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Input
                      type='radio'
                      name='role'
                      value='recruiter'
                      id='r2'
                      checked={input.role === 'recruiter'}
                      onChange={changeEventHandler}
                      className='cursor-pointer text-purple-500 focus:ring-purple-500'
                    />
                    <Label htmlFor='r2' className="text-white cursor-pointer">Recruiter</Label>
                  </div>
                </RadioGroup>
              </div>

              {loading ? (
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-3" disabled>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please Wait
                </Button>
              ) : (
                <Button type='submit' className='w-full gradient-purple-blue hover:opacity-90 text-white rounded-xl py-3'>
                  Login
                </Button>
              )}

              <div className='text-center mt-6'>
                <span className='text-gray-400 text-sm'>
                  Don't have an account?{' '}
                  <Link to='/signup' className='text-purple-400 hover:text-purple-300 transition-colors'>
                    Sign up
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
